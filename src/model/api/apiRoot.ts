import {
  Customer,
  CustomerDraft,
  CustomerUpdateAction,
  CustomerChangePassword,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ctpClient } from '../../lib/BuildClient';
import { vrfClient } from '../../lib/ConstructClient';

const customerId = undefined;
const client = customerId ? vrfClient : ctpClient;
const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: 'ddt-e-commerce-rss-app',
});

export const getCustomerById = (id: string) => {
  try {
    if (!id) return false;
    return apiRoot
      .customers()
      .withId({ ID: id })
      .get()
      .execute()
      .then((obj) => obj)
      .catch((err) => err);
  } catch {
    return false;
  }
};

export const changeCustomerPassword = (customer: CustomerChangePassword) => {
  try {
    return apiRoot
      .customers()
      .password()
      .post({
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: customer.id,
          version: customer.version,
          currentPassword: customer.currentPassword,
          newPassword: customer.newPassword,
        },
      })
      .execute()
      .then((arg) => arg)
      .catch((err) => err);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateCustomerData = (
  customer: Customer,
  data: CustomerUpdateAction[],
) => {
  try {
    return apiRoot
      .customers()
      .withId({ ID: customer.id })
      .post({
        headers: { 'Content-Type': 'application/json' },
        body: {
          version: customer.version,
          actions: data,
        },
      })
      .execute()
      .then((arg) => arg)
      .catch((err) => err);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const viewCustomers = () =>
  apiRoot
    .customers()
    .get({
      headers: { 'Content-Type': 'application/json' },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const createCustomer = (createCustomerRequest: CustomerDraft) =>
  apiRoot
    .customers()
    .post({
      body: createCustomerRequest,
      headers: { 'Content-Type': 'application/json' },
    })
    .execute()
    .then((arg) => arg)
    .catch((err) => err);

export const loginCustomer = (userEmail: string, userPassword: string) =>
  apiRoot
    .me()
    .login()
    .post({
      body: {
        email: userEmail,
        password: userPassword,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
        updateProductData: true,
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const getProductsBySearchField = (searchValue: string) =>
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'text.en': searchValue,
        fuzzy: true,
      },
    })
    .execute()
    .then((obj) => obj.body.results)
    .catch((err) => err);

export const getProductByID = (productID: string) =>
  apiRoot
    .products()
    .withId({ ID: productID })
    .get()
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const getProductByKey = (productKey: string) =>
  apiRoot
    .products()
    .withKey({ key: productKey })
    .get()
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const getProductBySKU = (SKU: string) =>
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [`variants.sku:"${SKU}"`],
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const sortByParam = (param: string, order: string, limit: number) =>
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        sort: [`${param} ${order}`],
        limit,
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const filterByParams = (
  filterOptions: string[],
  sort?: string[],
  offset = 0,
  limit = 100,
) =>
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: filterOptions,
        sort,
        offset,
        limit,
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const getCategories = () =>
  apiRoot
    .categories()
    .get()
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const getCategoryById = (id: string) => {
  try {
    return apiRoot
      .categories()
      .withId({ ID: id })
      .get()
      .execute()
      .then((obj) => obj)
      .catch((err) => err);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCategoryByKey = (key: string) => {
  try {
    return apiRoot
      .categories()
      .withKey({ key })
      .get()
      .execute()
      .then((obj) => obj)
      .catch((err) => err);
  } catch (error) {
    console.error(error);
    return false;
  }
};
