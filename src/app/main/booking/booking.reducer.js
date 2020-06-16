import * as Actions from './booking.action';
const initialState = {
    cars: []
}

const bookingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Actions.FETCH_CARS_SUCCESS:
            {
                return {
                    ...initialState, cars: payload
                }
            }
        default:
            {
                return state
            }
    }
}
export default bookingReducer;