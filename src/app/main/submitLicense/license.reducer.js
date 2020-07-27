import * as Actions from "./license.action";

const initialState = {
    loading: false,
    changePage: false,
};

const LicenseReducer = (state = initialState, { type, payload }) => {
    switch (type) {
       
        default: {
            return state;
        }
    };
};

export default LicenseReducer;