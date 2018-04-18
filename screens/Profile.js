import React from 'react';
import styles from '../styles/Profile-style.js'
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import  {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {uploadImage, logout} from '../redux/actions.js';

export class Profile extends React.Component {

    /*Sign out from app*/
    logout = () => {
        this.props.dispatch(logout());
        this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <View style={{flex:1,flexDirection: 'column'}}>
                <View style={styles.profileUpper}>
                    <View style={styles.profilepicWrap}>
                        <Image style={styles.profilepic} source={{uri: this.props.user.photoUrl}} />
                    </View>
                    <Text style={styles.name}>{this.props.user.showAge === false? this.props.user.name: this.props.user.name+','+ (2018-Number(this.props.user.birth))}</Text>
                    <View  style={{flexDirection: 'row', marginTop: 110}}>
                        <Icon name='edit' size={25} style={styles.editIcon} />
                        <TouchableOpacity style = {styles.ProfileButtonLogin} onPress={() => this.props.navigation.navigate('Profile_Update')}>
                            <Text style={styles.ProfileButtonText} >Update Profile</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.profileLower}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name='sign-out' size={25} style={styles.signoutIcon} />
                        <TouchableOpacity style = {styles.ProfileButtonSignout} onPress = {() => this.logout()} >
                            <Text style={styles.ProfileButtonText} >SignOut</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

/*Connect state from the store to props, state.user corresponds to action.user in reducer.js*/
function mapStateToProps(state) {
    console.log('loading profile page');
    return {
        user: state.user
    };
}

/*Connects a React component to a Redux store*/
export default connect(mapStateToProps)(Profile);
