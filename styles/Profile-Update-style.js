import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
var Dimensions = require('Dimensions');
var windowWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({

    imageRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 40
    },
    profileImage: {
      width: 100,
      height:100,
      borderRadius: 20,
      margin: 10,
    },
    addImage: {
        width: 100,
        height:100,
        margin:10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper:{
        paddingLeft:40,
        paddingRight:40
    },
    aboutMe: {
        marginTop: -30,
        color: '#000',
        fontSize: 18,
        fontFamily: 'Georgia',
        paddingLeft: 15
    },
    inputBox: {
        width: windowWidth,
        backgroundColor: '#fff',
        height: 90,
        marginTop: 10,
        paddingLeft: 15,
        fontSize: 16
    },
    saveButton: {
        backgroundColor: '#dbd3ca',
        marginTop: 10,
        width: 80,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveText: {
        fontSize: 18,
        fontFamily: 'Georgia',
        justifyContent: 'center',
    },
    deleteImageButton: {
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    genderText: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'Georgia',
        marginTop: 30,
        paddingLeft: 15
    },
    genderBox: {
        height: 50,
        backgroundColor: '#fff',
        marginTop: 10,
        justifyContent: 'center',
    },
    headerButton: {
        right:10
    },
    headerButtonText: {
        color: '#ff6a80',
        fontFamily: 'Georgia',
        fontSize: 20
    },
    birthText: {
        paddingLeft: 15,
        fontSize: 15,
        color: '#b2b2b2'
    },
    birthBox: {
        height: 50,
        backgroundColor: '#fff',
        marginTop: 10,
        justifyContent: 'center',
        paddingLeft: 15,
        fontSize: 16
    },
    showAgeContainer: {
        backgroundColor: '#fff',
        marginTop: 10,
        height: 40,
        justifyContent: 'center',
        //marginBottom: 30,
    },
    switchButton: {
        position: 'absolute',
        right:5,
        bottom: 3,
    },
    switchText: {
        position: 'absolute',
        left: 15,
        top: 7,
        fontSize: 16
    },
    optionText: {
        marginTop: 40,
        paddingLeft: 15,
        fontSize: 18,
        fontFamily: 'Georgia',
        color: '#000'
    },
    showNotiContainer: {
        backgroundColor: '#fff',
        marginTop: 25,
        height: 40,
        justifyContent: 'center',
        marginBottom: 40,
    },
});

module.exports = styles
