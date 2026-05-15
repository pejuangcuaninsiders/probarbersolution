/* =========================

   PRO BARBER BALI - SCRIPT

   ========================= */

let state = {

  services: [],

  date: null,

  time: null

};

/* =========================

   SELECT SERVICE

========================= */

function toggleService(name, price, el) {

  const exist = state.services.find(s => s.name === name);

  if (exist) {

    state.services = state.services.filter(s => s.name !== name);

    el.classList.remove("active");

  } else {

    state.services.push({ name, price });

    el.classList.add("active");

  }

  updateSummary();

}

/* =========================

   SUMMARY CALCULATION

========================= */

function updateSummary() {

  let subtotal = 0;

  state.services.forEach(s => {

    subtotal += s.price;

  });

  let discount = state.services.length >= 2 ? subtotal * 0.10 : 0;

  let total = subtotal - discount;

  const subEl = document.getElementById("subtotal");

  const discEl = document.getElementById("discount");

  const totalEl = document.getElementById("total");

  const countEl = document.getElementById("service-count");

  if (subEl) subEl.innerText = "IDR " + subtotal.toLocaleString();

  if (discEl) discEl.innerText = "- IDR " + discount.toLocaleString();

  if (totalEl) totalEl.innerText = "IDR " + total.toLocaleString();

  if (countEl) countEl.innerText = state.services.length + " Services";

}

/* =========================

   CALENDAR (AUTO 14 HARI)

========================= */

function buildCalendar() {

  const cal = document.getElementById("calendar");

  if (!cal) return;

  cal.innerHTML = "";

  for (let i = 0; i < 14; i++) {

    let d = new Date();

    d.setDate(d.getDate() + i);

    let btn = document.createElement("div");

    btn.className = "date-item";

    btn.innerText = d.getDate() + "/" + (d.getMonth() + 1);

    btn.onclick = () => {

      state.date = btn.innerText;

      document.querySelectorAll(".date-item").forEach(e => e.classList.remove("active"));

      btn.classList.add("active");

    };

    cal.appendChild(btn);

  }

}

/* =========================

   TIME SLOT (FIXED)

========================= */

function buildTime() {

  const grid = document.getElementById("time-grid");

  if (!grid) return;

  const times = ["11:00", "13:00", "15:00", "17:00", "19:00"];

  grid.innerHTML = "";

  times.forEach(t => {

    let btn = document.createElement("div");

    btn.className = "time-item";

    btn.innerText = t;

    btn.onclick = () => {

      state.time = t;

      document.querySelectorAll(".time-item").forEach(e => e.classList.remove("active"));

      btn.classList.add("active");

    };

    grid.appendChild(btn);

  });

}

/* =========================

   SEND TO WHATSAPP

========================= */

function sendWA() {

  const phone = "6288989994789";

  let text = "NEW BOOKING\n\n";

  state.services.forEach((s, i) => {

    text += `${i + 1}. ${s.name} - IDR ${s.price}\n`;

  });

  text += `\nDate: ${state.date}`;

  text += `\nTime: ${state.time}`;

  let url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");

}

/* =========================

   INIT

========================= */

document.addEventListener("DOMContentLoaded", () => {

  buildCalendar();

  buildTime();

});