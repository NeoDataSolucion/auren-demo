if (sessionStorage.getItem('aurenDemoSession') !== 'active') {
  location.replace('../index.html');
}
if (window.self !== window.top) document.documentElement.classList.add('suite-embedded');
