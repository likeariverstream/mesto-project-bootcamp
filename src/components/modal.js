'use strict';

const profilePopup = document.querySelector('.popup__edit-profile');
const cardPopup = document.querySelector('.popup__add-card');
const imagePopup = document.querySelector('.popup__view-image');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const inputFullName = document.querySelector('input[name="fullname"]');
const inputProfession = document.querySelector('input[name="profession"]');
const addImageNameInput = document.querySelector('input[name="image-name"]');
const addImageLinkInput = document.querySelector('input[name="image-link"]');
const profileEditForm = document.querySelector('form[name="edit-form"]');
const addImageForm = document.querySelector('form[name="add-form"]');
const updateAvatarPopup = document.querySelector('.popup__update-avatar');
const avatarImage = document.querySelector('.profile__avatar-image');
const updateAvatarForm = document.querySelector('form[name="update-avatar-form"]');
const avatarLinkInput = document.querySelector('input[name="avatar-link"]');

import {
  allForms,
  allInputs,
  disableSaveButton,
  hideError,
  selectors,
  loadCallback
} from './validate.js';

import {
  cardList,
  imageCard,
  titleCard,
  createCard
} from './card.js';

import {
  patchProfile,
  getNewCard,
  myID
} from './api.js';

function openPopup(popup) {
  disableSaveButton();
  setEventListeners(popup);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closebByEscape);
  allForms.forEach((item) => {
    item.reset();
  });
  allInputs.forEach((item) => {
    hideError(item);
  });
}

avatarImage.addEventListener('click', () => {
  openPopup(updateAvatarPopup);
});

profileEditButton.addEventListener('click', () => {
  openPopup(profilePopup);
  inputFullName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
});

addCardButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

function setEventListeners(popup) {
  const closeButton = popup.querySelector('.popup__button-close');
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === closeButton) {
      closePopup(popup);
    }
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
  document.addEventListener('keydown', closebByEscape);
}

function closebByEscape(evt) {
  if (evt.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function submitForm() {
  profileEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputFullName.value;
    profileProfession.textContent = inputProfession.value;
    patchProfile();
    loadCallback(evt);
    closePopup(profilePopup);
  });
  addImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let objCard = {
      _id: '',
      link: addImageLinkInput.value,
      name: addImageNameInput.value,
      likes: [],
      owner: {
        _id: myID,
      }
    };
    cardList.prepend(createCard(objCard));
    getNewCard(objCard);
    loadCallback(evt);
    closePopup(cardPopup);
  });
  updateAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log(avatarLinkInput.value);
    avatarImage.src = avatarLinkInput.value;
    patchProfile();
    loadCallback(evt);
    closePopup(updateAvatarPopup);
  });
}

export {
  profilePopup,
  cardPopup,
  imagePopup,
  profileName,
  profileProfession,
  addImageNameInput,
  addImageLinkInput,
  avatarLinkInput,
  avatarImage,
  openPopup,
  closePopup,
  setEventListeners,
  submitForm
};