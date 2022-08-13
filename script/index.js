'use strict';

const cardTemplate = document.querySelector('#card').content;
const addCard = cardTemplate.querySelector('.element');
const addCardCopy = addCard.cloneNode(true);
const addCardImage = addCardCopy.querySelector('.element__image');
const addCardTitle = addCardCopy.querySelector('.element__title');
const cardList = document.querySelector('.elements');
const profilePopup = document.querySelector('.popup__edit-profile');
const cardPopup = document.querySelector('.popup__add-card');
const imagePopup = document.querySelector('.popup__view-image');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const imagePopupImage = document.querySelector('.popup__image');
const imagePopupTitle = document.querySelector('.popup__title');
const closeButton = document.querySelectorAll('.popup__button-close');

//Массив ссылок:
const initialCards = [
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
];

//Копия массива ссылок:
const copyInitialCards = initialCards.slice();

function createCards() {
  for (let i = 0; i < 6; i += 1) {
    if(copyInitialCards[i].link != undefined) {
    addCardImage.src = copyInitialCards[i].link;
    addCardImage.alt = copyInitialCards[i].name;
    addCardTitle.textContent = copyInitialCards[i].name;
    cardList.append(addCardCopy.cloneNode(true));
    }
  }
}

createCards();

editProfileButton.addEventListener('click', openPopup);
addCardButton.addEventListener('click', openPopup);

function openPopup(evt) {
  elementImage.forEach(elementImage => {
    elementImage.onclick = (evt) => {
      imagePopupImage.src = evt.target.src;
      imagePopupTitle.textContent = evt.target.alt;
      imagePopup.classList.add('popup_opened');
    };
  });
  if (evt.target === editProfileButton) {
    profilePopup.classList.add('popup_opened');
    recordInput();
  } if (evt.target === addCardButton) {
    cardPopup.classList.add('popup_opened');
  }
}

const elementImage = document.querySelectorAll('.element__image');

const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');
const inputFullName = document.querySelector('input[name="fullname"]');
const inputProfession = document.querySelector('input[name="profession"]');
const saveButton = document.querySelector('.popup__button-save');
const profilePopupForm = document.querySelector('.popup__form');
const popup = document.querySelectorAll('.popup');

function recordInput() {
  if (profilePopup.classList.contains('popup_opened')) {
    inputFullName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
  }
}

function formSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputFullName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup();
}

profilePopupForm.addEventListener('submit', formSubmit);

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    closePopup();
  }
});

function popupCloseOverlayClick(evt) {
  popup.forEach(popup => {
    popup.onclick = (evt) => {
      if (evt.target === popup) {
        popup.classList.remove('popup_opened');
      }
    };
  });
}

popupCloseOverlayClick();

function closePopup() {
  closeButton.forEach(closeButton => {
    closeButton.onclick = () => {
      if (profilePopup.classList.contains('popup_opened')) {
        profilePopup.classList.remove('popup_opened');
      } else if (cardPopup.classList.contains('popup_opened')) {
        cardPopup.classList.remove('popup_opened');
      } else { imagePopup.classList.remove('popup_opened'); }
    };
  });
  if (formSubmit) {
    profilePopup.classList.remove('popup_opened');
  }
  if (addImageFormSubmit) {
    cardPopup.classList.remove('popup_opened');
  }
}

closePopup();

const likeButton = document.querySelectorAll('.element__like-button');

function likeImageButton() {
  likeButton.forEach(likeButton => {
    likeButton.onclick = () => {
      likeButton.classList.toggle('element__like-button_active');
    };
  });
}

likeImageButton();

const addImageButton = document.querySelector('.profile__add-button');
const addImageForm = document.querySelector('form[name="add-form"]');
const addImageNameInput = document.querySelector('input[name="image-name"]');
const addImageLinkInput = document.querySelector('input[name="image-link"]');
const cardListElements = document.querySelectorAll('.element');
const deleteButton = cardList.querySelectorAll('.element__delete-button');

function addImageFormSubmit(evt) {
  evt.preventDefault();
  cardList.innerHTML = '';
  let obj = {
    name: addImageNameInput.value,
    link: addImageLinkInput.value
  };
  copyInitialCards.unshift(obj);
  createCards();
  closePopup();
}

addImageForm.addEventListener('submit', addImageFormSubmit);

console.log(deleteButton);

function deleteCard(i) {
  deleteButton.forEach(deleteButton => {
    deleteButton.onclick = () => {
      copyInitialCards.splice(i, 1);
      copyInitialCards.push({});
      cardList.innerHTML = '';
      createCards();
    };
    console.log(deleteButton);
  });
  console.log(deleteButton);
}

deleteCard();