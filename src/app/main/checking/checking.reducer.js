import * as Actions from "./checking.action";

const initialState = {
  cars: [],
  carDetail: {},
  images: [],
  users: [],
  // loading: false,
  changePage: false,
  userDetail: {},
  priceTransaction: 0,
  lastMonthTransaction: 0,
  priceTransactions: [],
  requests: {},
  requestsLastMonth: {},
};

const CheckingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.FETCH_COUNT_LAST_MONTH_REQUESTS: {
      return {
        ...state,
        requestsLastMonth: payload,
      };
    }
    case Actions.FETCH_COUNT_BOOKING_REQUEST: {
      return {
        ...state,
        requests: payload,
      };
    }
    case Actions.FETCH_LAST_MONTH_TRANSACTIONS: {
      return {
        ...state,
        lastMonthTransaction: payload,
      };
    }
    case Actions.FETCH_BOOKING_TRANSACTIONS_WEEKS: {
      return {
        ...state,
        priceTransactions: [...state.priceTransactions, payload],
      };
    }
    case Actions.FETCH_REVENUE_BOOKING: {
      return {
        ...state,
        priceTransaction: payload,
      };
    }
    case Actions.FETCH_CAR_CHECKING_SUCCESS: {
      return {
        ...state,
        cars: payload,
      };
    }
    case Actions.FETCH_CAR_DETAIL_CHECKING_SUCCESS: {
      return {
        ...state,
        carDetail: payload,
      };
    }
    case Actions.FETCH_USER_CHECKING_SUCCESS: {
      return {
        ...state,
        users: payload,
      };
    }
    case Actions.PUT_CAR_EDIT_CHECK_SUCCESS: {
      return {
        ...state,
        changePage: true,
      };
    }
    case Actions.FETCH_USER_DETAIL_CHECKING_SUCCESS: {
      return {
        ...state,
        userDetail: payload,
      };
    }
    case Actions.PUT_USER_DETAIL_CHECKING_SUCCESS: {
      return {
        ...state,
        changePage: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default CheckingReducer;
