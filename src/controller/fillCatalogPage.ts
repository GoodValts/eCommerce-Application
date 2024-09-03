import { Category } from '@commercetools/platform-sdk';
import { getCategories } from '../model/api/apiRoot';
import {
  categoryBlock,
  categoryName,
  subCategoryName,
} from '../view/pages/catalog/items';
import categoryLogoObj from '../model/data/images-src';

const fillNavMenu = (catList: Category[], key: string) => {
  const curCategory: Category = catList.find((el) => el.key === key)!;
  const parentID =
    'parent' in curCategory ? curCategory.parent!.id : curCategory.id;
  const parentCat: Category = catList.find((el) => el.id === parentID)!;
  if (curCategory.id !== parentCat.id) {
    categoryName.textContent = ` / ${parentCat.name.en}`;
    categoryName.href = `/catalog?category=${parentCat.key}`;
    subCategoryName.textContent = ` / ${curCategory.name.en}`;
    subCategoryName.style.breakBefore = ' / ';
    subCategoryName.href = `/catalog?category=${curCategory.key}`;
  } else {
    categoryName.textContent = ` / ${curCategory.name.en}`;
    categoryName.href = `/catalog?category=${curCategory.key}`;
  }
};

const setCategories = async (
  categoriesList: Category[],
  category?: HTMLElement,
  subCategory?: HTMLElement,
): Promise<Category[] | undefined> => {
  const categoryArr: Category[] = [];
  try {
    if (category && category.textContent) {
      if (!(subCategory && subCategory.textContent)) {
        await Promise.all(
          categoriesList
            .filter((el) => el.parent)
            .map(async (el) => {
              const parentRequest = categoriesList.find(
                (cat) => cat.id === el.parent!.id,
              )!;
              const categoryText = category.textContent
                ?.replace('/', '')
                .trim();
              if (parentRequest.name.en === categoryText) {
                categoryArr.push(el);
              }
              return categoryArr;
            }),
        );
      }
    } else {
      categoriesList
        .filter((el) => el.ancestors.length === 0)
        .forEach((el) => categoryArr.push(el));
    }
  } catch {
    return undefined;
  }

  return categoryArr;
};

export const fillMenu = async (key: string) => {
  categoryName.textContent = '';
  subCategoryName.textContent = '';
  const response = await getCategories();
  const catList: Category[] = response.body.results;
  if (key) {
    fillNavMenu(catList, key);
  }
  const categoryArr = await setCategories(
    catList,
    categoryName,
    subCategoryName,
  );
  categoryBlock.innerHTML = '';
  if (categoryArr) {
    categoryArr.forEach((el) => {
      const logo = document.createElement('img');
      logo.classList.add('category__logo');
      logo.src = categoryLogoObj[el.name.en];
      logo.alt = `${el.name.en}-logo`;
      logo.addEventListener('mouseup', () => {
        window.routeLocation = `/catalog?category=${el.key}`;
      });
      categoryBlock.append(logo);
    });
  }
};

export default setCategories;
