import '../../../assets/styles/pages/basket.scss';
import emptyImg from '../../../assets/images/empty-cart.png';

const basketPage = document.createElement('div');
basketPage.classList.add('basket-page');

const emptyContainer = document.createElement('div');
emptyContainer.classList.add('basket__empty');
emptyContainer.hidden = true;

const emptyHeader = document.createElement('h2');
emptyHeader.classList.add('empty__header');
emptyHeader.textContent = 'Warning! The cart is empty!';

const emptyImage = document.createElement('img');
emptyImage.classList.add('empty__image');
emptyImage.src = emptyImg;

emptyContainer.append(emptyHeader, emptyImage);

function appendText(str: string): void {
  const emptyMessage = document.createElement('p');
  emptyMessage.classList.add('empty__message');
  emptyMessage.textContent = str;

  emptyContainer.append(emptyMessage);
}

const emptyTextArr = [
  'Your cart is currently craving for some high-octane action!',
  'Discover our lineup of motorcycles and start add your dream to the cart.',
  "Let's hit the road and make every ride unforgettable!",
];

emptyTextArr.forEach((el) => appendText(el));

const emptyButton = document.createElement('a');
emptyButton.classList.add('empty__button');
emptyButton.href = '/catalog';
emptyButton.textContent = 'Choose your bike now!';

emptyContainer.append(emptyButton);

const basketContainer = document.createElement('div');
basketContainer.classList.add('basket__basket-container');
basketContainer.hidden = true;

const basketHeader = document.createElement('h2');
basketHeader.classList.add('basket__header');
basketHeader.textContent = 'Products in cart:';

const itemsBlock = document.createElement('div');
itemsBlock.classList.add('basket-container__items');

export const promoBlock = document.createElement('div');
promoBlock.classList.add('basket-container__promo');

const input = document.createElement('input');
input.classList.add('promo-block__input');
input.type = 'text';
input.placeholder = 'Type a promocode here';

const promoButton = document.createElement('button');
promoButton.classList.add('promo-block__button');
promoButton.textContent = 'Apply';

promoBlock.append(input, promoButton);

const priceBlock = document.createElement('div');
priceBlock.classList.add('basket-container__price');

const priceBlockText = document.createElement('p');
priceBlockText.classList.add('price__text');
priceBlockText.textContent = 'Total: ';

const totalCartPrice = document.createElement('p');
totalCartPrice.classList.add('price__total');

priceBlock.append(priceBlockText, totalCartPrice);

const deleteBlock = document.createElement('div');
deleteBlock.classList.add('basket-container__delete');

const deleteAllButton = document.createElement('button');
deleteAllButton.classList.add('delete-block__delete-button');
deleteAllButton.textContent = 'Clear cart';

const confirmButton = document.createElement('button');
confirmButton.classList.add('delete-block__confirm-button');
confirmButton.textContent = 'Confirm';
confirmButton.style.display = 'none';

const returnButton = document.createElement('button');
returnButton.classList.add('delete-block__return-button');
returnButton.textContent = 'Return';
returnButton.style.display = 'none';

const confirmMessage = document.createElement('p');
confirmMessage.classList.add('delete-block__confirm-message');
confirmMessage.textContent =
  'Are you sure you want to delete all items from your cart? This action cannot be undone';
confirmMessage.hidden = true;
deleteBlock.append(
  deleteAllButton,
  confirmMessage,
  returnButton,
  confirmButton,
);

basketContainer.append(
  basketHeader,
  itemsBlock,
  promoBlock,
  priceBlock,
  deleteBlock,
);

basketPage.append(emptyContainer, basketContainer);

export default basketPage;

export {
  basketContainer,
  emptyContainer,
  itemsBlock,
  totalCartPrice,
  confirmButton,
  deleteAllButton,
  returnButton,
  confirmMessage,
};
