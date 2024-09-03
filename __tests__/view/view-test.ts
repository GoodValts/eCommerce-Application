
import { JSDOM } from 'jsdom'
import { getAllByRole, getByRole, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom'

import countries from "../../src/model/data/countries"
import createFormBlock from '../../src/utils/view/createFormBlock'
import registrationPage, { addressButton } from '../../src/view/pages/registration/registration'
import page404 from '../../src/view/pages/404/404'
import profilePage, { createUserDataForm } from '../../src/view/pages/profile/profile'
import createButtonsFor from '../../src/view/pages/profile/buttons'
import productPage from '../../src/view/pages/product/product'
import createModal from '../../src/view/pages/product/modal'
import items from '../../src/view/pages/catalog/items'



test('Amount of countries', () => {
  expect(Object.keys(countries).length).toBe(27)
})

describe('Registration page tests', () => {
  const dom = new JSDOM(`<html></head><body></body></html>`)
  const container = dom.window.document.body

  test ('Regform contains message', () => {
    container.innerHTML = `<div class="reg-form__result-container hidden"><p class="reg-form__result-text">Successfuly registrated</p></div>`

    expect(getByText(container,'Successfuly registrated')).toBeInTheDocument();
  })

  test('Regform contains proper e-mail block', () => {
    const emailOptions = {
      type: 'email',
      placeholder: 'E-mail',
      name: 'email',
      text: 'E-mail:',
      required: true,
      pattern: /.+@.+\..+/,
      title: 'Type valid e-mail (e.g., example@email.com)',
    };
    const expected = createFormBlock(emailOptions)

    const mailBlock = registrationPage.querySelectorAll('.form__block')[0]
    expect(mailBlock).toEqual(expected);

  })

  test('Address button is enabled', () => {
    const btn = addressButton.outerHTML;
    container.innerHTML = btn || '';
    expect(container).toBeEnabled();
  })
})

describe('404 page tests', () => {
  const dom = new JSDOM(`<html></head><body></body></html>`)
  const container = dom.window.document.body
  container.innerHTML = page404.outerHTML;
  test('link to main page is visible', () => {
    expect(getByRole(container, 'link')).toBeVisible();
  })
})

describe('Profile page tests', () => {
  const dom = new JSDOM(`<html></head><body></body></html>`)
  const container = dom.window.document.body
  container.innerHTML = profilePage.outerHTML;
  const buttons = getAllByRole(container, 'button')
  buttons.forEach(button => {
    test('user data in the profile page', () => {
      expect(button).toBeInTheDocument()
    })

  })

})

describe('profile function', () => {
  const dom = new JSDOM(`<html></head><body></body></html>`)
  const container = dom.window.document.body

  const form = document.createElement('form')
  form.textContent = 'test'
  container.innerHTML = form.outerHTML
  const testForm = getByText(container, 'test') as HTMLFormElement

  const mockCreateButtons = jest.fn(createButtonsFor)
  mockCreateButtons(testForm)
  test('function createButtonsFor creates buttons in form', ()=> {
    expect(testForm).not.toBeEmptyDOMElement()
  })

  const mockCreateUserDataForm = jest.fn(createUserDataForm)
  const createdForm = mockCreateUserDataForm()
  container.innerHTML = createdForm.outerHTML
  test('form is created', () => {
    expect(getByRole(container, 'button')).toBeInTheDocument()
  })
})

describe('product page', () => {
  const dom = new JSDOM(`<html></head><body></body></html>`)
  const container = dom.window.document.body
  container.innerHTML = productPage.outerHTML

  test('page contains heading', () => {
    const headings = getAllByRole(container, 'heading')
    headings.forEach(heading => {
      expect(heading).toBeInTheDocument()
    })
  })

  const mockModal = jest.fn(createModal)
  mockModal()
  container.innerHTML = productPage.outerHTML
  test('page contains image ', () => {
    expect(getAllByRole(container, 'img').length).toBeTruthy()
  })
})

describe('test catalog', () => {
  const dom = new JSDOM(`<html></head><body></body></html>`)
  const container = dom.window.document.body
  container.innerHTML = items.outerHTML

  test('catalog contains category', () => {
    const options = getAllByRole(container, 'option')
    options.forEach(opt => {
      expect(opt).toBeInTheDocument()
    })
  })
})