window.onload = init;

//create clip path polygon with js

const healDuration = 1050;
const crackDuration = 1000;

const crackSlope = 10;

function init() {
  const buttons = $('.button');
  buttons.forEach(element => {
    element.addEventListener('click', crackPage);
  });
  const pageHeight = $('.main-page').offsetHeight;
  $('.the-wrapper').style.setProperty('height', pageHeight+'px');
}

function healPage() {
  //Remove cracked class
  const pages = $('.page')
  pages.forEach(element => {
    element.classList.remove('cracked');
  });
  $('.shadow-page').style.setProperty('top', '0');

  //Remove page-cover click event
  const pageCovers = $('.page-cover');
  pageCovers.forEach(element => {
    element.removeEventListener('mousedown', healPage);
  });

  const pageHeight = $('.main-page').offsetHeight;
  $('.the-wrapper').style.setProperty('height', pageHeight+'px');


  //Add healed class after animation duration
  //  If you click before crack animation complete, you have to wait a while to click another button
  setTimeout(() => {
    pages.forEach(element => {
      element.style.setProperty('clip-path', 'polygon(0 0, 0 100%, 100% 100%, 100% 0');
      element.classList.add('healed');
    });
    $('.shadow-section.showing').classList?.remove('showing');
  }, healDuration);
}

function crackPage(e) {
  const root = document.documentElement;
  console.log(e);
  // root.style.setProperty('--break-y', e.pageY + "px");
  const crackPoints = [];
  const zigCount = 11;
  const maxDeviation = 70;
  const minDeviation = 40;
  const zigLength = ((100 / (zigCount-1)));
  const pageXPct = (e.pageX / document.documentElement.clientWidth) * 100;

  for (let i = 0; i < zigCount; i++) {
    let x = zigLength * i;
    let offsetSign = 1;
    if(i % 2 === 0){
      offsetSign = -1;
    }
    let y = e.pageY + offsetSign * (Math.floor(Math.random() * (maxDeviation - minDeviation) + minDeviation - maxDeviation/2));
    if (Math.abs(pageXPct - x) < zigLength/2){
      // overwrite closest zig point to cursor position
      console.log(Math.abs(pageXPct - x), zigLength, i);
      x = pageXPct;
      y = e.pageY;
    }
    // if (!caughtClick && x > (e.pageX/document.documentElement.clientWidth)*100){
    //   crackPoints.push(`${e.pageX}px ${e.pageY}px`);
    //   console.log(`${e.pageX}px ${e.pageY}px`);
    //   caughtClick = true;
    // }
    const point = `${x}%  ${y}px`;

    crackPoints.push(point);
  }
  const pointsString = crackPoints.join(', ')

  console.log(pointsString);

  const shadowSectionClass = e.target.closest('.section').getAttribute('data-shadow-section');
  const shadowSection = $(`.${shadowSectionClass}`);
  showShadowSection(shadowSection, e.pageY);

  const pageHeight = $('.main-page').offsetHeight;
  const shadowSectionHeight = shadowSection.offsetHeight;
  // const shadowSectionHeight = 500;

  console.log(shadowSectionHeight);
  $('.shadow-page').style.setProperty('top', (shadowSectionHeight - maxDeviation)+'px');

  $('.the-wrapper').style.setProperty('height', (pageHeight + shadowSectionHeight - maxDeviation)+'px');

  $('.main-page').style.setProperty('clip-path', `polygon(0 0, ${pointsString}, 100% 0)`);
  $('.shadow-page').style.setProperty('clip-path', `polygon(0 100%, ${pointsString}, 100% 100%)`);
  $('.page-drop-shadow-wrapper').style.setProperty('clip-path', `polygon(0 0, ${pointsString}, 100% 0)`);
  $('.page-drop-shadow').style.setProperty('clip-path', `polygon(0 0, ${pointsString}, 100% 0)`);

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

function showShadowSection(section, ey) {
  if(!section.style){
    return;
  }

  section.classList.add('showing');
  section.style.setProperty('top', `${ey - 30}px`);
}

function $(query) {
  const nodeList = document.querySelectorAll(query);
  return (nodeList.length === 1) ? nodeList[0] : nodeList;
}