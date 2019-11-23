import React from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'

const UploadAttraction = ({navigation}) => {

    return(
        <View style={styles.container}>
            <Text>Upload an attraction!</Text>
            <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 10}}>Attraction Name</Text>
                <TextInput
                style={styles.textInput}
                />
            </View>
            <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 10}}>City</Text>
                <TextInput
                style={styles.textInput}
                />
            </View>
            <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 10}}>Country</Text>
                <TextInput
                style={styles.textInput}
                />
            </View>
            <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 10}}>Image url</Text>
                <TextInput
                style={styles.textInput}
                />
            </View>
            <Button
                title="Next"
                onPress={()=> navigation.navigate('Category')}
            />
            
        </View>
    );
}

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
    }
});

export default UploadAttraction;