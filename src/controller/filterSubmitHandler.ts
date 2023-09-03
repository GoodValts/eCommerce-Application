import { ProductDraft } from '@commercetools/platform-sdk';
import { filterByParams } from '../model/api/apiRoot';
import cardsBlock, { createCard } from '../view/pages/catalog/cards';
import filters from '../view/pages/catalog/filters';
import { fillProductPage } from './fillProductPage';

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
        attrFilter = `variants.${attr}.centAmount:range (${
          +startValue * centPerEuro
        } to ${+endValue * centPerEuro})`;
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
    const description = card.description
      ? `${card.description.en.slice(0, 51)}...`
      : 'description';
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
        const discount = (1 - +price / basePrice).toFixed(2);
        console.log(discount);
        createdCard = createCard(
          name,
          img,
          description,
          `${basePrice}`,
          +discount,
        );
      } else {
        const centPrice = card.masterVariant.prices[0].value.centAmount || 100;
        price = `${centPrice / centPerEuro}`;
        createdCard = createCard(name, img, description, price);
      }
      createdCard.addEventListener('click', () => {
        window.routeLocation = `/product?sku=${sku}`;
        fillProductPage(sku);
      });
    }
  });
};

const filterSubmit = async (e: Event) => {
  e.preventDefault();
  const filterOptions = getFilterData();
  try {
    const resp = await filterByParams(filterOptions);
    const cards = resp.body.results as ProductDraft[];
    placeCards(cards);
  } catch (error) {
    console.log(error);
  }
};

filters.addEventListener('submit', filterSubmit);
