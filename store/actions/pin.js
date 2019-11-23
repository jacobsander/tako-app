// place.js

import { SET_PINS, TOGGLE_FAVORITE } from './types';

export const setPins = (pins) => {
  return {
    type: SET_PINS,
    payload: pins
  }
}

export const toggleFavorite = (pinId) => {
  return {
    type: TOGGLE_FAVORITE,
    payload: {
      pinId
    }
  }
}