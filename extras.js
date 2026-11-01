/* Project 2026 Status — v2.1 extras: scroll progress bar, compact header, card spotlight.
   Purely presentational; runs after script.js and touches no page logic. */
(function () {
  var bar = document.querySelector(".scrollbar"), top = document.querySelector(".top");
  var raf = 0;
  function update() {
    raf = 0;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty("--scroll", max > 0 ? String(Math.min(1, Math.max(0, window.scrollY / max))) : "0");
    if (top) top.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();

  /* pointer spotlight on glass cards (CSS reads --mx / --my) */
  var mqHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var mqCalm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (mqHover && !mqCalm) {
    var sel = ".answer, .card, .tile, .ev-card, .stat, .kd-col";
    document.addEventListener("pointermove", function (e) {
      var t = e.target && e.target.closest ? e.target.closest(sel) : null;
      if (t) {
        var r = t.getBoundingClientRect();
        t.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
        t.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
      }
    }, { passive: true });
  }
})();
