import { showMessageError } from "../../store/actions/fuse";
import { GET, ENDPOINT } from "../../services/api";

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
		const request = GET(ENDPOINT.CAR_CONTROLLER_GETALL)
		request.then(
			response => dispatch(fetchCarSuccess(response.data.success ? response.data.data : [])),
			error => {
				dispatch(fetchCarsError(error))
				dispatch(showMessageError(error.message))
			}
		);
	}
}