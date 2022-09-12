import {showAlert} from './utils.js';

const Address = {
  GET: 'https://26.javascript.pages.academy/keksobooking/data',
  SEND: 'https://26.javascript.pages.academy/keksobooking',
};

const getData = (onSuccess) => {
  fetch(Address.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
      console.log(data);
    })
    .catch((error) =>
      showAlert (`Ошибка при получении данных ${error}`)
    );
};

const sendData = (onSuccess, onError, body) =>
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
    .catch(
      () => onError()
    );
};

export {getData, sendData};
