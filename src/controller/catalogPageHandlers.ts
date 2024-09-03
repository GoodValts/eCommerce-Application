import { activeIcon, icon } from '../view/pages/catalog/catalog';
import filters, { filtersBlock } from '../view/pages/catalog/filters';
import { showError } from './application';
import { fillMenu } from './fillCatalogPage';
import { filterSubmit } from './filterSubmitHandler';

/* eslint-disable no-param-reassign */
const toggleFilterBlock = (
  header: HTMLElement,
  container: HTMLElement,
): void => {
  const headerText = header?.textContent as string;
  if (container.classList.contains('hidden')) {
    header.textContent = headerText.slice(0, -1).concat('▵');
    container.classList.remove('hidden');
  } else {
    header.textContent = headerText.slice(0, -1).concat('▿');
    container.classList.add('hidden');
  }
};

export const showFilters = (filterBlock: HTMLElement): void => {
  filterBlock.classList.toggle('visable');
};

function addFilterBlockListeners() {
  filtersBlock.childNodes.forEach((el) => {
    const block = el as HTMLElement;
    const header: HTMLElement = block.querySelector('.filter__header')!;
    const container: HTMLElement = block.querySelector('div')!;
    header.onclick = () => toggleFilterBlock(header, container);
  });

  [icon, activeIcon].forEach((el) => {
    el.onclick = () => showFilters(filters);
  });
}

async function pageLoaded(e: Event) {
  const location = window.location.pathname;
  const options = (e as CustomEvent).detail;
  if (location === '/catalog') {
    try {
      await fillMenu(options.category);
      await filterSubmit(options.key);
    } catch (err) {
      showError((err as Error).message);
    } finally {
      addFilterBlockListeners();
    }
  }
}

window.addEventListener('PageContentLoaded', pageLoaded);
