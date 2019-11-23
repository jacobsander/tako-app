import React from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'

const NotificationIcon = ({favorites}) => {
    if (favorites.length > 0) {
        return(
            <View style={{
                position: 'absolute',
                height: 16,
                width: 16,
                right: -6,
                top: -6,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red'}}>
                <Text style={{color: '#FFF', fontSize: 10, fontWeight: '700'}}>{favorites.length}</Text>
            </View>
        )
    } else {
        return (<View></View>)
    }

}

const mapStateToProps = state => {
    return {
      favorites: state.pins.favorites
    }
  }

export default connect(mapStateToProps)(NotificationIcon);