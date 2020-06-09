import {combineReducers} from 'redux';
import user from './user.reducer';
import login from './login.reducer';
import car from './car.reducer';

const authReducers = combineReducers({
    user,
    login
});

export default authReducers;