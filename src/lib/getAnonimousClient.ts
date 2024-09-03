import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';

const anonimousOptions: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ddt-e-commerce-rss-app',
  credentials: {
    clientId: 'jXCk5T3Iq7MthDDBz6mXxnOI',
    clientSecret: 'x75YTPwT0WPn3ZS6Ythl5f3uUPF50Cdl',
  },
  tokenCache: {
    get: (): TokenStore => {
      const obj = JSON.parse(localStorage.getItem('cartAnonToken') as string);
      return obj;
    },
    set: (obj: TokenStore) => {
      localStorage.setItem('cartAnonToken', JSON.stringify(obj));
    },
  },
  scopes: [
    'manage_project:ddt-e-commerce-rss-app view_audit_log:ddt-e-commerce-rss-app manage_api_clients:ddt-e-commerce-rss-app',
  ],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export const anonCartClient = new ClientBuilder()
  .withAnonymousSessionFlow(anonimousOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
