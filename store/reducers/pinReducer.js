// placeReducer.js

import { SET_PINS, TOGGLE_FAVORITE, ADD_PIN } from '../actions/types';

const initialState = {
  pins: [],
  favorites: []
};

const pinReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_PINS:
      return {
        ...state,
        pins: action.payload
      };
    case ADD_PIN:
      const newPins = [...pins, action.payload];
      return {
        ...state,
        pins: newPins
      };
    case TOGGLE_FAVORITE: 
      const pinId = action.payload.pinId;
      let favorites = [...state.favorites];
      if (favorites.includes(pinId)) {
        favorites = favorites.filter(f => f !== pinId);
      } else {
        favorites.push(pinId)
      }
      return {
        ...state, 
        favorites
      }
    default:
      return state;
  }
}


export default pinReducer