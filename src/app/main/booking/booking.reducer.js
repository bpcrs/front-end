import * as Actions from "./booking.action";
const initialState = {
  cars: [],
  reviews: [],
  loading: true,
};

const bookingReducer = (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case Actions.FETCH_CARS_SUCCESS: {
      return {
        ...state,
        cars: payload,
        loading: false,
      };
    }
    case Actions.FETCH_CAR_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.FETCH_REVIEW_LIST: {
      return {
        ...initialState,
        loading: true,
      };
    }
    case Actions.FETCH_REVIEW_SUCCESS: {
      return {
        ...state,
        loading: false,
        reviews: payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default bookingReducer;
