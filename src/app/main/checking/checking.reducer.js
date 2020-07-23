import * as Actions from "./checking.action";

const initialState = {
    cars: [],
    carDetail: {},
    brands: [],
    models: [],
    images: [],
};

const CheckingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actions.FETCH_CAR_CHECKING_SUCCESS: {
           return{
               ...state,
               cars: payload,
           }
        }
        case Actions.FETCH_CAR_DETAIL_CHECKING_SUCCESS: {
            return{
                ...state,
                carDetail: payload,
            }
        }
        default: {
            return state;
        }
    };
};

export default CheckingReducer;