import * as firebase from 'firebase';
import aws from '../config/aws';
import { RNS3 } from 'react-native-aws3';
import { ImagePicker } from 'expo';

/*This function logs in the user to firebase, and update name, birthday, avatar if necessary*/
export function login(user, name, birthday, avatar_url){
    return function(dispatch){
        let newUser = {
            id: user.uid,
            photoUrl: avatar_url==''?user.photoURL:avatar_url,
            name: name==''?user.displayName:name,
            gender: '',
            showAge: false,
            birth: birthday==''?'':birthday.substring(6),
            aboutMe: '',
            chats: '',
            geocode: '',
            images: [avatar_url==''?user.photoURL:avatar_url],
            notifications: false,
            show: false,
            report: false,
            swipes: {
                [user.uid]: false
            },
            token: '',
        }
        firebase.database().ref('cards/').child(user.uid).once('value')
        .then(function(snapshot){
            //if the user exists in firebase
            if(snapshot.val() !== null){
                //create an action object of type 'LOGIN'
                console.log('user exists in firebase');
                if(name != '' && birthday != '' && avatar_url != ''){
                    var imageArray = snapshot.val().images;
                    imageArray[0] = avatar_url;
                    firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/name').set(name);
                    firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/birth').set(birthday.substring(6));
                    firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/photoUrl').set(avatar_url);
                    firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/images').set(imageArray);
                    dispatch({type: 'LOGIN_UPDATE', loggedIn: true, name: name, birth: birthday.substring(6), photoUrl: avatar_url, images: imageArray });
                }else{
                    dispatch({type: 'LOGIN', user: snapshot.val(), loggedIn: true});
                }
            }else{
                //create a firebase new user
                console.log('user does not exist in firebase');
                firebase.database().ref('cards/'+ user.uid).set(newUser);
                dispatch({type: 'LOGIN', user: newUser, loggedIn: true});
            }
        });
    }
}

/*This function updates name and gender of user in firebase*/
export function updateNameGender(name, gender){
    return function(dispatch){
        firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/name').set(name);
        firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/gender').set(gender);
        dispatch({type: 'UPDATE_NAME_GENDER', name: name, gender: gender});
    }
}

/*This function uploads image selected by user in system album to aws*/
export function uploadImage(imageArray){
    return function(dispatch){
        var images = imageArray;
        //Open album by ImagePicker
        ImagePicker.launchImageLibraryAsync().then(function(imageObject){
            var file = {};
            console.log(imageObject);
            console.log(imageArray.length);
            if(imageObject.cancelled)return;
            else{
                file = {
                    uri: imageObject.uri,
                    name: imageObject.uri,
                    type: imageObject.type,
                }
            }
            const options = {
                bucket: 'tinderreact',
                region: 'us-east-2',
                accessKey: 'AKIAJONWWHUETF4BQOBQ',
                secretKey: '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',
                keyPrefix: 'uploads/'

            }
            //upload image selected from system UI to AWS
            RNS3.put(file, options)
                .progress((e) => console.log("uploading image..." + e.loaded / e.total))
                    .then(function(response){
                        if(response.status == 201){
                            //add image url to images array of the user
                            images.push(response.body.postResponse.location);
                            console.log(images.length);
                            firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/images').set(images);
                            dispatch({type: 'UPLOAD_IMAGE', images: images});
                        }
                    })
        }).catch(function(error){
            console.log(error);
        });
    }
}

/*This function logs user out from firebase.*/
export function logout(){
    return function(dispatch){
        firebase.auth().signOut();
        dispatch({type: 'LOGOUT', loggedIn: false});
    }
}

/*This function updates aboutMe and birth of user.*/
export function updateProfile(aboutMe, birth){
    return function(dispatch){
        firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/aboutMe').set(aboutMe);
        firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/birth').set(birth);
        dispatch({type: 'UPDATE_PROFILE', aboutMe: aboutMe, birth: birth});
    }
}

/*This function changes gender selected by user.*/
export function changeGender(gender){
    return function(dispatch){
        firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/gender').set(gender);
        dispatch({type: 'CHANGE_GENDER', gender: gender});
    }
}

/*This function deletes the image selected by user.*/
export function deleteImage(uri, imageArray){
    return function(dispatch){
        console.log('want to delete: '+uri);
        var newImageArray = imageArray;
        var index = newImageArray.indexOf(uri);
        if(index !== -1)newImageArray.splice(index,1);
        firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/images').set(newImageArray);
        dispatch({type: 'DELETE_IMAGE', images: newImageArray});
    }
}

/*This function allows the user to choose whether to show up age in profile page.*/
export function changeShowOption(value){
    return function(dispatch){
        console.log('action: '+value);
        firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/showAge').set(value);
        dispatch({type: 'CHANGE_OPTION', showAge: value});
    }
}
