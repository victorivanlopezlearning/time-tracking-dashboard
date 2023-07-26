
let view = 'weekly';
let stats = [];

const trackingCards = document.querySelector('#trackingCards');
const links = document.querySelectorAll('.header__navegation-link');

const initApp = async () => {
  stats = await getStats();
  renderStats(stats);
}

const getStats = async () => {
  const response = await fetch('./data.json');
  return await response.json();
}

const renderStats = (stats) => {

  cleanHTML();

  stats.forEach(stat => {
    const { title, timeframes } = stat;
    const hours = timeframes[view].current;
    const previousStat = timeframes[view].previous;
    const titleCategory = title.toLowerCase().replace(' ', '-');

    trackingCards.innerHTML += `
        <div class="tracking__category ${titleCategory}">
        <div class="tracking__content-image">
          <img class="tracking__image" src="./images/icon-${titleCategory}.svg" alt="Icon ${title}">
        </div>
        <div class="tracking__content">
          <div class="tracking__info">
            <p class="tracking__name">${title}</p>
            <img class="tracking__ellipsis" src="./images/icon-ellipsis.svg" alt="Icon ellipsis">
          </div>
          <div class="tracking__time">
            <p class="tracking__hours">${hours}hrs</p>
            <p class="tracking__previous">Last ${currentPrevious()} - ${previousStat}hrs</p>
          </div>
        </div>
      </div>
    `;
  })
}

const cleanHTML = () => {
  while (trackingCards.firstChild) {
    trackingCards.removeChild(trackingCards.firstChild);
  };
};

const currentPrevious = () => {
  switch (view) {
    case 'daily':
      return 'day';
    case 'weekly':
      return 'week';
    case 'monthly':
      return 'month';
    default:
      throw new Error('Invalid view type');
  }
}

const changeView = (e) => {
  e.preventDefault();
  view = e.target.dataset.view;
  links.forEach((link) => {
    link.classList.remove('header__navegation-link--selected');
  });
  e.target.classList.add('header__navegation-link--selected');
  renderStats(stats);
}

document.addEventListener('DOMContentLoaded', initApp);
links.forEach((link) => link.addEventListener('click', changeView));