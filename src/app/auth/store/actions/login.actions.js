import jwtService from 'app/services/jwtService';
import { setUserData } from './user.actions';
import * as Actions from 'app/store/actions';
import store from 'app/store';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin(token) {
    return (dispatch) =>
        jwtService.signInWithToken(token)
            .then((token) => {
                const userFromToken = jwtService.getUserDataFromToken();
                dispatch(setUserData({
                    role: userFromToken.roleName,
                    data: {
                        displayName: userFromToken.fullName,
                        photoURL: userFromToken.imageUrl,
                        email: userFromToken.email,
                        shortcuts: []
                    }
                }));
                
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            }
            )
            .catch(error => {
                store.dispatch(Actions.showMessage({message: error.message}));
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: error
                });
            });
}