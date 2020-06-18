import * as Actions from './chat.action';

const initialState = {
    selectedUser: {}
}

const chatReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actions.SET_SELECTED_USER:
            {
                return {
                    ...initialState, selectedUser: payload
                }
            }
        default:
            {
                return state
            }
    }
}
export default chatReducer;