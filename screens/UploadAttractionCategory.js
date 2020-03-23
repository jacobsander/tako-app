import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Picker, SafeAreaView, FlatList, Image, ScrollView, TouchableOpacity} from 'react-native'
import Axios from 'axios';
import { connect, useSelector } from 'react-redux';
import { addPin } from '../store/actions/pin'
import RNPickerSelect from 'react-native-picker-select';

const UploadAttractionCategory = ({navigation, categories, addPin}) => {

    const name = navigation.getParam('name')
    const city = navigation.getParam('city')

    const [imageUrl, setImageUrl] = useState('City URL');
    const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
    const cities = useSelector(state => state.cities.cities);
    const selectedCity = cities.find(c => c.id === city) || {};

    return(
        
        <ScrollView contentContainerStyle={styles.container}>   
            <View style={styles.inputContainer}>
                    <Text style={styles.title}>What categories does {name} from {selectedCity.name} fit into?</Text>
            </View>
                
      <FlatList
        scrollEnabled={false}
        data={categories}
        numColumns={2}
        renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => {
                const isSelected = selectedCategoryFilters.includes(item.id)
                if (!isSelected) {
                    const newSelectedFilters = [...selectedCategoryFilters,item.id]
                    setSelectedCategoryFilters(newSelectedFilters)
                } else {
                    const newSelectedFilters = [...selectedCategoryFilters].filter(d => d !== item.id)
                    setSelectedCategoryFilters(newSelectedFilters)
                }
            }}
            >
            <Text 
                style={[styles.itemTitle, {
                    color: selectedCategoryFilters.includes(item.id) ? 'black' : 'grey'
                  }]}>{item.name}
          </Text>
          <Image
              source={{uri: item.imageUrl}}
              style={[styles.itemImage, {
                opacity: selectedCategoryFilters.includes(item.id) ? 1 : 0.3
              }]}
          />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
            <TouchableOpacity
            onPress={() => {
                const filterObject = {};
                selectedCategoryFilters.forEach(key => {
                    filterObject[key] = true
                })
        
                const submitData = {
                    city,
                    description: "lorem ipsum",
                    filters: filterObject,
                    imageUrl,
                    name,
                }
        
                Axios.post('https://takotest-99efe.firebaseio.com/pins.json', submitData).then(response => {
                    console.log("Test")
                    addPin(submitData)
                })
            }}
            >
            <View style={{paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 20, marginVertical: 8, alignItems: 'center'}}>
                <Text style={styles.buttonTitle}>Submit</Text>
            </View>   
            </TouchableOpacity>    
        </ScrollView>
    );
}

UploadAttractionCategory.navigationOptions = ({ navigation }) => ({
    title: 'Upload an attraction (Step 3 of 3)'
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(UploadAttractionCategory);
