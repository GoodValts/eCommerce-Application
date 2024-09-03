import {
  ClientBuilder,
  TokenStore,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const obj = {
  username: 'testView@test.test',
  password: 'testView111',
};

export const passOptions = (
  username: string,
  password: string,
): PasswordAuthMiddlewareOptions => ({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ddt-e-commerce-rss-app',
  credentials: {
    clientId: 'jXCk5T3Iq7MthDDBz6mXxnOI',
    clientSecret: 'x75YTPwT0WPn3ZS6Ythl5f3uUPF50Cdl',
    user: {
      username,
      password,
    },
  },
  tokenCache: {
    get: (): TokenStore => {
      const object = JSON.parse(
        localStorage.getItem('customerToken') as string,
      );
      return object;
    },
    set: (object: TokenStore) => {
      localStorage.setItem('customerToken', JSON.stringify(object));
    },
  },
  scopes: [
    'manage_project:ddt-e-commerce-rss-app view_audit_log:ddt-e-commerce-rss-app manage_api_clients:ddt-e-commerce-rss-app',
  ],
  fetch,
});

export const vrfClient = new ClientBuilder()
  .withPasswordFlow(passOptions(obj.username, obj.password))
  .build();
