import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'app/auth/store/reducers';
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';
import { firestoreReducer } from "react-redux-firebase";
import chat from '../../main/chat/chat.reducer'

import booking from '../../main/booking/booking.reducer'
const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        quickPanel,
        firestoreReducer,
        chat,
        booking,
        ...asyncReducers
    });

export default createReducer;
