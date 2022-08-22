const profilePopup = document.querySelector('.popup__edit-profile');
const cardPopup = document.querySelector('.popup__add-card');
const imagePopup = document.querySelector('.popup__view-image');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');

import {
  profileEditForm,
  addImageForm,
  inputFullName,
  inputProfession,
  addImageLinkInput,
  addImageNameInput
} from './validate.js';

import {
  cardList,
  imageCard,
  titleCard,
  createCard
} from './card.js';


function openPopup() {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__image')) {
      imagePopup.classList.add('popup_opened');
    }
    if (evt.target.classList.contains('profile__edit-button')) {
      profilePopup.classList.add('popup_opened');
    }
    if (evt.target.classList.contains('profile__add-button')) {
      cardPopup.classList.add('popup_opened');
    }
  });
}

function closePopup() {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__button-close')) {
      profilePopup.classList.remove('popup_opened');
      cardPopup.classList.remove('popup_opened');
      imagePopup.classList.remove('popup_opened');
    }
    if (evt.target.classList.contains('popup')) {
      closePopup();
    }
  });
  if (submitForm) {
    profilePopup.classList.remove('popup_opened');
    cardPopup.classList.remove('popup_opened');
    imagePopup.classList.remove('popup_opened');
  }
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      closePopup();
    }
  });
  profileEditForm.reset();
  addImageForm.reset();
}

function submitForm() {
  profileEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputFullName.value;
    profileProfession.textContent = inputProfession.value;
    closePopup();
  });
  addImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    imageCard.src = addImageLinkInput.value;
    imageCard.alt = addImageNameInput.value;
    titleCard.textContent = addImageNameInput.value;
    cardList.prepend(createCard());
    closePopup();
  });
}

export {
  profilePopup,
  cardPopup,
  imagePopup,
  profileName,
  profileProfession,
  openPopup,
  closePopup,
  submitForm
};