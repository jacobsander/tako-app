import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createBottomTabNavigator } from 'react-navigation-tabs'
import OverviewScreen from '../screens/OverviewScreen-v2';
import FavoriteScreen from '../screens/FavoriteScreen';
import UploadAttraction from '../screens/UploadAttraction-v2';
import CategoryFilterScreen from '../screens/CategoryFilterScreen';
import CityFilterScreen from '../screens/CityFilterScreen';
import AttractionScreen from '../screens/AttractionScreen';
import ListScreen from '../screens/ListScreen';
import UploadCategory from '../screens/UploadCategory';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUpScreen';
import NotificationIcon from '../components/notificationIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const MainNavigator = createBottomTabNavigator({
    Discover: createStackNavigator({
        // Search: SearchScreen,
        Cards: createStackNavigator({
            CardsSwipe: OverviewScreen,
            CardsDetail: AttractionScreen,
        })
    },{
        headerMode: 'none',
        navigationOptions: {
            tabBarIcon: tabInfo => (
                <Icon name='earth' style={styles.tabBarIcon} color={tabInfo.tintColor}/>
            )
        }
    }),
    Favorites: createStackNavigator({
        // FavoritesHome: FavoriteScreen,
        FavoritesDetail: ListScreen,
        AttractionDetail: AttractionScreen,
    }),
    Upload: createStackNavigator({
        Attraction: UploadAttraction,
        // Category: UploadCategory,
    }, {
        navigationOptions: {
            tabBarIcon: tabInfo => (
                <Icon name='upload' style={styles.tabBarIcon} color={tabInfo.tintColor}/>
            )
        }
    }),
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: tabInfo => {
        const { routeName } = navigation.state;
        
        if (routeName === 'Favorites') {
            return (
                <View style={styles.tabIcons}>
                   <Icon name='heart' style={styles.tabBarIcon} color={tabInfo.tintColor}/>
                   <NotificationIcon/>
                </View>
            )
        } else {
            return (    
                    <View></View>
            )
        }
    
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
  })

// const Switch = createSwitchNavigator({
//     Auth: createSwitchNavigator({
//         Login: LoginScreen,
//         Signup: SignUpScreen,
//     }),
//     App: createStackNavigator({
//         AppContent: MainNavigator,
//     }, {
//         headerMode: 'none',
//         mode: 'modal'
//     })
    
//   }, {
//       initialRouteName: 'App'
//   })

const styles = StyleSheet.create({
    tabIcons: {
        borderRadius: 10,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    tabBarIcon: {
        fontSize: 22
    }
})

const categoryFilterNavigator = createStackNavigator({
    CategoryFilters: CategoryFilterScreen
});

const cityFilterNavigator = createStackNavigator({
    CityFilters: CityFilterScreen
});



const drawerNavigator = createDrawerNavigator({
    Category: categoryFilterNavigator,
    City: cityFilterNavigator
});

export default createAppContainer(MainNavigator);

