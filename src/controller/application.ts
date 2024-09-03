import { getCustomerById } from '../model/api/apiRoot';
import { getLocalCustomer, setLocalCustomer } from '../model/login';
import { PromiseResponse } from '../types/type';
import errorMessage from '../view/components/errorMessage';
import resultMessage from '../view/components/resultMessage';

export async function showResultMessage(
  response: PromiseResponse,
  msg: string,
) {
  resultMessage.classList.remove('hidden');
  if (response.statusCode === 200) {
    resultMessage.firstChild!.textContent = msg;
  } else {
    resultMessage.firstChild!.textContent = response.message;
  }
  setTimeout(() => {
    resultMessage.firstChild!.textContent = '';
    resultMessage.classList.add('hidden');
  }, 3000);
  return response;
}

export async function showError(error: string) {
  errorMessage.classList.remove('hidden');
  errorMessage.firstChild!.textContent = error;
  setTimeout(() => {
    errorMessage.firstChild!.textContent = '';
    errorMessage.classList.add('hidden');
  }, 3000);
}

async function updateCustomer() {
  setTimeout(async () => {
    let customer = getLocalCustomer();
    if ('id' in customer) {
      const response = await getCustomerById(customer.id);
      if (response.statusCode === 200) {
        customer = response.body;
        setLocalCustomer(customer);
      } else {
        console.error('server error or User is undefined');
      }
    }
    // else window.routeLocation = '/login';
  }, 50);
}

function contentLoaded() {
  updateCustomer();
}
window.addEventListener('PageContentLoaded', contentLoaded);
