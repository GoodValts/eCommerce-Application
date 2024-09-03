const footer = document.createElement('footer');
footer.classList.add('footer');

const footerContainer = document.createElement('div');
footerContainer.classList.add('footer__container');

const teamBlock = document.createElement('div');
teamBlock.classList.add('footer__team');

const teamLink = document.createElement('a');
teamLink.classList.add('footer__team-link');
teamLink.innerHTML = 'Designed by <b>Dev Dream Team</b>';
teamLink.href =
  'https://github.com/Greys73/eCommerce-Application/blob/develop/README.md#team';

teamBlock.append(teamLink);

const rssBlock = document.createElement('div');
rssBlock.classList.add('footer__rss');

const rssLink = document.createElement('a');
rssLink.href = 'https://rs.school/js/';

const rssLogo = document.createElement('img');
rssLogo.classList.add('rss__logo');
rssLogo.alt = 'RSS Logo';
rssLogo.src =
  'https://raw.githubusercontent.com/GoodValts/rsschool-cv/gh-pages/assets/img/rsschool.png';

rssLink.append(rssLogo);
rssBlock.append(rssLink);

const yearBlock = document.createElement('div');
yearBlock.classList.add('footer__year');
yearBlock.textContent = '2023 ©';

footerContainer.append(teamBlock, rssBlock, yearBlock);
footer.append(footerContainer);

export default footer;
