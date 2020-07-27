import * as Actions from "./license.action";

const initialState = {
    loading: false,
    changePage: false,
};

const LicenseReducer = (state = initialState, { type, payload }) => {
    switch (type) {
       
        case Actions.USER_LICENSE_UPDATE_SUCCESS: {
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
        default: {
            return state;
        }
    };
};

export default LicenseReducer;