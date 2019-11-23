import React from 'react';
import { StyleSheet, View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const LoginScreen = ({navigation}) => {

  function buttonWasPressed() {
    navigation.navigate('App')
  }

  return (
    <ImageBackground 
    style={styles.container}
    source={{uri: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'}}
    >
      <Text style={styles.title}>
          The world at your finger tips.
        </Text>
       
        <View style={styles.card}>
            <Text style={styles.cardText}>Email</Text>
            <TextInput
            style={styles.cardInput}
            placeholder='Enter email'
            />
            <Text style={styles.cardText}>Password</Text>
            <TextInput
            style={styles.cardInput}
            placeholder='Enter password'
            />
            <View style={styles.buttonArea}>
                <TouchableOpacity
                style={styles.button}
                onPress={() => buttonWasPressed()}
                >
                    <Text style={{color: 'white'}}>Log in</Text>
                </TouchableOpacity>
                <Text>or</Text>
                <TouchableOpacity
                style={styles.button}
                onPress={() => buttonWasPressed()}
                >
                    <Text style={{color: 'white'}}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </View>

      
    </ImageBackground>
  );
};

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

export default LoginScreen
