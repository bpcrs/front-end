import { GET, ENDPOINT } from "../../services/api";
export const FETCH_ADDRESS_SUCCESS = "[ACCOUNT] FETCH DATA SUCCESS";
export const FETCH_ADDRESS_FAILURE = "[ACCOUNT] FETCH DATA FAILURE";
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
