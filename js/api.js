import {showAlert} from './messages.js';

const Address = {
  GET: 'https://26.javascript.pages.academy/keksobooking/data',
  SEND: 'https://26.javascript.pages.academy/keksobooking',
};

export const getData = (onSuccess) => {
  fetch(Address.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) =>
      showAlert (`Ошибка при получении данных ${error}`)
    );
};

export const sendData = (onSuccess, onError, body) =>
{
  fetch(Address.SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(onError);
};
