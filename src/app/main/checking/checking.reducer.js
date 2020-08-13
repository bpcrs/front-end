import * as Actions from "./checking.action";

const initialState = {
  cars: [],
  carDetail: {},
  images: [],
  users: [],
  // loading: false,
  brands: [],
  changePage: false,
  userDetail: {},
};

const CheckingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.FETCH_BRAND_LIST_SUCCESS: {
      return {
        ...state,
        brands: payload,
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
