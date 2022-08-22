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
const cardList = document.querySelector('.elements');
const card = cardTemplate.querySelector('.element');
const imageCard = card.querySelector('.element__image');
const titleCard = card.querySelector('.element__title');

function addInitialCards() {
  Object.keys(initialCards).forEach((key) => {
    imageCard.src = initialCards[key].link;
    imageCard.alt = initialCards[key].name;
    titleCard.textContent = initialCards[key].name;
    cardList.append(createCard());
  });
}

function createCard() {
  return card.cloneNode(true);
}

export {
  initialCards,
  cardTemplate,
  cardList,
  card,
  imageCard,
  titleCard,
  addInitialCards,
  createCard
};