import * as Actions from "./chat.action";

const initialState = {
  selectedUser: {},
  agreement: { isOpen: false, type: "INIT" },
  criteria: [],
  chip: [],
  agreements: [],
  booking: {},
  request: {},
};

const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.SET_SELECTED_USER: {
      return {
        ...state,
        selectedUser: payload,
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
      const chipNeedChange = state.chip.findIndex(
        (item) => item.name === payload.name
      );

      console.log(chipNeedChange);
      const updateChip = state.chip.map((item, index) => {
        if (index !== chipNeedChange) {
          return item;
        }
        return {
          ...item,
          ...payload,
        };
      });
      return {
        ...state,
        chip: updateChip,
      };
    }
    case Actions.INIT_CHIP: {
      return {
        ...state,
        chip: payload,
      };
    }
    case Actions.CREATE_AGREEMENT_SUCCESS: {
      return {
        ...state,
        agreements: payload,
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
