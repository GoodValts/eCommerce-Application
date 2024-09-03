function aboutPageLoaded() {
  const location = window.location.pathname;
  if (location === '/about') {
    return undefined;
  }
  return undefined;
}

window.addEventListener('PageContentLoaded', aboutPageLoaded);
