import { GET, ENDPOINT, PUT } from "../../services/api";
import { showMessageError } from "../../store/actions/fuse";
import firebase from "../../firebase/firebase";

export const FETCH_ADDRESS_SUCCESS = "[ACCOUNT] FETCH DATA SUCCESS";
export const FETCH_ADDRESS_FAILURE = "[ACCOUNT] FETCH DATA FAILURE";

export const FETCH_CAR_INFORMATION_OWNER_SUCCESS =
  "[CAR_INFORMATION] FETCH DATA SUCCESS";
export const FETCH_CAR_INFORMATION_OWNER_FAILURE =
  "[CAR_INFORMATION] FETCH DATA FAILURE";

export const FETCH_BOOKING_RENTAL_CAR = "[BOOKING_RENTAL] FETCH DATA SUCCESS";
export const APPROVE_BOOKING_REQUEST = "[BOOKING] APPROVE BOOKING SUCCESS";
export const ADD_CAR_REGISTER = "[CAR] ADD DATA SUCCESS";
export const CHANGE_OPEN = "[OPEN] CHANGE";
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

export function addNewCarRegister(car) {
  return {
    type: ADD_CAR_REGISTER,
    payload: car,
  };
}
export function changeOpen(open) {
  return {
    type: CHANGE_OPEN,
    payload: open,
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
export function approveBookingRequestSuccess(booking) {
  return {
    type: APPROVE_BOOKING_REQUEST,
    payload: booking,
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

export function fetchBookingRentalMyCar(carId, status, page, size) {
  return (dispatch) => {
    const params = { page, size, status };
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

export function fetchBookingRequest(renterId, status, page, size) {
  return (dispatch) => {
    const params = { page, size, status: status && status.join(",") };
    const request = GET(ENDPOINT.BOOKING_CONTROLLER_RENTER_GETBYID(renterId), {
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

export function approveBookingRequest(bookingId, status) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.BOOKING_CONTROLLER_GETBYID(bookingId), {
      status,
    });
    request.then(
      (response) => {
        dispatch(approveBookingRequestSuccess(response.data));
        notificationBooking(response.data);
        console.log(response.success ? response.data : "");
      },
      (error) => {
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function notificationBooking(booking) {
  firebase
    .firestore()
    .collection("notification")
    .doc(`${booking.renter.email}`)
    .collection("requests")
    .add({
      status: booking.status,
      car: booking.car,
      owner: booking.lessor,
      renter: booking.renter,
      bookingId: booking.id,
      createAt: new Date().getTime(),
    });
}
