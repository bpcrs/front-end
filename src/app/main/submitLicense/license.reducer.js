import * as Actions from "./license.action";

const initialState = {
    loading: false,
    changePage: false,
    userDetail: {},
};

const LicenseReducer = (state = initialState, { type, payload }) => {
    switch (type) {
       
        case Actions.USER_LICENSE_UPDATE_SUCCESS: {
            return{
                ...state,
                loading: false,
            }
        }
        case Actions.USER_LICENSE_UPDATE_FAILURE: {
            return{
                ...state,
                loading: false,
            }
        }
        case Actions.USER_LICENSE_UPDATE: {
            return{
                ...state,
                loading: true,
            }
        }
        case Actions.FETCH_USER_DETAIL_SUCCESS: {
            return{
                ...state,
                userDetail: payload,
            }
        }
        default: {
            return state;
        }
    };
};

export default LicenseReducer;