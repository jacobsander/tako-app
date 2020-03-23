import { SET_CITIES, SET_SELECTED_CITIES, ADD_SELECTED_CITY, REMOVE_SELECTED_CITY } from '../actions/types';

const initialState = { 
  cities: [],
  selectedCities: []
};

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITIES:
      return { ...state, cities: action.payload };
    case SET_SELECTED_CITIES:
        return { ...state, selectedCities: action.payload };
    case ADD_SELECTED_CITY:
          return { ...state, selectedCities: [...state.selectedCities, action.payload] };
    case REMOVE_SELECTED_CITY:
      return {
        ...state, 
        selectedCities: state.selectedCities.filter(d => {
          return d !== action.payload
        })
      };      
    default:
      return state;
  }
};

export default citiesReducer