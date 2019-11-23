import React, { useState, useEffect, useCallback } from 'react'
import {View, SafeAreaView, Text, StyleSheet, FlatList, Button, Image, TouchableHighlight} from 'react-native'


const UploadCategory = ({navigation}) => {

    const DATA = [
        {
          id: '1',
          title: 'Romantic',
          uri: "https://images.unsplash.com/photo-1487035242901-d419a42d17af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=736&q=80"
        },
        {
          id: '2',
          title: 'Photography',
          uri: "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        },
        {
          id: '3',
          title: 'Nature',
          uri: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        },
        {
            id: 4,
            title: "Culture",
            uri: "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        },
        {
            id: 5,
            title: "Sports",
            uri: "https://images.unsplash.com/photo-1547941126-3d5322b218b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        },
        {
            id: 6,
            title: "Shopping",
            uri: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        },
        {
            id: 7,
            title: "Adventure",
            uri: "https://images.unsplash.com/photo-1553531889-3836a7ee6d3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2600&q=80"
        },
        {
            id: 8,
            title: "Party",
            uri: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        },
        {
            id: 9,
            title: "Food",
            uri: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=987&q=80"
        },
        {
            id: 10,
            title: "Luxury",
            uri: "https://images.unsplash.com/photo-1519868343531-805e97cbda3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
        },
      ];
      
      function Item({ id, uri, title, selected, onSelect }) {
        return (
          <TouchableHighlight
            onPress={() => onSelect(id)}
          >
            <View>
              <Text
                style={[styles.itemTitle,
                {opacity: selected ? 1 : 0.5}
            ]}
                >{title}
            </Text>
            <Image
                source={{uri: uri}}
                style={[styles.itemImage,
                { opacity: selected ? 1 : 0.5 }
                ]}
            />
            </View>
          </TouchableHighlight>
        );
      }

    const [selected, setSelected] = useState(new Map());

    const onSelect = useCallback(
        id => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));

        setSelected(newSelected);
        },
        [selected],
    );

    return(
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        numColumns={2}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            uri={item.uri}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected} // to ensure that flatlist re-renders when something is selected
      />
    <Button
        title="Submit"
    />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }, 
    itemImage: {
        height: 150, 
        width: 150,
        borderRadius: 10,
        marginHorizontal: 20,
        opacity: 0.5
    },
    itemTitle: {
      fontSize: 18,
      textAlign: "center",
      marginVertical: 10
    },
});
        
export default UploadCategory;