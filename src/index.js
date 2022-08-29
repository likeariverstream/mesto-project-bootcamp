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

addInitialCards();

submitForm();

enableValidation();