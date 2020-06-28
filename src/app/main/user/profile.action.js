import { showMessageError } from "../../store/actions/fuse";
import { GET, ENDPOINT } from "../../services/api";
export const FETCH_ADDRESS_SUCCESS = "[ACCOUNT] FETCH DATA SUCCESS"
export const FETCH_ADDRESS_FAILURE = "[ACCOUNT] FETCH DATA FAILURE"
export function fetchAddressSuccess(account){
    return {
        type: FETCH_ADDRESS_SUCCESS,
        payload: account,
    };  
}
export function fetchAddressError(account){
    return {
        type: FETCH_ADDRESS_FAILURE,
        payload: account,
    };  
}