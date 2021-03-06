import { GET, ENDPOINT, PUT, POST } from "../../services/api";
import { showMessageError, showMessageSuccess } from "../../store/actions/fuse";
import { BOOKING_STATUS } from "../../../constant";
import { notificationBooking } from "../booking/booking.action";

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
export const UPDATE_ODOMETER_CAR = "[ODOMETER] UPDATE";
export const IS_BOOKING_REVIEW_YET = "[REVIEW] IS BOOKING REVIEW YET";

export function responseBookingReviewYet(isReview) {
  return {
    type: IS_BOOKING_REVIEW_YET,
    payload: isReview,
  };
}
export function updateOdometerSuccess(car) {
  return {
    type: UPDATE_ODOMETER_CAR,
    payload: car,
  };
}
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
        if (response.success) {
          dispatch(fetchBookingRentalCarSuccess(response.data));
        }
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
        if (response.success) {
          dispatch(fetchBookingRentalCarSuccess(response.data));
        }
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
          if (response.data.duplicateList) {
            response.data.duplicateList.forEach((booking) =>
              notificationBooking(booking)
            );
          }
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
          notificationBooking(response.data);
        } else {
          dispatch(showMessageError("Please sign again !"));
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

export function postReturnBooking(id, odometer = 0) {
  return (dispatch) => {
    let request = POST(ENDPOINT.BOOKING_CONTROLLER_RETURN_BOOKING_GETBYID(id), {
      odometer,
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
export function postEstimateBooking(id) {
  return (dispatch) => {
    let request = POST(ENDPOINT.BOOKING_CONTROLLER_ESTIMATE_PRICE_GETBYID(id));
    request.then(
      (response) => {
        dispatch(
          getPreReturnPriceSuccess(
            response.success
              ? response.data
              : {
                  totalPrice: 0,
                  estimatePrice: 0,
                }
          )
        );
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}
export function updateOdometer(id, odometer, cb) {
  const request = PUT(ENDPOINT.CAR_CONTROLLER_ODOMETER_GETBYID(id), {
    odometer,
  });
  request.then(
    (response) => {
      if (response.success) {
        cb(response);
      } else {
        cb({
          success: false,
          message: response.message,
        });
      }
    },
    (error) => {
      cb({
        success: false,
        message: error.message,
      });
    }
  );
}

export function sendOTPConfirm(otp) {
  return (dispatch) => {
    const request = POST(ENDPOINT.ACCOUNT_SEND_CONFIRM_OTP, {
      otp,
    });
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

export function isBookingReviewYet(id, renterId) {
  return (dispatch) => {
    const request = POST(ENDPOINT.BOOKING_CONTROLLER_REVIEW, { id, renterId });
    request.then(
      (response) => {
        dispatch(responseBookingReviewYet(response));
      },
      (error) => {
        dispatch(showMessageError(error.message));
      }
    );
  };
}
