import * as Actions from "./chat.action";
import { PUT } from "../../services/api";

const initialState = {
  selectedUser: {},
  agreement: { isOpen: false, type: "INIT" },
  criteria: [],
  chip: [],
  newAgreement: {},
  booking: {},
  request: {},
  usersRequest: [],
  responseAgreement: {},
  pendingBookings: [],
  selectedBooking: {},
  isRenter: true,
  agreements: [],
  change: false,
};

const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.RESET_AGREEMENTS: {
      return {
        ...state,
        agreements: [],
      };
    }
    case Actions.CHAT_CHANGE_STATUS_BOOKING: {
      const itemChange = state.pendingBookings.findIndex(
        (item) => item.id === payload.id
      );
      const updateBooking = state.pendingBookings.map((item, index) => {
        if (index !== itemChange) {
          return item;
        }
        return {
          ...item,
          ...payload,
        };
      });
      return {
        ...state,
        selectedBooking: payload,
        pendingBookings: updateBooking,
      };
    }
    case Actions.CLOSE_AGREEMENT_DRAWER: {
      return {
        ...state,
        change: !state.change,
      };
    }
    case Actions.SET_SELECTED_BOOKING: {
      return {
        ...state,
        selectedBooking: payload,
      };
    }
    case Actions.SET_IS_RENTER_BOOKING: {
      return {
        ...state,
        isRenter: payload,
      };
    }
    case Actions.FETCH_BOOKING_PENDING: {
      return {
        ...state,
        pendingBookings: payload,
      };
    }
    case Actions.SET_SELECTED_USER: {
      return {
        ...state,
        selectedUser: payload,
      };
    }
    case Actions.GET_USERS_REQUEST: {
      return {
        ...state,
        usersRequest: payload,
      };
    }
    case Actions.GET_REQUEST_FIREBASE: {
      return {
        ...state,
        request: payload,
      };
    }
    case Actions.OPEN_AGREEMENT:
    case Actions.CLOSE_AGREEMENT: {
      return {
        ...state,
        agreement: payload,
      };
    }
    case Actions.FETCH_CRITERIA_SUCCESS: {
      return {
        ...state,
        criteria: payload,
      };
    }
    case Actions.CHANGE_CHIP: {
      console.log(payload);
      const agreementNeedChange = state.criteria.findIndex(
        (item) => item.name === payload.name
      );

      console.log(agreementNeedChange);
      const updateAgreement = state.criteria.map((item, index) => {
        if (index !== agreementNeedChange) {
          return item;
        }
        return {
          ...item,
          ...payload,
        };
      });
      return {
        ...state,
        criteria: updateAgreement,
        newAgreement: updateAgreement[agreementNeedChange],
      };
    }
    case Actions.INIT_CHIP: {
      return {
        ...state,
        chip: payload,
      };
    }
    case Actions.UPDATE_CHIP: {
      return {
        ...state,
        chip: payload,
      };
    }
    case Actions.CREATE_AGREEMENT_SUCCESS: {
      return {
        ...state,
        responseAgreement: payload,
      };
    }
    case Actions.FETCH_AGREEMENT_SUCCESS: {
      return {
        ...state,
        agreements: payload,
      };
    }
    case Actions.FETCH_BOOKING_REQUEST: {
      return {
        ...state,
        booking: payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default chatReducer;
