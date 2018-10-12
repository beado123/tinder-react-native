import React from 'react';
import styles from '../styles/Matches-style.js'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import  {connect} from 'react-redux';
import * as firebase from 'firebase';

export class Matches extends React.Component {

    state = {
        chats: []
    }

    /*Get all the chats from firebase and display them in a list. */
    componentDidMount(){
        firebase.database().ref('cards/' + this.props.user.id + '/chats').on('value', (snapshot) => {
            var chats = [];
            snapshot.forEach(function(item){
                chats.push(item.val());
            });
            this.setState({chats: chats});
        })
    }

    render() {
        return (
            <View>
                <ScrollView style={{paddingTop:15}}>
                    {this.state.chats.map((user) => {
                        return(
                            <TouchableOpacity style={styles.imageRow} key={{user}} onPress={() => this.props.navigation.navigate('Chat_Room', user.id)}>
                                <Image style={styles.avatar} source={{uri: user.photoUrl}} />
                                <Text style={styles.name}>{user.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

/*Connect state from the store to props, state.user corresponds to action.user in reducer.js*/
function mapStateToProps(state) {
    console.log('loading Matches page');
    return {
        loggedIn: state.loggedIn,
        user: state.user
    };
}

/*Connects a React component to a Redux store*/
export default connect(mapStateToProps)(Matches);
