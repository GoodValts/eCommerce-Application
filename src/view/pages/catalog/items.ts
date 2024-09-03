import firstPageIcon from '../../../assets/images/icons/first-page.png';
import prevPageIcon from '../../../assets/images/icons/prev-page.png';
import nextPageIcon from '../../../assets/images/icons/next-page.png';
import lastPageIcon from '../../../assets/images/icons/last-page.png';

import cardsBlock from './cards';

const items = document.createElement('div');
items.classList.add('catalog__items');

const routingBlock = document.createElement('div');
routingBlock.classList.add('items__routing');

const catalogName = document.createElement('a');
catalogName.classList.add('routing__text');
catalogName.textContent = 'Catalog';
catalogName.href = '/catalog';

export const categoryName = document.createElement('a');
categoryName.classList.add('routing__text');
categoryName.textContent = '';

export const subCategoryName = document.createElement('a');
subCategoryName.classList.add('routing__text');
subCategoryName.textContent = '';

routingBlock.append(catalogName, categoryName, subCategoryName);

const searchingBlock = document.createElement('div');
searchingBlock.classList.add('items__search');

export const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.classList.add('search__search-field');
searchInput.placeholder = 'Search';

export const searchFilterBlock = document.createElement('select');
searchFilterBlock.classList.add('search__filter-block');
searchFilterBlock.name = 'sorting';
searchFilterBlock.setAttribute('form', 'filters');

const searchFilterSort = document.createElement('option');
searchFilterSort.classList.add('search__filter');
searchFilterSort.textContent = 'Sort';
searchFilterSort.selected = true;
searchFilterSort.value = '';

const searchFilterNameASC = document.createElement('option');
searchFilterNameASC.classList.add('search__filter');
searchFilterNameASC.textContent = 'Sort by Name: A-Z';
searchFilterNameASC.value = 'name.en asc';

const searchFilterNameDESC = document.createElement('option');
searchFilterNameDESC.classList.add('search__filter');
searchFilterNameDESC.textContent = 'Sort by Name: Z-A';
searchFilterNameDESC.value = 'name.en desc';

const searchFiltePriceASC = document.createElement('option');
searchFiltePriceASC.classList.add('search__filter');
searchFiltePriceASC.textContent = 'Sort by Lowest Price';
searchFiltePriceASC.value = 'price asc';

const searchFiltePriceDESC = document.createElement('option');
searchFiltePriceDESC.classList.add('search__filter');
searchFiltePriceDESC.textContent = 'Sort by Highest Price';
searchFiltePriceDESC.value = 'price desc';

searchFilterBlock.append(
  searchFilterSort,
  searchFilterNameASC,
  searchFilterNameDESC,
  searchFiltePriceASC,
  searchFiltePriceDESC,
);

export const paginationBlock = document.createElement('select');
paginationBlock.classList.add('search__pagination-block');

const pagination5 = document.createElement('option');
pagination5.classList.add('search__filter');
pagination5.textContent = '5 per page';
pagination5.selected = true;
pagination5.value = '5';

const pagination10 = document.createElement('option');
pagination10.classList.add('search__filter');
pagination10.textContent = '10 per page';
pagination10.value = '10';

const pagination20 = document.createElement('option');
pagination20.classList.add('search__filter');
pagination20.textContent = '20 per page';
pagination20.value = '20';

const pagination50 = document.createElement('option');
pagination50.classList.add('search__filter');
pagination50.textContent = '50 per page';
pagination50.value = '50';

paginationBlock.append(pagination5, pagination10, pagination20, pagination50);

searchingBlock.append(searchInput, paginationBlock, searchFilterBlock);

export const categoryBlock = document.createElement('div');
categoryBlock.classList.add('items__category');

const pageNumberBlock = document.createElement('div');
pageNumberBlock.classList.add('items__page-number');

function addImageToPageButtons(src: string): HTMLImageElement {
  const img = document.createElement('img');
  img.classList.add('page-number__button-image');
  img.src = src;

  return img;
}

export const deepPrevButton = document.createElement('button');
deepPrevButton.classList.add(
  'page-number__button',
  'page-number__button_unactive',
);
deepPrevButton.append(addImageToPageButtons(firstPageIcon));

export const prevButton = document.createElement('button');
prevButton.classList.add('page-number__button', 'page-number__button_unactive');
prevButton.append(addImageToPageButtons(prevPageIcon));

export const currentPage = document.createElement('p');
currentPage.classList.add(
  'page-number__button',
  'page-number__button_pagenumber',
);
currentPage.textContent = '5';

export const nextButton = document.createElement('button');
nextButton.classList.add('page-number__button');
nextButton.append(addImageToPageButtons(nextPageIcon));

export const deepNextButton = document.createElement('button');
deepNextButton.classList.add('page-number__button');
deepNextButton.append(addImageToPageButtons(lastPageIcon));

pageNumberBlock.append(
  deepPrevButton,
  prevButton,
  currentPage,
  nextButton,
  deepNextButton,
);

items.append(
  routingBlock,
  searchingBlock,
  categoryBlock,
  cardsBlock,
  pageNumberBlock,
);

export default items;
