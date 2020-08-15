import { GET, ENDPOINT, PUT, POST } from "../../services/api";
import { showMessageError, showMessageSuccess } from "../../store/actions/fuse";
import firebase from "../../firebase/firebase";
import { BOOKING_STATUS, MY_NOTIFICATION_STATUS } from "../../../constant";

export const FETCH_ADDRESS_SUCCESS = "[ACCOUNT] FETCH DATA SUCCESS";
export const FETCH_ADDRESS_FAILURE = "[ACCOUNT] FETCH DATA FAILURE";

export const FETCH_CAR_INFORMATION_OWNER_SUCCESS =
  "[CAR_INFORMATION] FETCH DATA SUCCESS";
export const FETCH_CAR_INFORMATION_OWNER_FAILURE =
  "[CAR_INFORMATION] FETCH DATA FAILURE";

export const FETCH_BOOKING_RENTAL_CAR = "[BOOKING_RENTAL] FETCH DATA SUCCESS";
export const CHANGE_BOOKING_REQUEST = "[BOOKING] CHANGE BOOKING SUCCESS";
export const ADD_CAR_REGISTER = "[CAR] ADD DATA SUCCESS";
export const CHANGE_OPEN = "[OPEN] CHANGE";
export const REGISTER_SUCCESS = "[OPEN] REGISTER SUCCESS";
export const PROCESS_REGISTER = "[PROCESS] PROCESSING REGISTER";
export const OPEN_DETAIL = "[DETAIL] CHANGE";
export const CHOOSE_CAR = "[CAR] CHOOSE CAR";
export const FETCH_TRACKING_BOOKING = "[TRACKING] FETCH TRACKING BOOKING";
export const FETCH_ACCOUNT_VERIFY = "[ACCOUNT] CHECK VERIFY";
export const FETCH_CONFRIM_OTP = "[ACCOUNT] CHECK OTP";
export const GET_PRE_RETURN_PRICE_BOOKING = "[BOOKING] GET PRE-RETURN PRICE";

export function getPreReturnPriceSuccess(price) {
  return {
    type: GET_PRE_RETURN_PRICE_BOOKING,
    payload: price,
  };
}
export function chooseCar(carId, name) {
  return {
    type: CHOOSE_CAR,
    payload: {
      carId,
      name,
    },
  };
}
export function fetchTracking(trackings) {
  return {
    type: FETCH_TRACKING_BOOKING,
    payload: trackings,
  };
}
export function openDetail(state) {
  return {
    type: OPEN_DETAIL,
    payload: state,
  };
}
export function registerSuccess() {
  return {
    type: REGISTER_SUCCESS,
  };
}
export function processingRegister() {
  return {
    type: PROCESS_REGISTER,
  };
}
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
export function changeBookingStatusRequestSuccess(booking) {
  return {
    type: CHANGE_BOOKING_REQUEST,
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

export function fetchCarInformationOwner(ownerId, page, size) {
  return (dispatch) => {
    const params = { page, size };
    const request = GET(ENDPOINT.CAR_INFORMATION_OWNER_GETBYID(ownerId), {
      ...params,
    });
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
  // console.log(Array.isArray(status));
  return (dispatch) => {
    // Array.isArray(status) ?
    const params = Array.isArray(status)
      ? { page, size, status: status && status.join(",") }
      : { page, size, status };
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

export function fetchBookingRequest(
  renterId,
  status,
  page,
  size,
  isRenter = true
) {
  return (dispatch) => {
    const params = { page, size, status: status && status.join(","), isRenter };
    const request = GET(ENDPOINT.BOOKING_CONTROLLER_USER_GETBYID(renterId), {
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

export function changeBookingStatusRequest(bookingId, status) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.BOOKING_CONTROLLER_GETBYID(bookingId), {
      status,
    });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(changeBookingStatusRequestSuccess(response.data));
          notificationBooking(response.data);
          dispatch(showMessageSuccess(messageStatusSuccess(status)));
        } else {
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function messageStatusSuccess(status) {
  switch (status) {
    case BOOKING_STATUS.CANCEL:
      return "Cancel booking success";
    default:
      return "Success";
  }
}

export function signContractRequest(id, otp) {
  return (dispatch) => {
    const request = POST(ENDPOINT.CONTRACT_CONTROLLER_SIGN, { id, otp });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(showMessageSuccess("Signed contract successful"));
        } else {
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function sendOTPRequest() {
  return (dispatch) => {
    const request = POST(ENDPOINT.ACCOUNT_SEND_OTP, {});
    request.then(
      (response) => {
        if (response.success) {
          dispatch(showMessageSuccess(response.message));
        } else {
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        dispatch(showMessageError(error.message));
      }
    );
  };
}
export function checkVerifyRequestSuccess(isVerify) {
  return {
    type: FETCH_ACCOUNT_VERIFY,
    payload: isVerify,
  };
}
export function checkVerifyRequest() {
  return (dispatch) => {
    const request = POST(ENDPOINT.ACCOUNT_VERIFY, {});
    request.then(
      (response) => {
        dispatch(checkVerifyRequestSuccess(response.success));
      },
      (error) => {
        dispatch(showMessageError(error.message));
      }
    );
  };
}
export function getTrackingsByBooking(id) {
  return (dispatch) => {
    const request = GET(ENDPOINT.TRACKING_CONTROLLER_GETBY_BOOKINGID(id));
    request.then(
      (response) => {
        dispatch(fetchTracking(response.success ? response.data : {}));
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function getPreReturnPriceBooking(id, odmeter) {
  return (dispatch) => {
    const request = POST(ENDPOINT.BOOKING_CONTROLLER_RETURN_PRICE_GETBYID(id), {
      odmeter,
    });
    request.then(
      (response) => {
        dispatch(
          getPreReturnPriceSuccess(response.success ? response.data : "")
        );
      },
      (error) => {
        showMessageError(error.message);
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
      owner: booking.car.owner,
      renter: booking.renter,
      bookingId: booking.id,
      createAt: new Date().getTime(),
    });
}

export function notiMyNotification(currentUser, status, booking) {
  switch (status) {
    case BOOKING_STATUS.PENDING:
      status = MY_NOTIFICATION_STATUS.ACCEPT;
      break;
    case BOOKING_STATUS.DENY:
      status = MY_NOTIFICATION_STATUS.REFUSE;
      break;
    case BOOKING_STATUS.OWNER_ACCEPTED:
      status = MY_NOTIFICATION_STATUS.YOU_ACCEPTED;
      break;
    case BOOKING_STATUS.CONFIRM:
      status = MY_NOTIFICATION_STATUS.WAITING;
      break;
    case BOOKING_STATUS.CANCEL:
      status = MY_NOTIFICATION_STATUS.REVOKE;
      break;
    case BOOKING_STATUS.RENTER_SIGNED:
      status = MY_NOTIFICATION_STATUS.YOU_SIGNED;
      break;
    case BOOKING_STATUS.PROCESSING:
      status = BOOKING_STATUS.PROCESSING;
      break;
    default:
      status = "";
  }
  firebase
    .firestore()
    .collection("notification")
    .doc(`${currentUser.email}`)
    .collection("requests")
    .add({
      status: status,
      car: booking.car,
      owner: booking.car.owner,
      renter: booking.renter,
      bookingId: booking.id,
      createAt: new Date().getTime(),
      isSeen: false,
    });
}
