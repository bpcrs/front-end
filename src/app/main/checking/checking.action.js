import { GET, PUT, ENDPOINT, POST } from "../../services/api";
import { showMessageError, showMessageSuccess } from "../../store/actions/fuse";
import firebase from "../../firebase/firebase";
export const CHANGE_OPEN = "[OPEN] CHANGE";
export const FETCH_CAR_CHECKING_SUCCESS = "[CAR_CHECKING] FETCH DATA SUCCESS";
export const FETCH_CAR_CHECKING_FAILURE = "[CAR_CHECKING] FETCH DATA FAILURE";

export const FETCH_ACCOUNT_LIST_SUCCESS = "[ACCOUNT_LIST] FETCH DATA SUCCESS";
export const FETCH_ACCOUNT_LIST_FAILURE = "[ACCOUNT_LIST] FETCH DATA FAILURE";

export const FETCH_ACCOUNT_STATUS_EDIT_SUCCESS = "[ACCOUNT] PUT DATA SUCCESS";
export const FETCH_ACCOUNT_STATUS_EDIT_FAILURE = "[ACCOUNT] PUT DATA FAILURE";

export const FETCH_MODEL_LIST_SUCCESS = "[MODEL_LIST] FETCH DATA SUCCESS";
export const FETCH_MODEL_LIST_FAILURE = "[MODEL_LIST] FETCH DATA FAILURE";

export const FETCH_MODEL_EDIT_SUCCESS = "[MODEL] PUT DATA SUCCESS";
export const FETCH_MODEL_EDIT_FAILURE = "[MODEL] PUT DATA FAILURE";

export const FETCH_MODEL_ADD_SUCCESS = "[MODEL] POST DATA SUCCESS";
export const FETCH_MODEL_ADD_FAILURE = "[MODEL] POST DATA FAILURE";

export const FETCH_BRAND_LIST_SUCCESS = "[BRAND_LIST] FETCH DATA SUCCESS";
export const FETCH_BRAND_LIST_FAILURE = "[BRAND_LIST] FETCH DATA FAILURE";

export const FETCH_BRAND_EDIT_SUCCESS = "[BRAND] PUT DATA SUCCESS";
export const FETCH_BRAND_EDIT_FAILURE = "[BRAND] PUT DATA FAILURE";

export const FETCH_BRAND_ADD_SUCCESS = "[BRAND] POST DATA SUCCESS";
export const FETCH_BRAND_ADD_FAILURE = "[BRAND] POST DATA FAILURE";

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
export const APPROVE_USER_REGISTER = "[USER_REGISTER] APPROVE";

export function fetchAccountListSuccess(accounts) {
  return {
    type: FETCH_ACCOUNT_LIST_SUCCESS,
    payload: accounts,
  };
}

export function fetchAccountListFailure(error) {
  return {
    type: FETCH_ACCOUNT_LIST_FAILURE,
    payload: error,
  };
}

export function putEditAccountStatusSuccess(account) {
  return {
    type: FETCH_ACCOUNT_STATUS_EDIT_SUCCESS,
    payload: account,
  };
}

export function putEditAccountStatusFailure(error) {
  return {
    type: FETCH_ACCOUNT_STATUS_EDIT_FAILURE,
    payload: error,
  };
}

export function fetchModelListSuccess(models) {
  return {
    type: FETCH_MODEL_LIST_SUCCESS,
    payload: models,
  };
}

export function fetchModelListFailure(error) {
  return {
    type: FETCH_MODEL_LIST_FAILURE,
    payload: error,
  };
}

export function putEditModelSuccess(model) {
  return {
    type: FETCH_MODEL_EDIT_SUCCESS,
    payload: model,
  };
}

export function putEditModelFailure(error) {
  return {
    type: FETCH_MODEL_EDIT_FAILURE,
    payload: error,
  };
}

