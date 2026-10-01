// Applies the chosen direction and logo before first paint, so pages never flash the wrong theme.
// ?theme=a|b|c&logo=1|2|3 overrides the saved choice (handy for sharing a specific combination).
(function () {
  var params = new URLSearchParams(window.location.search);
  var theme = params.get('theme');
  var logo = params.get('logo');
  try {
    theme = theme || window.localStorage.getItem('epoch-theme');
    logo = logo || window.localStorage.getItem('epoch-logo');
  } catch (error) {
    console.warn('Saved prototype choices are unavailable; using the defaults.', error);
  }
  document.documentElement.dataset.theme = /^[abc]$/.test(theme || '') ? theme : 'a';
  document.documentElement.dataset.logo = /^[123]$/.test(logo || '') ? logo : '1';
})();
