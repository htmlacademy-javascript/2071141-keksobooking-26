import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;
const SUCCESS_MESSAGE_TIME = 3000;

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

const showSuccessMessage = () => {
  const message = successTemplateElement.cloneNode(true);
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, SUCCESS_MESSAGE_TIME);
};

const showErrorMessage = (errorMessage) => {
  const message = errorTemplateElement.cloneNode(true);
  document.body.appendChild(message);
  const errorMessageCloseButton = document.querySelector('.error__button');
  const errorMessageText = document.querySelector('.error__message');
  errorMessageText.textContent = errorMessage;

  errorMessageCloseButton.addEventListener('click', () => {
    message.remove();
  });

  const removeEscHandler = (evt) => {
    if (evt.keyCode === isEscapeKey) {
      message.remove();
      document.removeEventListener('keydown', removeEscHandler);
    }
  };

  document.addEventListener('keydown', removeEscHandler);

  const removeClickHandler = () => {
    document.removeEventListener('click', removeClickHandler);
    message.remove();
  };

  document.addEventListener('click', removeClickHandler);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showSuccessMessage, showErrorMessage, showAlert};
