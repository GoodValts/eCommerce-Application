import loginForm from '../view/pages/login/login';
import resultMessage from '../view/components/resultMessage';
import { setLocalCustomer } from '../model/login';
import {
  getActiveCart,
  getCustomerToken,
  loginCustomerPass,
} from '../model/api/cartApiRoot';

const input: HTMLInputElement = loginForm.querySelector(
  'input[name="password"]',
)!;
const chkBox: HTMLInputElement = loginForm.querySelector(
  'input[name="showPassword"]',
)!;

function changeType() {
  input.type = chkBox.checked ? 'text' : 'password';
}

async function submitHandler(e: Event) {
  e.preventDefault();

  const regForm = e.target as HTMLFormElement;
  const formData = new FormData(regForm);
  const mail = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const response = await loginCustomerPass(mail, password);

  resultMessage.classList.remove('hidden');
  if (response.statusCode === 200) {
    setLocalCustomer(response.body.customer);
    resultMessage.firstChild!.textContent = `Welcome to MotoDream, ${response.body.customer.firstName}!`;
    await getCustomerToken();
    setTimeout(() => {
      window.routeLocation = '/';
      localStorage.removeItem('cartAnonToken');
    }, 3000);
    getActiveCart();
  } else {
    resultMessage.firstChild!.textContent = response.message;
  }
  setTimeout(() => {
    resultMessage.firstChild!.textContent = '';
    resultMessage.classList.add('hidden');
  }, 3000);
}

chkBox?.addEventListener('click', changeType);
loginForm.addEventListener('submit', submitHandler);

export { changeType, submitHandler };
