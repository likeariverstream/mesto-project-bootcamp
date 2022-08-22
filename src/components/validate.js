const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__span-error_active'
};
const profileEditForm = document.querySelector('form[name="edit-form"]');
const addImageForm = document.querySelector('form[name="add-form"]');
const profileEditFormSaveButton = profileEditForm.querySelector('.popup__button-save');
const addImageFormSaveButton = addImageForm.querySelector('.popup__button-save');
const allInputs = document.querySelectorAll('.popup__input');
const inputFullName = document.querySelector('input[name="fullname"]');
const inputProfession = document.querySelector('input[name="profession"]');
const addImageNameInput = document.querySelector('input[name="image-name"]');
const addImageLinkInput = document.querySelector('input[name="image-link"]');

function isValid() {
  profileEditFormSaveButton.classList.add('popup__button-save_disabled');
  addImageFormSaveButton.classList.add('popup__button-save_disabled');
  profileEditFormSaveButton.setAttribute("disabled", "");
  addImageFormSaveButton.setAttribute("disabled", "");
  profileEditForm.addEventListener('input', () => {
    if (inputFullName.validity.valid && inputProfession.validity.valid) {
      profileEditFormSaveButton.classList.remove('popup__button-save_disabled');
      profileEditFormSaveButton.removeAttribute("disabled", "");
    }
  });
  addImageForm.addEventListener('input', () => {
    if (addImageNameInput.validity.valid && addImageLinkInput.validity.valid) {
      addImageFormSaveButton.classList.remove('popup__button-save_disabled');
      addImageFormSaveButton.removeAttribute("disabled", "");
    }
  });
}

function hasInvalid() {
  allInputs.forEach((item) => {
    item.addEventListener('input', (evt) => {
      if (!item.validity.valid) {
        item.classList.add('popup__input_error');
        item.nextElementSibling.classList.add('popup__span-error_active');
      } if (item.validity.valid) {
        item.classList.remove('popup__input_error');
        item.nextElementSibling.classList.remove('popup__span-error_active');
      }
    });
  });
}

function enableValidation() {
  isValid();
  hasInvalid();
}

export {
  selectors,
  profileEditForm,
  addImageForm,
  profileEditFormSaveButton,
  addImageFormSaveButton,
  allInputs,
  inputFullName,
  inputProfession,
  addImageNameInput,
  addImageLinkInput,
  isValid,
  hasInvalid,
  enableValidation
};