import { createStore, combineReducers } from 'redux';
import placeReducer from './reducers/placeReducer';
import pinReducer from './reducers/pinReducer';

const rootReducer = combineReducers({
  places: placeReducer,
  pins: pinReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;