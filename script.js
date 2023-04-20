window.onload = init;

//create clip path polygon with js

function init() {
  const buttons = $('.button');
  buttons.forEach(element => {
    element.addEventListener('click', crackPage);
  });
}

const healDuration = 1000;
const crackDuration = 1000;

const crackSlope = 10;

function healPage() {
  //Remove cracked class
  const pages = $('.page')
  pages.forEach(element => {
    element.classList.remove('cracked');
  });

  //Remove page-cover click event
  const pageCovers = $('.page-cover');
  pageCovers.forEach(element => {
    element.removeEventListener('mousedown', healPage);
  });

  //Add healed class after animation duration
  //  If you click before crack animation complete, you have to wait a while to click another button
  setTimeout(() => {
    pages.forEach(element => {
      element.style.setProperty('clip-path', 'polygon(0 0, 0 100%, 100% 100%, 100% 0');
      element.classList.add('healed');
    });
  }, healDuration);
}

function crackPage(e) {
  const root = document.documentElement;
  console.log(e);
  // root.style.setProperty('--break-y', e.pageY + "px");
  const crackPoints = [];
  const zigCount = 10;
  const maxDeviation = 50;
  let caughtClick = false;

  for (let i = 0; i < zigCount; i++) {
    const x = Math.round((100 / (zigCount-1)) * i);
    const y = e.pageY + Math.floor(Math.random() * maxDeviation);
    if (!caughtClick && x > (e.pageX/document.documentElement.clientWidth)*100){
      crackPoints.push(`${e.pageX}px ${e.pageY}px`);
      console.log(`${e.pageX}px ${e.pageY}px`);
      caughtClick = true;
    }
    const point = `${x}%  ${y}px`;

    crackPoints.push(point);
  }
  const pointsString = crackPoints.join(', ')

  console.log(pointsString);

  $('.main-page').style.setProperty('clip-path', `polygon(0 0, ${pointsString}, 100% 0)`);
  $('.shadow-page').style.setProperty('clip-path', `polygon(0 100%, ${pointsString}, 100% 100%)`);

  const pages = $('.page');
  pages.forEach(element => {
    element.classList.add('cracked');
    element.classList.remove('healed');
  });

  const pageCovers = $('.page.cracked .page-cover');
  pageCovers.forEach(element => {
    element.addEventListener('mousedown', healPage);
    //Has to be mousedown because click will fire this on release
  });
}

function $(query) {
  const nodeList = document.querySelectorAll(query);
  return (nodeList.length === 1) ? nodeList[0] : nodeList;
}