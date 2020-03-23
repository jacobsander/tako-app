import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Picker, SafeAreaView, FlatList, Image, ScrollView, TouchableOpacity} from 'react-native'
import Axios from 'axios';
import { connect } from 'react-redux';
import { addPin } from '../store/actions/pin'
import RNPickerSelect from 'react-native-picker-select';

const UploadAttraction = ({navigation, cities = [], categories, addPin}) => {

    const firstCity = cities[2] || {}
    const [name, setName] = useState('Attraction name');
    const [city, setCity] = useState('City name');
    const [imageUrl, setImageUrl] = useState('City URL');
    const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);

    return(
        
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={text => setName(text)}
                    value={name}
                style={styles.textInput}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.textInput}>
            <RNPickerSelect
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => {setCity(itemValue)}}
            items={[
                { label: 'Copenhagen', value: 'copenhagen' },
                { label: 'Los Angeles', value: 'tokyo' },
                { label: 'Toronto', value: 'stockholm' },
                { label: 'Guadalajara', value: 'guadalajara' },
                { label: 'Stockholm', value: 'stockholm' },

            ]}
          
        />
        </View>
            </View>
           
            <SafeAreaView style={styles.container}>
      <FlatList
        scrollEnabled={false}
        style={{width: '100%'}}
        data={categories}
        numColumns={3}
        renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => {
                const isSelected = selectedCategoryFilters.includes(item.id)
                if (!isSelected) {
                    const newSelectedCategoryFilters = [...selectedCategoryFilters,item.id]
                    setSelectedCategoryFilters(newSelectedCategoryFilters)
                } else {
                    const newSelectedCategoryFilters = [...selectedCategoryFilters].filter(d => d !== item.id)
                    setSelectedCategoryFilters(newSelectedCategoryFilters)
                }
            }}
            >
            <Text 
                style={[styles.itemTitle]}>{item.name}
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
    </SafeAreaView>    

    <Button
    title="Submit"
    style={styles.submitButton}
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
    
    />        
        </ScrollView>
    );
}

UploadAttraction.navigationOptions = ({ navigation }) => ({
    title: 'Upload an attraction'
  });

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
  
  export default connect(mapStateToProps, mapDispatchToProps)(UploadAttraction);
