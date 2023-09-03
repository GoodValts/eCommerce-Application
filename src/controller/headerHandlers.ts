import { getLoacalCustomer, setLoacalCustomer } from '../model/login';
import { NavObjType } from '../types/type';
import { logoImg, navObj } from '../view/header/header';

let menu: NavObjType = {};

function switchElements(_logined: boolean) {
  if (_logined) {
    menu.sigin.obj?.classList.add('hidden');
    menu.login.obj?.classList.add('hidden');
    menu.logout.obj?.classList.remove('hidden');
    menu.profile.obj?.classList.remove('hidden');
  } else {
    menu.logout.obj?.classList.add('hidden');
    menu.profile.obj?.classList.add('hidden');
    menu.sigin.obj?.classList.remove('hidden');
    menu.login.obj?.classList.remove('hidden');
  }
}

function navChanger(_menu: NavObjType) {
  if (_menu) menu = _menu;
  if (Object.keys(menu).length !== 0) {
    const customer = getLoacalCustomer();
    switchElements('id' in customer);
    menu.logout.obj?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      setLoacalCustomer({});
      switchElements(false);
      setTimeout(() => {
        window.routeLocation = (e.target as HTMLLinkElement).href;
      }, 50);
    });
  }
}

logoImg.addEventListener('load', () => {
  navChanger(navObj);
});
window.addEventListener('PageContentLoaded', () => {
  navChanger(navObj);
});
