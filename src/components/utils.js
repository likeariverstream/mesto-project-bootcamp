const imagePopupImage = document.querySelector('.popup__image');

import {
  openPopup
} from './modal.js';

function setEventListeners() {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__like-button')) {
      evt.target.classList.toggle('element__like-button_active');
    }
    if (evt.target.classList.contains('element__image')) {
      imagePopupImage.src = evt.target.src;
      imagePopupImage.alt = evt.target.alt;
    }
    if (evt.target.classList.contains('element__delete-button')) {
      evt.target.parentNode.remove();
    }
    openPopup();
  });
}

export {
  imagePopupImage,
  setEventListeners
};