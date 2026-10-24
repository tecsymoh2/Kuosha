document.addEventListener("DOMContentLoaded", () => {
  const req = store.get("request");
  if (!req || !CONFIG.countries[req.country]) { location.replace("index.html"); return; }
  const sel = $("#vcountry"), cfgMsg = $("#cfgmsg"), methods = $("#methods"), form = $("#proofForm"), out = $("#vmsg");
  $("#vname").textContent = req.name;
  Object.entries(CONFIG.countries).forEach(([k, c]) => sel.add(new Option(c.flag + " " + c.name, k)));
  sel.value = req.country;

  function render() {
    const c = CONFIG.countries[sel.value];
    req.country = sel.value; store.set("request", req);
    $("#vflag").textContent = c.flag + " " + c.name; $("#vamount").textContent = fmtPrice(c); methods.innerHTML = "";
    const ready = c.price != null && c.methods.length > 0;
    cfgMsg.classList.toggle("hidden", ready);
    if (!ready) cfgMsg.textContent = "Payments for " + c.name + " are not available yet. A price and a confirmed local payment method still need to be set. Contact the admin on WhatsApp for options, or choose another country.";
    form.classList.toggle("hidden", !ready);
    if (!ready) return;
    const draw = m => {
      const d = document.createElement("div"); d.className = "card";
      d.innerHTML = "<h3>" + esc(m.title) + "</h3>" + (m.desc ? "<p>" + esc(m.desc) + "</p>" : "") + "<small>" + esc(m.label) + "</small><div class='num'>" + esc(m.number) + "</div>" +
        "<p><b>Amount: " + esc(fmtPrice(c)) + "</b></p>" + (m.note ? "<div class='msg warn'>" + esc(m.note) + "</div>" : "") + "<ol>" + m.steps.map(s => "<li>" + esc(s) + "</li>").join("") + "</ol>";
      const b = document.createElement("button"); b.type = "button"; b.className = "btn alt"; b.textContent = "Copy Number";
      b.addEventListener("click", () => copyText(m.number.replace(/\s/g, ""), b)); d.appendChild(b); return d;
    };
    if (!c.picker) { c.methods.forEach(m => methods.appendChild(draw(m))); return; }
    const pick = document.createElement("div"); pick.className = "card"; pick.style.gridColumn = "1/-1";
    pick.innerHTML = "<h3>Choose how you will pay</h3>"; const detail = document.createElement("div");
    c.methods.forEach((m, i) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "btn alt"; b.style.cssText = "display:block;width:100%;text-align:left;margin-top:8px";
      b.textContent = m.title; b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => {
        pick.querySelectorAll("button").forEach(x => { x.className = "btn alt"; x.setAttribute("aria-pressed", "false"); });
        b.className = "btn"; b.setAttribute("aria-pressed", "true"); detail.innerHTML = ""; detail.appendChild(draw(m)); detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      pick.appendChild(b);
    });
    pick.appendChild(detail); const hint = document.createElement("p"); hint.className = "small"; hint.textContent = "Select a method to see its description and steps."; detail.appendChild(hint);
    methods.appendChild(pick);
  }
  sel.addEventListener("change", render); render();

  function makeCode() {
    const used = store.get("usedCodes") || []; let code;
    do { code = "VC" + String(Math.floor(Math.random() * 100000)).padStart(5, "0"); } while (used.includes(code));
    used.push(code); store.set("usedCodes", used); return code;
  }
  form.addEventListener("submit", async e => {
    e.preventDefault(); out.classList.add("hidden");
    const msg = $("#txmsg").value.trim(), file = $("#shot").files[0];
    if (msg.length < 10) return showMsg(out, "err", "Paste the full payment confirmation message.");
    if (!file) return showMsg(out, "err", "Upload a screenshot of the payment.");
    if (!/^image\//.test(file.type)) return showMsg(out, "err", "The screenshot must be an image file.");
    if (file.size > 5 * 1024 * 1024) return showMsg(out, "err", "The screenshot is larger than 5 MB.");
    const c = CONFIG.countries[sel.value], client = sb();
    if (!client) return showMsg(out, "err", "Could not load the request service. Check your connection and try again.");
    $("#submitBtn").disabled = true; showMsg(out, "ok", "Submitting your payment details...");
    const shotPath = "uploads/" + crypto.randomUUID() + "." + ({"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/gif":"gif"}[file.type] || "img");
    let ref, saved = false;
    for (let i = 0; i < 5 && !saved; i++) {
      ref = makeCode();
      const { error } = await client.from("wv_requests").insert({ ref_code: ref, full_name: req.name, country: sel.value, phone: req.phone,
        amount_label: fmtPrice(c), tx_message: msg.slice(0, 2000), tx_reference: $("#txref").value.trim().slice(0, 40) || null, screenshot_path: shotPath });
      if (!error) saved = true; else if (error.code !== "23505") { $("#submitBtn").disabled = false; return showMsg(out, "err", /RATE_LIMIT/.test(error.message) ? "Too many requests for this phone number. Try again in 24 hours or contact the admin on WhatsApp." : "Could not submit: " + error.message); }
    }
    if (!saved) { $("#submitBtn").disabled = false; return showMsg(out, "err", "Could not create a unique code. Please try again."); }
    const up = await client.storage.from("wv-proofs").upload(shotPath, file, { contentType: file.type, upsert: false });
    const shotOk = !up.error;
    store.set("request", Object.assign(req, { ref, amount: fmtPrice(c) }));
    out.className = "msg ok";
    out.innerHTML = "<b>Payment details submitted for manual review.</b><br>Your name, phone, payment message and reference were sent to the admin. Payment is <b>not</b> verified automatically, and the code below is only a reference, not proof of payment. " + (shotOk ? "Your screenshot was uploaded privately for the admin to review." : "<b>Your screenshot could not be uploaded.</b> Please send it to the admin on WhatsApp.") + "<div class='code'>" + ref + "</div>";
    const cb = document.createElement("button"); cb.type = "button"; cb.className = "btn alt"; cb.textContent = "Copy Code";
    cb.addEventListener("click", () => copyText(ref, cb)); out.appendChild(cb);
    const p = document.createElement("p"); p.className = "small"; p.innerHTML = "<br>Taking you to the next page in 12 seconds. <a href='wait.html'>Go now</a>"; out.appendChild(p);
    setTimeout(() => location.href = "wait.html", 12000);
  });
});
