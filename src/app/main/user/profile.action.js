import { GET, ENDPOINT } from "../../services/api";
import { showMessageError } from "../../store/actions/fuse";

export const FETCH_ADDRESS_SUCCESS = "[ACCOUNT] FETCH DATA SUCCESS";
export const FETCH_ADDRESS_FAILURE = "[ACCOUNT] FETCH DATA FAILURE";

export const FETCH_CAR_INFORMATION_OWNER_SUCCESS =
  "[CAR_INFORMATION] FETCH DATA SUCCESS";
export const FETCH_CAR_INFORMATION_OWNER_FAILURE =
  "[CAR_INFORMATION] FETCH DATA FAILURE";

export const FETCH_BOOKING_RENTAL_CAR = "[BOOKING_RENTAL] FETCH DATA SUCCESS";

export function fetchCarInformationOwnerSuccess(cars) {
  return {
    type: FETCH_CAR_INFORMATION_OWNER_SUCCESS,
    payload: cars,
  };
}

export function fetchCarInformationOwnerFailure(cars) {
  return {
    type: FETCH_CAR_INFORMATION_OWNER_FAILURE,
    payload: cars,
  };
}

export function fetchAccountAddressSuccess(account) {
  return {
    type: FETCH_ADDRESS_SUCCESS,
    payload: account,
  };
}
export function fetchAccountAddressError(account) {
  return {
    type: FETCH_ADDRESS_FAILURE,
    payload: account,
  };
}
export function fetchBookingRentalCarSuccess(bookings) {
  return {
    type: FETCH_BOOKING_RENTAL_CAR,
    payload: bookings,
  };
}

export function fetchAccountAddress(id) {
  return (dispatch) => {
    const request = GET(ENDPOINT.ACCOUNT_ADDRESS_GETBYID(id));
    request.then((response) => {
      if (response.success) {
        dispatch(fetchAccountAddressSuccess(response.data));
      } else {
        dispatch(fetchAccountAddressError(response.message));
      }
    });
  };
}

export function fetchCarInformationOwner(ownerId) {
  return (dispatch) => {
    const request = GET(ENDPOINT.CAR_INFORMATION_OWNER_GETBYID(ownerId));
    request.then(
      (response) => {
        if (response.success) {
          dispatch(fetchCarInformationOwnerSuccess(response.data));
        } else {
          dispatch(fetchCarInformationOwnerFailure(response.message));
        }
      },
      (error) => {
        dispatch(fetchCarInformationOwnerFailure(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchBookingRentalMyCar(carId, page, size) {
  return (dispatch) => {
    const params = { page, size };
    const request = GET(ENDPOINT.BOOKING_CONTROLLER_OWNER_GETBYID(carId), {
      ...params,
    });
    request.then(
      (response) => {
        dispatch(
          fetchBookingRentalCarSuccess(response.success ? response.data : [])
        );
      },
      (error) => {
        dispatch(showMessageError(error.message));
      }
    );
  };
}
