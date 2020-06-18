import { setDefaultSettings } from 'app/store/actions/fuse';
// import _ from '@lodash';
// import store from 'app/store';
// import * as Actions from 'app/store/actions';
import jwtService from 'app/services/jwtService';
import { APP_ROLE } from '../../../../constant';
import firebase from '../../../firebase/firebase';

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

// /**
//  * Set user data from Auth0 token data
//  */
// export function setUserDataAuth0(tokenData) {
//     const user = {
//         role: 'admin',
//         from: 'auth0',
//         data: {
//             displayName: tokenData.username,
//             photoURL: tokenData.picture,
//             email: tokenData.email,
//             settings: (tokenData.user_metadata && tokenData.user_metadata.settings) ? tokenData.user_metadata.settings : {},
//             shortcuts: (tokenData.user_metadata && tokenData.user_metadata.shortcuts) ? tokenData.user_metadata.shortcuts : []
//         }
//     };

//     return setUserData(user);
// }

/**
 * Set User Data
 */
export function setUserData(user) {
    return async (dispatch) => {

        /*
        Set User Settings
         */
        dispatch(setDefaultSettings(user.data.settings));

        /*
        Set User Data
         */
        
        dispatch({
            type: SET_USER_DATA,
            payload: user
        })

        await firebase.firestore().collection('users').doc(user.data.id.toString()).set({
            id: user.data.id.toString(),
            fullName: user.data.displayName,
            image: user.data.photoURL
        });
    }
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings) {
    return (dispatch, getState) => {
        const oldUser = getState().auth.user;
        console.log(oldUser);
        
        const user = {}

        updateUserData(user);

        return dispatch(setUserData(user));
    }
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
    return (dispatch, getState) => {
        const user = getState().auth.user;
        const newUser = {
            ...user,
            data: {
                ...user.data,
                shortcuts
            }
        };

        updateUserData(newUser);

        return dispatch(setUserData(newUser));
    }
}

/**
 * Remove User Data
 */
export function removeUserData() {
    return {
        type: REMOVE_USER_DATA
    }
}

/**
 * Logout
 */
export function logoutUser() {

    return (dispatch, getState) => {

        const user = getState().auth.user;

        if (user.role === APP_ROLE.GUEST) {
            return null;
        }
        jwtService.logout();

        // dispatch(setInitialSettings());

        dispatch({
            type: USER_LOGGED_OUT
        })
    }
}

/**
 * Update User Data
 */
function updateUserData(user) {
    if (user.role === APP_ROLE.GUEST) {
        return;
    }
    jwtService.updateUserData(user)
        .then(() => {
            // store.dispatch(Actions.showMessage({ message: "User data saved with api" }));
        })
        .catch(error => {
            // store.dispatch(Actions.showMessage({ message: error.message }));
        });
}

