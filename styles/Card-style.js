import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
var Dimensions = require('Dimensions');
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({

    container: {
        marginTop: -5,
        alignItems: 'center'
    },
    cards: {
      width: 300,
      height: 440,
      borderRadius: 20,
      overflow: 'hidden',
    },
    cardTextContainerOuter: {
        flex:1,
        justifyContent: 'flex-end',
        padding:10
    },
    cardTextContainer: {
        padding:15,
        backgroundColor: '#e9e4de',
        borderRadius: 10
    },
    cardText: {
        color: '#a78c8c',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Georgia'
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 450,
    },
    iconYep: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c18080',
        borderRadius: 20,
        marginLeft: 50,
    },
    iconRefresh: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#628b9f',
        borderRadius: 20,
        marginLeft: 4
    },
    iconNope: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#277c6b',
        borderRadius: 20,
        marginRight: 50
    },
    modal: {
        width: 250,
        height: 250,
        backgroundColor:'#db7279',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    modalCloseButton: {
        marginTop: 20
    },
    modalText: {
        padding: 20,
        fontSize: 20,
        fontFamily: 'Cochin-BoldItalic'
    },
    yup: {
        backgroundColor: '#c18080',
        borderColor: '#c18080',
        top: 20,
        right: 20,
        height: 40,
        width: 100,
        zIndex:0,
    },
    nope: {
        backgroundColor: '#277c6b',
        borderColor: '#277c6b',
        top: 20,
        left: 20,
        height: 40,
        width: 100,
        zIndex: 0,
        alignItems: 'center'
    },
    yupText: {
        position: 'absolute',
        top: 10,
        right: 25,
        zIndex: 2,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    nopeText: {
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 1,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    }
});

module.exports = styles
