import { GET, ENDPOINT } from "../../services/api";
import { showMessageError } from "../../store/actions/fuse";

export const FETCH_ADDRESS_SUCCESS = "[ACCOUNT] FETCH DATA SUCCESS";
export const FETCH_ADDRESS_FAILURE = "[ACCOUNT] FETCH DATA FAILURE";

export const FETCH_CAR_INFORMATION_OWNER_SUCCESS = "[CAR_INFORMATION] FETCH DATA SUCCESS";
export const FETCH_CAR_INFORMATION_OWNER_FAILURE = "[CAR_INFORMATION] FETCH DATA FAILURE";

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
// import { GET, ENDPOINT } from "../../services/api";

// export const FETCH_ADDRESS_SUCCESS = "[ACCOUNT] FETCH DATA SUCCESS";
// export const FETCH_ADDRESS_FAILURE = "[ACCOUNT] FETCH DATA FAILURE";

// export function fetchAccountAddressSuccess(account) {
//   return {
//     type: FETCH_ADDRESS_SUCCESS,
//     payload: account,
//   };
// }
// export function fetchAccountAddressError(account) {
//   return {
//     type: FETCH_ADDRESS_FAILURE,
//     payload: account,
//   };
// }

// export function fetchAccountAddress(id) {
//   return (dispatch) => {
//     const request = GET(ENDPOINT.ACCOUNT_ADDRESS_GETBYID(id));
//     request.then((response) => {
//       if (response.success) {
//         dispatch(fetchAccountAddressSuccess(response.data));
//       } else {
//         dispatch(fetchAccountAddressError(response.message));
//       }
//     });
//   };
// }
