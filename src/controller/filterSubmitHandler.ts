import { Cart, Category, ProductDraft } from '@commercetools/platform-sdk';
import { filterByParams, getCategoryByKey } from '../model/api/apiRoot';
import cardsBlock, { createCard } from '../view/pages/catalog/cards';
import filters from '../view/pages/catalog/filters';
import { searchFilterBlock } from '../view/pages/catalog/items';
import { getLimit, getOffset, updatePaginator } from './paginatorHandlers';
import { tuneWithCart } from './catalogBasketHandlers';
import { getActiveCart } from '../model/api/cartApiRoot';

let basket: Cart;

export const getCategory = async (): Promise<string> => {
  const { search } = window.location;
  if (!search) return '';
  const categoryKey = search.slice(search.indexOf('=') + 1);
  let filter: string;
  const categoryID: Category = (await getCategoryByKey(categoryKey)).body.id;
  if (categoryKey.length === 2) {
    filter = `categories.id:"${categoryID}"`;
  } else {
    filter = `categories.id: subtree("${categoryID}")`;
  }
  return filter;
};

const getSortOrder = () => {
  const data = new FormData(filters);
  const sortOrder = data.get('sorting');
  return `${sortOrder}`;
};

const getFilterData = () => {
  const data = new FormData(filters);
  const filterOptions: string[] = [];

  const enumAttributes = [
    'attr-type',
    'attr-brand',
    'attr-colour',
    'attr-drive',
    'attr-brake',
  ];
  enumAttributes.forEach((attr) => {
    const values = data.getAll(attr);
    if (values.length) {
      const attrFilter = `variants.attributes.${attr}.key:${values
        .map((el) => `"${el}"`)
        .join(',')}`;
      filterOptions.push(attrFilter);
    }
  });

  const rangeAttributes = [
    'price',
    'attr-year',
    'attr-power',
    'attr-weight',
    'attr-dsp',
  ];
  rangeAttributes.forEach((attr) => {
    let startValue = data.get(`${attr}From`);
    let endValue = data.get(`${attr}To`);
    if (startValue || endValue) {
      startValue = startValue || '*';
      endValue = endValue || '*';
      let attrFilter: string;
      if (attr !== 'price') {
        attrFilter = `variants.attributes.${attr}:range (${startValue} to ${endValue})`;
      } else {
        const centPerEuro = 100;
        const start = startValue === '*' ? '*' : +startValue * centPerEuro;
        const end = endValue === '*' ? '*' : +endValue * centPerEuro;
        attrFilter = `variants.${attr}.centAmount:range (${start} to ${end})`;
      }
      filterOptions.push(attrFilter);
    }
  });

  return filterOptions;
};

export const placeCards = (cards: ProductDraft[]) => {
  cardsBlock.innerHTML = '';
  if (cards.length === 0) return;
  cards.forEach((card) => {
    let createdCard;
    const name = card.name.en;

    const attributes = card.masterVariant?.attributes;
    function getAttribute(attribute: string): string | number {
      let attrValue = attributes?.find((el) => el.name === `attr-${attribute}`)
        ?.value;
      if (attribute === 'type') {
        attrValue = attrValue.label;
      }
      if (!attrValue) attrValue = '';
      return attrValue;
    }

    function configureDescription(
      year: string | number,
      type: string | number,
      displacement: string | number,
      power: string | number,
      weight: string | number,
    ): string[] {
      const yearStr = year !== '' ? year.toString() : '{{year}}';
      const typeStr = type !== '' ? type.toString() : '{{type}}';
      const displacementStr =
        displacement !== '' ? displacement.toString().concat(' cc') : '{{cc}}';
      const powerStr = power !== '' ? power.toString().concat(' hp') : '{{hp}}';
      const weightStr =
        weight !== '' ? weight.toString().concat(' kg') : '{{kg}}';

      const firstLine = [yearStr, typeStr].join(', ');
      const secondLine = [displacementStr, powerStr, weightStr].join(', ');

      const returnArr = [firstLine, secondLine];

      return returnArr;
    }

    const description = configureDescription(
      getAttribute('year'),
      getAttribute('type'),
      getAttribute('dsp'),
      getAttribute('power'),
      getAttribute('weight'),
    );
    let img = '';
    let price = '000';
    const centPerEuro = 100;
    const sku = card.masterVariant?.sku || '';
    if (card.masterVariant && card.masterVariant.images)
      img = card.masterVariant.images[0].url;
    if (
      card.masterVariant &&
      card.masterVariant.prices &&
      card.masterVariant.prices.length
    ) {
      if (
        card.masterVariant.prices[0].discounted &&
        card.masterVariant.prices[0].discounted.value.centAmount
      ) {
        price = `${
          card.masterVariant.prices[0].discounted.value.centAmount / centPerEuro
        }`;
        const basePrice =
          (card.masterVariant.prices[0].value.centAmount || 1) / centPerEuro;

        createdCard = createCard(
          sku,
          name,
          img,
          description,
          `${basePrice}`,
          price,
        );
      } else {
        const centPrice = card.masterVariant.prices[0].value.centAmount || 100;
        price = `${centPrice / centPerEuro}`;
        createdCard = createCard(sku, name, img, description, price);
      }
      createdCard.onclick = () => {
        window.routeLocation = `/product?sku=${sku}`;
      };
      tuneWithCart(createdCard.querySelector('button')!, basket);
    }
  });
};

export const filterSubmit = async (e: Event) => {
  try {
    e.preventDefault();
  } catch {
    /* empty */
  }
  basket = (await getActiveCart()).body;
  const filterOptions = getFilterData();
  const sortOptions = getSortOrder();
  const category = await getCategory();
  const limit = getLimit();
  const offset = getOffset();
  if (category) {
    filterOptions.push(category);
  }
  try {
    const resp = await filterByParams(
      filterOptions,
      [sortOptions],
      offset,
      limit,
    );
    const cards = resp.body.results as ProductDraft[];
    updatePaginator(resp.body);
    placeCards(cards);
  } catch (error) {
    console.error(error);
  }
};

filters.addEventListener('submit', filterSubmit);
searchFilterBlock.addEventListener('change', filterSubmit);
