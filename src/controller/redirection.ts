import { getLocalCustomer } from '../model/login';
import { URLOptions } from '../types/type';

type RedirectMapElement = {
  from: string;
  to: string;
  loginCondition: boolean;
};

const redirectionMap: RedirectMapElement[] = [
  {
    from: '/login',
    to: '/',
    loginCondition: true,
  },
  {
    from: '/registration',
    to: '/profile',
    loginCondition: true,
  },
  {
    from: '/profile',
    to: '/login',
    loginCondition: false,
  },
];

export function getSearch(href: Location): URLOptions {
  const params = new URLSearchParams(href.search);
  const options: URLOptions = {};

  if (params.get('sku')) options.sku = params.get('sku') || undefined;
  if (params.get('category'))
    options.category = params.get('category') || undefined;

  return options;
}

export function checkRedirection(location: string): boolean {
  let result = false;
  const customer = getLocalCustomer();
  const loginCondition = 'id' in customer;
  redirectionMap.forEach((element) => {
    if (
      element.from === location &&
      loginCondition === element.loginCondition
    ) {
      result = true;
      setTimeout(() => {
        window.routeLocation = element.to;
      }, 50);
    }
  });
  return result;
}
