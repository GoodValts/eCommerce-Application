import {
  addToCart,
  getActiveCart,
  removeFromCart,
} from '../model/api/cartApiRoot';
import { addBasketButton } from '../view/pages/product/product';
import { fillProductPage } from './fillProductPage';

async function pageLoaded(e: Event) {
  const location = window.location.pathname;
  const options = (e as CustomEvent).detail;
  if (location === '/product') {
    fillProductPage(options.sku);
  }
}

window.addEventListener('PageContentLoaded', pageLoaded);

// add / remove product from basket

const toggleBasket = async (action: 'add' | 'remove') => {
  const activeCart = await getActiveCart();
  const { id, version, lineItems } = activeCart.body;
  const sku = window.location.search.slice(5);
  if (action === 'add') {
    await addToCart(id, version, sku);
  }
  if (action === 'remove') {
    const lineItem = lineItems.find((item) => item.variant.sku === sku);
    const lineItemId = lineItem?.id || '';
    await removeFromCart(id, version, lineItemId);
  }
};
const addBasketButtonHandler = async () => {
  let action: 'add' | 'remove';
  if (addBasketButton.textContent === 'Add to basket') {
    addBasketButton.textContent = 'Remove from basket';
    addBasketButton.classList.remove('buttons__add-button');
    addBasketButton.classList.add('buttons__remove-button');
    action = 'add';
  } else {
    addBasketButton.textContent = 'Add to basket';
    addBasketButton.classList.remove('buttons__remove-button');
    addBasketButton.classList.add('buttons__add-button');
    action = 'remove';
  }
  try {
    await toggleBasket(action);
  } catch (error) {
    console.error(error);
  }
};

addBasketButton.addEventListener('click', addBasketButtonHandler);
