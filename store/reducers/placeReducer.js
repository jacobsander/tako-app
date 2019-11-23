// placeReducer.js

import { ADD_PLACE } from '../actions/types';

const initialState = {
  placeName: '',
  places: [
      'HEY'
  ]
};

const placeReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          value: action.payload
        })
      };
    default:
      return state;
  }
}

export default placeReducer