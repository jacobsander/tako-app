import React, {useEffect} from 'react';
import TestNavigator from './navigation/Navigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { connect } from 'react-redux'
import { setPins } from './store/actions/pin'
import Axios from 'axios'


state = {
  placeName: '',
  places: []
}

placeSubmitHandler = () => {
   console.log("Submitted");	
}

console.disableYellowBox = true

const App = ({pins, setPins}) => {
  
  // When component is moounted (like componentDidMount in class implementation)
  useEffect(() => {
    Axios('https://takotest-99efe.firebaseio.com/pins.json').then(response => {
      const data = response.data;
      const keys = Object.keys(data);
      const output = keys.map(key => {
          const item = data[key] || {};
          item.id = key;
          return item;
      })
      setPins(output)
    })
  }, []);

  useEffect(() => {
    console.log(pins)
  }, [pins])


  return (
      <TestNavigator/>
  );
}

const mapStateToProps = state => {
  return {
    places: state.places.places,
    pins: state.pins.pins
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    setPins: (pins) => {
      dispatch(setPins(pins))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


