import * as Actions from "./profile.action";
const initialState = {
  address: {},
  payment: {},
  rentHistory: [],
  leaseHistory: [],
  cars: {
    count: 0,
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
  change: false,
  changeApprove: false,
  trackings: [],
  isVerify: false,
  otpConfirm: false,
};
const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.FETCH_TRACKING_BOOKING: {
      return {
        ...state,
        trackings: payload,
      };
    }
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
        change: !state.change,
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
        changeApprove: !state.changeApprove,
      };
    }
    case Actions.FETCH_ACCOUNT_VERIFY: {
      return { ...state, isVerify: payload };
    }

    default: {
      return state;
    }
  }
};
export default profileReducer;
