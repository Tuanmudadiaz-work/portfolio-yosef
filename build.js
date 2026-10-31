// Membuat versi statis (HTML biasa) di folder dist/ untuk GitHub Pages
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const { pageData } = require("./lib/portfolio");

const OUT = path.join(__dirname, "dist");

async function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.cpSync(path.join(__dirname, "public"), OUT, { recursive: true });

  const html = await ejs.renderFile(path.join(__dirname, "views", "index.ejs"), { d: pageData() });
  fs.writeFileSync(path.join(OUT, "index.html"), html);
  // GitHub Pages: jangan proses dengan Jekyll
  fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

  console.log(`Build selesai: ${path.relative(__dirname, OUT)}/index.html`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
