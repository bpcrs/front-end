import * as Actions from "./booking.action";
const initialState = {
  cars: [],
  reviews: [],
  loading: true,
  carDetail: {},
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
    case Actions.FETCH_REVIEW_SUCCESS: {
      return {
        ...state,
        loading: false,
        reviews: payload,
      };
    }
    case Actions.FETCH_CAR_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        carDetail: payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default bookingReducer;
