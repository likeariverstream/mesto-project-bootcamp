'use strict';

import "./pages/index.css";

import {
  addInitialCards,
} from './components/card.js';

import {
  setEventListeners
} from './components/utils.js';

import {
  closePopup,
  submitForm
} from './components/modal.js';

import {
  selectors,
  enableValidation
} from './components/validate.js';

addInitialCards();

setEventListeners();

closePopup();

submitForm();

enableValidation(selectors);