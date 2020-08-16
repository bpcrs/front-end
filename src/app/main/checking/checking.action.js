import { GET, PUT, ENDPOINT, POST } from "../../services/api";
import { showMessageError, showMessage } from "../../store/actions/fuse";
import firebase from "../../firebase/firebase";
export const CHANGE_OPEN = "[OPEN] CHANGE";
export const FETCH_CAR_CHECKING_SUCCESS = "[CAR_CHECKING] FETCH DATA SUCCESS";
export const FETCH_CAR_CHECKING_FAILURE = "[CAR_CHECKING] FETCH DATA FAILURE";

export const FETCH_BRAND_LIST_SUCCESS = "[BRAND_LIST] FETCH DATA SUCCESS";
export const FETCH_BRAND_LIST_FAILURE = "[BRAND_LIST] FETCH DATA FAILURE";

export const FETCH_CAR_DETAIL_CHECKING_SUCCESS =
  "[CAR_DETAIL_CHECKING] FETCH DATA SUCCESS";
export const FETCH_CAR_DETAIL_CHECKING_FAILURE =
  "[CAR_DETAIL_CHECKING] FETCH DATA FAILURE";

export const FETCH_USER_CHECKING_SUCCESS = "[USER_CHECKING] FETCH DATA SUCCESS";
export const FETCH_USER_CHECKING_FAILURE = "[USER_CHECKING] FETCH DATA SUCCESS";

export const FETCH_USER_DETAIL_CHECKING_SUCCESS =
  "[USER_DETAIL_CHECKING] FETCH DATA SUCCESS";
export const FETCH_USER_DETAIL_CHECKING_FAILURE =
  "[USER_DETAIL_CHECKING] FETCH DATA FAILURE";

export const PUT_CAR_EDIT_CHECK_SUCCESS = "[CAR_EDIT_CHECK] PUT DATA SUCCESS";
export const PUT_CAR_EDIT_CHECK_FAILURE = "[CAR_EDIT_CHECK] PUT DATA FAILURE";

export const PUT_USER_DETAIL_CHECKING_SUCCESS =
  "[USER_DETAIL_CHECKING] PUT DATA SUCCESS";
export const PUT_USER_DETAIL_CHECKING_FAILURE =
  "[USER_DETAIL_CHECKING] PUT DATA FAILURE";
export const FETCH_REVENUE_BOOKING = "[REVENUE] BOOKING";
export const FETCH_BOOKING_TRANSACTIONS_WEEKS = "[TRANSACTIONS] FETCH WEEKS";
export const FETCH_LAST_MONTH_TRANSACTIONS = "[TRANSACTION] FETCH LAST MONTH";
export const FETCH_COUNT_BOOKING_REQUEST = "[COUNT_BOOKING] FETCH REQUEST";
export const FETCH_COUNT_LAST_MONTH_REQUESTS =
  "[COUNT_BOOKING] FETCH LAST MONTH";

export function fetchCountBookingLastMonth(data) {
  return {
    type: FETCH_COUNT_LAST_MONTH_REQUESTS,
    payload: data,
  };
}
export function fetchCountBookingRequests(data) {
  return {
    type: FETCH_COUNT_BOOKING_REQUEST,
    payload: data,
  };
}
export function fetchLastMonthTransaction(price) {
  return {
    type: FETCH_LAST_MONTH_TRANSACTIONS,
    payload: price,
  };
}
export function fetchTransactionsPriceBookingWeek(prices) {
  return {
    type: FETCH_BOOKING_TRANSACTIONS_WEEKS,
    payload: prices,
  };
}
export function fetchRevenueBooking(price) {
  return {
    type: FETCH_REVENUE_BOOKING,
    payload: price,
  };
}
export function fetchCarCheckingSuccess(cars) {
  return {
    type: FETCH_CAR_CHECKING_SUCCESS,
    payload: cars,
  };
}

export function fetchCarCheckingFailure(error) {
  return {
    type: FETCH_CAR_CHECKING_FAILURE,
    payload: error,
  };
}

export function fetchBrandListSuccess(brands) {
  return {
    type: FETCH_BRAND_LIST_SUCCESS,
    payload: brands,
  };
}

export function fetchBrandListFailure(error) {
  return {
    type: FETCH_BRAND_LIST_FAILURE,
    payload: error,
  };
}

export function fetchCarDetailCheckingSuccess(car) {
  return {
    type: FETCH_CAR_DETAIL_CHECKING_SUCCESS,
    payload: car,
  };
}

export function fetchCarDetaiCheckingFailure(error) {
  return {
    type: FETCH_CAR_DETAIL_CHECKING_FAILURE,
    payload: error,
  };
}

export function fetchUserCheckingSuccess(users) {
  return {
    type: FETCH_USER_CHECKING_SUCCESS,
    payload: users,
  };
}

export function fetchUserCheckingFailure(error) {
  return {
    type: FETCH_USER_CHECKING_FAILURE,
    payload: error,
  };
}

export function fetchUserDetailCheckingSuccess(user) {
  return {
    type: FETCH_USER_DETAIL_CHECKING_SUCCESS,
    payload: user,
  };
}

export function fetchUserDetailCheckingFailure(error) {
  return {
    type: FETCH_USER_DETAIL_CHECKING_FAILURE,
    payload: error,
  };
}

