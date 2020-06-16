import Axios from "axios";
import { APP_CONST } from "../../../constant";

export const FETCH_CAR_LIST = '[CAR] FETCH DATA';
export const FETCH_CARS_SUCCESS = '[CAR] FETCH DATA SUCCESS';
export const FETCH_CARS_FAILURE = '[CAR] FETCH DATA FAILURE';

export function fetchCarSuccess(offers) {
	return {
		type: FETCH_CARS_SUCCESS,
		payload: offers
	};
}

export function fetchCarsError(error) {
	return {
		type: FETCH_CARS_FAILURE,
		payload: error
	};
}


export function fetchCarList() {
    return (dispatch) => {
        const request = Axios.get(APP_CONST.API_URL + '/car')
        request.then(
            response => dispatch(fetchCarSuccess(response.data.success ? response.data.data : [])),
            error => dispatch(fetchCarsError(error))
        );
    }
}