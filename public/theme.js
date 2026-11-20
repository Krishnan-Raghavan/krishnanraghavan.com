// Theme handling. Loaded synchronously in <head> so the right theme is
// on <html> before anything paints — no flash.
//
// Rules:
//   1. If the visitor has toggled before, their choice (localStorage) wins.
//   2. Otherwise follow the system preference, and keep following it live.
//   3. Toggling stores the explicit choice.
(function () {
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function stored() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  apply(stored() || (media.matches ? 'dark' : 'light'));

  // Follow the OS only while the visitor hasn't chosen for themselves.
  var onSystemChange = function (e) {
    if (!stored()) apply(e.matches ? 'dark' : 'light');
  };
  if (media.addEventListener) media.addEventListener('change', onSystemChange);
  else if (media.addListener) media.addListener(onSystemChange);

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    apply(root.getAttribute('data-theme'));
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode; fine */ }
    });
  });
})();
