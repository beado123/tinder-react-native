import React from 'react';
import styles from '../styles/Login-style.js';
import RootNavigator from '../navigation/RootNavigator.js';
import  {connect} from 'react-redux';
import {login, updateNameGender} from '../redux/actions.js';
import { Text, View, ScrollView, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebase.js';
import { YellowBox } from 'react-native';
firebase.initializeApp(firebaseConfig);

export class Login extends React.Component {

    state = {
        name: this.props.user.name==''?'':this.props.user.name,
        birthday: this.props.user.birth==''?'':this.props.user.birth,
        avatar_url: this.props.user.photoUrl==''?'':this.props.user.photoUrl,
    }

    /*Attach an observer of user-login state in firebase*/
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            //get current signed in User
            console.log('firebase onAuthStateChanged..');
            if(user != null){
                console.log("Authenticating: " + JSON.stringify(user));
                this.props.dispatch(login(user,this.state.name,this.state.birthday,this.state.avatar_url));
            }
        });
    }

    /*Enable Facebook login and authenticate firebase. */
    login = async () => {

        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('211190339637510', {
            permissions: ['public_profile', 'user_birthday'],
        });
        if (type === 'success') {
            // build firebase credentials
            const credential = await firebase.auth.FacebookAuthProvider.credential(token);
            fetch('https://graph.facebook.com/me?fields=birthday,name,id&access_token='+token)
            .then(response => response.json())
            .then(function(responseJson){
                console.log('object: '+JSON.stringify(responseJson));
                this.setState({birthday: responseJson.birthday, name: responseJson.name});
                //get avatar from facebook
                fetch('https://graph.facebook.com/'+responseJson.id+'/picture?type=square')
                    .then(function(avatarJson){
                        console.log('getting avatar, '+JSON.stringify(avatarJson));
                        this.setState({avatar_url: avatarJson.url});
                        //sign in with credential
                        firebase.auth().signInWithCredential(credential).catch((error) => {
                            Alert.alert("Try Again")
                        });
                    }.bind(this)).catch((error) => {
                        console.error(error);
                    });
            }.bind(this)).catch((error) => {
                console.error(error);
            });
        }
    }

    render() {
        if(this.props.loggedIn){
            return(
                <RootNavigator/>
            )
        }else{
            return (
                <ScrollView contentContainerStyle={{flexGrow: 1,}} scrollEnabled>
                <View style={styles.container}>
                    <ImageBackground style={styles.headerBackground} source={require('/home/yihan/Tinder/assets/tinder_background.png')}>
                        <View style={{flex:3}}>
                            <Text style={styles.logo}>Tinder</Text>
                        </View>
                        <View style={styles.content}>
                            <TouchableOpacity style = {styles.buttonLogin} onPress = {this.login.bind(this)}>
                                <Text style={styles.buttonText}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    </View>
                </ScrollView>
            );
        }
    }
}

/*Connect state from the store to props, state.loggedIn corresponds to action.loggedIn in reducer.js*/
function mapStateToProps(state) {
    console.log('loading login page');
    return {
        loggedIn: state.loggedIn,
        user: state.user
    };
}

/*Connects a React component to a Redux store*/
export default connect(mapStateToProps)(Login);
