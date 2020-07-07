import * as Actions from "./chat.action";

const initialState = {
  selectedUser: {},
  agreement: { isOpen: false, type: "INIT" },
};

const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.SET_SELECTED_USER: {
      return {
        ...initialState,
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
    default: {
      return state;
    }
  }
};
export default chatReducer;
