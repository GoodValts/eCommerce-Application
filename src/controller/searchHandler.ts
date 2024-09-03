import { getProductsBySearchField } from '../model/api/apiRoot';
import filters from '../view/pages/catalog/filters';
import { searchInput } from '../view/pages/catalog/items';
import { placeCards } from './filterSubmitHandler';

const searchHandler = async () => {
  const searchValue = searchInput.value;
  filters.reset();
  try {
    const cardsData = await getProductsBySearchField(searchValue.toLowerCase());
    placeCards(cardsData);
  } catch (err) {
    console.error(err);
  }
};

searchInput.addEventListener('input', searchHandler);
