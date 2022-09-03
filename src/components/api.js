'use strict';

import {
  addInitialCards,
  createCard,
  cardList,
  deleteButtons
} from './card.js';

import {
  profileName,
  profileProfession,
  addImageNameInput,
  addImageLinkInput
} from './modal';

// получаем данные пользователя и массив карточек с сервера
const url = 'https://nomoreparties.co/v1/wbc-cohort-1/users/me',
  token = 'f69a8e1a-7b4c-4898-9f33-97539dca3c0c',
  myID = 'deabbb0f24329babe7d5d647';

function getUserInfo() {
  return fetch(url, {
    headers: {
      authorization: token
    }
  })
    .then(res => res.json())
    .then((result) => {
      profileName.textContent = result.name;
      profileProfession.textContent = result.about;
      const myID = result._id; // это const моего id
      return myID;
    })
    .then(() => { // получаем массив карточек с сервера
      return fetch('https://nomoreparties.co/v1/wbc-cohort-1/cards ', {
        headers: {
          authorization: 'f69a8e1a-7b4c-4898-9f33-97539dca3c0c'
        }
      })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          addInitialCards(result);
        });
    });
}

// меняем данные профиля при редактировании

function patchProfile() {
  fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'f69a8e1a-7b4c-4898-9f33-97539dca3c0c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileName.textContent,
      about: profileProfession.textContent
    })
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
}

// отправляем новую карточку на сервер
function getNewCard(obj) {
  fetch('https://nomoreparties.co/v1/wbc-cohort-1/cards', {
    method: 'POST',
    headers: {
      authorization: 'f69a8e1a-7b4c-4898-9f33-97539dca3c0c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: addImageNameInput.value,
      link: addImageLinkInput.value,
      likes: obj.likes.length
    })
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
}

function putLike(cardId) {
  fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'f69a8e1a-7b4c-4898-9f33-97539dca3c0c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
}

function deleteLike(cardId) {
  fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'f69a8e1a-7b4c-4898-9f33-97539dca3c0c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
}

// удаляем карточку на сервере
function deleteCard(cardId) {
  fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'f69a8e1a-7b4c-4898-9f33-97539dca3c0c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
}

export {
  myID,
  getUserInfo,
  patchProfile,
  getNewCard,
  deleteCard,
  putLike,
  deleteLike
  // patchLikes
  // initialCards
};