import React, {useEffect, useState} from 'react'
import {View, StyleSheet, FlatList, Text, Image, SafeAreaView} from 'react-native';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AttractionList = () => {

    // Create state variable for cities
    const [cities, setCities] = useState([]);

    // When component is moounted (like componentDidMount in class implementation)
    useEffect(() => {
        Axios('https://takotest-99efe.firebaseio.com/cities.json').then(response => {
            const data = response.data;
            const keys = Object.keys(data);
            const output = keys.map(key => {
                const item = data[key] || {};
                item.id = key;
                return item;
            })
            setCities(output);
        })
    });

    // Create render method for item
    const renderCity = (itemData) => {
        return (
            <TouchableOpacity
                key={itemData.item.id}
                style={styles.rowItem}
                >
                <Text 
                    style={styles.rowText}>
                    {itemData.item.name}
                </Text>
                <View style={styles.rowImageContainer}>
                    <Image
                        style={styles.rowImage}
                        source={{uri: itemData.item.imageUrl}}
                    />
                    <View style={styles.imageOverlay}></View>
                </View>
                
            </TouchableOpacity>    
        );
    };
    
    // Render component
    return(
        <FlatList data={cities} renderItem={renderCity}/>
    );
}

const styles = StyleSheet.create({
    rowItem: {
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '600'
    },
    rowImageContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1
    },
    rowImage: {
        height: '100%',
        width: '100%'
    },
    imageOverlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        opacity: 0.5
    }
});

export default AttractionList;