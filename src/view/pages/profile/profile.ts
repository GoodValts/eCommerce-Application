import countries from '../../../model/data/countries';
import { FormBlock } from '../../../types/type';
import checkAgeParams from '../../../utils/checkAgeParams';
import createFormBlock from '../../../utils/view/createFormBlock';
import createButtonsFor from './buttons';
import { createMenu } from './menu';

const profilePage: HTMLElement = document.createElement('div');
profilePage.classList.add('profile-page');

const header = document.createElement('h1');
header.classList.add('profile-page__header');
header.textContent = 'Profile';

export const userDataSection = document.createElement('div');
userDataSection.classList.add('profile-page__user-data');
export function createUserDataForm(): HTMLFormElement {
  const firstNameOptions: FormBlock = {
    type: 'text',
    placeholder: 'First name',
    name: 'firstName',
    text: 'First name:',
    required: true,
    pattern: /[A-Za-z]+/,
    title: 'At least one character, no special characters or numbers',
    display: 'inline',
  };

  const lastNameOptions: FormBlock = {
    type: 'text',
    placeholder: 'Last name',
    name: 'lastName',
    text: 'Last Name:',
    required: true,
    pattern: /[A-Za-z]+/,
    title: 'At least one character, no special characters or numbers',
    display: 'inline',
  };

  const emailOptions: FormBlock = {
    type: 'email',
    placeholder: 'E-mail',
    name: 'email',
    text: 'E-mail:',
    required: true,
    pattern: /.+@.+\..+/,
    title: 'Type valid e-mail (e.g., example@email.com)',
    display: 'inline',
  };

  const telOptions: FormBlock = {
    type: 'tel',
    placeholder: 'Phone (10-12 digits)',
    name: 'phone',
    text: 'Phone:',
    required: true,
    pattern: /^[0-9]{10,12}$/,
    title: '10 to 12 digits, no plus sign',
    display: 'inline',
  };

  const birthDateOptions: FormBlock = {
    type: 'date',
    name: 'dateOfBirth',
    text: 'Date of Birth:',
    required: true,
    max: `${checkAgeParams().bitrhExtr.getFullYear()}-${
      checkAgeParams().mExtr
    }-${checkAgeParams().dExtr}`,
    title: 'Only customers over 18 years old',
    placeholder: 'Date of Birth',
  };

  const blocksArr = [
    emailOptions,
    firstNameOptions,
    lastNameOptions,
    telOptions,
    birthDateOptions,
  ];

  const form = document.createElement('form');
  form.className = 'reg-page__form';

  blocksArr.forEach((opt) => {
    const block = createFormBlock(opt);
    form.append(block);
  });

  createButtonsFor(form);

  return form;
}

export const changePasswordButton = document.createElement('button');
changePasswordButton.classList.add('user-data__password-button');
changePasswordButton.textContent = 'Change Password';
function createChangePasswordForm(): HTMLFormElement {
  const passwordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    text: 'Current password:',
    required: true,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}/,
    title:
      'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    display: 'inline',
  };

  const newPasswordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Password',
    name: 'newPassword',
    text: 'New password:',
    required: true,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}/,
    title:
      'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    display: 'inline',
  };

  const repeatPasswordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Repeat password',
    name: 'checkPassword',
    text: 'Repeat password:',
    required: true,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}/,
    title: 'Must match the password',
    display: 'inline',
  };

  const showPasswordOptions: FormBlock = {
    type: 'checkbox',
    name: `showPassword`,
    text: 'Show password:',
    required: false,
    placeholder: '',
  };

  const blocksArr = [
    passwordOptions,
    newPasswordOptions,
    repeatPasswordOptions,
    showPasswordOptions,
  ];

  const form = document.createElement('form');
  form.className = 'reg-page__form';

  blocksArr.forEach((opt) => {
    const block = createFormBlock(opt);
    form.append(block);
  });

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Apply';
  submitBtn.type = 'submit';
  submitBtn.className = 'user-data__confirm-button';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'user-data__reject-button';
  cancelBtn.addEventListener('click', (e: Event) => {
    (e.target as HTMLElement).parentElement?.parentElement?.remove();
    changePasswordButton.classList.remove('hidden');
  });

  const btnBlock = document.createElement('div');
  btnBlock.classList.add('user-data__button-block');
  btnBlock.append(submitBtn, cancelBtn);

  form.append(btnBlock);

  const showPassword = (e: Event) => {
    const chkBox = e.target as HTMLInputElement;
    form.querySelectorAll('input:not([type="checkbox"])').forEach((el) => {
      const input = el as HTMLInputElement;
      input.type = chkBox.checked ? 'text' : 'password';
    });
  };
  form
    .querySelector('[name="showPassword"]')
    ?.addEventListener('click', showPassword);

  return form;
}

export const passwordForm = createChangePasswordForm();
changePasswordButton.addEventListener('click', () => {
  userDataSection.append(passwordForm);
  changePasswordButton.classList.add('hidden');
});

export const addressSection = document.createElement('div');
addressSection.classList.add('profile-page__address');

export const addressesSection = document.createElement('div');
addressesSection.classList.add('reg-page__form');
export function createAddressForm(): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'profile-page__user-data';

  const defaultShippingBlock = createFormBlock({
    type: 'checkbox',
    name: 'defaultShippingAddress',
    text: 'Default Shipping',
    required: false,
  });

  const defaultBillingBlock = createFormBlock({
    type: 'checkbox',
    name: 'defaultBillingAddress',
    text: 'Default Billing',
    required: false,
  });

  const streetOptions: FormBlock = {
    type: 'text',
    text: 'Address:',
    name: 'Street',
    required: true,
    pattern: /.+/,
    title: 'Must contain at least one character',
    display: 'inline',
  };

  const cityOptions: FormBlock = {
    type: 'text',
    text: 'City:',
    name: 'City',
    required: true,
    pattern: /[A-Za-z]+/,
    title:
      'Must contain at least one character and no special characters or numbers',
    display: 'inline',
  };

  const postCodeOptions: FormBlock = {
    type: 'text',
    text: 'Postal code:',
    name: 'PostCode',
    required: true,
    pattern: /[0-9]{5,7}/,
    title: 'Must contain from 5 to 7 digits',
    display: 'inline',
  };

  const typeOptions: FormBlock = {
    type: 'select',
    text: 'Adress type:',
    name: 'addressType',
    required: true,
    selectOptions: ['', 'billing', 'shipping', 'shipping + billing'],
  };

  const countryOptions: FormBlock = {
    type: 'select',
    text: 'Country:',
    name: 'Country',
    required: true,
    title: 'You should select a country to save this address',
    selectOptions: Object.keys(countries),
  };

  const delBtn = document.createElement('button');
  delBtn.classList.add('address__reject-button');
  delBtn.name = 'deleteBtn';
  delBtn.type = 'button';
  delBtn.textContent = 'Delete';

  form.append(
    createFormBlock(typeOptions),
    createFormBlock(countryOptions),
    createFormBlock(cityOptions),
    createFormBlock(streetOptions),
    createFormBlock(postCodeOptions),
    defaultShippingBlock,
    defaultBillingBlock,
    delBtn,
  );

  createButtonsFor(form);

  return form;
}
export const createAddressBtn = document.createElement('button');
createAddressBtn.classList.add('address__confirm-button');
createAddressBtn.type = 'button';
createAddressBtn.textContent = 'Add new address';
addressesSection.append(createAddressBtn);

profilePage.append(header, createMenu(userDataSection, addressesSection));

export default profilePage;
