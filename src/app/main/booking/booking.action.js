import { showMessageError } from "../../store/actions/fuse";
import { GET, ENDPOINT, PUT, POST } from "../../services/api";

export const FETCH_CARS_SUCCESS = "[CAR] FETCH DATA SUCCESS";
export const FETCH_CAR_COMPARE_SUCCESS = "[CAR] FETCH DATA SUCCESS";
export const FETCH_FILTER_CARS_SUCCESS = "[CAR] FETCH FILTER DATA SUCCESS";
export const FETCH_CARS_FAILURE = "[CAR] FETCH DATA FAILURE";

export const FETCH_REVIEW_SUCCESS = "[REVIEW] FETCH DATA SUCCESS";
export const FETCH_REVIEW_FAILURE = "[REVIEW] FETCH DATA FAILURE";

export const FETCH_CAR_DETAIL_SUCCESS = "[CAR_DETAIL] FETCH DATA SUCCESS";
export const FETCH_CAR_DETAIL_ERROR = "[CAR_DETAIL] FETCH DATA ERROR";

export const PUT_CAR_EDIT_SUCCESS = "[CAR_EDIT] PUT DATA SUCCESS";
export const PUT_CAR_EDIT_FAILURE = "[CAR_EDIT] PUT DATA FAILURE";

export const FETCH_IMAGE_CAR_SUCCESS = "[IMAGE] FETCH IMAGE SUCCESS";
export const FETCH_IMAGE_CAR_FAILURE = "[IMAGE] FETCH IMAGE FAILURE";

export const POST_CAR_SUBMIT_SUCCESS = "[CAR_SUBMIT] POST DATA SUCCESS";
export const POST_CAR_SUBMIT = "[CAR_SUBMIT] POST DATA";
export const POST_CAR_SUBMIT_FAILURE = "[CAR_SUBMIT] POST DATA FAILURE";

export const POST_IMAGE_CAR_SUBMIT_SUCCESS = "[IMAGE_CAR_SUBMIT] POST IMAGE SUCCESS";
export const POST_IMAGE_CAR_SUBMIT_FAILURE = "[IMAGE_CAR_SUBMIT] POST IMAGE FAILURE";

export const FETCH_BRAND_SUCCESS = "[BRAND] FETCH BRAND SUCCESS";
export const FETCH_BRAND_FAILURE = "[BRAND] FETCH BRAND FAILURE";

export const FETCH_MODEL_SUCCESS = "[MODEL] FETCH MODEL SUCCESS";
export const FETCH_MODEL_FAILURE = "[MODEL] FETCH MODEL FAILURE";

export function fetchCarSuccess(cars) {
  return {
    type: FETCH_CARS_SUCCESS,
    payload: cars,
  };
}
export function fetchCarFilterSuccess(cars) {
  return {
    type: FETCH_FILTER_CARS_SUCCESS,
    payload: cars,
  };
}
export function fetchCarsError(error) {
  return {
    type: FETCH_CARS_FAILURE,
    payload: error,
  };
}

export function fetchReviewSuccess(reviews) {
  return {
    type: FETCH_REVIEW_SUCCESS,
    payload: reviews,
  };
}
export function fetchReviewError(error) {
  return {
    type: FETCH_REVIEW_FAILURE,
    payload: error,
  };
}

