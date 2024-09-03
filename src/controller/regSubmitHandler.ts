import { createCustomer } from '../model/api/apiRoot';
import countries from '../model/data/countries';
import { setLocalCustomer } from '../model/login';
import { Address, CustomerDraft } from '../types/API-interfaces';
import registrationForm from '../view/pages/registration/registration';
import resultMessage from '../view/components/resultMessage';
import { loginCustomerPass } from '../model/api/cartApiRoot';
import { clearForm } from './regFormHandlers';

const getRegFormData = (e: Event): CustomerDraft => {
  const regForm = e.target as HTMLFormElement;
  const formData = new FormData(regForm);

  const newCustomer: CustomerDraft = {
    email: `${formData.get('email')}`,
    password: `${formData.get('password')}`,
    customerNumber: `${formData.get('tel')}`,
    firstName: `${formData.get('firstName')}`,
    lastName: `${formData.get('lastName')}`,
    dateOfBirth: `${formData.get('dateOfBirth')}`,
    addresses: [],
  };

  const shippingCountry = `${formData.get('shippingCountry')}`;
  const shipAsDefault = `${formData.get('defaultshippingAddress')}` === 'on';
  const bothShipAsDefault = `${formData.get('bothDefaultAddress')}` === 'on';

  const shippingAddress = {
    country: countries[shippingCountry as keyof typeof countries],
    city: `${formData.get('shippingCity')}`,
    streetName: `${formData.get('shippingStreet')}`,
    postalCode: `${formData.get('shippingPostCode')}`,
    firstName: `${formData.get('firstName')}`,
    lastName: `${formData.get('lastName')}`,
    phone: `${formData.get('tel')}`,
  };
  newCustomer.addresses.push(shippingAddress);
  if (shipAsDefault) {
    newCustomer.defaultShippingAddress = 0;
  }
  if (bothShipAsDefault) {
    newCustomer.defaultBillingAddress = 0;
    newCustomer.defaultShippingAddress = 0;
  }

  const billingCountry = `${formData.get('billingCountry')}`;
  const billAsDefault = `${formData.get('defaultbillingAddress')}` === 'on';
  let billingAddress: Address;
  if (billingCountry && billingCountry !== 'null' && !bothShipAsDefault) {
    billingAddress = {
      country: countries[billingCountry as keyof typeof countries],
      city: `${formData.get('billingCity')}`,
      streetName: `${formData.get('billingStreet')}`,
      postalCode: `${formData.get('billingPostCode')}`,
      firstName: `${formData.get('firstName')}`,
      lastName: `${formData.get('lastName')}`,
      phone: `${formData.get('tel')}`,
    };
    newCustomer.addresses?.push(billingAddress);
    if (billAsDefault && shippingCountry) {
      newCustomer.defaultBillingAddress = 1;
    }
    if (billAsDefault && !shippingCountry) {
      newCustomer.defaultBillingAddress = 0;
    }
  }
  return newCustomer;
};

export const submitHandler = async (e: Event) => {
  e.preventDefault();
  const newCustomer = getRegFormData(e);
  try {
    const regResponse = await createCustomer(newCustomer);
    const regMessage = regResponse.message;
    resultMessage.classList.remove('hidden');
    if (regResponse.statusCode === 201) {
      resultMessage.firstChild!.textContent = 'Successfully registered';

      const logResponse = await loginCustomerPass(
        newCustomer.email,
        newCustomer.password,
      );
      if (logResponse.statusCode === 200) {
        setLocalCustomer(logResponse.body.customer);
        setTimeout(() => {
          resultMessage.firstChild!.textContent = `Welcome to the club, ${logResponse.body.customer.firstName}`;
          localStorage.removeItem('cartAnonToken');
          clearForm();
          localStorage.removeItem('cartAnonToken');
        }, 1000);
        setTimeout(() => {
          window.routeLocation = '/';
          resultMessage.firstChild!.textContent = '';
          resultMessage.classList.add('hidden');
        }, 3000);
      } else {
        setTimeout(() => {
          resultMessage.firstChild!.textContent += 'Authentication error';
        }, 1000);
        setTimeout(() => {
          window.routeLocation = '/login';
          resultMessage.firstChild!.textContent = '';
          resultMessage.classList.add('hidden');
        }, 4000);
      }
    } else if (`${regResponse.statusCode}`.startsWith('4')) {
      if (regMessage.includes(newCustomer.customerNumber)) {
        resultMessage.firstChild!.textContent =
          'A customer with the provided credentials already exists';
      } else {
        resultMessage.firstChild!.textContent = regMessage;
      }
      setTimeout(() => {
        resultMessage.firstChild!.textContent = '';
        resultMessage.classList.add('hidden');
      }, 3000);
    } else if (`${regResponse.statusCode}`.startsWith('5')) {
      resultMessage.firstChild!.textContent = `Server error. Please, try again later!`;
      setTimeout(() => {
        resultMessage.firstChild!.textContent = '';
        resultMessage.classList.add('hidden');
      }, 3000);
    }
  } catch {
    resultMessage.classList.remove('hidden');
    resultMessage.firstChild!.textContent =
      'Something wrong. Please, try again!';
    setTimeout(() => {
      resultMessage.firstChild!.textContent = '';
      resultMessage.classList.add('hidden');
    }, 3000);
  }
};

registrationForm.addEventListener('submit', submitHandler);
