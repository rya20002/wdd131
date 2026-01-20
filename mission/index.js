const selectElem = document.querySelector('#modeSelect');
const logo = document.querySelector('.logo');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
  const current = selectElem.value;

  if (current === 'dark') {
    document.body.classList.add('dark');
    logo.src = 'images/byui-logo-white.png';
  } else {
    document.body.classList.remove('dark');
    logo.src = 'images/byui-logo-blue.webp';
  }
}