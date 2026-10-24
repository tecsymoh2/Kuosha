document.addEventListener("DOMContentLoaded", () => {
  const r = store.get("request");
  if (!r || !r.ref) { location.replace(r ? "verification.html" : "index.html"); return; }
  const c = CONFIG.countries[r.country];
  $("#wname").textContent = r.name; $("#wref").textContent = r.ref; $("#wcode").textContent = r.ref;
  $("#wcountry").textContent = c.flag + " " + c.name; $("#wamount").textContent = r.amount;
  const cb = $("#copyRef"); cb.addEventListener("click", () => copyText(r.ref, cb));
  $("#waBtn").addEventListener("click", () => {
    const text = "Hello Admin, I need assistance with my 2000+ WhatsApp Views request. My reference code is " + r.ref + ". Please check my request.";
    window.open("https://wa.me/" + CONFIG.adminWhatsApp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  });
  $("#clearBtn").addEventListener("click", () => { sessionStorage.clear(); location.href = "index.html"; });
});
