import * as Actions from "./profile.action";
const initialState = {
  address: {},
  payment: {},
  rentHistory: [],
  leaseHistory: [],
  cars: [],
  bookings: [],
};
const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.FETCH_ADDRESS_SUCCESS: {
      return {
        ...state,
        address: payload,
        loading: false,
      };
    }
    case Actions.FETCH_CAR_INFORMATION_OWNER_SUCCESS: {
      return {
        ...state,
        cars: payload,
        loading: false,
      };
    }
    case Actions.FETCH_BOOKING_RENTAL_OWNER: {
      return {
        ...state,
        bookings: payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default profileReducer;
