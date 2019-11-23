import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import toggleFavorite from '../store/actions/pin'

const AttractionScreen = ({navigation, pins}) => {

    const [pinData, setPinData] = useState({})
    const [filters, setFilters] = useState([])

    useEffect(() => {
        const pinId = navigation.getParam('id');
        const currentPin = pins.find(d => d.id === pinId)
        navigation.setParams({headerName: currentPin.name})
        setPinData(currentPin);

        // Axios(`https://takotest-99efe.firebaseio.com/pins/${pinId}.json`)
        // .then(response => {
        //     const data = response.data;
        //     navigation.setParams({headerName: data.name})
        //     const filterIds = Object.keys(data.filters || {});
        //     const filterRequests = filterIds.map(filterId => {
        //         return Axios(`https://takotest-99efe.firebaseio.com/filters/${filterId}.json`)
        //     })

        //     Promise.all(filterRequests).then(responses => {
        //         const filtersData = responses.map(filter => filter.data);
        //         setPinData(data);
        //         setFilters(filtersData);
        //     })

        // })
      }, []);

    return(
        <ScrollView>
            <Image
                style={styles.image}
                source={{uri: pinData.imageUrl}}
            />
            <Text style={{fontSize: 24, marginBottom: 16, marginTop: 16, fontWeight: '800', marginLeft: 20}}>{pinData.name}</Text>
            <Text style={styles.description}>
                    {pinData.description} 
            </Text>
            <Text style={styles.category}>Categories:</Text>
            <FlatList
                horizontal={true}
                data={filters}
                renderItem={({item})=> 
                    <View style={styles.categoryContainer}>
                        <View style={styles.itemContainer}>
                            <Text
                                style={styles.textCategory}
                            >{item.name}</Text>
                            <Image
                                style={styles.imageCategory}
                                source={{uri: item.imageUrl}}
                            />
                        </View>
                    </View>

                }
            />
        </ScrollView>
    );
}

AttractionScreen.navigationOptions = ({navigation}) => {
    const title = navigation.getParam('headerName')
    return{ 
        title
    }
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        marginVertical: 10
    },
    description: {
        marginHorizontal: 20,
    },
    category: {
        margin: 20,
        fontSize: 18,
    },
    categoryContainer: {
        flex: 1,
        flexDirection: "row"
    },
    itemContainer: {
        width: "50%",
        flex: 1,
        alignItems: "center"
    },
    textCategory: {
        textAlign: "center",
        paddingTop: 5,
        fontSize: 16
    },
    imageCategory: {
        height: 150,
        width: 150,
        borderRadius: 25,
        marginVertical: 10,
        marginHorizontal: 20
    }
})


const mapStateToProps = state => {
    return {
      pins: state.pins.pins
    }
  }
    
  const mapDispatchToProps = dispatch => {
    return {
      toggle: (pinId) => {
        dispatch(toggleFavorite(pinId))
      }
    }
  } 

export default connect(mapStateToProps, mapDispatchToProps)(AttractionScreen);