'use strict';

import "./pages/index.css";

import {
  addInitialCards,
} from './components/card.js';

import {
} from './components/utils.js';

import {
  submitForm,
  profileName,
  profileProfession,
  addImageNameInput,
  addImageLinkInput,
  avatarImage,
} from './components/modal.js';

import {
  selectors,
  enableValidation,
  hasInvalid
} from './components/validate.js';

import {
  getUserInfo,

  getInitialCards,
  patchProfile,
  getCards,
  config
} from './components/api.js';

import {
  checkResponse,
  checkError
} from './components/utils.js';

let myId;
function getUserInfoResult(result) {
  profileName.textContent = result.name;
  profileProfession.textContent = result.about;
  avatarImage.src = result.avatar;
  myId = result._id;
}

enableValidation();

submitForm();

Promise.all([getUserInfo().then(checkResponse).then(getUserInfoResult),
getCards().then(checkResponse).then(addInitialCards)])
  .catch(checkError);

  export {
  myId
};