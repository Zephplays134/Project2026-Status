/* Project 2026 Status — v2.0 extras: scroll progress bar + compact header.
   Purely presentational; runs after script.js and touches no page logic. */
(function () {
  var bar = document.querySelector(".scrollbar"), top = document.querySelector(".top");
  if (!bar && !top) return;
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
})();
