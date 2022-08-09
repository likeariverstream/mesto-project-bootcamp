'use strict';

const popup = document.querySelector('.popup'),
  popupContainer = document.querySelector('.popup__container'),
  popupEditButton = document.querySelector('.profile__edit-button'),
  popupCloseButton = document.querySelector('.popup__button-close'),
  //Для работы с объектами input:
  profileName = document.querySelector('.profile__title'),
  profileProfession = document.querySelector('.profile__subtitle'),
  popupForm = document.querySelector('.popup__form'),
  inputFullName = document.querySelectorAll('.popup__input')[0],
  inputProfession = document.querySelectorAll('.popup__input')[1],
  popupSaveButton = document.querySelector('.popup__button-save'),
  popupAddButton = document.querySelector('.profile__add-button'),
  //Для работы с массивом изображений:
  elementImage = document.querySelectorAll('.element__image'),
  elementTitle = document.querySelectorAll('.element__title'),
  //Массив ссылок:
  initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ],
  //Шаблон формы добавления картинки:
  addFormTemplate = document.querySelector('#add-form').content,
  addForm = addFormTemplate.querySelector('.popup__form').cloneNode(true);

function closePopup() {
    popup.classList.remove('popup_opened');
    addForm.remove();
    popupContainer.append(popupForm);
}

popupEditButton.addEventListener('click', () => {
  popup.classList.add('popup_opened'); // вынести в отдельную функцию?
  recordInput();
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

function recordInput() {
  if(popup.classList.contains('popup_opened')) {
    inputFullName.value = profileName.textContent;
    inputProfession.value =  profileProfession.textContent;
  }
}

function formSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputFullName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup();
}

popupForm.addEventListener('submit', formSubmit);

elementImage.forEach(() => {
  for (let i = 0; i < elementImage.length; i += 1) {
    elementImage[i].src = initialCards[i].link;
    elementImage[i].alt = initialCards[i].name;
  }
});

elementTitle.forEach(() => {
  for (let i = 0; i < elementImage.length; i += 1) {
    elementTitle[i].innerHTML = initialCards[i].name;
  }
});

popupAddButton.addEventListener('click', () =>{
  popupForm.remove();
  popup.classList.add('popup_opened');
  popupContainer.append(addForm);
});