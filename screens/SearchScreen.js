import React from 'react'
import {View, ImageBackground, StyleSheet, Text, TextInput, Button} from 'react-native'
import {connect} from 'react-redux'
import {addPlace} from '../store/actions/place'
import {setPins} from '../store/actions/pin'

const SearchScreen = ({navigation, places, pins, add}) => {
    console.log(pins)
    return(
        
            <ImageBackground
                style={styles.container}
                source={{uri: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'}}
            >
           <Text style={styles.title}>Where are you going?</Text>
           <View style={styles.searchBarArea}>
                  <TextInput 
                  style={styles.searchBar}
                  placeholder="Search Here"/>
            <Button
                title="Search"
                color="white"
                onPress={()=>navigation.navigate('CardsSwipe')}
            />
              </View>
              </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        height: '100%'
    },
    title:{
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        color: 'white',
        marginBottom: 30,
        marginHorizontal: 40,
    },
    searchBarArea: {
            alignItems: "center",
            height: 50,
            width: "100%",
          },
        searchBar: {
            width: "90%",
            height: "100%",
            borderRadius: 5,
            backgroundColor: "white",
            paddingLeft: 10,
            shadowOffset:{  width: 1,  height: 1, },
            shadowColor: 'grey',
            shadowOpacity: 0.5,
          },
})

const mapStateToProps = state => {
  return {
    places: state.places.places,
    pins: state.pins.pins
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addPlace(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);