import jwtService from 'app/services/jwtService';
import { setUserData } from './user.actions';
import firebase from '../../../firebase/firebase';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const admin = require('firebase-admin');


export function submitLogin(token) {
    return (dispatch) =>
        jwtService.signInWithToken(token)
            .then((token) => {
                const userFromToken = jwtService.getUserDataFromToken();
                console.log(userFromToken);
                
                dispatch(setUserData({
                    role: userFromToken.roleName,
                    data: {
                        displayName: userFromToken.fullName,
                        photoURL: userFromToken.imageUrl,
                        email: userFromToken.email,
                        shortcuts: [],
                        id: userFromToken.id
                    },
                }));

                return dispatch({
                    type: LOGIN_SUCCESS
                    
                });
               
            })
            .catch(error => {
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: error
                });
            });
    // firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider);

}