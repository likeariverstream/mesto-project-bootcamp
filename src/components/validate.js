'use strict';

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__span-error_active',
  activeLikeClass: 'element__like-button_active',
  buttonClose: 'popup__button-close',
  popupSelector: 'popup',
};

const inputList = document.querySelectorAll(selectors.inputSelector);
const formList = document.querySelectorAll(selectors.formSelector);

function disableSaveButton(popup) {
  const form = popup.querySelector(selectors.formSelector);
  const button = popup.querySelector(selectors.submitButtonSelector);
  if (popup.querySelector(selectors.inputSelector) && !form.checkValidity()) {
    button.classList.add(selectors.inactiveButtonClass);
    button.disabled = true;
  }
}

function hideError(item) {
  item.classList.remove(selectors.inputErrorClass);
  item.nextElementSibling.classList.remove(selectors.errorClass);
}

function showError(item) {
  item.classList.add(selectors.inputErrorClass);
  item.nextElementSibling.classList.add(selectors.errorClass);
}

function hasInvalid() {
  inputList.forEach((item) => {
    item.addEventListener('input', (evt) => {
      if (!evt.target.validity.valid) {
        showError(evt.target);
      }
      if (evt.target.validity.valid) {
        hideError(evt.target);
      }
    });
  });
}

function toggleSaveButton() {
  formList.forEach((item) => {
    item.addEventListener('input', (evt) => {
      const targetForm = evt.target.form;
      const button = targetForm.querySelector(selectors.submitButtonSelector);
      const isValid = targetForm.checkValidity();
      if (!isValid) {
        button.classList.add(selectors.inactiveButtonClass);
        button.disabled = !isValid;
      }
      else {
        button.classList.remove(selectors.inactiveButtonClass);
        button.disabled = !isValid;
      }
    });
  });
}

function enableValidation(settings) {

  hasInvalid();
  toggleSaveButton(settings);
}

export {
  selectors,
  inputList,
  formList,
  disableSaveButton,
  hideError,
  enableValidation,
};