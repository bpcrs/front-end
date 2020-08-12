import { showMessageError, showMessageSuccess } from "../../store/actions/fuse";
import { GET, ENDPOINT, PUT, POST } from "../../services/api";

export const USER_LICENSE_UPDATE_SUCCESS = "[USER_LICENSE] UPDATE SUCCESS";
export const USER_LICENSE_UPDATE_FAILURE = "[USER_LICENSE] UPDATE FAILURE";
export const USER_LICENSE_UPDATE = "[USER_LICENSE] UPDATE DATA";

export const FETCH_USER_DETAIL_SUCCESS = "[USER_DETAIL] FETCH DATA SUCCESS";
export const FETCH_USER_DETAIL_FAILURE = "[USER_DETAIL] FETCH DATA FAILURE";

export function updateUserLicenseSuccess(user) {
  return {
    type: USER_LICENSE_UPDATE_SUCCESS,
    payload: user,
  };
}

export function updateUserLicenseFailure(error) {
  return {
    type: USER_LICENSE_UPDATE_FAILURE,
    payload: error,
  };
}

export function updateUserLicenseLoading() {
  return {
    type: USER_LICENSE_UPDATE,
  };
}

export function fetchUserDetailSuccess(user) {
  return {
    type: FETCH_USER_DETAIL_SUCCESS,
    payload: user,
  };
}

export function fetchUserDetailFailure(error) {
  return {
    type: FETCH_USER_DETAIL_FAILURE,
    payload: error,
  };
}

export function updateUserLicense(user) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.ACCOUNT_LICENSE_UPDATE, {}, user);
    request.then(
      (response) => {
        if (response.success) {
          dispatch(updateUserLicenseSuccess(response.data));
          dispatch(showMessageSuccess("Update success"));
        } else {
          dispatch(updateUserLicenseFailure(response.message));
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        dispatch(updateUserLicenseFailure(error.message));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchUserDetail(userId) {
  return (dispatch) => {
    const request = GET(ENDPOINT.ACCOUNT_CONTROLLER_GETBYID(userId));
    request.then(
      (response) => {
        if (response.success) {
          dispatch(fetchUserDetailSuccess(response.data));
        } else {
          dispatch(fetchUserDetailFailure(response.message));
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        dispatch(showMessageError(error.message));
      }
    );
  };
}
