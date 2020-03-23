import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Picker, SafeAreaView, FlatList, Image, ScrollView, TouchableOpacity} from 'react-native'
import Axios from 'axios';
import { connect, useSelector } from 'react-redux';
import { addPin } from '../store/actions/pin'
import RNPickerSelect from 'react-native-picker-select';

const UploadAttractionCity = ({navigation}) => {

    const name = navigation.getParam('name')
    
    const [cityName, setCityName] = useState('City name');
    const cities = useSelector(state => state.cities.cities)
    
    const cityOptions = cities.map(city => {
        return {
            label: city.name,
            value: city.id
        }
    })

    console.log(cityOptions)

    return(
        
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Where is {name} located?</Text>
            <View style={styles.inputContainer}>
            <View style={styles.textInput}>
                <RNPickerSelect
                selectedValue={cityName}
                onValueChange={(itemValue) => {
                    setCityName(itemValue)
                }}
                items={cityOptions}
            
            />
            </View>
        </View>

        <TouchableOpacity
            onPress={()=>{
                navigation.navigate({
                    routeName: 'AttractionCategory', 
                    params: {
                    name: name,
                    city: cityName
                    }
            })}}>
            <View style={{paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 20, marginVertical: 8, alignItems: 'center'}}>
                <Text style={styles.buttonTitle}>Next</Text>
            </View>   
            </TouchableOpacity> 

        </ScrollView>
    );
}

UploadAttractionCity.navigationOptions = ({ navigation }) => ({
    title: 'Upload an attraction (Step 2 of 3)'
  });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 
    title: {
        fontSize: 24,
        marginBottom: 30
    },
    buttonTitle: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 7,
        fontWeight: '800',
        color: 'white'
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
      categories: state.categories.categories,
    }
  }
    
  const mapDispatchToProps = dispatch => {
    return {
      addPin: (pin) => {
        dispatch(addPin(pin))
      },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UploadAttractionCity);