export function postAddModelSuccess(model) {
  return {
    type: FETCH_MODEL_ADD_SUCCESS,
    payload: model,
  };
}
export function postAddModelFailure(error) {
  return {
    type: FETCH_MODEL_ADD_FAILURE,
    payload: error,
  };
}
export function putEditBrandSuccess(brand) {
  return {
    type: FETCH_BRAND_EDIT_SUCCESS,
    payload: brand,
  };
}
export function putEditBrandFailure(error) {
  return {
    type: FETCH_BRAND_EDIT_FAILURE,
    payload: error,
  };
}

export function postAddBrandSuccess(brand) {
  return {
    type: FETCH_BRAND_ADD_SUCCESS,
    payload: brand,
  };
}
export function postAddBrandFailure(error) {
  return {
    type: FETCH_BRAND_ADD_FAILURE,
    payload: error,
  };
}

export function approveUserRegister(data) {
  return {
    type: APPROVE_USER_REGISTER,
    payload: data,
  };
}
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

export function fetchAccountByAdminList(page, size) {
  return (dispatch) => {
    const request = GET(ENDPOINT.ACCOUNT_CONTROLLER_GETALL, {
      page,
      size,
    });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(
            fetchAccountListSuccess(response.success ? response.data : [])
          );
        } else {
          // dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        dispatch(fetchAccountListFailure(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function updateAccountStatus(id) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.ACCOUNT_STATUS_UPDATE(id));
    request.then(
      (response) => {
        if (response.success) {
          dispatch(putEditAccountStatusSuccess(response.success ? response.data : []));
        } else {
          dispatch(putEditAccountStatusFailure(response.message));
        }
      },
      (error) => {
        dispatch(putEditAccountStatusFailure(error.message));
      }
    );
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

export function fetchModelByAdminList(page, size) {
  return (dispatch) => {
    const request = GET(ENDPOINT.MODEL_CONTROLLER_GETALLBY_ADMIN, {
      page,
      size,
    });
    request.then(
      (response) => {
        dispatch(fetchModelListSuccess(response.success ? response.data : []));
      },
      (error) => {
        dispatch(fetchModelListFailure(error.message));
      }
    );
  };
}
export function addModel(name) {
  return (dispatch) => {
    const request = POST(ENDPOINT.MODEL_CONTROLLER_GETALL, { name });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(postAddModelSuccess(response.success ? response.data : []));
        } else {
          dispatch(postAddModelFailure(response.message));
        }
      },
      (error) => {
        dispatch(postAddModelFailure(error.message));
      }
    );
  };
}

export function updateModel(id, name) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.MODEL_UPDATE(id), { name });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(putEditModelSuccess(response.success ? response.data : []));
        } else {
          dispatch(putEditModelFailure(response.message));
        }
      },
      (error) => {
        dispatch(putEditModelFailure(error.message));
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

export function addBrand(name, imageUrl) {
  return (dispatch) => {
    const request = POST(ENDPOINT.BRAND_CONTROLLER_GETALL, { name, imageUrl });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(postAddBrandSuccess(response.success ? response.data : []));
        } else {
          dispatch(postAddBrandFailure(response.message));
        }
      },
      (error) => {
        dispatch(postAddBrandFailure(error.message));
      }
    );
  };
}

export function updateBrand(id, name, imageUrl) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.BRAND_UPDATE(id), { name, imageUrl });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(putEditBrandSuccess(response.success ? response.data : []));
        } else {
          dispatch(putEditBrandFailure(response.message));
        }
      },
      (error) => {
        dispatch(putEditBrandFailure(error.message));
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
    const request = GET(ENDPOINT.ACCOUNT_CONTROLLER_GETALL_LICENSE);
    request.then(
      (response) => {
        if (response.success) {
          dispatch(fetchUserCheckingSuccess(response.data));
        } else {
          // dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        // dispatch(fetchUserCheckingFailure(error));
        showMessageError(error.message);
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
          dispatch(showMessageSuccess("Accpet Success"));
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

export function approveUser(id, active) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.ACCOUNT_CONTROLLER_GETBYID(id), { active });
    request.then(
      (response) => {
        dispatch(approveUserRegister(response.success ? response.data : ""));
        dispatch(showMessageSuccess("Accept success"));
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function notificationLicenseUser(message, userMail, isAccept, renter) {
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
      renter: renter,
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
