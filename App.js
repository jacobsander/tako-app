import React, {useEffect} from 'react';
import TestNavigator from './navigation/Navigator-v2';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { connect } from 'react-redux'
import { setPins } from './store/actions/pin'
import { setCategories } from './store/actions/categories'
import { setCities } from './store/actions/cities'
import Axios from 'axios'


state = {
  placeName: '',
  places: []
}

placeSubmitHandler = () => {
   console.log("Submitted");	
}

console.disableYellowBox = true

const App = ({pins, setPins, setCities, setCategories}) => {
  
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
    Axios('https://takotest-99efe.firebaseio.com/filters.json').then(response => {
      const data = response.data;
      const keys = Object.keys(data);
      const output = keys.map(key => {
          const item = data[key] || {};
          item.id = key;
          return item;
      })
      setCategories(output)
      console.log(output)
    })
    Axios('https://takotest-99efe.firebaseio.com/cities.json').then(response => {
      const data = response.data;
      const keys = Object.keys(data);
      const output = keys.map(key => {
          const item = data[key] || {};
          item.id = key;
          return item;
      })
      console.log(output)
      setCities(output)
    })
  }, []);

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
    setCategories: (categories) => {
      dispatch(setCategories(categories))
    },
    setCities: (cities) => {
      dispatch(setCities(cities))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


