import * as Actions from "./booking.action";
const initialState = {
  cars: [],
  bookingRequest: {},
  reviews: [],
  images: [],
  loading: true,
  carDetail: {},
  brands: [],
  filterCars: [],
  models: [],
  agreemnts: [],
};

const bookingReducer = (state = initialState, { type, payload }) => {
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
    case Actions.FETCH_IMAGE_CAR_SUCCESS: {
      return {
        ...state,
        loading: false,
        images: payload,
      };
    }
    case Actions.FETCH_BRAND_SUCCESS: {
      return {
        ...state,
        loading: false,
        brands: payload,
      };
    }
    case Actions.FETCH_FILTER_CARS_SUCCESS: {
      return {
        ...state,
        loading: false,
        filterCars: payload,
      };
    }
    case Actions.FETCH_MODEL_SUCCESS: {
      return {
        ...state,
        loading: false,
        models: payload,
      };
    }
    case Actions.POST_BOOKING_SUCCESS: {
      return {
        ...state,
        // loading: false,
        bookingRequest: payload,
      };
    }
    case Actions.CREATE_AGREEMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        agreemnts: payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default bookingReducer;
