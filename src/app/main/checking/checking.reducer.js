import * as Actions from "./checking.action";

const initialState = {
    cars: [],
};

const CheckingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actions.FETCH_CAR_CHECKING_SUCCESS: {
           return{
               ...state,
               cars: payload,
           }
        }
        default: {
            return state;
        }
    };
};

export default CheckingReducer;