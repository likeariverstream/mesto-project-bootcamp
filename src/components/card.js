'use strict';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

import {
  openPopup,
  imagePopup
} from './modal';

const cardTemplate = document.querySelector('#card').content;
const cardList = document.querySelector('.elements');
const card = cardTemplate.querySelector('.element');
const imagePopupImage = document.querySelector('.popup__image');
const imageCard = card.querySelector('.element__image');
const titleCard = card.querySelector('.element__title');
const imagePopupTitle = document.querySelector('.popup__title');


function addInitialCards() {
  Object.keys(initialCards).forEach((item) => {
    cardList.append(createCard(initialCards[item]));
  });
}

function createCard(item) {
  const cardElement = card.cloneNode(true),
    imageCardElement = cardElement.querySelector('.element__image'),
    titleCardElement = cardElement.querySelector('.element__title'),
    likeButtonCardElement = cardElement.querySelector('.element__like-button'),
    deleteButtonCardElement = cardElement.querySelector('.element__delete-button');
  cardElement.addEventListener('click', (evt) => {
    if (evt.target === likeButtonCardElement) {
      likeButtonCardElement.classList.toggle('element__like-button_active');
    }
    if (evt.target === imageCardElement) {
      imagePopupImage.src = evt.target.src;
      imagePopupImage.alt = evt.target.alt;
      imagePopupTitle.textContent = titleCardElement.textContent;
      openPopup(imagePopup);
    }
    if (evt.target === deleteButtonCardElement) {
      deleteButtonCardElement.parentNode.remove();
    }
  });
  imageCardElement.src = item.link;
  imageCardElement.alt = item.name;
  titleCardElement.textContent = item.name;
  return cardElement;
}

export {
  initialCards,
  cardTemplate,
  cardList,
  card,
  imageCard,
  titleCard,
  addInitialCards,
  createCard
};