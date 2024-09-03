import { getPromoCodes } from '../model/api/promoApi';
import { fillPromoSection } from '../view/pages/main/main';

async function mainPageLoaded() {
  const location = window.location.pathname;
  if (location === '/') {
    const response = await getPromoCodes();
    if (response) fillPromoSection(response.body.results);
  }
}

window.addEventListener('PageContentLoaded', mainPageLoaded);
