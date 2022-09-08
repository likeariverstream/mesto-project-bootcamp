'use strict';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function checkError(err) {
  console.log(err);
}

function waitSaving(event) {
  const item = event.submitter;
  item.textContent = 'Сохранение...';
  item.disabled = true;
}

function loadCallback(event) {
  const item = event.submitter;
  item.textContent = 'Сохранить';
  item.disabled = false;
}

export {
  checkError,
  checkResponse,
  waitSaving,
  loadCallback
};