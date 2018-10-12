import React from 'react';
import styles from '../styles/Card-style.js'
import { Text, View, Alert, Image, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import  {connect} from 'react-redux';
import SwipeCards from 'react-native-swipe-cards'
import {getCards, handleNope} from '../redux/actions.js';
import Cards from '../components/Card.js';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

export class Home extends React.Component {

    state = {
        matchName: '',
        modalVisible: false,
        num: 0,
    }

    /*Get cards(users) from firebase. */
    componentDidMount(){
        console.log('home page componentDidMount...');
        this.props.dispatch(getCards(this.props.user.geocode));
    }

    /* Refresh home page to get cards. */
    refresh(){
        console.log('home page refresh');
        this.props.dispatch(getCards(this.props.user.geocode));
    }

    /* When swiping right, it checks if that user also liked us before,
    if yes, then create a match between two users. */
    yup(act, card){
        console.log('num, '+this.state.num);
        if(act == 1){
            //action: swipe
            const len = this.props.cards.length;
            var num = this.state.num;
            if(this.state.num+1 >= len){
                this.setState({num:0})
            }else{
                num += 1;
                this.setState({num: num})
            }
        }
        this.setState({matchName: card.name});
        firebase.database().ref('cards/' + this.props.user.id + '/swipes').update({[card.id]: true});
        firebase.database().ref('cards/' + this.props.user.id + '/chats').once('value', (snapshot) => {
            if(snapshot.hasChild(card.id)){
                console.log('match exists with ' + card.id);
            }else{
                firebase.database().ref('cards/' + card.id + '/swipes/' + this.props.user.id).once('value', (snapshot) => {
                    if(snapshot.val() == true){
                        console.log( card.id + ' also likes you!');
                        this.setState({modalVisible: true});
                        var me = {
                            id: this.props.user.id,
                            name: this.props.user.name,
                            photoUrl: this.props.user.photoUrl
                        }
                        var cardUser = {
                            id: card.id,
                            name: card.name,
                            photoUrl: card.photoUrl
                        }
                        firebase.database().ref('cards/' + this.props.user.id + '/chats/' + card.id).set( cardUser);
                        firebase.database().ref('cards/' + card.id + '/chats/' + this.props.user.id).set(me);
                    }
                });
            }
        });
    }

    /* When swiping left, set swipes to false with key being id of card user. */
    nope(act,card){
        console.log('num: '+this.state.num);
        if(act == 1){
            //action: swipe
            var len = this.props.cards.length;
            var num =  this.state.num;
            if( this.state.num+1 >= len){
                this.setState({num:0});
            }else{
                num += 1;
                this.setState({num: num});
            }
        }
        this.props.dispatch(handleNope(this.props.user.id, card.id));
    }

    /*When clicking close button on the modal, close the modal. */
    closeModal = () => {
        this.setState({modalVisible: false});
    }

    render(){
        return(
            <View>
                <Modal
                    isVisible={this.state.modalVisible}
                    style={{alignItems: 'center'}}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalText}>Found a  match with</Text>
                        <Text style={styles.modalText}>{this.state.matchName} !</Text>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={() => this.closeModal()}>
                          <Text style={styles.modalText}>close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <SwipeCards
                    cards={this.props.cards}
                    stack={false}
                    renderCard={(cardData) => <Cards {...cardData}/>}
                    showYup={true}
                    showNope={true}
                    loop={true}
                    handleYup={this.yup.bind(this,1)}
                    handleNope={this.nope.bind(this,1)}
                    yupStyle={styles.yup}
                    yupTextStyle={styles.yupText}
                    nopeStyle={styles.nope}
                    nopeTextStyle={styles.nopeText}

                />
                <View style={styles.iconRow}>
                    <View style={styles.iconYep}>
                        <TouchableOpacity onPress={() => this.yup(0,this.props.cards[this.state.num])}>
                            <Icon name='heart' size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconRefresh}>
                        <TouchableOpacity onPress={() => this.refresh()}>
                            <Ionicons name='md-refresh-circle' size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconNope}>
                        <TouchableOpacity onPress={() => this.nope(0,this.props.cards[this.state.num])}>
                            <Ionicons name='ios-close-circle' size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

/*Connect state from the store to props, state.user corresponds to action.user in reducer.js*/
function mapStateToProps(state) {
    console.log('loading home page');
    return {
        loggedIn: state.loggedIn,
        cards: state.cards,
        user: state.user,
        stateUS: state.stateUS
    };
}

/*Connects a React component to a Redux store*/
export default connect(mapStateToProps)(Home);
