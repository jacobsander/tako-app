import { SET_CATEGORIES, SET_SELECTED_CATEGORIES, ADD_SELECTED_CATEGORY, REMOVE_SELECTED_CATEGORY } from '../actions/types'

const initialState = {
  categories: [],
  selectedCategories: []
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_SELECTED_CATEGORIES:
      return { ...state, selectedCategories: action.payload };
    case ADD_SELECTED_CATEGORY:
          return { ...state, selectedCategories: [...state.selectedCategories, action.payload] };
    case REMOVE_SELECTED_CATEGORY:
      return {
        ...state, 
        selectedCategories: state.selectedCategories.filter(d => {
          return d !== action.payload
        })
      };      
    default:
      return state;
  }
};

export default categoriesReducer