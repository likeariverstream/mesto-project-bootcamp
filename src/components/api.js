'use strict';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbc-cohort-1',
  headers: {
    authorization: 'f69a8e1a-7b4c-4898-9f33-97539dca3c0c',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function checkResult(result) {
  console.log(result);
}

function checkError(err) {
  console.log(err);
}

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  });
}

function getCards() { // получаем массив карточек с сервера
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  });
}

// меняем данные профиля при редактировании

function patchProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  });
}

function patchAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, { // меняем аватар
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  });
}

// отправляем новую карточку на сервер
function getNewCard(obj) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(obj)
  });
}

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
    })
  })
    .then(checkResponse)
    .then(checkResult)
    .catch(checkError);
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
    })
  });
}

// удаляем карточку на сервере
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
    })
  });
}

export {
  // myID,
  getUserInfo,
  patchProfile,
  patchAvatar,
  getNewCard,
  deleteCard,
  putLike,
  deleteLike,
  getCards,
  checkResponse,
  checkResult,
  checkError,
  config
};
