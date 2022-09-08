'use strict';

import {
  checkResponse
} from './utils.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbc-cohort-1',
  headers: {
    authorization: 'f69a8e1a-7b4c-4898-9f33-97539dca3c0c',
    'Content-Type': 'application/json'
  },
};

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse);
};

function patchProfile(fullname, profession) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: fullname,
      about: profession
    })
  })
    .then(checkResponse);
}

function patchAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(checkResponse);
}

function getNewCard(obj) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(obj)
  })
    .then(checkResponse);
}

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
    })
  })
    .then(checkResponse);
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
    })
  })
    .then(checkResponse);
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
    })
  })
    .then(checkResponse);
}

export {
  getUserInfo,
  patchProfile,
  patchAvatar,
  getNewCard,
  deleteCard,
  putLike,
  deleteLike,
  getCards,
};