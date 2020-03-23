import { createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import placeReducer from './reducers/placeReducer';
import pinReducer from './reducers/pinReducer';
import citiesReducer from './reducers/citiesReducer';
import categoriesReducer from './reducers/categoriesReducer';
import { applyMiddleware } from 'redux';

const rootReducer = combineReducers({
  places: placeReducer,
  pins: pinReducer,
  cities: citiesReducer,
  categories: categoriesReducer
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;