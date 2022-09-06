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
const deleteCardForm = document.querySelector('form[name="delete-card-form"]');
const deleteCardPopup = document.querySelector('.popup__delete-card');

import {
  allForms,
  allInputs,
  disableSaveButton,
  hideError,
  selectors,
  waitSaving,
  loadCallback
} from './validate.js';

import {
  cardList,
  imageCard,
  titleCard,
  createCard,
  addInitialCards
} from './card.js';

import {
  patchProfile,
  patchAvatar,
  getNewCard,
  putLike,
  getCards,
  deleteCard
} from './api.js';

import {
  myId
} from '../index.js';

import {
  checkResponse,
  checkResult,
  checkError,
} from './utils.js';

function prependNewCard(result) {
  cardList.prepend(createCard(result));
}

function openPopup(popup) {
  disableSaveButton(popup);
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

function submitForm(cardId) {
  profileEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const name = profileName.textContent = inputFullName.value;
    const about = profileProfession.textContent = inputProfession.value;
    waitSaving(evt);
    patchProfile(name, about)
      .then(checkResponse)
      .then(checkResult)
      .catch(checkError)
      .finally(() => loadCallback(evt));
    closePopup(profilePopup);
  });
  addImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let objCard = {
      name: addImageNameInput.value,
      link: addImageLinkInput.value,
      likes: [],
      _id: cardId,
      owner: {
        _id: myId,
      }
    };
    waitSaving(evt);
    getNewCard(objCard)
      .then(checkResponse)
      .then(prependNewCard)
      .then(getCards)
      .catch(checkError);
    getCards()
      .then(checkResponse)
      .then(addInitialCards)
      .catch(checkError)
      .finally(() => loadCallback(evt));
    closePopup(cardPopup);
  });
  updateAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const input = avatarImage.src = avatarLinkInput.value;
    waitSaving(evt);
    patchAvatar(input)
      .then(checkResponse)
      .then(checkResult)
      .catch(checkError)
      .finally(() => loadCallback(evt));
    closePopup(updateAvatarPopup);
  });
  deleteCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    deleteCard(cardId)
      .then(checkResponse)
      .then(checkResult)
      .then(() => {
        document.getElementById(cardId).remove();
      })
      .catch(checkError);
    closePopup(deleteCardPopup);
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
  submitForm,
  deleteCardPopup
};