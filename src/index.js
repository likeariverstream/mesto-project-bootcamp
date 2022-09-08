'use strict';

import "./pages/index.css";

import {
  addInitialCards,
} from './components/card.js';

import {
} from './components/utils.js';

import {
  setSubmitHanlers,
  profileName,
  profileProfession,
  avatarImage,
  setEventListeners
} from './components/modal.js';

import {
  selectors,
  enableValidation,
} from './components/validate.js';

import {
  getUserInfo,
  getCards,
} from './components/api.js';

import {
  checkError
} from './components/utils.js';

let myId;

function getUserInfoResult(userData) {
  profileName.textContent = userData.name;
  profileProfession.textContent = userData.about;
  avatarImage.src = userData.avatar;
  myId = userData._id;
}

enableValidation(selectors);

setEventListeners();

setSubmitHanlers();

Promise.all([getUserInfo(), getCards()])
  .then((result) => {
    const [userData, cards] = [...result];
    return [userData, cards];
  })
  .then(([userData, cards]) => {
    // console.log(cards);
    getUserInfoResult(userData);
    addInitialCards(cards);
  })
  .catch(checkError);

export {
  myId
};