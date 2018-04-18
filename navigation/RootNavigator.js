import React from 'react';
import {StackNavigator} from 'react-navigation';
import profile_update_page from '../screens/Profile-update.js';
import TabNavigator from './TabNavigator.js';

const RootStackNavigator = StackNavigator(
    {
        Main: {
            screen: TabNavigator,
        },
        Profile_Update: {
            screen: profile_update_page,
        }
    }
);

export default class RootNavigator extends React.Component {
    render() {
        return <RootStackNavigator/>;
    }
}
