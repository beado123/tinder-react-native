import React from 'react';
import renderer from 'react-test-renderer';
import "isomorphic-fetch"
import mockStore from 'redux-mock-store';
import * as actions from '../redux/actions.js'

test('logout action is dispatched to correct type with return value loggedIn', () => {
    actions.logout = jest.fn().mockImplementation(() => {
        return {type: 'LOGOUT', loggedIn: false}
    });
});

test('update-profile action is dispatched to correct type with return value aboutMe and birth', () => {
    const aboutMe = 'hellow world';
    const birth = '1995';
    actions.updateProfile = jest.fn(aboutMe,birth).mockImplementation(() => {
        return {type: 'UPDATE_PROFILE', aboutMe: aboutMe, birth: birth}
    });
});

test('change-gender action is dispatched to correct type with return value gender', () => {
    const gender = 'female';
    actions.changeGender = jest.fn(gender).mockImplementation(() => {
        return {type: 'CHANGE_GENDER', gender: gender}
    });
});

test('delete-image action is dispatched to correct type with return value images', () => {
    const imageArray = ['some-uri'];
    const uri = 'some-uri';
    actions.deleteImage = jest.fn(uri, imageArray).mockImplementation(() => {
        return {type: 'DELETE_IMAGE', images: imageArray}
    });
});

test('change-ShowOption action is dispatched to correct type with return value showAge', () => {
    const selectedValue = true;
    actions.changeShowOption = jest.fn(selectedValue).mockImplementation(() => {
        return {type: 'CHANGE_OPTION', showAge: selectedValue}
    });
});

test('upload-image action is dispatched to correct type with return value images', () => {
    const imageArray = ['some-uri'];
    actions.uploadImage = jest.fn(imageArray).mockImplementation(() => {
        return {type: 'UPLOAD_IMAGE', images: imageArray}
    });
});

test('login action is dispatched to correct type with return value user, name, birthday, avatar_url', () => {
    const user = 'some user';
    const name = 'ted';
    const birthday = '1999';
    const avatar_url = 'some-uri';
    actions.login = jest.fn(user, name, birthday, avatar_url).mockImplementation(() => {
        return {type: 'LOGIN', user: user, loggedIn: true}
    });
});
