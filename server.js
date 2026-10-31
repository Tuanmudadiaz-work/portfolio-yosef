const express = require("express");
const path = require("path");
const { loadData, pageData } = require("./lib/portfolio");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"), { maxAge: "1d" }));

app.get("/", (req, res) => {
  res.render("index", { d: pageData() });
});

app.get("/api/portfolio", (req, res) => res.json(loadData()));

app.use((req, res) => res.status(404).redirect("/"));

app.listen(PORT, () => {
  console.log(`Portfolio berjalan di http://localhost:${PORT}`);
});
