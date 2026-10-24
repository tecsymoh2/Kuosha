/* Usernames map to an internal auth email. The password is never stored in this code. */
const toEmail = u => { u = u.trim().toLowerCase(); return u.includes("@") ? u : u + "@admin.2000views.app"; };
document.addEventListener("DOMContentLoaded", async () => {
  const c = sb(), err = $("#aerr"), STAT = ["pending", "verified", "rejected", "completed"];
  async function load() {
    const { data, error } = await c.from("wv_requests").select("*").order("created_at", { ascending: false }).limit(200);
    if (error) return showMsg(err, "err", error.message);
    $("#rows").innerHTML = data.map(r => "<tr><td>" + esc(r.ref_code) + "</td><td>" + esc(r.full_name) + "</td><td>" + esc(r.phone) + "</td><td>" + esc(r.country) +
      "</td><td>" + esc(r.amount_label) + "</td><td>" + esc(r.tx_message) + "</td><td>" + (r.screenshot_path ? "<button class='btn alt' data-shot='" + esc(r.screenshot_path) + "' type='button'>View</button>" : "-") + "</td><td><select data-id='" + r.id + "'>" +
      STAT.map(s => "<option" + (s === r.status ? " selected" : "") + ">" + s + "</option>").join("") + "</select></td><td>" + esc(new Date(r.created_at).toLocaleString()) + "</td></tr>").join("") || "<tr><td colspan='9'>No requests yet.</td></tr>";
  }
  async function gate() {
    const { data: { session } } = await c.auth.getSession();
    if (!session) { $("#loginBox").classList.remove("hidden"); $("#panel").classList.add("hidden"); return; }
    const { data: ok } = await c.rpc("wv_is_admin");
    if (!ok) { await c.auth.signOut(); $("#loginBox").classList.remove("hidden"); return showMsg(err, "err", "This account is not an admin."); }
    $("#loginBox").classList.add("hidden"); $("#panel").classList.remove("hidden"); $("#who").textContent = (session.user.user_metadata && session.user.user_metadata.username) || session.user.email; load();
  }
  $("#loginBtn").addEventListener("click", async () => {
    err.classList.add("hidden");
    const { error } = await c.auth.signInWithPassword({ email: toEmail($("#aemail").value), password: $("#apass").value });
    if (error) return showMsg(err, "err", "Sign-in failed: " + error.message);
    $("#apass").value = ""; gate();
  });
  $("#outBtn").addEventListener("click", async () => { await c.auth.signOut(); gate(); });
  $("#refresh").addEventListener("click", load);
  $("#rows").addEventListener("click", async e => {
    const p = e.target.dataset.shot; if (!p) return;
    const { data, error } = await c.storage.from("wv-proofs").createSignedUrl(p, 120);
    if (error) return alert(error.message); window.open(data.signedUrl, "_blank", "noopener");
  });
  $("#rows").addEventListener("change", async e => {
    if (e.target.dataset.id) { const { error } = await c.from("wv_requests").update({ status: e.target.value, updated_at: new Date().toISOString() }).eq("id", e.target.dataset.id); if (error) alert(error.message); }
  });
  gate();
});
