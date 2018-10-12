/*Set up initial state*/
const initialState = {
    loggedIn: false,
    foundNewMatch: false,
    user: {
        id: '',
        photoUrl: '',
        name: '',
        gender: '',
        showAge: false,
        birth: '',
        aboutMe: '',
        chats: '',
        geocode: '',
        Images: [],
        notifications: false,
        show: false,
        report: false,
        swipes: [],
        token: '',
    }
}

/*Change the state of the store according to different types of actions, and return new state to components. */
export default reducers = (oldState = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return {...oldState, user: action.user, loggedIn: action.loggedIn}
        }
        case 'LOGIN_UPDATE': {
            return {...oldState, user: {
                                    ...oldState.user,
                                    name: action.name,
                                    birth: action.birth,
                                    photoUrl: action.photoUrl,
                                    images: action.images
                                },
                                loggedIn: action.loggedIn}
        }
        case 'LOGOUT': {
            return {...oldState, loggedIn: action.loggedIn}
        }
        case 'UPLOAD_IMAGE': {
            return {...oldState, user: {...oldState.user, images: action.images}}
        }
        case 'UPDATE_PROFILE': {
            return {...oldState, user: {...oldState.user, aboutMe: action.aboutMe, birth: action.birth}}
        }
        case 'CHANGE_GENDER': {
            return {...oldState, user: {...oldState.user, gender: action.gender}}
        }
        case 'DELETE_IMAGE': {
            return {...oldState, user: {...oldState.user, images: action.images}}
        }
        case 'UPDATE_NAME_GENDER': {
            return {...oldState, user: {...oldState.user, name: action.name, gender: action.gender}}
        }
        case 'CHANGE_OPTION': {
            return {...oldState, user: {...oldState.user, showAge: action.showAge}}
        }
        case 'GET_CARDS': {
            return {...oldState, cards: action.cards}
        }
        case 'GET_LOCATION': {
            return {...oldState, user: {...oldState.user, geocode: action.geocode}}
        }
        case 'CHANGE_LOCATION': {
            return {...oldState, user: {...oldState.user, geocode: action.geocode}, stateUS: action.stateUS}
        }
        case 'SHOW_NOTIFICATION': {
            return {...oldState, user: {...oldState.user, token: action.token, notifications: true}}
        }
        default:
            return oldState
    }
}
