import logo from '../../assets/images/header-logo.png';
import mainLogo from '../../assets/images/icons/main-2.png';
import basketLogo from '../../assets/images/icons/basket.png';
import catalogLogo from '../../assets/images/icons/catalog.png';
import aboutUsLogo from '../../assets/images/icons/about.png';
import signInLogo from '../../assets/images/icons/register.png';
import logInLogo from '../../assets/images/icons/login.png';
import profileLogo from '../../assets/images/icons/profile.png';
import logOutLogo from '../../assets/images/icons/logout.png';

import '../../assets/styles/footer.scss';
import { NavObjType } from '../../types/type';

const header = document.createElement('header');
header.classList.add('header');

const headerContainer = document.createElement('div');
headerContainer.classList.add('header__container');
header.append(headerContainer);

const headerLogo = document.createElement('div');
headerLogo.classList.add('header__logo');

export const logoImg = document.createElement('img');
logoImg.classList.add('logo__image');
logoImg.src = logo;
logoImg.alt = 'DreamMoto logo';

const logoText = document.createElement('h1');
logoText.classList.add('logo__text');

headerLogo.append(logoImg, logoText);

const nav = document.createElement('nav');
nav.classList.add('header__nav');

const navContainer = document.createElement('div');
navContainer.classList.add('header__nav-container');
nav.append(navContainer);

const navObj: NavObjType = {
  'main-page': {
    text: 'Main page',
    routing: '/',
    src: mainLogo,
  },
  products: {
    text: 'Products',
    routing: '/catalog',
    src: catalogLogo,
  },
  basket: {
    text: 'Basket',
    routing: '/basket',
    src: basketLogo,
  },
  about: {
    text: 'About us',
    routing: '/about',
    src: aboutUsLogo,
  },
  sigin: {
    text: 'Sign in',
    routing: '/registration',
    src: signInLogo,
  },
  login: {
    text: 'Log in',
    routing: '/login',
    src: logInLogo,
  },
  profile: {
    text: 'Profile',
    routing: '/profile',
    src: profileLogo,
  },
  logout: {
    text: 'Log out',
    routing: '/login',
    src: logOutLogo,
  },
};

Object.entries(navObj).forEach(([key, value]) => {
  const el = document.createElement('div');
  el.classList.add('nav__item');
  el.id = key;
  el.onclick = () => {
    window.routeLocation = value.routing;
  };

  const elText = document.createElement('p');
  elText.classList.add('nav__item-text');
  elText.textContent = value.text;

  const elIcon = document.createElement('img');
  elIcon.classList.add('nav__item-icon');
  elIcon.src = value.src;

  if (el.id === 'basket') {
    const numberOfItems = document.createElement('p');
    numberOfItems.classList.add('nav__number-of-items');
    numberOfItems.textContent = '1';
    numberOfItems.id = 'basket-header-number';
    numberOfItems.classList.add('hidden');
    el.append(numberOfItems);
  }

  el.append(elIcon, elText);

  navObj[key].obj = el;
  navContainer.append(el);
});

const changeRegStatus = () => {
  const arr = ['sigin', 'login', 'profile', 'logout'];
  arr.forEach((el) => {
    const element = document.getElementById(el);
    element?.classList.toggle('hidden');
  });
};

const burger = document.createElement('div');
burger.classList.add('header__burger');

for (let i = 0; i < 4; i += 1) {
  const span = document.createElement('span');
  span.classList.add('burger__span');
  burger.append(span);
}

headerContainer.append(headerLogo, nav, burger);

const clickBurger = (): void => {
  nav.classList.toggle('header__nav_visable');

  burger.children[0].classList.toggle('hidden');
  burger.children[1].classList.toggle('rotated');
  burger.children[2].classList.toggle('rotated-reverse');
  burger.children[3].classList.toggle('hidden');
};

burger.addEventListener('click', clickBurger);
navContainer.childNodes.forEach((el) =>
  el.addEventListener('click', () => {
    if (nav.classList.contains('header__nav_visable')) clickBurger();
  }),
);

export { header, changeRegStatus, navObj };
