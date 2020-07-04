import { showMessageError } from "../../store/actions/fuse";
import { GET, ENDPOINT } from "../../services/api";

export const FETCH_CARS_SUCCESS = "[CAR] FETCH DATA SUCCESS";
export const FETCH_CARS_FAILURE = "[CAR] FETCH DATA FAILURE";

export const FETCH_REVIEW_SUCCESS = "[REVIEW] FETCH DATA SUCCESS";
export const FETCH_REVIEW_FAILURE = "[REVIEW] FETCH DATA FAILURE";

export const FETCH_CAR_DETAIL_SUCCESS = "[CAR_DETAIL] FETCH DATA SUCCESS";
export const FETCH_CAR_DETAIL_ERROR = "[CAR_DETAIL] FETCH DATA ERROR";

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

export function fetchCarDetailSuccess(car) {
  return {
    type: FETCH_CAR_DETAIL_SUCCESS,
    payload: car,
  };
}
export function fetchCarDetailError(error) {
  return {
    type: FETCH_CAR_DETAIL_ERROR,
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
        dispatch(fetchCarSuccess(response.success ? response.data : [])),
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
        dispatch(fetchReviewSuccess(response.success ? response.data : [])),
      (error) => {
        dispatch(fetchReviewError(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchCarDetail(id) {
  return (dispatch) => {
    const request = GET(ENDPOINT.CAR_CONTROLLER_GETBYID(id));
    request.then(
      (response) => {
        if (response.success) {
          dispatch(fetchCarDetailSuccess(response.data));
        } else {
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        console.log(error);
        dispatch(fetchCarDetailError(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}
