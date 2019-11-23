import React from 'react'
import {View, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator } from 'react-navigation-tabs'
import OverviewScreen from '../screens/OverviewScreen-v2';
import FavoriteScreen from '../screens/FavoriteScreen';
import UploadAttraction from '../screens/UploadAttraction';
import FilterScreen from '../screens/FilterScreen';
import AttractionScreen from '../screens/AttractionScreen';
import ListScreen from '../screens/ListScreen';
import UploadCategory from '../screens/UploadCategory';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/Login'
import NotificationIcon from '../components/notificationIcon';


const FavNavigator = createBottomTabNavigator({
    Discover: createStackNavigator({
        Search: SearchScreen,
        Cards: createStackNavigator({
            CardsSwipe: OverviewScreen,
            CardsDetail: AttractionScreen,
        })
    },{
        headerMode: 'none'
    }),
    Favorites: createStackNavigator({
        // FavoritesHome: FavoriteScreen,
        FavoritesDetail: ListScreen,
        AttractionDetail: AttractionScreen,
    }),
    Filter: FilterScreen,
    Upload: createStackNavigator({
        Attraction: UploadAttraction,
        Category: UploadCategory,
    }),
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        // let IconComponent = Ionicons;
        // let iconName;
        if (routeName === 'Favorites') {
            return (
                <View style={{width: 20, height: 20, backgroundColor: tintColor, borderRadius: 10}}>
                   <NotificationIcon/>
                </View>
            )
        } else {
            return (
                <View style={{width: 20, height: 20, backgroundColor: tintColor, borderRadius: 10}}></View>
            )
        }
        
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
  })

const Switch = createSwitchNavigator({
    Auth: LoginScreen,
    App: FavNavigator
  })



export default createAppContainer(Switch);

