/* Theme toggle — persists choice, respects system preference, no flash of wrong theme. */
(function () {
  var root = document.documentElement;

  // Set theme as early as possible (script is loaded synchronously in <head>).
  try {
    var stored = localStorage.getItem('theme');
    var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    root.setAttribute('data-theme', stored || (prefersLight ? 'light' : 'dark'));
  } catch (e) {
    root.setAttribute('data-theme', 'dark');
  }

  function icon(theme) { return theme === 'light' ? '☾' : '☀'; } // ☾ / ☀

  function wire() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = icon(root.getAttribute('data-theme'));
    btn.setAttribute('aria-label', 'Toggle light / dark theme');
    btn.setAttribute('title', 'Toggle theme');
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      btn.textContent = icon(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
