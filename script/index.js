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


const cardTemplate = document.querySelector('#card').content;
const cardList = document.querySelector('.elements');
const addCard = cardTemplate.querySelector('.element');
const addCardImage = addCard.querySelector('.element__image');
const addCardDeleteButton = addCard.querySelector('.element__delete-button');
const addCardCaption = addCard.querySelector('.element__caption');
const addCardTitle = addCard.querySelector('.element__title');
const addCardLikeButton = addCard.querySelector('.element__like-button');
const profilePopup = document.querySelector('.popup__edit-profile'); //
const cardPopup = document.querySelector('.popup__add-card');
const imagePopup = document.querySelector('.popup__view-image');
const imagePopupImage = document.querySelector('.popup__image');
const imagePopupTitle = document.querySelector('.popup__title');
const inputFullName = document.querySelector('input[name="fullname"]');
const inputProfession = document.querySelector('input[name="profession"]');
const addImageNameInput = document.querySelector('input[name="image-name"]');
const addImageLinkInput = document.querySelector('input[name="image-link"]');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');
const profileEditForm = document.querySelector('form[name="edit-form"]');
const addImageForm = document.querySelector('form[name="add-form"]');

function addInitialCards () {
  Object.keys(initialCards).forEach((key) => {
      addCardImage.src = initialCards[key].link;
      addCardImage.alt = initialCards[key].name;
      addCardTitle.textContent = initialCards[key].name;
      cardList.append(createCard());
    });
}

addInitialCards();

function setEventListeners() {
      document.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('element__like-button')) {
        evt.target.classList.toggle('element__like-button_active');
      }
      if(evt.target.classList.contains('element__image')) {
        imagePopupImage.src = evt.target.src;
        imagePopupImage.alt = evt.target.alt;
      }
      if(evt.target.classList.contains('element__delete-button')) {
        evt.target.parentNode.remove();
      }
      openPopup();
  }); 
}

setEventListeners();

function createCard() {
  return addCard.cloneNode(true);
}

function openPopup() {
  document.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('element__image')) {
      imagePopup.classList.add('popup_opened');
    }
    if(evt.target.classList.contains('profile__edit-button')) {
      profilePopup.classList.add('popup_opened');
    }
    if(evt.target.classList.contains('profile__add-button')) {
      cardPopup.classList.add('popup_opened');
    }
  });
}

function closePopup() {
  document.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__button-close')) {
      profilePopup.classList.remove('popup_opened');
      cardPopup.classList.remove('popup_opened');
      imagePopup.classList.remove('popup_opened');
    }
    if(evt.target.classList.contains('popup')) {
      closePopup();
    }
  });
  if(formSubmit) {
    profilePopup.classList.remove('popup_opened');
    cardPopup.classList.remove('popup_opened');
    imagePopup.classList.remove('popup_opened');
  }
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      closePopup();
    }
  });
}

closePopup();

function formSubmit() {
  profileEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputFullName.value;
    profileProfession.textContent = inputProfession.value;
    profileEditForm.reset();
    closePopup();
  });
  addImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addCardImage.src = addImageLinkInput.value;
    addCardImage.alt = addImageNameInput.value;
    addCardTitle.textContent = addImageNameInput.value;
    cardList.prepend(createCard());
    addImageForm.reset();
    closePopup();
  });
}

formSubmit();