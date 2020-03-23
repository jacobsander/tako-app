import React, {useEffect, useState, useCallback} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Picker, SafeAreaView, FlatList, Image, ScrollView, TouchableOpacity} from 'react-native'
import Axios from 'axios';
import { connect, useDispatch, useSelector } from 'react-redux';
import { toggleCategoryFilter } from '../store/actions/categories';

const CategoryFilterScreen = () => {

  
    
    const categoryFilters = useSelector(state => state.categories.categories)
    
    const dispatch = useDispatch()

    const categorySelectedFilters = useSelector(state => state.categories.selectedCategories)
 

    return(
        
        <ScrollView contentContainerStyle={styles.container}>
           

            <SafeAreaView style={styles.container}>
      <FlatList
        scrollEnabled={false}
        style={{width: '100%'}}
        data={categoryFilters}
        numColumns={2}
        renderItem={({ item }) => {
          const isSelected = categorySelectedFilters.includes(item.id)
          return (

            <TouchableOpacity
            onPress={() => {
              dispatch(toggleCategoryFilter(item.id))
                // const isSelected = selectedCategoryFilters.includes(item.id)
                // if (!isSelected) {
                //     const newSelectedCategoryFilters = [...selectedCategoryFilters,item.id]
                //     setSelectedCategoryFilters(newSelectedCategoryFilters)
                // } else {
                //     const newSelectedCategoryFilters = [...selectedCategoryFilters].filter(d => d !== item.id)
                //     setSelectedCategoryFilters(newSelectedCategoryFilters)
                // }
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
        <TouchableOpacity
          onPress={() => dispatch(toggleCategoryFilter(categorySelectedFilters))}
        >
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Save</Text>
          </View> 
        </TouchableOpacity>
    </SafeAreaView>    
    </ScrollView>
         
        
    );
}

CategoryFilterScreen.navigationOptions = ({navigation}) => {
    return{
     title: 'Select categories',
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilterScreen);