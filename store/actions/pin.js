// place.js

import { SET_PINS, TOGGLE_FAVORITE, ADD_PIN } from './types';

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

export const addPin = (pin) => {
  return {
    type: ADD_PIN,
    payload: pin
  }
}