'use strict';

import "./pages/index.css";

import {
  addInitialCards,
} from './components/card.js';

import {
} from './components/utils.js';

import {
  submitForm
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
  myID,
  initialCards,
} from './components/api.js';

submitForm();

enableValidation();

getUserInfo();