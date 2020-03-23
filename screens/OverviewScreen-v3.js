import React, { useEffect, useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import {connect, useSelector} from 'react-redux'
import {toggleFavorite} from '../store/actions/pin'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const OverviewScreen = ({navigation, toggle, favorites}) => {

const pins = useSelector(state => state.pins.pins)
const selectedCities = useSelector(state => state.cities.selectedCities)
const selectedCategories = useSelector(state => state.categories.selectedCategories)

const filteredPins = pins.filter(pin => {
  // Get information 
  const city = pin.city
  const categoriesObject = pin.filters || []
  const categories = Object.keys(categoriesObject); // turn categories into array


  // Check for matches
  const matchesCity = selectedCities.includes(city)
  const matchesCategory = categories.map(category => {
    return selectedCategories.includes(category)
  }).includes(true)

  if (matchesCity && matchesCategory) {
    return true
  }  
})

  return(
    <View style={styles.container}>
        <FlatList
        data={filteredPins}
        style={{width: '100%'}}
        renderItem={({item}) => (
          <TouchableOpacity
          onPress={() => {
              navigation.navigate('CardsDetail', {id: item.id})
          }}
          >
            <View 
            style={styles.itemContainer}
            >
              
              
              <View style={{backgroundColor: '#3742fa', paddingHorizontal: 25, width: '100%'}}>
              <Text style={styles.itemText}>
                {item.name}
              </Text>
              </View>
              <Image
              source={{uri: item.imageUrl}}
              style={styles.cityImage}
              />
              <TouchableOpacity 
                    onPress={() => {
                    const filteredPinsId = item.id;
                    console.log(filteredPinsId)
                    toggle(filteredPinsId)
                    }}>
                        {favorites.includes(item.id) ? <Icon size={42} style={{color: '#e74c3c', position: 'absolute', top: -1250, left: 150, zIndex: 1}} name="heart"/> : <Icon size={42} style={{position: 'absolute', top: -1250, left: 150, zIndex: 1, color: 'white'}} name="heart"/>}
                  </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        />
    </View>
    );
   }

   OverviewScreen.navigationOptions = ({navigation}) => {
    
    return{
      title: 'Discover',
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
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'

    },
    cityImage: {
      width: '100%',
      height: 600,
      zIndex: 0,
    },
    itemContainer: {
      justifyContent: 'center', 
      alignItems: 'center',
      flex: 1
    }, 
    itemText: {
      fontSize: 26,
      marginVertical: 10, 
      color: 'white',
      textAlign: 'center'
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