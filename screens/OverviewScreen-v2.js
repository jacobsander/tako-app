import React, { useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import {connect, useSelector} from 'react-redux'
import {toggleFavorite} from '../store/actions/pin'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const OverviewScreen = ({navigation, pins, toggle, favorites}) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  
  const citySelectedFilters = useSelector(state => state.cities.selectedCities)
  const categorySelectedFilters = useSelector(state => state.categories.selectedCategories)
  
  const filteredPins = pins.filter(pin => {
    const categories = Object.keys(pin.filters);
    const city = pin.city
    console.log(citySelectedFilters)
  
    let matches = false;
    categories.forEach(f => {
      if (categorySelectedFilters.includes(f)) {
        matches = true
      }
    })

    if (!citySelectedFilters.includes(city)) {
      matches = false
    }

    return matches
  })
  
  const currentPin = filteredPins[currentIndex] || {};

  return(
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, marginTop: 8}}>
        <Text style={{color: 'black'}}>{currentIndex + 1}/{pins.length}</Text>
      </View>
      <View style={{paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 20, marginVertical: 8}}>
      <Text style={{color: '#FFF', fontSize: 18, marginBottom: 8, marginTop: 8, fontWeight: '800'}}>{currentPin.name}</Text> 
      </View>
      <TouchableOpacity style={{flex: 1, width: '90%'}} onPress={()=>navigation.navigate('CardsDetail', {id: currentPin.id})}>
        <View style={{
          shadowOffset:{  width: 0,  height: 5 },
          shadowRadius: 15,
          shadowColor: 'black',
          shadowOpacity: 0.5
        }}>
          <Image
          style={{width: '100%', height: '100%', borderRadius: 20}}
          source={{uri: currentPin.imageUrl}}
          />
        </View>
      </TouchableOpacity>
      <View style={{height: 90, flexDirection: 'row', width: '100%', justifyContent:'space-between', alignItems: 'center', paddingHorizontal: 80}}>

        <TouchableOpacity 
        onPress={()=>setCurrentIndex(c => c - 1)}
        disabled={currentIndex === 0}>
        <Icon style={styles.nextButton} name="arrow-left-bold-circle"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          const currentId = currentPin.id;
          toggle(currentId)
        }}>
          {favorites.includes(currentPin.id) ? <Icon style={styles.fullHeart} name="heart"/> : <Icon style={styles.emptyHeart} name="heart-outline"/>}
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
            setCurrentIndex(c => c + 1)
          }}
          disabled={currentIndex === pins.length - 1}>
           <Icon style={styles.nextButton} name="arrow-right-bold-circle"/>
        </TouchableOpacity>
      </View>
    </View>
    );
   }

   OverviewScreen.navigationOptions = ({navigation}) => {
    const title = navigation.getParam('headerName') 
    return{
      title, 
      headerRight: () => {
        return (
          <View style={styles.filterIconBackground}>
            <Icon style={styles.filterButton} name="filter-variant" 
            onPress={()=> {navigation.navigate('Filters');}}
            />
          </View>
        )
      }
    }
}

   const styles = StyleSheet.create({
  
    buttonArea: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    top: {
        width: "90%",
        height: "5%",
        alignItems: "center",
    },
    searchBarArea: {
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      },
    searchBar: {
        width: "90%",
        height: "100%",
        borderRadius: 5,
        backgroundColor: "white",
        textAlign: "center",
        shadowOffset:{  width: 1,  height: 1, },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
      },
    cardTitle: {
        fontSize: 24,
        paddingVertical: 20
    },
    card: {
        height: '90%',
        width: 350,
        borderRadius: 10,
        resizeMode: "cover",
    },
  cardShadow: {
        shadowOffset:{  width: 0,  height: 5 },
        shadowRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 1
  },
    bottom: {
      height: 40,
      width: '100%',

    }, 
  nextButton: {
    fontSize: 66,
    color: '#2c3e50'
  },
  prevButton: {
    fontSize: 66,
    color: '#2c3e50'
  },
  fullHeart: {
    fontSize: 66,
    color: '#e74c3c'
  },
  emptyHeart: {
    fontSize: 66,
    color: '#e74c3c'
  },
  filterIconBackground: {
    flexDirection: 'row',
    marginRight: 18, 
    backgroundColor: 'blue', 
    height: 35, 
    width: 35, 
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterButton: {
    fontSize: 24,
    color: 'white',
    marginTop: 5
  }
    });

    const mapStateToProps = state => {
      return {
        places: state.places.places,
        pins: state.pins.pins,
        favorites: state.pins.favorites
      }
    }

    const mapDispatchToProps = dispatch => {
      return {
        toggle: (pinId) => {
          dispatch(toggleFavorite(pinId))
        }
      }
    }

export default connect(mapStateToProps, mapDispatchToProps)(OverviewScreen);