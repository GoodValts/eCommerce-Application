const errorMessage = document.createElement('p');
errorMessage.classList.add('error-message__container', 'hidden');

const errorText = document.createElement('p');
errorText.classList.add('error-message__text');
errorText.textContent = '';

errorMessage.append(errorText);

document.body.append(errorMessage);

export default errorMessage;
