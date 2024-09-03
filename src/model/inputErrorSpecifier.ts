import ERROR from './data/messages';

function checkPassword(data: string): string {
  if (data.length < 8) return ERROR.password.length;
  if (!/[A-Z]/.test(data)) return ERROR.password.upper;
  if (!/[a-z]/.test(data)) return ERROR.password.lower;
  if (!/[0-9]/.test(data)) return ERROR.password.digit;
  if (/(?!.* )/.test(data)) return ERROR.password.space;
  return '';
}

function checkEmail(data: string): string {
  if (data.indexOf('@') <= 0) return ERROR.email.separator;
  return '';
}

function getSpecifyError(type: string, data: string): string {
  let result = '';
  switch (type) {
    case 'email': {
      result = checkEmail(data);
      break;
    }
    case 'password': {
      result = checkPassword(data);
      break;
    }
    default: {
      break;
    }
  }
  return result;
}

export default getSpecifyError;
