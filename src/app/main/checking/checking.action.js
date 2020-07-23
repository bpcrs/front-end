import { GET, ENDPOINT } from "../../services/api";
import { showMessageError } from "../../store/actions/fuse";

export const FETCH_CAR_CHECKING_SUCCESS = "[CAR_CHECKING] FETCH DATA SUCCESS";
export const FETCH_CAR_CHECKING_FAILURE = "[CAR_CHECKING] FETCH DATA FAILURE";

export const FETCH_CAR_DETAIL_CHECKING_SUCCESS = "[CAR_DETAIL_CHECKING] FETCH DATA SUCCESS";
export const FETCH_CAR_DETAIL_CHECKING_FAILURE = "[CAR_DETAIL_CHECKING] FETCH DATA FAILURE";

export const FETCH_BRAND_SUCCESS = "[BRAND] FETCH BRAND SUCCESS";
export const FETCH_BRAND_FAILURE = "[BRAND] FETCH BRAND FAILURE";

export const FETCH_MODEL_SUCCESS = "[MODEL] FETCH MODEL SUCCESS";
export const FETCH_MODEL_FAILURE = "[MODEL] FETCH MODEL FAILURE";


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

export function fetchCarDetailCheckingSuccess(car) {
    return {
        type: FETCH_CAR_DETAIL_CHECKING_SUCCESS,
        payload: car,
    }
}

export function fetchCarDetaiCheckingFailure(error) {
    return {
        type: FETCH_CAR_DETAIL_CHECKING_FAILURE,
        payload: error,
    }
}

export function fetchBrandsSuccess(brands) {
    return {
        type: FETCH_BRAND_SUCCESS,
        payload: brands,
    };
}

export function fetchBrandsFailure(error) {
    return {
        type: FETCH_BRAND_FAILURE,
        payload: error,
    };
}

export function fetchModelsSuccess(models) {
    return {
        type: FETCH_MODEL_SUCCESS,
        payload: models,
    };
}

export function fetchModelsFailure(error) {
    return {
        type: FETCH_MODEL_FAILURE,
        payload: error,
    };
}

export function fetchCarCheckingAdmin() {
    return (dispatch) => {
        // const request = GET(ENDPOINT.CAR_CONTROLLER_GETALL);
        const request = GET(ENDPOINT.CAR_CONTROLLER_ADMIN_GETALL);
        request.then(
            (response) => {
                if (response.success) {
                    dispatch(fetchCarCheckingSuccess(response.success ? response.data : []));
                } else {
                    dispatch(showMessageError(response.message));
                }
            },
            (error) => {
                dispatch(fetchCarCheckingFailure(error));
                dispatch(showMessageError(error.message));
            }
        );
    }
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
        )
    }
}

export function fetchBrandList(page, size) {
    return (dispatch) => {
        const request = GET(ENDPOINT.BRAND_CONTROLLER_GETALL, {
            page,
            size,
        });
        request.then(
            (response) => {
                dispatch(fetchBrandsSuccess(response.success ? response.data : []));
            },
            (error) => {
                dispatch(showMessageError(error.message));
            }
        );
    };
}

export function fetchModelList() {
    return (dispatch) => {
        const request = GET(ENDPOINT.MODEL_CONTROLLER_GETALL);
        request.then(
            (response) => {
                dispatch(fetchModelsSuccess(response.success ? response.data : []));
            },
            (error) => {
                dispatch(showMessageError(error.message));
            }
        );
    };
}