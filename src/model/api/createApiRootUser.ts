import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { httpMiddlewareOptions } from '../../lib/BuildClient';
import { passOptions } from '../../lib/ConstructClient';
import { anonCartClient } from '../../lib/getAnonimousClient';
import { getLocalCustomer } from '../login';

const apiRoots: Map<string, ByProjectKeyRequestBuilder> = new Map();

export const createUserAPIRoot = (
  mail?: string,
  pass?: string,
): ByProjectKeyRequestBuilder => {
  if (mail && pass) {
    const options = passOptions(mail, pass);
    const client = new ClientBuilder()
      .withPasswordFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
    const apiRootUser = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: 'ddt-e-commerce-rss-app',
    });
    apiRoots.set(mail, apiRootUser);
  }

  const customer = getLocalCustomer();
  const isCustomerLogged = Object.keys(customer).length;

  if (isCustomerLogged) {
    const { email } = customer;
    apiRoots.delete('anon');
    if (apiRoots.has(`${email}withToken`)) {
      const apiRootWithUserToken = apiRoots.get(
        `${email}withToken`,
      ) as ByProjectKeyRequestBuilder;
      return apiRootWithUserToken;
    }
    if (apiRoots.has(email)) {
      const apiRootPass = apiRoots.get(email) as ByProjectKeyRequestBuilder;
      apiRoots.delete(email);

      return apiRootPass;
    }
    const json = localStorage.getItem('customerToken') as string;
    const { token } = JSON.parse(json);
    const tokenOptions: ExistingTokenMiddlewareOptions = {
      force: true,
    };
    const clientWithToken = new ClientBuilder()
      .withExistingTokenFlow(`Bearer ${token}`, tokenOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();

    const apiRootWithToken = createApiBuilderFromCtpClient(
      clientWithToken,
    ).withProjectKey({
      projectKey: 'ddt-e-commerce-rss-app',
    });
    apiRoots.set(`${email}withToken`, apiRootWithToken);

    const apiRootWithUserToken = apiRoots.get(
      `${email}withToken`,
    ) as ByProjectKeyRequestBuilder;
    return apiRootWithUserToken;
  }
  if (apiRoots.has('anon')) {
    return apiRoots.get('anon') as ByProjectKeyRequestBuilder;
  }
  const apiRootUserAnonym = createApiBuilderFromCtpClient(
    anonCartClient,
  ).withProjectKey({
    projectKey: 'ddt-e-commerce-rss-app',
  });
  apiRoots.set('anon', apiRootUserAnonym);
  return apiRootUserAnonym;
};
