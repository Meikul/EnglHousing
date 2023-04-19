window.onload = init;

function init() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(element => {
    element.addEventListener('click', breakPage);
  });
}

function breakPage(e) {
  const root = document.documentElement;
  root.style.setProperty('--break-y', e.clientY + "px");
  console.log(e);
}