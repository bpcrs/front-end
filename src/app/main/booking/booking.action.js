import { showMessageError } from "../../store/actions/fuse";
import { GET, ENDPOINT } from "../../services/api";

export const FETCH_CAR_LIST = "[CAR] FETCH DATA";
export const FETCH_CARS_SUCCESS = "[CAR] FETCH DATA SUCCESS";
export const FETCH_CARS_FAILURE = "[CAR] FETCH DATA FAILURE";

export const FETCH_REVIEW_LIST = "[REVIEW] FETCH DATA";
export const FETCH_REVIEW_SUCCESS = "[REVIEW] FETCH DATA SUCCESS";
export const FETCH_REVIEW_FAILURE = "[REVIEW] FETCH DATA FAILURE";

export function fetchCarSuccess(cars) {
  return {
    type: FETCH_CARS_SUCCESS,
    payload: cars,
  };
}
export function fetchCarsError(error) {
  return {
    type: FETCH_CARS_FAILURE,
    payload: error,
  };
}

export function fetchReviewSuccess(reviews) {
  return {
    type: FETCH_REVIEW_SUCCESS,
    payload: reviews,
  };
}
export function fetchReviewError(error) {
  return {
    type: FETCH_REVIEW_FAILURE,
    payload: error,
  };
}
export function fetchCarList(page, size) {
  return (dispatch) => {
    // dispatch({
    //   type: FETCH_CAR_LIST,
    // });
    const request = GET(ENDPOINT.CAR_CONTROLLER_GETALL, {
      page,
      size,
    });
    request.then(
      (response) =>
        dispatch(
          fetchCarSuccess(response.data.success ? response.data.data : [])
        ),
      (error) => {
        dispatch(fetchCarsError(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchReviewList(page, size, carId) {
  return (dispatch) => {
    const request = GET(ENDPOINT.REVIEW_CONTROLLER_GETALL, {
      page,
      size,
      carId,
    });
    request.then(
      (response) =>
        dispatch(
          fetchReviewSuccess(response.data.success ? response.data.data : [])
        ),
      (error) => {
        dispatch(fetchReviewError(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}
