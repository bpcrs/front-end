import { showMessageError } from "../../store/actions/fuse";
import { GET, ENDPOINT, PUT, POST } from "../../services/api";

export const USER_LICENSE_UPDATE_SUCCESS = "[USER_LICENSE] UPDATE SUCCESS";
export const USER_LICENSE_UPDATE_FAILURE = "[USER_LICENSE] UPDATE FAILURE";
export const USER_LICENSE_UPDATE = "[USER_LICENSE] UPDATE DATA";

export function updateUserLicenseSuccess (user) {
    return {
        type: USER_LICENSE_UPDATE_SUCCESS,
        payload: user,
    }
}

export function updateUserLicenseFailure (error) {
    return {
        type: USER_LICENSE_UPDATE_FAILURE,
        payload: error,
    }
}

export function updateUserLicenseLoading () {
    return {
        type: USER_LICENSE_UPDATE,
    }
}

export function updateUserLicense (id, user){
    return (dispatch) => {
        const request = PUT(ENDPOINT.ACCOUNT_LICENSE_UPDATE(id), {}, user);
        request.then(
            (response) => {
                if (response.success) {
                    dispatch(updateUserLicenseSuccess(response.data));
                } else {
                    dispatch(updateUserLicenseFailure(response.message));
                    dispatch(showMessageError(response.message));
                }
            },
            (error) => {
                dispatch(showMessageError(error.message));
            }
        );
    };
}