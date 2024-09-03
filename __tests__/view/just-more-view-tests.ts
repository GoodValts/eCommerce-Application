import { JSDOM } from 'jsdom';
import loginPage from '../../src/view/pages/login/login';
import { header, navObj, changeRegStatus } from '../../src/view/header/header';
import resultMessage from '../../src/view/components/resultMessage';
import footer from '../../src/view/footer/footer';
import { createCard } from '../../src/view/pages/catalog/cards';
import aboutPage from '../../src/view/pages/about/about';
import mainContainer from '../../src/view/view';
import categoryLogoObj from '../../src/model/data/images-src';
import { getCountryName } from '../../src/model/data/countries';
import filters from '../../src/view/pages/catalog/filters'

const dom = new JSDOM();
global.document = dom.window.document;

describe('login page tests', () => {
  describe('result message tests', () => {
    const message = resultMessage;
    test('LoginPage contains message', () => {
      expect(message).toBeDefined();
    });

    test('LoginPage message is not visable', () => {
      expect(message?.classList.contains('hidden')).toBeTruthy();
    });

    test('LoginPage message has <p>-child for result', () => {
      expect(message?.firstElementChild?.tagName).toEqual('P');
    });
  });

  describe('redirect link tests', () => {
    const redirectBlock = loginPage.querySelector('.login-page__redirect');
    test('LoginPage contains redirect elements', () => {
      expect(redirectBlock).toBeDefined();
    });
    test('redirect element contain link', () => {
      expect(redirectBlock?.firstElementChild?.tagName).toEqual('A')
    });

    const link = redirectBlock?.firstElementChild as HTMLLinkElement;
    test('redirect link leads to the registration page', () => {
      expect(link.href).toContain('/registration');
    });
  });

  describe('form tests', () => {
    const form = loginPage.querySelector('.login-page__form');

    function testFormInput(type: string): number {
      let cnt = 0;
      form?.querySelectorAll('input').forEach(el => {
        if (el.type === type) {
          cnt += 1;
        }
      })
      return cnt;
    }

    test('LoginPage contains form', () => {
      expect(form).toBeDefined();
    });

    test('form contains email input', () => {
      expect(testFormInput('email')).toBeGreaterThan(0);
    });

    test('form contains password input', () => {
      expect(testFormInput('password')).toBeGreaterThan(0);
    });

    test('form contains log in button', () => {
      expect(form?.querySelectorAll('button').length).toBeGreaterThan(0);
    });
  });
})

describe('login page tests', () => {
  describe('result message tests', () => {
    const message = resultMessage;
    test('LoginPage contains message', () => {
      expect(message).toBeDefined();
    });

    test('LoginPage message is not visable', () => {
      expect(message?.classList.contains('hidden')).toBeTruthy();
    });

    test('LoginPage message has <p>-child for result', () => {
      expect(message?.firstElementChild?.tagName).toEqual('P');
    });
  });

  describe('redirect link tests', () => {
    const redirectBlock = loginPage.querySelector('.login-page__redirect');
    test('LoginPage contains redirect elements', () => {
      expect(redirectBlock).toBeDefined();
    });
    test('redirect element contain link', () => {
      expect(redirectBlock?.firstElementChild?.tagName).toEqual('A')
    });

    const link = redirectBlock?.firstElementChild as HTMLLinkElement;
    test('redirect link leads to the registration page', () => {
      expect(link.href).toContain('/registration');
    });
  });

  describe('form tests', () => {
    const form = loginPage.querySelector('.login-page__form');

    function testFormInput(type: string): number {
      let cnt = 0;
      form?.querySelectorAll('input').forEach(el => {
        if (el.type === type) {
          cnt += 1;
        }
      })
      return cnt;
    }

    test('LoginPage contains form', () => {
      expect(form).toBeDefined();
    });

    test('form contains email input', () => {
      expect(testFormInput('email')).toBeGreaterThan(0);
    });

    test('form contains password input', () => {
      expect(testFormInput('password')).toBeGreaterThan(0);
    });

    test('form contains log in button', () => {
      expect(form?.querySelectorAll('button').length).toBeGreaterThan(0);
    });
  });
});

describe('header tests', () => {
  describe('header container', () => {
    test('header contains logo container', () => {
      expect(header.querySelector('.header__container')).toBeDefined();
    });
  });

  describe('logo tests', () => {
    const logo = header.querySelector('.header__logo');

    test('header contains logo container', () => {
      expect(logo).toBeDefined();
    });

    test('logo container contains image', () => {
      expect(logo?.querySelectorAll('img').length).toBeGreaterThan(0);
    });

    test('logo image has alt', () => {
      expect((logo?.querySelector('img')?.alt.length)).toBeGreaterThan(0);
    });
  });

  describe('nav tests', () => {
    const nav = header.querySelector('.header__nav');

    test('header contains nav', () => {
      expect(nav).toBeDefined();
    });

    Object.entries(navObj).forEach(([key, value]) => {
      test(`nav obj ${key} exists`, () => {
        expect(key).toBeDefined();
      });
      test(`nav obj ${key} has element text`, () => {
        expect(value.text).toBeDefined();
      });
      test(`nav obj ${key} has element routing`, () => {
        expect(value.routing).toBeDefined();
      });
    })
  });

  describe('changeRegStatus', () => {
    const arr = ['sigin', 'login', 'profile', 'logout'];

    beforeEach(() => {
      const createElement = (id: string) => {
        const element = document.createElement('div');
        element.id = id;
        document.body.appendChild(element);
      };

      arr.forEach(el => createElement(el));
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    function checkHidden(id: string): void {
      test(`toggle hidden in ${id} link`, () => {
        changeRegStatus();

        expect(document.getElementById(`${id}`)?.classList.contains('hidden')).toBe(true);
      });
    }
    arr.forEach(el => checkHidden(el));
  });
});

describe('footer tests', () => {
  describe('rss block', () => {
    test('rss block is exist', () => {
      expect(footer.querySelector('.footer__rss')).toBeDefined();
    });
  });
});


describe('card tests', () => {
  const card = createCard('id', 'motoName', 'imgLink', ['param1', 'param2'], '3000', '2500');

  test('card is exist', () => {
    expect(card).toBeDefined();
  });
});

describe('about tests', () => {
  test('about is exist', () => {
    expect(aboutPage).toBeDefined();
  });
});

describe('main tests', () => {
  test('main paragraph is exist', () => {
    expect(mainContainer).toBeDefined();
  });
});


describe('data -> images tests', () => {
  test('imagesArr is exist', () => {
    expect(categoryLogoObj).toBeDefined();
  });
});

describe('data -> couintries tests', () => {
  test('function getCountryName return result from obj', () => {
    const result = getCountryName('PL');
    expect(result).toEqual('Poland');
  });

  test('function getCountryName return empty str if country not exist', () => {
    const result = getCountryName('404');
    expect(result).toEqual('');
  });
});

describe('cataslog filters tests', () => {
  test('filters is exist', () => {
    expect(filters).toBeDefined();
  });
});