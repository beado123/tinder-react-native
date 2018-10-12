import Geocode from 'react-geocode';
import aws from '../config/aws';
import { RNS3 } from 'react-native-aws3';
import { ImagePicker, Location, Permissions, Notifications } from 'expo';
import Geohash from 'latlon-geohash';
import * as firebase from 'firebase';


/*This function logs in the user to firebase, and update name, birthday, avatar if necessary*/
export function login(user, avatar_url){
    return function(dispatch){
        let newUser = {
            id: user.uid,
            photoUrl: user.photoURL,
            name: user.displayName,
            gender: ' ',
            showAge: false,
            birth: ' ',
            aboutMe: ' ',
            chats: ' ',
            geocode: ' ',
            images: [user.photoURL],
            notifications: false,
            show: false,
            report: false,
            swipes: {
                [user.uid]: false
            },
            token: ' ',
        }
        firebase.database().ref('cards/').child(user.uid).once('value')
            .then(function(snapshot){
                if(snapshot.val() !== null){
                    //if the user exists in firebase, create an action object of type 'LOGIN'
                    console.log('user exists in firebase');
                    dispatch({type: 'LOGIN', user: snapshot.val(), loggedIn: true});
                }else{
                    //create a firebase new user
                    console.log('user does not exist in firebase');
                    dispatch(getLocation());
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
                accessKey: 'AKIAIXQ7RFQBRSRCCIJQ',
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

/*This function gets latitude and longitude from the city user chose, and encode the lat,lng to geocode.
  Store geocode in firebase. */
export function changeLocation(loc){
    return function(dispatch){
        console.log('new location: '+loc);
        //get latitude, longitude from address(state)
        Geocode.fromAddress(loc).then((response) => {
            if(response.status == 'OK'){
                const { lat, lng } = response.results[0].geometry.location;
                //encode latitude and longitude
                var geocode = Geohash.encode(lat, lng, 5);
                firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/geocode').set(geocode);
                dispatch({type: 'CHANGE_LOCATION', geocode: geocode, stateUS: loc});
            }else if(response.status == 'OVER_QUERY_LIMIT'){
                setTimeout(function(){ alert("QUERY LIMIT exceeds, wait..."); }, 3000);
            }
        }).catch((err) => {
            console.error(err);
        });
    }
}

/*This function deletes the image selected by user.*/
export function deleteImage(uri, imageArray){
    return function(dispatch){
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
        firebase.database().ref('cards/'+ firebase.auth().currentUser.uid + '/showAge').set(value);
        dispatch({type: 'CHANGE_OPTION', showAge: value});
    }
}

/*Get all users in firebase.and pass them to display in home page. */
export function getCards(geocode){
    return function(dispatch){
        console.log('geocode: '+geocode);
        firebase.database().ref('cards').orderByChild('geocode').equalTo(geocode).once('value', (snapshot) =>{
            var cards = [];
            snapshot.forEach(function(item){
                //object of card
                card = item.val();
                //the last part of reference path, the id of the card cards/blabla
                card.id = item.key;
                cards.push(card);
            });
            dispatch({type: 'GET_CARDS', cards: cards});
        })
    }
}

/*If the user don't like the user, just set the swipe to false with key being id of user. */
export function handleNope(userId, cardId){
    return function(){
        firebase.database().ref('cards/' + userId + '/swipes').update({[cardId]: false});
    }
}

/*Ask user permission to get their location and encode the location. Store in firebase. */
export function getLocation(){
    return function(dispatch){
        Permissions.askAsync(Permissions.LOCATION).then((response) => {
            if(response.status == 'granted'){
                Location.getCurrentPositionAsync({}).then((location) => {
                    var geocode = Geohash.encode(location.coords.latitude, location.coords.longitude, 5);
                    console.log('geocode: '+geocode);
                    firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/geocode').set(geocode);
                    dispatch({type: 'GET_LOCATION', geocode: geocode});
                })
            }else{
                console.error('Location permission denied!');
            }
        })
    }
}

/*Ask user permission to show notifications, store token from expo in firebase. */
export function showNotification(){
    return function(dispatch){
        Permissions.askAsync(Permissions.NOTIFICATIONS).then((response) => {
            if(response.status == 'granted'){
                Notifications.getExpoPushTokenAsync().then((token) => {
                    console.log('token: '+token);
                    firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/token').set(token);
                    firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/notifications').set(true);
                    dispatch({type: 'SHOW_NOTIFICATION', token: token});
                })
            }
        })
    }
}

/*send the message to the user you're chatting with and send notification at the same time. */
export function sendNotification(personTo,name,msg){
    return function(dispatch){
        firebase.database().ref('cards/' + personTo + '/token').once('value', (snapshot) => {
            if(snapshot.val() !== ''){
                var bodyJSON = {
                    to: snapshot.val(),
                    title: name,
                    body: msg,
                };
                fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'accept-encoding': 'gzip, deflate',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(bodyJSON),
                }).then((response) => {
                    console.log('response: '+JSON.stringify(response));
                }).catch((error) => {
                    console.error(error);
                })
            }
        })
    }
}
