import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Picker, SafeAreaView, FlatList, Image, ScrollView, TouchableOpacity} from 'react-native'
import Axios from 'axios';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addPin } from '../store/actions/pin'
import { toggleCityFilter } from '../store/actions/cities'

const CityFilterScreen = () => {

  
    const [selectedFilters, setSelectedFilters] = useState([]);

    const cityFilters = useSelector(state => state.cities.cities)
    
    const dispatch = useDispatch()

    const citySelectedFilters = useSelector(state => state.cities.selectedCities)

    return(
        
        <ScrollView contentContainerStyle={styles.container}>
           

            <SafeAreaView style={styles.container}>
            <FlatList
        scrollEnabled={false}
        style={{width: '100%'}}
        data={cityFilters}
        numColumns={2}
        renderItem={({ item }) => {
          const isSelected = citySelectedFilters.includes(item.id)
          return (

            <TouchableOpacity
            onPress={() => {
              dispatch(toggleCityFilter(item.id))
                
            }}
            >
            <Text 
                style={[styles.itemTitle, {
                  color: isSelected ? 'black' : 'grey'
                }]}>{item.name}
          </Text>
          <Image
              source={{uri: item.imageUrl}}
              style={[styles.itemImage, {
                  opacity: isSelected ? 1 : 0.3
              }]}
          />
          </TouchableOpacity>
          )
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>    

    <TouchableOpacity
    onPress={() => dispatch(toggleCityFilter(citySelectedFilters))}
        >
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Save</Text>
          </View> 
        </TouchableOpacity>       
        </ScrollView>
    );
}

CityFilterScreen.navigationOptions = ({navigation}) => {
    return{
     title: 'Select cities',
     headerRight: () => {
       return (
         <View>
           <Button title="Close" onPress={()=> navigation.dismiss()}>
           </Button> 
         </View>
       )
     }
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 
    inputContainer: {
        width: '90%',
        padding: 10
    },
    textInput: {
        width: "100%", 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 0.5,
        borderRadius: 25,
        paddingLeft: 20,
        justifyContent: 'center'
    }, 
    pickerInput: {
        borderWidth: 1,
        borderColor: 'gray', 
        borderWidth: 0.5

    },
    itemImage: {
        height: 150, 
        width: 150,
        borderRadius: 10,
        marginHorizontal: 20
    },
    itemTitle: {
      fontSize: 18,
      textAlign: "center",
      marginVertical: 10
    },
    submitButton: {
      paddingHorizontal: 40, 
      paddingVertical: 10,
      backgroundColor: 'blue', 
      borderRadius: 20, 
      marginVertical: 8, 
      alignItems: 'center'
    },
    submitButtonText: {
      color: '#FFF', 
      fontSize: 18, 
      marginBottom: 8, 
      marginTop: 8, 
      fontWeight: '800'
    }
});

const mapStateToProps = state => {
    return {
      cities: state.cities.cities,
    }
  }
    
  const mapDispatchToProps = dispatch => {
    return {
      addPin: (pin) => {
        dispatch(addPin(pin))
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CityFilterScreen);