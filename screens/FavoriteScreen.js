import React, {useEffect, useState} from 'react'
import {View, StyleSheet, FlatList, Text, Image, SafeAreaView} from 'react-native';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux'

const FavoriteScreen = ({navigation, favoritePins}) => {

    console.log(favoritePins)
    const [cities, setCities] = useState([]);

    // When component is mounted (like componentDidMount in class implementation)
    useEffect(() => {
        const pinId = navigation.getParam('id');
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
    }, []);

    // Create render method for item
    const renderCity = (itemData) => {
        console.log(itemData.index)
        return (<View></View>)
        // return (
        //     <TouchableOpacity
        //         key={itemData.item.id}
        //         style={styles.rowItem}
        //         onPress={() => navigation.navigate('FavoritesDetail', {
        //             item: itemData.item
        //         })}
        //         >
        //         <Text 
        //             style={styles.rowText}>
        //             {itemData.item.name}
        //         </Text>
        //         <View style={styles.rowImageContainer}>
        //             <Image
        //                 style={styles.rowImage}
        //                 source={{uri: itemData.item.imageUrl}}
        //             />
        //             <View style={styles.imageOverlay}></View>
        //         </View>
        //     </TouchableOpacity>    
        // );
    };
    
    // Render component
    return(
        <FlatList data={cities} renderItem={renderCity}/>
    );
}

FavoriteScreen.navigationOptions = {
    title: 'Favorites'
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

const mapStateToProps = state => {
    return {
      favoritePins: (state) => {
          return state.pins.favorites
      }
    }
  }

export default connect(mapStateToProps)(FavoriteScreen); 