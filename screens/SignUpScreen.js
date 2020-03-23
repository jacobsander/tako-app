import React from 'react'
import { StyleSheet, View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const SignUpScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
            <Text style={styles.cardText}>Name</Text>
            <TextInput
            style={styles.cardInput}
            placeholder='E.g. Philip Gaylord'
            />
            <Text style={styles.cardText}>Email</Text>
            <TextInput
            style={styles.cardInput}
            placeholder='E.g. Philip@Gaylord.gov'
            />
            <Text style={styles.cardText}>Password</Text>
            <TextInput
            style={styles.cardInput}
            placeholder='Enter password'
            />
            <Text style={styles.cardText}>Confirm Password</Text>
            <TextInput
            style={styles.cardInput}
            placeholder='Enter password'
            />
            <View style={styles.buttonArea}>
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Search')}
                >
                    <Text style={{color: 'white'}}>Sign up</Text>
                </TouchableOpacity>
                
            </View>

        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      title: {
        color: 'white',
        fontWeight: '600',
        fontSize: 38,
        marginHorizontal: 40,
        textAlign: 'center'
      },
      card: {
        height: '33%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 20,
        justifyContent: 'center'
    },
    cardText: {
        marginHorizontal: 10,
        marginTop: 15
    },
    cardInput: {
        height: 30,
        margin: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%'
    },
      button: {
        backgroundColor: 'blue',
        width: '20%',
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 20 
      }
    });

export default SignUpScreen