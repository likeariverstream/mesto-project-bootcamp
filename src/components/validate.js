'use strict';

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__span-error_active',
  activeLikeClass: 'element__like-button_active' 
};

const allInputs = document.querySelectorAll(selectors.inputSelector);
const allForms = document.querySelectorAll(selectors.formSelector);
const allSaveButtons = document.querySelectorAll(selectors.submitButtonSelector);

function waitSaving(event) {
  const item = event.target.querySelector(selectors.submitButtonSelector);
  item.textContent = 'Сохранение...';
  item.disabled = true;
}

function loadCallback(event) {
  const item = event.target.querySelector(selectors.submitButtonSelector);
  item.textContent = 'Сохранить';
  item.disabled = false;
}

function disableSaveButton(popup) {
  if (popup.querySelector(selectors.inputSelector)) {
    const button = popup.querySelector(selectors.submitButtonSelector);
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
  allInputs.forEach((item) => {
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
  allForms.forEach((item) => {
    item.addEventListener('input', (evt) => {
      const targetForm = evt.target.form;
      const isValid = targetForm.checkValidity();
      if (!isValid) {
        targetForm.querySelector(selectors.submitButtonSelector).classList.add(selectors.inactiveButtonClass);
        targetForm.querySelector(selectors.submitButtonSelector).disabled = !isValid;
      }
      else {
        targetForm.querySelector(selectors.submitButtonSelector).classList.remove(selectors.inactiveButtonClass);
        targetForm.querySelector(selectors.submitButtonSelector).disabled = !isValid;
      }
    });
  });
}

function enableValidation() {
  hasInvalid();
  toggleSaveButton();
}

export {
  selectors,
  allInputs,
  allForms,
  disableSaveButton,
  hideError,
  enableValidation,
  waitSaving,
  loadCallback
};