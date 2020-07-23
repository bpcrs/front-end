import * as Actions from "./profile.action";
const initialState = {
  address: {},
  payment: {},
  rentHistory: [],
  leaseHistory: [],
  cars: [],
  bookings: {
    data: [],
  },
  loading: false,
  open: false,
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
    case Actions.CHANGE_OPEN: {
      return {
        ...state,
        open: !state.open,
      };
    }
    case Actions.ADD_CAR_REGISTER: {
      return {
        ...state,
        cars: [...state.cars, payload],
        loading: true,
      };
    }
    case Actions.FETCH_CAR_INFORMATION_OWNER_SUCCESS: {
      return {
        ...state,
        cars: payload,
        loading: false,
      };
    }
    case Actions.FETCH_BOOKING_RENTAL_CAR: {
      return {
        ...state,
        bookings: payload,
        loading: false,
      };
    }
    case Actions.APPROVE_BOOKING_REQUEST: {
      return {
        ...state,
        bookings: {
          data: state.bookings.data.filter(
            (element) => element.id !== payload.id
          ),
          count: state.bookings.count - 1,
        },
      };
    }
    default: {
      return state;
    }
  }
};
export default profileReducer;
