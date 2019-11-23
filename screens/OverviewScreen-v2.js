import React, { useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import {connect} from 'react-redux'
import {toggleFavorite} from '../store/actions/pin'


const OverviewScreen = ({navigation, pins, toggle, favorites}) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const currentPin = pins[currentIndex] || {};

  useEffect(() => {
    console.log('NOWNOWNOWNOW')
  }, [])

  return(
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'blue', borderRadius: 20, marginTop: 8}}>
        <Text style={{color: '#FFF'}}>{currentIndex + 1}/{pins.length}</Text>
      </View>
      <Text style={{fontSize: 24, marginBottom: 16, marginTop: 8, fontWeight: '800'}}>{currentPin.name}</Text> 
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

        <TouchableOpacity style={{height: 60, width: 60, borderRadius: 30, backgroundColor: '#EFEFEF', justifyContent: 'center', alignItems: 'center'}} onPress={()=>setCurrentIndex(c => c - 1)}>
          <Text>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height: 60, width: 60, borderRadius: 30, backgroundColor: '#EFEFEF', justifyContent: 'center', alignItems: 'center'}} onPress={() => {
          const currentId = currentPin.id;
          toggle(currentId)
        }}>
          {favorites.includes(currentPin.id) ? <Text>Remove</Text> : <Text>Favorite</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={{height: 60, width: 60, borderRadius: 30, backgroundColor: '#EFEFEF', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{
            setCurrentIndex(c => c + 1)
          }}
          disabled={currentIndex === pins.length - 1}>
            <Text>Next</Text>
        </TouchableOpacity>
      </View>  
    </View>
    );
   }

   OverviewScreen.navigationOptions = ({navigation}) => {
     return{
      // title: 'Overview',
      headerLeft: () => {
        return (
          <View>
            <Button title="Search" onPress={()=> navigation.navigate('Search')}>
            </Button> 
          </View>
        )
      },
      headerRight: () => {
        return (
          <Button title="Filter"/> 
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