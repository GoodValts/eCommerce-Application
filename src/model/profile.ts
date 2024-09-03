import {
  AddressDraft,
  CustomerDraft,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { getLocalCustomer, setLocalCustomer } from './login';
import { changeCustomerPassword, updateCustomerData } from './api/apiRoot';
import resultMessage from '../view/components/resultMessage';
import { AddressVariant, PromiseResponse } from '../types/type';

function showResultMessage(response: PromiseResponse, msg: string) {
  resultMessage.classList.remove('hidden');
  if (response.statusCode === 200) {
    setLocalCustomer(response.body);
    window.dispatchEvent(new Event('PageContentLoaded'));
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

export async function deleteAddress(id: string) {
  const customer = getLocalCustomer();
  const data: CustomerUpdateAction[] = [];
  data.push({
    action: 'removeAddress',
    addressId: id,
  });
  const response = await updateCustomerData(customer, data);
  showResultMessage(response, `Address has been deleted!`);
}

export async function submitUserData(user: CustomerDraft) {
  const customer = getLocalCustomer();
  const data: CustomerUpdateAction[] = [];
  data.push({
    action: 'setFirstName',
    firstName: user.firstName,
  });
  data.push({
    action: 'setLastName',
    lastName: user.lastName,
  });
  data.push({
    action: 'setDateOfBirth',
    dateOfBirth: user.dateOfBirth,
  });
  data.push({
    action: 'changeEmail',
    email: user.email || '',
  });

  const response = await updateCustomerData(customer, data);
  showResultMessage(response, `Your details has been updated!`);
}

export async function submitAddressData(
  address: AddressDraft,
  type: AddressVariant,
) {
  const customer = getLocalCustomer();
  const lsAddress = customer.addresses.find(
    (el: AddressDraft) => el.id === address.id,
  );
  const data: CustomerUpdateAction[] = [];
  if (lsAddress) {
    lsAddress.country = address.country;
    lsAddress.city = address.city;
    lsAddress.streetName = address.streetName;
    lsAddress.postalCode = address.postalCode;
    data.push({
      action: 'changeAddress',
      addressId: address.id,
      address: lsAddress,
    });

    if (customer.billingAddressIds.find((el: string) => el === address.id))
      data.push({ action: 'removeBillingAddressId', addressId: address.id });
    if (customer.shippingAddressIds.find((el: string) => el === address.id))
      data.push({ action: 'removeShippingAddressId', addressId: address.id });
    if (type.billing)
      data.push({ action: 'addBillingAddressId', addressId: address.id });
    if (type.shipping)
      data.push({ action: 'addShippingAddressId', addressId: address.id });
    if (type.defbilling)
      data.push({ action: 'setDefaultBillingAddress', addressId: address.id });
    if (type.defShipping)
      data.push({ action: 'setDefaultShippingAddress', addressId: address.id });

    const response = await updateCustomerData(customer, data);
    showResultMessage(response, `Address information has been updated!`);
  } else {
    data.push({
      action: 'addAddress',
      address: {
        country: address.country,
        city: address.city,
        streetName: address.streetName,
        postalCode: address.postalCode,
      },
    });

    const response = await updateCustomerData(customer, data);
    if (response.statusCode === 200) {
      setLocalCustomer(response.body);
      response.body.addresses.forEach((adr: AddressDraft) => {
        try {
          const emerged: boolean =
            customer.addresses.findIndex(
              (el: AddressDraft) => el.id === adr.id,
            ) < 0;
          if (emerged) submitAddressData(adr, type);
          return true;
        } catch {
          return false;
        }
      });
    }
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  const customer = getLocalCustomer();
  const response = await changeCustomerPassword({
    id: customer.id,
    version: customer.version,
    currentPassword,
    newPassword,
  });
  showResultMessage(response, `Password has been changed!`);
}
