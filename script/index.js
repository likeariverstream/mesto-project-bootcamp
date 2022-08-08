'use strict';

const popup = document.querySelector('.popup'),
  popupEditButton = document.querySelector('.profile__edit-button'),
  popupCloseButton = document.querySelector('.popup__button-close');

  function closePopup() {
    popup.classList.remove('popup_opened');
    document.body.style.overflow = '';
  }

popupEditButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  document.body.style.overflow = 'hidden';
});

popupCloseButton.addEventListener('click', closePopup);

popup.addEventListener('click', (evt) => {
  if (evt.target === popup) {
    closePopup();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    closePopup();
  }
});





