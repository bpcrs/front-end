import * as Actions from "./profile.action";
const initialState = {
  address: {},
  payment: {},
  rentHistory: [],
  leaseHistory: [],
  cars: {
    data: [],
  },
  bookings: {
    data: [],
  },
  loading: false,
  open: false,
  registerSuccess: false,
  isDetail: false,
  request: {
    carId: 0,
    name: "",
  },
};
const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.CHOOSE_CAR: {
      return {
        ...state,
        request: payload,
      };
    }
    case Actions.OPEN_DETAIL: {
      return {
        ...state,
        isDetail: payload,
        loading: false,
      };
    }
    case Actions.PROCESS_REGISTER: {
      return {
        ...state,
        open: false,
        loading: true,
      };
    }
    case Actions.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
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
        open: payload,
        loading: false,
      };
    }
    case Actions.ADD_CAR_REGISTER: {
      return {
        ...state,
        cars: {
          count: state.cars.count + 1,
          data: [...state.cars.data, payload],
        },
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
    case Actions.FETCH_BOOKING_RENTAL_CAR: {
      return {
        ...state,
        bookings: payload,
        loading: false,
      };
    }
    case Actions.CHANGE_BOOKING_REQUEST: {
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
