import React from 'react';
import styles from '../styles/Card-style.js'
import { Text, View, Alert, Image, ImageBackground, TouchableOpacity } from 'react-native';
import  {connect} from 'react-redux';
var Dimensions = require('Dimensions');
var windowWidth = Dimensions.get('window').width;

 export class Card extends React.Component {

    state={
        num: 0,
    }

    /*Get the next photo from arrays of photos of current card*/
    nextPhoto = (evt) => {
        var localX = evt.nativeEvent.locationX;
        var middle = windowWidth/2;
        var num = this.state.num;
        var len = this.props.images.length -1;
        if(localX > middle){
            if(this.state.num >= len){
                this.setState({num:num})
            }else{
                num += 1;
                this.setState({num: num})
            }
        }else{
            if(this.state.num <= 0){
                this.setState({num:0})
            }else{
                num -= 1;
                this.setState({num: num})
            }
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.container} onPress={(evt) => this.nextPhoto(evt)}>
                    <ImageBackground style={styles.cards} source={{uri:this.props.images[this.state.num]}} >
                        <View style={styles.cardTextContainerOuter}>
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.cardText}>{this.props.name}</Text>
                                <Text style={styles.cardText}>{this.props.birth}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}

/*Connect state from the store to props, state.user corresponds to action.user in reducer.js*/
function mapStateToProps(state) {
    console.log('loading card page');
    return {
        user: state.user,
    };
}

/*Connects a React component to a Redux store*/
export default connect(mapStateToProps)(Card);
