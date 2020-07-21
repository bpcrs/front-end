import { GET, ENDPOINT } from "../../services/api";
import { showMessageError } from "../../store/actions/fuse";

export const FETCH_CAR_CHECKING_SUCCESS = "[CAR_CHECKING] FETCH DATA SUCCESS";
export const FETCH_CAR_CHECKING_FAILURE = "[CAR_CHECKING] FETCH DATA FAILURE";

export function fetchCarCheckingSuccess(cars) {
    return {
        type: FETCH_CAR_CHECKING_SUCCESS,
        payload: cars,
    };
}

export function fetchCarCheckingFailure(cars) {
    return {
        type: FETCH_CAR_CHECKING_FAILURE,
        payload: cars,
    };
}

export function fetchCarCheckingAdmin() {
    return (dispatch) => {
        const request = GET(ENDPOINT.CAR_CONTROLLER_GETALL);
        request.then(
            (response) => {
                if (response.success) {
                    dispatch(fetchCarCheckingSuccess(response.success ? response.data : []));
                } else {
                    dispatch(showMessageError(response.message));
                }
            },
            (error) => {
                dispatch(fetchCarCheckingFailure(error));
                dispatch(showMessageError(error.message));
            }
        );
    }
}