import * as Actions from '../actions';
import jwtService from '../../../services/jwtService'
const initialState = {
    success: jwtService.getAccessToken() != null,
};

const login = function (state = initialState, action) {
    switch (action.type) {
        case Actions.LOGIN_SUCCESS:
            {
                return {
                    ...initialState,
                    success: true
                };
            }
        case Actions.LOGIN_ERROR:
            {
                return {
                    success: false,
                    // error: action.payload
                };
            }
        default:
            {
                return state
            }
    }
};

export default login;