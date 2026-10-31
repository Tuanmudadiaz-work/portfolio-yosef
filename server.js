const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "portfolio.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"), { maxAge: "1d" }));

// Baca ulang data setiap request, jadi edit portfolio.json langsung terlihat tanpa restart
function loadData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Link WhatsApp otomatis dari nomor (format 62xxxx)
function waLink(number, text) {
  if (!number) return null;
  const clean = String(number).replace(/\D/g, "").replace(/^0/, "62");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text || "")}`;
}

app.get("/", (req, res) => {
  const data = loadData();
  data.contact.waUrl = waLink(data.contact.whatsapp, data.contact.whatsappMessage);
  res.render("index", { d: data });
});

app.get("/api/portfolio", (req, res) => res.json(loadData()));

app.use((req, res) => res.status(404).redirect("/"));

app.listen(PORT, () => {
  console.log(`Portfolio berjalan di http://localhost:${PORT}`);
});
