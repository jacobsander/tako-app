import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity} from 'react-native'
import Axios from 'axios';
import { connect } from 'react-redux';
import { addPin } from '../store/actions/pin'
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UploadAttractionName = ({navigation, name}) => {

    const [attractionName, setAttractionName] = useState('Attraction name');
    

    return(
        
        <ScrollView contentContainerStyle={styles.container}>   
                <Text style={styles.title}>What is the attraction called?</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={text => setAttractionName(text)}
                    value={attractionName}
                style={styles.textInput}
                />
            </View>
            

            <TouchableOpacity
            onPress={()=>{
                navigation.navigate({
                    routeName: 'AttractionCity', 
                    params: {
                    name: attractionName
                    }
            })}}
            >
            <View style={{paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 20, marginVertical: 8, alignItems: 'center'}}>
                <Text style={styles.buttonTitle}>Next</Text>
            </View>   
            </TouchableOpacity>  

        </ScrollView>
    );
}

UploadAttractionName.navigationOptions = ({ navigation }) => ({
    title: 'Upload an attraction (Step 1 of 3)'
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(UploadAttractionName);
