import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ddt-e-commerce-rss-app',
  credentials: {
    clientId: 'jXCk5T3Iq7MthDDBz6mXxnOI',
    clientSecret: 'x75YTPwT0WPn3ZS6Ythl5f3uUPF50Cdl',
  },
  scopes: [
    'manage_project:ddt-e-commerce-rss-app view_audit_log:ddt-e-commerce-rss-app manage_api_clients:ddt-e-commerce-rss-app',
  ],
  fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
