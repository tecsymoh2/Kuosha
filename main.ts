/* ===== Shared config & helpers. Edit prices/methods here. ===== */
interface Method { id: string; title: string; label: string; number: string; steps: string[]; desc?: string; note?: string }
interface Country { name: string; flag: string; code: string; currency: string; price: number | null; picker?: boolean; methods: Method[] }
interface SiteRequest { name: string; country: string; phone: string; ref?: string; amount?: string }
const CONFIG: { adminWhatsApp: string; serviceName: string; countdownSeconds: number; countries: Record<string, Country> } = {
  adminWhatsApp: "254125490569",
  serviceName: "2000+ WhatsApp Views",
  countdownSeconds: 30,
  countries: {
    KE: { name: "Kenya", flag: "🇰🇪", code: "254", currency: "KSh", price: 35,
      methods: [
        { id: "mpesa-phone", title: "Pay to M-Pesa phone", label: "M-Pesa phone number", number: "0115 490569",
          steps: ["Open M-Pesa and choose Send Money.", "Enter the phone number above.", "Enter the amount shown and send.", "Copy the M-Pesa confirmation message."] },
        { id: "mpesa-till", title: "Pay to Till number", label: "Till number (Buy Goods)", number: "3125150",
          steps: ["Open M-Pesa and choose Lipa na M-Pesa, then Buy Goods and Services.", "Enter the Till number above.", "Enter the amount shown and confirm.", "Copy the M-Pesa confirmation message."] }
      ] },
    // Set price to a number once a real local price is decided.
    // Add methods only after you have CONFIRMED they work for customers in that country.
    // Format: { id, title, label, number, steps:[...] }
    UG: { name: "Uganda", flag: "🇺🇬", code: "256", currency: "UGX", price: null /* set the UGX price here */, picker: true,
      methods: [
  {
    "id": "airtel-ug-saf",
    "title": "Airtel Money Uganda → Safaricom M-PESA",
    "label": "Recipient number (Kenya)",
    "number": "+254 115 490569",
    "desc": "Send from your Airtel Money Uganda wallet to our Safaricom M-PESA number in Kenya. Good if you use Airtel and want the money to arrive on M-PESA.",
    "note": "Cross-border transfer. Availability, fees and exchange rate depend on your provider. Confirm that sending to this network in Kenya is supported before you pay.",
    "steps": [
      "Dial *185# on your Airtel Uganda line.",
      "Select International Money Transfer.",
      "Choose Kenya, then M-PESA / Safaricom, if listed.",
      "Enter the recipient number above in +254 format, with no leading zero.",
      "Enter the amount.",
      "Check the exchange rate, fees and recipient name, then confirm with your PIN.",
      "Copy the confirmation message you receive."
    ]
  },
  {
    "id": "mtn-ug-saf",
    "title": "MTN MoMo Uganda → Safaricom M-PESA",
    "label": "Recipient number (Kenya)",
    "number": "+254 115 490569",
    "desc": "Send from your MTN Mobile Money wallet to our Safaricom M-PESA number. Safaricom and MTN Uganda have an international transfer partnership.",
    "note": "Cross-border transfer. Availability, fees and exchange rate depend on your provider. Confirm that sending to this network in Kenya is supported before you pay.",
    "steps": [
      "Open the MTN MoMo menu on your phone or app.",
      "Choose the international / send to another country option.",
      "Select Kenya and M-PESA / Safaricom.",
      "Enter the recipient number above in +254 format.",
      "Enter the amount.",
      "Check the exchange rate, fees and recipient name, then confirm with your PIN.",
      "Copy the confirmation message you receive."
    ]
  },
  {
    "id": "airtel-ug-airtel-ke",
    "title": "Airtel Money Uganda → Airtel Money Kenya",
    "label": "Recipient number (Kenya)",
    "number": "+254 780 307701",
    "desc": "Send from Airtel Money Uganda to our Airtel Money Kenya number. Both ends use Airtel, so it may be the simplest route if you are an Airtel customer.",
    "note": "Cross-border transfer. Availability, fees and exchange rate depend on your provider. Confirm that sending to this network in Kenya is supported before you pay.",
    "steps": [
      "Dial *185# on your Airtel Uganda line.",
      "Select International Money Transfer.",
      "Choose Kenya, then Airtel Money, if listed.",
      "Enter the recipient number above in +254 format, with no leading zero.",
      "Enter the amount.",
      "Check the exchange rate, fees and recipient name, then confirm with your PIN.",
      "Copy the confirmation message you receive."
    ]
  }
] },
    TZ: { name: "Tanzania", flag: "🇹🇿", code: "255", currency: "TZS", price: null /* set the TZS price here */, picker: true,
      methods: [
  {
    "id": "vodacom-tz-saf",
    "title": "Vodacom M-Pesa Tanzania → Safaricom M-PESA",
    "label": "Recipient number (Kenya)",
    "number": "+254 115 490569",
    "desc": "Both are M-Pesa networks, so this is the most direct route if you use Vodacom M-Pesa.",
    "note": "Cross-border transfer. Availability, fees and exchange rate depend on your provider. Confirm that sending to this network in Kenya is supported before you pay.",
    "steps": [
      "Open the Vodacom M-Pesa menu (USSD or app).",
      "Select Send Money, then International Transfers.",
      "Choose Kenya and Safaricom M-PESA, if available.",
      "Enter the recipient number above in +254 format.",
      "Enter the amount in Tanzanian shillings.",
      "Check the exchange rate, fees and recipient name, then confirm with your PIN.",
      "Copy the confirmation message you receive."
    ]
  },
  {
    "id": "tigo-tz-saf",
    "title": "Mixx by Yas (Tigo Pesa) → Safaricom M-PESA",
    "label": "Recipient number (Kenya)",
    "number": "+254 115 490569",
    "desc": "Send from Tigo Pesa (now Mixx by Yas) to our Safaricom M-PESA number.",
    "note": "Cross-border transfer. Availability, fees and exchange rate depend on your provider. Confirm that sending to this network in Kenya is supported before you pay.",
    "steps": [
      "Dial *150*01#.",
      "Select Send Money.",
      "Choose To other countries.",
      "Select Kenya and Safaricom M-PESA.",
      "Enter the recipient number above and the amount.",
      "Check the exchange rate, fees and recipient name, then confirm with your PIN.",
      "Copy the confirmation message you receive."
    ]
  },
  {
    "id": "airtel-tz-airtel-ke",
    "title": "Airtel Money Tanzania → Airtel Money Kenya",
    "label": "Recipient number (Kenya)",
    "number": "+254 780 307701",
    "desc": "Send from Airtel Money Tanzania to our Airtel Money Kenya number. Choose this if you use Airtel.",
    "note": "Cross-border transfer. Availability, fees and exchange rate depend on your provider. Confirm that sending to this network in Kenya is supported before you pay.",
    "steps": [
      "Open the Airtel Money menu on your Airtel Tanzania line.",
      "Choose the international / send to another country option.",
      "Select Kenya and Airtel Money.",
      "Enter the recipient number above in +254 format.",
      "Enter the amount in Tanzanian shillings.",
      "Check the exchange rate, fees and recipient name, then confirm with your PIN.",
      "Copy the confirmation message you receive."
    ]
  }
] }
  }
};
const SUPABASE_URL = "https://fgetfjswkwyenfdpcxar.supabase.co";
const SUPABASE_KEY = "sb_publishable_YjGIIgPDOxrWR64pxeoKvw_vHPYOJWX"; // publishable key: safe in browser, protected by row-level security
function sb(): SbClient | null { return window.supabase ? (window._sb = window._sb || window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)) : null; }
const $ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document): T => r.querySelector(s) as T;
const store = {
  get<T = any>(k: string): T | null { try { return JSON.parse(sessionStorage.getItem(k) || "null"); } catch (e) { return null; } },
  set(k: string, v: unknown): boolean { try { sessionStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k: string): void { try { sessionStorage.removeItem(k); } catch (e) {} }
};
function esc(s: unknown): string { const d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }
function fmtPrice(c: Country): string { return c.price == null ? "Price not set yet" : c.currency + " " + Number(c.price).toLocaleString("en-US"); }
function showMsg(el: HTMLElement, type: string, text: string): void { el.className = "msg " + type; el.textContent = text; el.classList.remove("hidden"); }
async function copyText(text: string, btn: HTMLElement): Promise<void> {
  const old = btn.textContent || "";
  try { await navigator.clipboard.writeText(text); }
  catch (e) {
    const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); } catch (x) { btn.textContent = "Copy failed"; t.remove(); return; } t.remove();
  }
  btn.textContent = "Copied ✓"; setTimeout(() => btn.textContent = old, 1800);
}
document.addEventListener("DOMContentLoaded", () => {
  const b = $(".burger"), n = $("nav");
  if (b) b.addEventListener("click", () => { const o = n.classList.toggle("open"); b.setAttribute("aria-expanded", String(o)); });
  const y = $("#year"); if (y) y.textContent = String(new Date().getFullYear());
  const form = $<HTMLFormElement>("#reqForm"); if (form) initHome(form);
});

