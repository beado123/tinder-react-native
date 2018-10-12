import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import  {connect} from 'react-redux';
import * as firebase from 'firebase';
import {sendNotification} from '../redux/actions.js';

export class Chat extends React.Component {

    state = {
        messages: [],
        IdOfPersonChatWith: ''
    }

    /*Set up text in header*/
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return {
            title: 'Chat Room',
        }
    }

    /*Get chat history between you and the user. */
    componentDidMount(){
        console.log('chat page componentDidMount...');
        const id = this.props.navigation.state.params;
        this.setState({IdOfPersonChatWith: id});
        firebase.database().ref('cards/' + this.props.user.id + '/chats/' + id).on('value', (snapshot) => {
            var msg = [];
            snapshot.forEach(function(item){
                if(item.val().text != undefined){
                    msg.push(item.val());
                }
            });
            this.setState({messages: msg.reverse()});
        })
    }

    /*Called when user send a new message. Ask whether the other person allows notifications.
      push messgaes to chats to both users. */
    onSend(messages = []) {
        this.props.dispatch(sendNotification(this.props.navigation.state.params, messages[0].user.name, messages[0].text))
        this.setState( (previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
        firebase.database().ref('cards/' + this.props.user.id + '/chats/' + this.state.IdOfPersonChatWith).push(messages[0]);
        firebase.database().ref('cards/' + this.state.IdOfPersonChatWith + '/chats/' + this.props.user.id).push(messages[0]);
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: this.props.user.id,
                    name: this.props.user.name,
                    avatar: this.props.user.photoUrl
                }}
            />
        );
    }
}

/*Connect state from the store to props, state.user corresponds to action.user in reducer.js*/
function mapStateToProps(state){
    return {
        user: state.user
    }
}

/*Connects a React component to a Redux store*/
export default connect(mapStateToProps)(Chat);
