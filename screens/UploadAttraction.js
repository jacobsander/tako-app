import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Picker, SafeAreaView, FlatList, Image, ScrollView, TouchableOpacity} from 'react-native'
import Axios from 'axios';
import { connect } from 'react-redux';
import { addPin } from '../store/actions/pin'

const UploadAttraction = ({navigation, cities = [], filters, addPin}) => {

    const firstCity = cities[2] || {}
    const [name, setName] = useState('New Attraction');
    const [city, setCity] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        setCity(cities[0].id)
    }, [cities])


    // const onSelect = useCallback(
    //     id => {
    //     const newSelected = new Map(selected);
    //     newSelected.set(id, !selected.get(id));

    //     setSelected(newSelected);
    //     },
    //     [selected],
    // ); 


    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Upload an attraction!</Text>
            <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 10}}>Attraction Name</Text>
                <TextInput
                    onChangeText={text => setName(text)}
                    value={name}
                style={styles.textInput}
                />
            </View>
            <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 10}}>City</Text>
                <Picker
                    selectedValue={city}
                    onValueChange={(itemValue, itemIndex) => {
                        setCity(itemValue)
                    }}
                    style={styles.pickerInput}>

                    {cities.map((city) => (
                        
                        <Picker.Item label={city.name} value={city.id}/>

                    ))}
                

                </Picker>
            </View>
           
            <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 10}}>Image url</Text>
                <TextInput
                value={imageUrl}
                onChangeText={text => setImageUrl(text)}
                style={styles.textInput}
                />
            </View>

            <SafeAreaView style={styles.container}>
      <FlatList
        scrollEnabled={false}
        style={{width: '100%'}}
        data={filters}
        numColumns={2}
        renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => {
                const isSelected = selectedFilters.includes(item.id)
                if (!isSelected) {
                    const newSelectedFilters = [...selectedFilters,item.id]
                    setSelectedFilters(newSelectedFilters)
                } else {
                    const newSelectedFilters = [...selectedFilters].filter(d => d !== item.id)
                    setSelectedFilters(newSelectedFilters)
                }
            }}
            >
            <Text 
                style={[styles.itemTitle]}>{item.name}
          </Text>
          <Image
              source={{uri: item.imageUrl}}
              style={[styles.itemImage, {
                  opacity: selectedFilters.includes(item.id) ? 1 : 0.3
              }]}
          />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        // extraData={selected} // to ensure that flatlist re-renders when something is selected
      />
    </SafeAreaView>    

    <Button
    title="Submit"
    onPress={() => {
        const filterObject = {};
        selectedFilters.forEach(key => {
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
    title: 'Favorites'
  });


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 
    inputContainer: {
        width: '90%',
    },
    textInput: {
        width: "100%", 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 0.5
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
});


const mapStateToProps = state => {
    return {
      cities: state.cities.cities,
      filters: state.filters.filters,
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