/* ===== Homepage ===== */
function initHome(form: HTMLFormElement): void {
  const sel = $<HTMLSelectElement>("#country"), cc = $<HTMLInputElement>("#cc"), err = $("#err"), box = $("#progress");
  const fill = () => { const c = CONFIG.countries[sel.value]; cc.value = c ? "+" + c.code : "+"; };
  sel.addEventListener("change", fill); fill();
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault(); err.classList.add("hidden");
    const name = $<HTMLInputElement>("#name").value.trim(), key = sel.value, c = CONFIG.countries[key];
    let digits = $<HTMLInputElement>("#phone").value.replace(/[\s\-()]/g, "");
    if (name.length < 2) return showMsg(err, "err", "Enter your full name.");
    if (!c) return showMsg(err, "err", "Select your country.");
    if (!/^\+?\d+$/.test(digits)) return showMsg(err, "err", "Phone number can only contain digits.");
    digits = digits.replace(/^\+/, "");
    if (digits.startsWith(c.code)) digits = digits.slice(c.code.length);
    digits = digits.replace(/^0+/, "");
    if (digits.length !== 9) return showMsg(err, "err", "Enter a valid " + c.name + " number (9 digits after the country code, e.g. 712345678).");
    if (!$<HTMLInputElement>("#consent").checked) return showMsg(err, "err", "Please accept the Terms and Privacy Policy to continue.");
    if (!store.set("request", { name, country: key, phone: "+" + c.code + digits })) return showMsg(err, "err", "Your browser blocked session storage. Allow it and try again.");
    form.classList.add("hidden"); box.classList.remove("hidden");
    const steps = ["Preparing your request", "Processing request details", "Saving details in this browser", "Getting the payment page ready"];
    let left = CONFIG.countdownSeconds; const total = left;
    const tick = () => {
      $("#count").textContent = String(left); $<HTMLElement>("#fill").style.width = ((total - left) / total * 100) + "%";
      $("#status").textContent = steps[Math.min(steps.length - 1, Math.floor((total - left) / (total / steps.length)))];
      if (left-- <= 0) { location.href = "verification.html"; return; }
      setTimeout(tick, 1000);
    };
    tick();
  });
}
