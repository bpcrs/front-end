import * as Actions from "./booking.action";
const initialState = {
  cars: [],
  bookingRequest: {},
  reviews: {
    data: [],
    count: 0,
  },
  images: [],
  licenses: [],
  loading: false,
  carDetail: {},
  carCompare: [],
  brands: [],
  filterCars: {
    count: 0,
  },
  models: [],
  agreemnts: [],
  booking: {},
  change: false,
  disableButton: false,
  distance: {
    value: 0,
    text: "",
  },
  loadingBooking: false,
  messageResponeReview: "",
  flagBookSuccess: false,
};

const bookingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.RESET_CAR_COMPARE: {
      return {
        ...state,
        carCompare: state.carCompare.filter((item) => item.id !== payload),
      };
    }
    case Actions.ADD_CAR_COMPARE: {
      if (state.carCompare.length === 2) {
        return {
          ...state,
          carCompare: [...state.carCompare.splice(1, 1), payload],
        };
      }
      return {
        ...state,
        carCompare: [...state.carCompare, payload],
      };
    }
    case Actions.RESET_CREATE_BOOKING: {
      return {
        ...state,
        flagBookSuccess: false,
      };
    }
    case Actions.LOADING_CREATE_BOOKING: {
      return {
        ...state,
        loadingBooking: !state.loadingBooking,
      };
    }
    case Actions.FETCH_LICENSE_CAR: {
      return {
        ...state,
        licenses: payload,
      };
    }
    case Actions.PUT_CAR_EDIT_SUCCESS: {
      return {
        ...state,
        carDetail: payload,
      };
    }
    case Actions.POST_DISTANCE_LOCATION: {
      return {
        ...state,
        distance: payload,
      };
    }
    case Actions.UPDATE_CAR_STATUS: {
      return {
        ...state,
        carDetail: {
          ...state.carDetail,
          status: payload,
        },
      };
    }
    case Actions.DELETE_IMAGE_CAR:
    case Actions.CHANGE_IMAGE_TYPE: {
      return {
        ...state,
        carDetail: {
          ...state.carDetail,
          images: state.carDetail.images.filter(
            (item) => item.id !== payload.id
          ),
        },
        change: !state.change,
      };
    }
    case Actions.CREATE_BOOKING_REQUEST: {
      return {
        ...state,
        booking: payload,
        loading: false,
        // loadingBooking: true,
      };
    }
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
    case Actions.FETCH_CAR_COMPARE_SUCCESS: {
      return {
        ...state,
        loading: false,
        carCompare: payload,
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
        flagBookSuccess: true,
      };
    }
    case Actions.POST_BOOKING_FAILURE: {
      return {
        ...state,
        loadingBooking: true,
      };
    }
    case Actions.POST_IMAGE_CAR_SUBMIT_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.POST_CAR_SUBMIT: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.POST_REVIEW_SUBMIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        // reviews: [...state.reviews, payload],
        disableButton: true,
      };
    }
    case Actions.POST_REVIEW_SUBMIT: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.POST_REVIEW_SUBMIT_FAILURE: {
      return {
        ...state,
        messageResponeReview: payload,
        loading: true,
      };
    }
    default: {
      return state;
    }
  }
};
export default bookingReducer;
