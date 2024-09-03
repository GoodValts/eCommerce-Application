import { LineItem, MyCartUpdateAction } from '@commercetools/platform-sdk';
import {
  changeBasketItemAmount,
  getActiveCart,
  removeListFromCart,
} from '../model/api/cartApiRoot';
import {
  basketContainer,
  confirmButton,
  confirmMessage,
  deleteAllButton,
  emptyContainer,
  itemsBlock,
  returnButton,
  totalCartPrice,
} from '../view/pages/basket/basket';

const centsPerEuro = 100;

export const changeItemAmount = async (e: Event) => {
  const button = e.target as HTMLElement;

  const itemCont = button.closest('.items__item');

  const quantityElem = itemCont?.querySelector('.amount__current');
  const quantity = quantityElem?.textContent;
  let updatedQuantity = 0;
  if (button.textContent === '+') {
    updatedQuantity = Number(quantity) + 1;
  }
  if (button.textContent === '-') {
    updatedQuantity = Number(quantity) - 1;
  }
  const cart = await getActiveCart();
  const { id, version } = cart.body;
  const lineItemId = itemCont?.id || '';
  const actualCart = await changeBasketItemAmount(
    id,
    version,
    lineItemId,
    updatedQuantity,
  );
  if (!actualCart.body.lineItems.length) {
    basketContainer.hidden = true;
    emptyContainer.hidden = false;
    return;
  }

  if (updatedQuantity === 0) {
    itemCont?.remove();
  } else {
    const currentItem = actualCart.body.lineItems.find(
      (el) => el.id === lineItemId,
    ) as LineItem;
    quantityElem!.textContent = `${currentItem?.quantity}`;
    const totalPriceElem = itemCont?.querySelector('.item__total-price');
    totalPriceElem!.textContent = `${
      currentItem.totalPrice.centAmount / centsPerEuro
    } €`;
  }

  totalCartPrice.textContent = `${
    actualCart.body.totalPrice.centAmount / centsPerEuro
  } €`;
};

const clearCart = async () => {
  const cart = await getActiveCart();
  const { id, version, lineItems } = cart.body;

  const removeOpt: MyCartUpdateAction[] = lineItems.map((item) => ({
    action: 'removeLineItem',
    lineItemId: item.id,
  }));
  try {
    await removeListFromCart(id, version, removeOpt);
    itemsBlock.innerHTML = '';
    basketContainer.hidden = true;
    emptyContainer.hidden = false;
  } catch (error) {
    console.error(error);
  }
};
confirmButton.addEventListener('click', clearCart);

const showConfirmMessage = () => {
  confirmButton.style.display = 'flex';
  returnButton.style.display = 'flex';
  confirmMessage.hidden = false;
  deleteAllButton.style.display = 'none';
};

deleteAllButton.addEventListener('click', showConfirmMessage);

export const hideConfirmMessage = () => {
  confirmButton.style.display = 'none';
  returnButton.style.display = 'none';
  confirmMessage.hidden = true;
  deleteAllButton.style.display = 'flex';
};

returnButton.addEventListener('click', hideConfirmMessage);
