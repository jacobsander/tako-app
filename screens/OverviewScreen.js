import React, { useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import Axios from 'axios';


const OverviewScreen = ({navigation}) => {

    // Create state variable for pins
    const [pins, setPins] = useState([]);

    // Create state variable for count
    [count, setCount] = useState(0)

    // When component is moounted (like componentDidMount in class implementation)
    useEffect(() => {
        Axios('https://takotest-99efe.firebaseio.com/pins.json').then(response => {
            const data = response.data;
            const keys = Object.keys(data);
            const output = keys.map(key => {
                const item = data[key] || {};
                item.id = key;
                return item;
            })
            console.log(output)
            setPins(output)
        })
    }, []);


    const images = [
        {
          id: "1",
          title: "Santa Monica Pier",
          uri: 'https://images.unsplash.com/photo-1551574210-10831cdf882d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
        },
        {
          id: "2",
          title: "Griffth Observatory",
          uri: 'https://images.unsplash.com/photo-1518533954129-7774297db60f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80'
        },
        {
          id: "3",
          title: "Universal Studios",
          uri: "https://images.unsplash.com/photo-1569789010436-421d71a9fc38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1611&q=80"
        },
        {
            id: "4",
            title: "Little Mermaid",
            uri: "https://images.unsplash.com/photo-1558693195-f4c0e43a0046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=582&q=80"
        },
        {
            id: "5",
            title: "Toronto Tower",
            uri: "https://images.unsplash.com/photo-1558611286-d6b0d98af4cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        },
        {
            id: "6",
            title: "Tokyo Tower",
            uri: "https://images.unsplash.com/photo-1542542540-6da0f4dd4b51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        },         
    ]

    // Create render method for item
    const renderCity = (itemData) => {
        return (
            <View>
                <Text 
                    style={styles.rowText}>
                    {itemData.name}
                </Text>
                
                   <Image
                        style={{height: 100, width: 100}}
                        source={{uri: itemData.imageUrl}}
                    />
                    <View style={styles.imageOverlay}></View>
                </View>
                    
        );
    };

   return(

            <View>
                <FlatList data={pins} renderItem={renderCity}/>
            </View>
        /* <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.searchBarArea}>
                  <TextInput 
                  style={styles.searchBar}
                  placeholder="Search Here"/>
              </View>
              </View>
              <Text style={styles.cardTitle}>
                  
              </Text> 
            <View style={styles.cardShadow}>

                
            </View>
            <View style={styles.bottom}>
                <Button
                  title="Prev"
                  onPress={()=>setCount(c => c - 1)}
                  disabled={count === 0}
                  
                />
                <Button
                  title="Favorite"
                />
                <Button
                  title="Next"
                  onPress={()=>setCount(c => c + 1)}
                  disabled={count === images.length - 1}
                />
              </View>  
        </View> */
        );
   }

   const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    top: {
        width: "90%",
        height: "5%",
        alignItems: "center",
    },
    searchBarArea: {
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      },
    searchBar: {
        width: "90%",
        height: "100%",
        borderRadius: 5,
        backgroundColor: "white",
        textAlign: "center",
        shadowOffset:{  width: 1,  height: 1, },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
      },
    cardTitle: {
        fontSize: 24,
        paddingVertical: 20
    },
    card: {
        height: 500,
        width: 350,
        borderRadius: 10,
        resizeMode: "cover",
    },
  cardShadow: {
        shadowOffset:{  width: 0,  height: 5 },
        shadowRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 1
  },
    bottom: {
        flexDirection: "row",
        height: "10%",
        justifyContent: "space-between",
        width: "80%",
        alignItems: "center",
        paddingTop: 25
    }
    });

export default OverviewScreen;