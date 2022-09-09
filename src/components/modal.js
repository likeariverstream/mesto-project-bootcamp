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
const avatarProfileUpdateContainer = document.querySelector('.profile__update-container');
const updateAvatarForm = document.querySelector('form[name="update-avatar-form"]');
const avatarLinkInput = document.querySelector('input[name="avatar-link"]');
const deleteCardForm = document.querySelector('form[name="delete-card-form"]');
const deleteCardPopup = document.querySelector('.popup__delete-card');
const popups = document.querySelectorAll('.popup');

import {
  disableSaveButton,
  settings
} from './validate.js';

import {
  cardList,
  createCard,
  elemId,
  targetElement
} from './card.js';

import {
  patchProfile,
  patchAvatar,
  getNewCard,
  deleteCard
} from './api.js';

import {
  myId
} from '../index.js';

import {
  checkError,
  waitSaving,
  stopSaving
} from './utils.js';
console.dir(document.querySelector('.popup__input'));

function prependNewCard(result) {
  cardList.prepend(createCard(result));
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closebByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closebByEscape);
}

avatarProfileUpdateContainer.addEventListener('click', (evt) => {
  openPopup(updateAvatarPopup);
  disableSaveButton(updateAvatarPopup, { ...settings });
});

profileEditButton.addEventListener('click', () => {
  openPopup(profilePopup);
  inputFullName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
});

addCardButton.addEventListener('click', () => {
  openPopup(cardPopup);
  disableSaveButton(cardPopup, { ...settings });
});

deleteCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteCard(elemId)
    .then(() => {
      targetElement.remove();
      closePopup(deleteCardPopup);
    })
    .catch((err) => {
      checkError(err);
    });
});

function setPopupCloseEventListeners(selectors) {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(selectors.popupClass)) {
        closePopup(popup);
      }
      if (evt.target.classList.contains(selectors.buttonCloseClass)) {
        closePopup(popup);
      }
    });
  });
}

function closebByEscape(evt) {
  if (evt.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function setSubmitHanlers() {
  profileEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    waitSaving(evt);
    const name = inputFullName.value;
    const about = inputProfession.value;
    patchProfile(name, about)
      .then(() => {
        profileName.textContent = name;
        profileProfession.textContent = about;
        closePopup(profilePopup);
      })
      .catch((err) => {
        checkError(err);
      })
      .finally(() => stopSaving(evt));
  });
  addImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const objCard = {
      name: addImageNameInput.value,
      link: addImageLinkInput.value,
      likes: [],
      owner: {
        _id: myId,
      },
    };
    waitSaving(evt);
    getNewCard(objCard)
      .then((result) => {
        objCard._id = result._id;
        prependNewCard(objCard);
        closePopup(cardPopup);
        addImageForm.reset();
      })
      .catch((err) => {
        checkError(err);
      })
      .finally(() => stopSaving(evt));
  });
  updateAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const input = avatarLinkInput.value;
    waitSaving(evt);
    patchAvatar(input)
      .then(() => {
        avatarImage.src = input;
        closePopup(updateAvatarPopup);
        updateAvatarForm.reset();
      })
      .catch((err) => {
        checkError(err);
      })
      .finally(() => stopSaving(evt));
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
  setSubmitHanlers,
  deleteCardPopup,
  deleteCardForm,
  setPopupCloseEventListeners
};