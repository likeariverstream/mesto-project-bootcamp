'use strict';

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

const cardTemplate = document.querySelector('#card').content;
const addCard = cardTemplate.querySelector('.element');
const addCardCopy = addCard.cloneNode(true);
const addCardImage = addCardCopy.querySelector('.element__image');
const addCardTitle = addCardCopy.querySelector('.element__title');
const cardList = document.querySelector('.elements');


function createCards() {
  for (let i = 0; i < initialCards.length; i += 1) {
    addCardImage.src = initialCards[i].link;
    addCardImage.alt = initialCards[i].name;
    addCardTitle.textContent = initialCards[i].name;
    cardList.append(addCardCopy.cloneNode(true));
  }
}

createCards();