import * as Actions from "./chat.action";

const initialState = {
  selectedUser: {},
  agreement: { isOpen: false, type: "INIT" },
  criteria: [],
};

const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.SET_SELECTED_USER: {
      return {
        ...state,
        selectedUser: payload,
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
    default: {
      return state;
    }
  }
};
export default chatReducer;
