import * as Actions from "./profile.action";
const initialState = {
    address: {},
    payment: {},
    rentHistory: [],
    leaseHistory: []
};
const profileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actions.FETCH_ADDRESS_SUCCESS: {
            return {
                ...state,
                account: payload,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}
export default profileReducer;