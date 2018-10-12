import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
var Dimensions = require('Dimensions');
var windowWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
    },
    imageRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#a78c8c',
        borderRadius: 20
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    name: {
        fontSize: 15,
        fontFamily: 'Georgia',
        paddingLeft: 20
    }

});

module.exports = styles
