import React from 'react'
import {View, StyleSheet, Text, TextInput, Button, Image} from 'react-native';

import {ATTRACTIONS} from '../data/dummy-data';

export default class ImageSlider extends React.Component{




    state = {
      images : [
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
          ],
        count: 0,
      }

      nextWasPressed = () => {
        if (this.state.count < this.state.images.length) {
        this.setState({count: this.state.count += 1})
        } 
        };

    prevWasPressed = () => {
      if (this.state.count >= 1) {
        this.setState({count: this.state.count -= 1})
      }
  
      }

      render() {
          return(
            <View style={styles.container}>

              <View style={styles.top}>
                <View style={styles.searchBarArea}>
                  <TextInput 
                  style={styles.searchBar}
                  placeholder="Search Here"/>
              </View>
              </View>

              <Text style={styles.cardTitle}>
                  {this.state.images[this.state.count].title}
               </Text> 

              <View style={styles.middle}>

                {/* <View style={styles.cardShadow}>
                  <Image
                  data={ATTRACTIONS}
                  style={styles.card}
                  source={{uri: this.state.images[this.state.count].uri}}
                  />
                </View> */}
              </View>

              <View style={styles.bottom}>
                <Button
                  title="Prev"
                  onPress={this.prevWasPressed}
                />
                <Button
                  title="Favorite"
                />
                <Button
                  title="Next"
                  onPress={this.nextWasPressed}
                  disabled={this.state.count === this.state.images.length - 1}
                />
              </View>      
          </View>
          )
      }
      
}; 


const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
  },
  top: {
    width: "90%",
    height: "5%",
    alignItems: "center",
  },
  searchBarArea: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    justifyContent: "center"
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
  middle: {
  flex: 1,
    backgroundColor: 'red'
//     height: "73%",
//     width: "90%"
  },
  cardTitle: {
    fontSize: 24,
    paddingVertical: 20
  },
  card: {
    height: "100%",
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