import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createBottomTabNavigator } from 'react-navigation-tabs'
import OverviewScreen from '../screens/OverviewScreen-v3';
import FavoriteScreen from '../screens/FavoriteScreen';
import CategoryFilterScreen from '../screens/CategoryFilterScreen';
import CityFilterScreen from '../screens/CityFilterScreen';
import AttractionScreen from '../screens/AttractionScreen';
import UploadAttractionName from '../screens/UploadAttractionName'
import UploadAttractionCity from '../screens/UploadAttractionCity'
import UploadAttractionCategory from '../screens/UploadAttractionCategory'
import ListScreen from '../screens/ListScreen';
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
        FavoritesDetail: ListScreen,
        AttractionDetail: AttractionScreen,
    }),
    Upload: createStackNavigator({
        AttractionName: UploadAttractionName,
        AttractionCity: UploadAttractionCity,
        AttractionCategory: UploadAttractionCategory,
    },
    {
        navigationOptions: {
            tabBarIcon: tabInfo => (
                <Icon name='upload' style={styles.tabBarIcon} color={tabInfo.tintColor}/>
            )
        }
    })
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

const drawerNavigator = createStackNavigator({
    StartSearch: {
        screen: MainNavigator,
        navigationOptions: {
            drawerLabel: 'Discover'
        }
    },
    Filters: createStackNavigator({
        FilterOverview: ({navigation}) => <View>
            <Button
            title='Category'
            onPress={()=>{navigation.navigate('FilterCategories')}}
            />
            <Button
            title='Cities'
            onPress={()=>{navigation.navigate('FilterCities')}}
            />

        </View>,
        FilterCategories: CategoryFilterScreen,
        FilterCities: CityFilterScreen
    })
}, {
    mode: 'modal',
    headerMode: 'none'
});

export default createAppContainer(drawerNavigator);