export function putCarEditSuccess(car) {
  return {
    type: PUT_CAR_EDIT_CHECK_SUCCESS,
    payload: car,
  };
}

export function putCarEditFailure(error) {
  return {
    type: PUT_CAR_EDIT_CHECK_FAILURE,
    payload: error,
  };
}

export function putUserDetailSuccess(user) {
  return {
    type: PUT_USER_DETAIL_CHECKING_SUCCESS,
    payload: user,
  };
}

export function putUserDetailFailure(error) {
  return {
    type: PUT_USER_DETAIL_CHECKING_FAILURE,
    payload: error,
  };
}

export function fetchCarCheckingAdmin(page, size) {
  return (dispatch) => {
    // const request = GET(ENDPOINT.CAR_CONTROLLER_GETALL);
    const request = GET(ENDPOINT.CAR_CONTROLLER_ADMIN_GETALL, {
      page,
      size,
    });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(
            fetchCarCheckingSuccess(response.success ? response.data : [])
          );
        } else {
          // dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        dispatch(fetchCarCheckingFailure(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchBrandByAdminList(page, size) {
  return (dispatch) => {
    const request = GET(ENDPOINT.BRAND_CONTROLLER_GETALLBY_ADMIN, {
      page,
      size,
    });
    request.then(
      (response) => {
        dispatch(fetchBrandListSuccess(response.success ? response.data : []));
      },
      (error) => {
        dispatch(fetchBrandListFailure(error.message));
      }
    );
  };
}

export function updateBrand(brand) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.BRAND_UPDATE, {
brand
    });
    request.then(
      (response) => {
        dispatch(fetchBrandListSuccess(response.success ? response.data : []));
      },
      (error) => {
        dispatch(fetchBrandListFailure(error.message));
      }
    );
  };
}

export function fetchCarDetailCheck(carId) {
  return (dispatch) => {
    const request = GET(ENDPOINT.CAR_CONTROLLER_GETBYID(carId));
    request.then(
      (response) => {
        if (response.success) {
          dispatch(fetchCarDetailCheckingSuccess(response.data));
        } else {
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        dispatch(fetchCarDetaiCheckingFailure(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchUserListChecking() {
  return (dispatch) => {
    const request = GET(ENDPOINT.ACCOUNT_CONTROLLER_GETALL);
    request.then(
      (response) => {
        if (response.success) {
          dispatch(fetchUserCheckingSuccess(response.data));
        } else {
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        dispatch(fetchUserCheckingFailure(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function putCarUpdate(id, status) {
  return (dispatch) => {
    // const request = PUT(ENDPOINT.CAR_CONTROLLER_GETBYID(id), {}, car);
    const request = PUT(
      ENDPOINT.CAR_CONTROLLER_STATUS_GETBYID(id),
      { status },
      {}
    );
    request.then(
      (response) => {
        if (response.success) {
          dispatch(putCarEditSuccess(response.data));
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

export async function fetchUserDetailChecking(userId) {
  return (dispatch) => {
    const request = GET(ENDPOINT.ACCOUNT_CONTROLLER_GETBYID(userId));
    request.then(
      (response) => {
        if (response.success) {
          dispatch(fetchUserDetailCheckingSuccess(response.data));
        } else {
          dispatch(fetchUserDetailCheckingFailure(response.message));
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        dispatch(fetchUserDetailCheckingFailure(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function notificationLicenseUser(message, userMail, isAccept) {
  firebase
    .firestore()
    .collection("notification")
    .doc(`${userMail}`)
    .collection("requests")
    .add({
      message: message,
      status: isAccept ? "ACCEPTLICENSE" : "DENYLICENSE",
      createAt: new Date().getTime(),
      isSeen: false,
    });
}

export function notificationUserCar(message, userMail, isAccept, car) {
  firebase
    .firestore()
    .collection("notification")
    .doc(`${userMail}`)
    .collection("requests")
    .add({
      message: message,
      status: isAccept ? "ACCEPTCAR" : "DENYCAR",
      createAt: new Date().getTime(),
      car: car,
      isSeen: false,
    });
}

export function fetchRevenueAllDoneBooking(fromDate, toDate, isDay) {
  return (dispatch) => {
    const request = GET(ENDPOINT.STATISTICS_CONTROLLER, { fromDate, toDate });
    request.then(
      (response) => {
        dispatch(
          isDay
            ? fetchTransactionsPriceBookingWeek(
                response.success ? response.data : ""
              )
            : fetchRevenueBooking(response.success ? response.data : "")
        );
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function fetchLastMonthTransactions(fromDate, toDate) {
  return (dispatch) => {
    const request = GET(ENDPOINT.STATISTICS_CONTROLLER, { fromDate, toDate });
    request.then(
      (response) => {
        dispatch(
          fetchLastMonthTransaction(response.success ? response.data : 0)
        );
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function fetchCountBookingRequest(fromDate, toDate, status, isCurrent) {
  return (dispatch) => {
    const request = POST(ENDPOINT.STATISTICS_CONTROLLER, {
      fromDate,
      status,
      toDate,
    });
    request.then(
      (response) => {
        dispatch(
          isCurrent
            ? fetchCountBookingRequests(response.success ? response.data : {})
            : fetchCountBookingLastMonth(response.success ? response.data : {})
        );
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}
