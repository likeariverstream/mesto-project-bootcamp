'use strict';

import {
  openPopup,
  imagePopup,
  deleteCardPopup,
} from './modal';

import {
  putLike,
  deleteLike,
} from './api.js';

import {
  myId
} from '../index.js';

import {
} from './validate.js';

import {
  checkError,
} from './utils.js';

const cardTemplate = document.querySelector('#card').content;
const cardList = document.querySelector('.elements');
const card = cardTemplate.querySelector('.element');
const imagePopupImage = document.querySelector('.popup__image');
const imageCard = card.querySelector('.element__image');
const titleCard = card.querySelector('.element__title');
const imagePopupTitle = document.querySelector('.popup__title');

function addInitialCards(arr) {
  Object.keys(arr).forEach((item) => {
    cardList.append(createCard(arr[item]));
  });
}

let elemId;
let targetElement;

function createCard(item) {
  const cardElement = card.cloneNode(true),
    imageCardElement = cardElement.querySelector('.element__image'),
    titleCardElement = cardElement.querySelector('.element__title'),
    likeButtonCardElement = cardElement.querySelector('.element__like-button'),
    deleteButtonCardElement = cardElement.querySelector('.element__delete-button'),
    likeCount = cardElement.querySelector('.element__like-count');
  if (item.owner._id !== myId) {
    deleteButtonCardElement.remove();
  }
  if (item.likes.length !== 0) {
    for (let i = 0; i < item.likes.length; i++) {
      if (item.likes[i]._id === myId) {
        likeButtonCardElement.classList.add('element__like-button_active');
      }
    }
  }
  likeButtonCardElement.addEventListener('click', (evt) => {
    if (!likeButtonCardElement.classList.contains('element__like-button_active')) {
      putLike(item._id)
        .then((result) => {
          console.log(result.likes.length);
          likeCount.textContent = result.likes.length;
          likeButtonCardElement.classList.add('element__like-button_active');
        })
        .catch(checkError);
    }
    else {
      deleteLike(item._id)
        .then((result) => {
          console.log(result.likes.length);
          likeButtonCardElement.classList.remove('element__like-button_active');
          likeCount.textContent = result.likes.length;
        })
        .catch(checkError);
    }
  });
  deleteButtonCardElement.addEventListener('click', (evt) => {
    targetElement = evt.target.closest('.element');
    elemId = targetElement.id;
    openPopup(deleteCardPopup);

  });
  imageCardElement.addEventListener('click', (evt) => {
    imagePopupImage.src = evt.target.src;
    imagePopupImage.alt = evt.target.alt;
    imagePopupTitle.textContent = titleCardElement.textContent;
    openPopup(imagePopup);
  });
  imageCardElement.src = item.link;
  imageCardElement.alt = item.name;
  titleCardElement.textContent = item.name;
  likeCount.textContent = item.likes.length;
  cardElement.id = item._id;
  return cardElement;
}

export {
  cardTemplate,
  cardList,
  card,
  imageCard,
  titleCard,
  addInitialCards,
  createCard,
  elemId,
  targetElement
};