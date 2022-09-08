'use strict';

const settings = {
  formSelector: '.popup__form',
  fieldsetSelector: 'popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  errorElementSelector: '.popup__span-error_active',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_error',
  errorElementClass: 'popup__span-error_active',
  buttonCloseClass: 'popup__button-close',
  popupClass: 'popup',
};

function disableSaveButton(popup, selectors) {
  const formElement = popup.querySelector(selectors.formSelector);
  const buttonElement = popup.querySelector(selectors.submitButtonSelector);
  if (popup.querySelector(selectors.inputSelector) && !formElement.checkValidity()) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

function showInputError(inputElement, selectors, errorMessage) {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add((selectors.errorElementClass));
};

function hideInputError(inputElement, selectors) {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorElementClass);
  errorElement.textContent = '';
}

function checkInputValidity(inputElement, selectors) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, selectors, inputElement.validationMessage);
  } else {
    hideInputError(inputElement, selectors);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, selectors) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
}

function enableValidation(selectors) {
  const formList = document.querySelectorAll(selectors.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
}

export {
  settings,
  disableSaveButton,
  enableValidation
};