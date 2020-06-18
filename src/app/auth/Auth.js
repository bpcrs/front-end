import React from 'react';
import { useDispatch } from 'react-redux';
// import * as userActions from 'app/auth/store/actions';
// import * as Actions from 'app/store/actions';
import jwtService from 'app/services/jwtService';
import { useEffect } from 'react';
import { showMessage } from '../store/actions/fuse';
import { logoutUser, submitLogin } from './store/actions';

const Auth = (props) => {
    useEffect(() => {
        /*eslint-disable*/
        // jwtCheck();
    }, [])
    const dispatch = useDispatch();
    const jwtCheck = () => {
        jwtService.on('onAutoLogin', () => {
            dispatch(showMessage({ message: 'Logging in with JWT' }));

            /**
             * Sign in and retrieve user data from Api
             */
            dispatch(submitLogin(jwtService.getAccessToken()))
            // jwtService.signInWithToken()
            //     .then(user => {
            //         this.props.setUserData(user);

            //         this.props.showMessage({ message: 'Logged in with JWT' });
            //     })
            //     .catch(error => {
            //         this.props.showMessage({ message: error });
            //     })
        });

        jwtService.on('onAutoLogout', (message) => {
            dispatch(showMessage({ message: 'Logging in with JWT' }));
            dispatch(logoutUser())
        });

        jwtService.init();
    };


    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );
}


export default Auth;
