import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
var Dimensions = require('Dimensions');
var windowWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({

    profileUpper: {
      flex: 3,
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    profilepicWrap: {
      marginTop: 10
    },
    profilepic: {
      marginTop: 40,
      width: 80,
      height:80,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    profileLower: {
      backgroundColor: '#f4f2f5',
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    name: {
      marginTop: 30,
      fontFamily: 'Georgia',
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold'
    },
    editIcon: {
        marginTop: 20,
        paddingRight: 10
    },
    ProfileButtonLogin: {
      padding: 15,
      marginTop: 10,
      borderRadius:20,
      backgroundColor: '#f4f2f5',
    },
    ProfileButtonText: {
      color: '#000',
      fontSize: 14,
      fontFamily: 'Georgia',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    signoutIcon: {
        marginTop: 10,
        paddingRight: 10
    },
    ProfileButtonSignout: {
      padding: 15,
      width: 100,
      borderRadius: 20,
      backgroundColor: '#fff',
    },
});

module.exports = styles
