import * as Actions from '../actions';
import jwtService from '../../../services/jwtService'
const initialState = {
    success: jwtService.getAccessToken() != null,
    error: {
        username: null,
        password: null
    }
};
const car = function (state = initialState, action) {
    switch (action.type) {
        default:
            {
                return state
            }
    }
}
export default car;
