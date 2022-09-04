'use strict';

import {
  openPopup,
  imagePopup
} from './modal';

import {
  getNewCard,
  myID,
  deleteCard,
  putLike,
  deleteLike
} from './api.js';

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

function deleteButtons(arr) {
  Object.keys(arr).forEach((item) => {
    const elem = createCard(arr[item]);
    const deleteButton = elem.querySelector('.element__delete-button');
    deleteButton.remove();
  });
}

function createCard(item) {
  const cardElement = card.cloneNode(true),
    imageCardElement = cardElement.querySelector('.element__image'),
    titleCardElement = cardElement.querySelector('.element__title'),
    likeButtonCardElement = cardElement.querySelector('.element__like-button'),
    deleteButtonCardElement = cardElement.querySelector('.element__delete-button'),
    likeCount = cardElement.querySelector('.element__like-count');
  cardElement.addEventListener('click', (evt) => {
    if (evt.target === likeButtonCardElement) {
      if (!likeButtonCardElement.classList.contains('element__like-button_active')) {
        likeButtonCardElement.classList.add('element__like-button_active');
        likeCount.textContent = `${+likeCount.textContent + 1}`;
        putLike(evt.target.parentNode.parentNode.parentNode.id);
      }
      else {
        likeButtonCardElement.classList.remove('element__like-button_active');
        likeCount.textContent = `${+likeCount.textContent - 1}`;
        deleteLike(evt.target.parentNode.parentNode.parentNode.id);
      }
    }
    if (evt.target === imageCardElement) {
      imagePopupImage.src = evt.target.src;
      imagePopupImage.alt = evt.target.alt;
      imagePopupTitle.textContent = titleCardElement.textContent;
      openPopup(imagePopup);
    }
    if (evt.target === deleteButtonCardElement) {
      deleteButtonCardElement.parentNode.remove();
      deleteCard(evt.target.parentNode.id);
    }
  });
  imageCardElement.src = item.link;
  imageCardElement.alt = item.name;
  titleCardElement.textContent = item.name;
  likeCount.textContent = item.likes.length;
  cardElement.id = item._id;
  if (item.owner._id !== myID) {
    deleteButtonCardElement.remove();
  }
  if (item.likes.length !== 0) {
    for (let i = 0; i < item.likes.length; i++) {
    if(item.likes[i]._id === myID) {
      likeButtonCardElement.classList.add('element__like-button_active');
    }
    }
  }
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
  deleteButtons
};