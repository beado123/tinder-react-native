import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
var Dimensions = require('Dimensions');
var windowWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
    },
    headerBackground: {
      flex:1,
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    content: {
      flex:1,
      alignItems: 'center',
      flexDirection: 'column',
    },
    logo: {
      color: '#fff',
      width: 400,
      fontSize: 40,
      textAlign:'center',
      fontFamily: 'Georgia',
      textShadowColor: '#ffe1ff',
      textShadowOffset: {width:2, height:2},
      textShadowRadius: 15,
      marginTop: 80
    },
    buttonLogin: {
      padding: 15,
      backgroundColor: '#ff6a80',
      borderRadius: 20
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Georgia',
      fontWeight: 'bold',
      textAlign: 'center'
    },
});

module.exports = styles
