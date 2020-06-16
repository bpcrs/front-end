import '@fake-db'
import React from 'react';
import {createGenerateClassName, jssPreset} from '@material-ui/core';
import {FuseAuthorization, FuseLayout, FuseTheme} from '@fuse';
import JssProvider from 'react-jss/lib/JssProvider';
import Provider from 'react-redux/es/components/Provider';
import {Router} from 'react-router-dom';
import {create} from 'jss';
import jssExtend from 'jss-extend';
import history from '../history';
import {Auth} from './auth';
import store from './store';
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
import { ReactReduxFirebaseProvider, createFirebaseInstance } from 'react-redux-firebase';
import firebase from "../app/firebase/firebase";
const jss = create({
    ...jssPreset(),
    plugins: [...jssPreset().plugins, jssExtend()]
});

jss.options.insertionPoint = document.getElementById('jss-insertion-point');
const generateClassName = createGenerateClassName();
// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }
const App = () => {
    return (
        <AppContext.Provider
            value={{
                routes
            }}
        >
            
            <JssProvider jss={jss} generateClassName={generateClassName}>
            <ReactReduxFirebaseProvider firebase={firebase} config={rrfConfig} dispatch={store.dispatch} createFirestoreInstance={createFirebaseInstance}>


                <Provider store={store}>
                    <Auth>
                        <Router history={history}>
                            <FuseAuthorization>
                                <FuseTheme>
                                    <FuseLayout/>
                                </FuseTheme>
                            </FuseAuthorization>
                        </Router>
                    </Auth>
                </Provider>
                </ReactReduxFirebaseProvider>
            </JssProvider>
        </AppContext.Provider>
    );
};

export default App;
