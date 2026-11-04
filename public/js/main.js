(function () {
  const root = document.documentElement;

  // Tema terang/gelap, pilihan disimpan di browser pengunjung
  const btn = document.getElementById("theme-toggle");
  const meta = document.querySelector('meta[name="theme-color"]');
  function applyTheme(t) {
    root.dataset.theme = t;
    btn.setAttribute("aria-checked", String(t === "light"));
    if (meta) meta.content = t === "dark" ? "#111111" : "#FAFAF8";
  }
  applyTheme(root.dataset.theme === "light" ? "light" : "dark");
  btn.addEventListener("click", function () {
    const t = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(t);
    try { localStorage.setItem("theme", t); } catch (e) {}
  });

  // Jam WITA di hero
  const clock = document.getElementById("clock");
  if (clock) {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Makassar", hour: "2-digit", minute: "2-digit" });
    const tick = () => { clock.textContent = "WITA " + fmt.format(new Date()); };
    tick();
    setInterval(tick, 30000);
  }

  // Mata avatar mengikuti kursor; di layar sentuh / saat kursor diam, sesekali melirik sendiri
  const avatar = document.querySelector(".avatar");
  if (avatar && avatar.querySelector(".eye")) {
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0, ty = 0, ex = 0, ey = 0, raf = 0, ptr = null, lastMove = 0;
    const step = function () {
      raf = 0;
      ex += (tx - ex) * 0.2;
      ey += (ty - ey) * 0.2;
      avatar.style.setProperty("--ex", ex.toFixed(3));
      avatar.style.setProperty("--ey", ey.toFixed(3));
      if (Math.abs(tx - ex) > 0.002 || Math.abs(ty - ey) > 0.002) raf = requestAnimationFrame(step);
    };
    const lookAt = function (x, y) {
      const r = avatar.getBoundingClientRect();
      const reach = r.width * 1.5; // makin jauh kursor, makin mentok liriknya
      tx = Math.tanh((x - (r.left + r.width / 2)) / reach);
      ty = Math.tanh((y - (r.top + r.height * 0.31)) / reach);
      if (!raf) raf = requestAnimationFrame(step);
    };
    const center = function () { tx = ty = 0; ptr = null; if (!raf) raf = requestAnimationFrame(step); };
    addEventListener("pointermove", function (e) { ptr = [e.clientX, e.clientY]; lastMove = Date.now(); lookAt(e.clientX, e.clientY); }, { passive: true });
    addEventListener("pointerdown", function (e) { lastMove = Date.now(); lookAt(e.clientX, e.clientY); }, { passive: true });
    addEventListener("scroll", function () { if (ptr) lookAt(ptr[0], ptr[1]); }, { passive: true });
    document.documentElement.addEventListener("mouseleave", center);
    addEventListener("blur", center);
    if (!calm) {
      setInterval(function () {
        if (document.hidden || Date.now() - lastMove < 4000) return;
        const r = avatar.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        // lirik acak, lalu sering kembali ke tengah
        if (Math.random() < 0.4) { tx = 0; ty = 0; } else { tx = Math.random() * 1.6 - 0.8; ty = Math.random() * 0.8 - 0.3; }
        if (!raf) raf = requestAnimationFrame(step);
      }, 2200);
    }
  }

  // Sorotan cahaya di kartu mengikuti kursor
  document.querySelectorAll(".card, .case").forEach(function (el) {
    el.addEventListener("pointermove", function (e) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  if (!("IntersectionObserver" in window)) return;

  // Link nav aktif sesuai section yang sedang dilihat
  const links = {};
  document.querySelectorAll(".top nav a").forEach(function (a) { links[a.hash.slice(1)] = a; });
  const navIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      const a = links[e.target.id];
      if (a) a.classList.toggle("active", e.isIntersecting);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  Object.keys(links).forEach(function (id) {
    const s = document.getElementById(id);
    if (s) navIO.observe(s);
  });

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Angka menghitung naik: "Rp1.41B", "−36%", "1M+" -> awalan, angka, akhiran
  function countUp(el) {
    const txt = el.textContent;
    const m = txt.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
    if (!m) return;
    const end = parseFloat(m[2]);
    const dec = (m[2].split(".")[1] || "").length;
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 1200, 1);
      el.textContent = m[1] + (end * (1 - Math.pow(1 - p, 3))).toFixed(dec) + m[3];
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = txt;
    })(t0);
  }

  // Muncul saat di-scroll
  root.classList.add("js");
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("on");
      io.unobserve(el);
      // hapus jeda setelah muncul supaya efek hover tidak ikut tertunda
      setTimeout(function () { el.style.transitionDelay = ""; }, 1300);
      if (el.matches(".stat b, .f-label strong")) countUp(el);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".hero > *, .logos li, .sec-head, .sec-sub, .about-body, .stat, .chips li, .case, .card, .cta, .xp li, details, footer .mail, .links li")
    .forEach(function (el) {
      el.classList.add("rv");
      const delay = Math.min(Array.prototype.indexOf.call(el.parentNode.children, el), 6) * 70;
      el.style.transitionDelay = delay + "ms";
      io.observe(el);
    });
  document.querySelectorAll(".stat b, .f-label strong, #chart").forEach(function (el) { io.observe(el); });
})();
