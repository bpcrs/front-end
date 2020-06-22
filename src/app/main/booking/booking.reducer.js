import * as Actions from "./booking.action";
const initialState = {
  cars: [],
  loading: true,
};

const bookingReducer = (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case Actions.FETCH_CARS_SUCCESS: {
      return {
        ...initialState,
        cars: payload,
        loading: false,
      };
    }
    case Actions.FETCH_CAR_LIST: {
      return {
        ...initialState,
        loading: true,
      };
    }
    default: {
      return state;
    }
  }
};
export default bookingReducer;
