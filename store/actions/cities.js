import { SET_CITIES, REMOVE_SELECTED_CITY, ADD_SELECTED_CITY} from './types';

export const setCities = (cities) => {
  return {
    type: SET_CITIES,
    payload: cities
  }
}

export const toggleCityFilter = (city) => {
  return (dispatch, getState) => {
    const state = getState()
    const selectedCities = state.cities.selectedCities
    const isSelected = selectedCities.includes(city)
  
    if (isSelected) {
      return dispatch({
        type: REMOVE_SELECTED_CITY,
        payload: city
      })
    }
    else {
      return dispatch({
        type: ADD_SELECTED_CITY,
        payload: city
      })
    }
      
   
  
    }
}
