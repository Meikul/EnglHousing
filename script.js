window.onload = init;

function init() {
  const buttons = $('.button');
  buttons.forEach(element => {
    element.addEventListener('click', crackPage);
  });
}

const healDuration = 2000;
const crackDuration = 2000;

function healPage() {
  const pages = $('.page')
  pages.forEach(element => {
    element.classList.remove('cracked');
  });
  setTimeout(() => {
    pages.forEach(element => {
      element.classList.add('healed');
      element.removeEventListener('mousedown', healPage);
    });
  }, healDuration);
}

function crackPage(e) {
  const root = document.documentElement;
  root.style.setProperty('--break-y', e.clientY + "px");

  const pages = $('.page');
  pages.forEach(element => {
    element.classList.add('cracked');
    element.classList.remove('healed');
  });

  const pageCovers = $('.page.cracked');
  pageCovers.forEach(element => {
    element.addEventListener('mousedown', healPage);
    //Has to be mousedown because click will fire this on release
  });
}

function $(query) {
  const nodeList = document.querySelectorAll(query);
  return (nodeList.length === 1) ? nodeList[0] : nodeList;
}