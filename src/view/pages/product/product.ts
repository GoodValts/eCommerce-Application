const name = document.createElement('h2');
name.className = 'product__name';

const priceCont = document.createElement('div');
priceCont.className = 'product__price';

const discountCont = document.createElement('div');
discountCont.className = 'price__base-block';

const basePrice = document.createElement('div');
basePrice.classList.add('price__base');

const discount = document.createElement('div');
discount.classList.add('price__discont');

const currentPrice = document.createElement('div');
currentPrice.className = 'price__curent';

discountCont.append(basePrice, discount);
priceCont.append(currentPrice, discountCont);

const imgSlider = document.createElement('div');
imgSlider.className = 'product__image';

const imgCont = document.createElement('div');
imgCont.className = 'image__image-block';

const img = document.createElement('img');
img.className = 'image-block__picture';
imgCont.append(img);

const sliderControls = document.createElement('div');
sliderControls.className = 'image__controls';

imgSlider.append(imgCont, sliderControls);

const variants = document.createElement('div');
variants.className = 'product__variants';
variants.textContent = 'Variants:';

const variantsBlock = document.createElement('div');
variantsBlock.className = 'variants__variants-block';

variants.append(variantsBlock);

const buttonBlock = document.createElement('div');
buttonBlock.classList.add('product__buttons');

const addBasketButton = document.createElement('button');
buttonBlock.append(addBasketButton);

const description = document.createElement('div');
description.className = 'product__description-block';

const features = document.createElement('div');
features.className = 'product__features';

const featureHeading = document.createElement('h4');
featureHeading.textContent = 'Features:';
featureHeading.className = 'features__header';
features.append(featureHeading);

const productPage = document.createElement('div');
productPage.className = 'product-page';
productPage.append(
  name,
  priceCont,
  imgSlider,
  variants,
  buttonBlock,
  description,
  features,
);

export default productPage;

export {
  name,
  priceCont,
  currentPrice,
  basePrice,
  discount,
  imgSlider,
  imgCont,
  img,
  sliderControls,
  variantsBlock,
  description,
  features,
  addBasketButton,
};
