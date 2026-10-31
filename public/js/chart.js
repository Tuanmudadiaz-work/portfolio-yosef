(function () {
  var svg = document.getElementById("chart");
  var src = document.getElementById("chart-data");
  if (!svg || !src) return;
  var data;
  try { data = JSON.parse(src.textContent); } catch (e) { return; }

  var months = data.months, spend = data.spend, rev = data.revenue;
  var NS = "http://www.w3.org/2000/svg";
  var W = 760, H = 320, L = 56, R = 10, T = 30, B = 36;
  var top = Math.max.apply(null, rev.concat(spend));
  var step = Math.ceil(top / 5 / 50) * 50 || 50;
  var max = step * 5 + step * 0.2;
  var ch = H - T - B, cw = W - L - R, gw = cw / months.length, bw = Math.min(22, gw * 0.3);

  function el(n, a, t) {
    var e = document.createElementNS(NS, n);
    for (var k in a) e.setAttribute(k, a[k]);
    if (t != null) e.textContent = t;
    svg.appendChild(e);
    return e;
  }

  for (var v = 0; v <= step * 5; v += step) {
    var y = T + ch - (v / max) * ch;
    el("line", { x1: L, x2: W - R, y1: y, y2: y, stroke: "var(--line)", "stroke-width": 1 });
    el("text", { x: L - 8, y: y + 4, "text-anchor": "end", "font-size": 11, fill: "var(--muted)" }, v === 0 ? "0" : "Rp" + v + " jt");
  }

  months.forEach(function (m, i) {
    var cx = L + gw * i + gw / 2;
    var hs = (spend[i] / max) * ch;
    var hr = Math.max((rev[i] / max) * ch, 1.5);
    el("rect", { x: cx - bw - 2, y: T + ch - hs, width: bw, height: hs, rx: 3, fill: "var(--ink)" });
    el("rect", { x: cx + 2, y: T + ch - hr, width: bw, height: hr, rx: 3, fill: "var(--gold)" });
    if (spend[i] > 0) {
      el("text", { x: cx + 2 + bw / 2, y: T + ch - hr - 7, "text-anchor": "middle", "font-size": 11, "font-weight": 600, fill: "var(--ink)" },
        (rev[i] / spend[i]).toFixed(1).replace(".", ",") + "x");
    }
    el("text", { x: cx, y: H - 12, "text-anchor": "middle", "font-size": 12, fill: "var(--muted)" }, m);
  });
})();
