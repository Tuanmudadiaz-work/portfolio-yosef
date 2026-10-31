const path = require("path");
const fs = require("fs");

const DATA_FILE = path.join(__dirname, "..", "data", "portfolio.json");

// Baca ulang data setiap kali dipanggil, jadi edit portfolio.json langsung terlihat tanpa restart
function loadData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Link WhatsApp otomatis dari nomor (format 62xxxx)
function waLink(number, text) {
  if (!number) return null;
  const clean = String(number).replace(/\D/g, "").replace(/^0/, "62");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text || "")}`;
}

// Data siap pakai untuk template, dipakai server.js dan build.js
function pageData() {
  const data = loadData();
  data.contact.waUrl = waLink(data.contact.whatsapp, data.contact.whatsappMessage);
  return data;
}

module.exports = { loadData, waLink, pageData };
