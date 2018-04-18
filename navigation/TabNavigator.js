import React from 'react';
import Home from '../screens/Home.js';
import Profile from '../screens/Profile.js';
import Matches from '../screens/Matches.js';
import {TabNavigator} from 'react-navigation';

export default TabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Home',

            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: 'Profile',
            },
        },
        Matches: {
            screen: Matches,
            navigationOptions: {
                tabBarLabel: 'Matches',
            },
        },
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarPosition: 'top',
        tabBarTextFontFamily: 'Georgia',
        initialRouteName: 'Profile',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: '#000',
            labelStyle: {
                fontSize: 15,
                fontFamily: 'Georgia'
            },
            style: {
                height: 60,
                backgroundColor: '#fff',
            },
        }
    }
);