export function fetchCarDetailSuccess(car) {
  return {
    type: FETCH_CAR_DETAIL_SUCCESS,
    payload: car,
  };
}
export function fetchCarDetailError(error) {
  return {
    type: FETCH_CAR_DETAIL_ERROR,
    payload: error,
  };
}
export function putCarEditSuccess(car) {
  return {
    type: PUT_CAR_EDIT_SUCCESS,
    payload: car,
  };
}
export function putCarEditFailure(error) {
  return {
    type: PUT_CAR_EDIT_FAILURE,
    payload: error,
  };
}
export function fetchImageSuccess(images) {
  return {
    type: FETCH_IMAGE_CAR_SUCCESS,
    payload: images,
  };
}
export function fetchImageFailure(error) {
  return {
    type: FETCH_IMAGE_CAR_FAILURE,
    payload: error,
  };
}
export function postCarSubmitSuccess(car) {
  return {
    type: POST_CAR_SUBMIT_SUCCESS,
    payload: car,
  };
}
export function postCar() {
  return {
    type: POST_CAR_SUBMIT,
  };
}
export function postCarSubmitFailure(error) {
  return {
    type: POST_CAR_SUBMIT_FAILURE,
    payload: error,
  };
}
export function postImageCarSubmitSuccess(images) {
  return {
    type: POST_IMAGE_CAR_SUBMIT_SUCCESS,
    payload: images,
  };
}
export function postImageCarSubmitFailure(error) {
  return {
    type: POST_IMAGE_CAR_SUBMIT_FAILURE,
    payload: error,
  };
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

export function fetchCarList(page, size) {
  return (dispatch) => {
    // dispatch({
    //   type: FETCH_CAR_LIST,
    // });
    const request = GET(ENDPOINT.CAR_CONTROLLER_GETALL, {
      page,
      size,
    });
    request.then(
      (response) =>
        dispatch(fetchCarSuccess(response.success ? response.data : [])),
      (error) => {
        dispatch(fetchCarsError(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchCarFilter(
  page,
  size,
  brandId = [],
  modelId = [],
  seat = [],
  fromPrice,
  toPrice
) {
  return (dispatch) => {
    const params = { page, size };
    // console.log(modelId);

    const request = GET(ENDPOINT.CAR_CONTROLLER_GETALL, {
      ...params,
      brand: brandId
        .map((brand) => parseInt(brand.value))
        .join(",")
        .toString(),
      models: modelId
        .map((model) => parseInt(model.value))
        .join(",")
        .toString(),
      seat: seat
        .map((seat) => parseInt(seat.value))
        .join(",")
        .toString(),
      fromPrice: fromPrice,
      toPrice: toPrice,
    });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(
            fetchCarFilterSuccess(response.success ? response.data : [])
          );
          console.log("Filter car", response.data);
        }
      },
      (error) => {
        dispatch(fetchCarsError(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchReviewList(page, size, carId) {
  return (dispatch) => {
    const request = GET(ENDPOINT.REVIEW_CONTROLLER_GETALL, {
      page,
      size,
      carId,
    });
    request.then(
      (response) =>
        dispatch(fetchReviewSuccess(response.success ? response.data : [])),
      (error) => {
        dispatch(fetchReviewError(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchCarDetail(id) {
  return (dispatch) => {
    const request = GET(ENDPOINT.CAR_CONTROLLER_GETBYID(id));
    request.then(
      (response) => {
        if (response.success) {
          dispatch(fetchCarDetailSuccess(response.data));
          // console.log("Data", response.data);
        } else {
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        console.log(error);
        dispatch(fetchCarDetailError(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchCarCompare(id1, id2) {
  return (dispatch) => {
    const request1 = GET(ENDPOINT.CAR_CONTROLLER_GETBYID(id1));
    const request2 = GET(ENDPOINT.CAR_CONTROLLER_GETBYID(id2));
    request1.then(
      (response) => {
        if (response.success) {
          dispatch(fetchCarDetailSuccess(response.data));
          // console.log("Data", response.data);
        } else {
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        console.log(error);
        dispatch(fetchCarDetailError(error));
        dispatch(showMessageError(error.message));
      }
    );
    request2.then(
      (response) => {
        if (response.success) {
          dispatch(fetchCarDetailSuccess(response.data));
          // console.log("Data", response.data);
        } else {
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        console.log(error);
        dispatch(fetchCarDetailError(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function putCarUpdate(id, car) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.CAR_CONTROLLER_GETBYID(id), {}, car);
    request.then(
      (response) => {
        if (response.success) {
          dispatch(putCarEditSuccess(response.data));
          // console.log("Success update car ", response.data);
        } else {
          // console.log("Fail update car");
          dispatch(showMessageError(response.message));
        }
      },
      (error) => {
        console.log(error);
        dispatch(putCarEditFailure(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchImageList(page, size, carId) {
  return (dispatch) => {
    const request = GET(ENDPOINT.IMAGE_CONTROLLER_GETALL, {
      page,
      size,
      carId,
    });
    request.then(
      (response) => {
        dispatch(fetchImageSuccess(response.success ? response.data : []));
        // console.log("Images", response.data);
      },
      (error) => {
        dispatch(fetchImageFailure(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function postCarSubmit(car, listImage) {
  return (dispatch) => {
    const request = POST(ENDPOINT.CAR_CONTROLLER_GETALL, {}, car);
    request.then(
      (response) => {
        if (response.success) {
          dispatch(postCarSubmitSuccess(response.data));
          dispatch(postImageCar(listImage, response.data.id))
          console.log("Success submit car ", response.data);
        } else {
          dispatch(showMessageError(response.message));
          console.log("Success submit car error");
        }
      },
      (error) => {
        dispatch(postCarSubmitFailure(error));
        dispatch(showMessageError(error.message));
      }
    );
  }
}

export function postImageCar(link, carId) {
  return (dispatch) => {
    const request = POST(ENDPOINT.IMAGE_CONTROLLER_GETALL, {}, {
      carId,
      link
    });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(postImageCarSubmitSuccess(response.data));
          console.log("Success submit image car");
        } else {
          dispatch(showMessageError(response.message));
          console.log("Success submit image car error");
        }
      },
      (error) => {
        dispatch(postImageCarSubmitFailure(error));
      }
    );
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
        dispatch(fetchBrandsFailure(error));
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
        dispatch(fetchModelsFailure(error));
        dispatch(showMessageError(error.message));
      }
    );
  };
}

