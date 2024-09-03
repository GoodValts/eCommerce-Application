import { showError } from '../../controller/application';
import { createUserAPIRoot } from './createApiRootUser';

export const getPromoCodes = async () => {
  try {
    const response = await createUserAPIRoot().discountCodes().get().execute();
    return response;
  } catch (err) {
    showError((err as Error).message);
    return undefined;
  }
};

export const setPromoToCart = async (
  ID: string,
  version: number,
  code: string,
) => {
  const response = await createUserAPIRoot()
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);
  return response;
};
