    import React, {useEffect, useState} from 'react'
import {StyleSheet, View, FlatList, Text, Image, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios'
import {connect} from 'react-redux'
import {toggleFavorite} from '../store/actions/pin'


const ListScreen = ({navigation, favoritePins, toggle}) => {

    const [pins, setPins] = useState([])
    
    useEffect(() => {
        // console.log(favoritePins)
    }, [favoritePins])

    // useEffect(() => {

    //     console.log('MOUNTED')

    //     // navigation.setParams({ title: navigation.state.params.item.name});
    //     Axios(`https://takotest-99efe.firebaseio.com/users/sMds2ONYjPcsF7KG1Rwif7dyzzJ3/favorites.json`)
    //     .then(response => {
    //         const data = response.data;
    //         const pinIds = Object.keys(data);
    //         const pinRequests = pinIds.map(pinId => {
    //             return Axios(`https://takotest-99efe.firebaseio.com/pins/${pinId}.json`)
    //         })
    //         Promise.all(pinRequests).then(responses => {
    //             const pinData = responses.map((r, i) => {
    //                 const item = r.data;
    //                 const pinId = pinIds[i];
    //                 item.id = pinId;
    //                 return item;
    //             })
    //             console.log(pinData)
    //             setPins(pinData)
    //         })

    //     })
    // }, []);



    function deletePin(pinId) {
        const userId = 'sMds2ONYjPcsF7KG1Rwif7dyzzJ3';
        if (pinId) {
          const bodyObject = {};
          bodyObject[pinId] = null
          Axios.put(`https://takotest-99efe.firebaseio.com/users/${userId}/favorites/${pinId}.json`, bodyObject).then(response => {
            console.log(response.data);
            setPins(pins => [...pins.filter(d => d.id !== pinId)])
          })
        }
      }

    return(
        <View style={styles.container}>
            <FlatList
                data={favoritePins}
                renderItem={({item})=>(
                    
                    <View>
                        <TouchableOpacity
                    onPress={() => navigation.navigate('AttractionDetail', {
                        id: item.id
                    })}
                >
                        <View style={styles.rowContainer}>
                            <Image
                                style={styles.attractionImage}
                                source={{uri: item.imageUrl}}
                            />
                            <View style={{flex: 1, marginHorizontal: 20}}>
                                <Text style={styles.attractionTitle}>{item.name}</Text>
                                <Text numberOfLines={2} style={{fontSize: 14, marginTop: 4}}>{item.description}</Text>
                            </View>
                            <TouchableOpacity style={{padding: 10, borderRadius: 8, backgroundColor: '#EFEFEF', justifyContent: 'center'}} onPress={() => toggle(item.id)}>
                                <Text>Delete</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </TouchableOpacity>
                    </View>

                )}
            />
        
            
        </View>
        
        
    );
}

ListScreen.navigationOptions = ({ navigation }) => ({
    title: 'Favorites'
  });

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    rowContainer: {
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12
    }, 
    attractionImage: {
        height: 75,
        width: 75,
        borderRadius: 50
    },
    attractionTitle: {
        fontSize: 18,
        fontWeight: '600'
    }
})

const getFavoritePins = (state) => {
    const favoriteIds = state.pins.favorites;
    const favoritePins = state.pins.pins.filter(d => favoriteIds.includes(d.id));
    return favoritePins
}

const mapStateToProps = state => {
    return {
      favoritePins: getFavoritePins(state)
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      toggle: (pinId) => {
        dispatch(toggleFavorite(pinId))
      }
    }
  } 

export default connect(mapStateToProps,mapDispatchToProps )(ListScreen);