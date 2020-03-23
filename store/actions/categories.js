import { SET_CATEGORIES, ADD_SELECTED_CATEGORY, REMOVE_SELECTED_CATEGORY } from './types'

export const setCategories = (categories) => {

  return {
    type: SET_CATEGORIES,
    payload: categories
  }
}

export const toggleCategoryFilter = (category) => {
  return (dispatch, getState) => {
  const state = getState()
  const selectedCategories = state.categories.selectedCategories
  const isSelected = selectedCategories.includes(category)

  if (isSelected) {
    return dispatch({
      type: REMOVE_SELECTED_CATEGORY,
      payload: category
    })
  }
  else {
    return dispatch({
      type: ADD_SELECTED_CATEGORY,
      payload: category
    })
  }
    
 

  }
}
