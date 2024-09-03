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
  // create apiRoot with pass flow on login for this user and add it to cache
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
    // return apiRoot with token from cache for logged customer
    if (apiRoots.has(`${email}withToken`)) {
      const apiRootWithUserToken = apiRoots.get(
        `${email}withToken`,
      ) as ByProjectKeyRequestBuilder;
      // console.log('apiROOT with token from cache');
      return apiRootWithUserToken;
    }
    // return apiRoot with pass from cache for logged customer and delete it
    if (apiRoots.has(email)) {
      const apiRootPass = apiRoots.get(email) as ByProjectKeyRequestBuilder;
      apiRoots.delete(email);

      // console.log('apiROOT with pass');
      return apiRootPass;
    }
    // return new apiRoot with token and put it to cache,
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
    // console.log('apiROOT with token created ');
    return apiRootWithUserToken;
  }
  // return anonymous builder from cache
  if (apiRoots.has('anon')) {
    // ('apiROOT anonymous');
    return apiRoots.get('anon') as ByProjectKeyRequestBuilder;
  }
  // create anonymous builder
  const apiRootUserAnonym = createApiBuilderFromCtpClient(
    anonCartClient,
  ).withProjectKey({
    projectKey: 'ddt-e-commerce-rss-app',
  });
  apiRoots.set('anon', apiRootUserAnonym);
  return apiRootUserAnonym;
};
