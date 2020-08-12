import { showMessageError } from "../../store/actions/fuse";
import { GET, ENDPOINT, PUT, POST, DELETE } from "../../services/api";
// import { fetchBookingRequest } from "../chat/chat.action";
import firebase from "../../firebase/firebase";
import { addNewCarRegister } from "../user/profile.action";
import { showMessageSuccess } from "../../store/actions/fuse";

export const FETCH_CARS_SUCCESS = "[CAR] FETCH DATA SUCCESS";
export const FETCH_CAR_COMPARE_SUCCESS = "[CAR] FETCH DATA SUCCESS";
export const FETCH_FILTER_CARS_SUCCESS = "[CAR] FETCH FILTER DATA SUCCESS";
export const FETCH_CARS_FAILURE = "[CAR] FETCH DATA FAILURE";

export const FETCH_REVIEW_SUCCESS = "[REVIEW] FETCH DATA SUCCESS";
export const FETCH_REVIEW_FAILURE = "[REVIEW] FETCH DATA FAILURE";

export const FETCH_CAR_DETAIL_SUCCESS = "[CAR_DETAIL] FETCH DATA SUCCESS";
export const FETCH_CAR_DETAIL_ERROR = "[CAR_DETAIL] FETCH DATA ERROR";
export const FETCH_CAR_DETAIL = "[CAR_DETAIL] FETCH CAR DETAIL";

export const PUT_CAR_EDIT_SUCCESS = "[CAR_EDIT] PUT DATA SUCCESS";
export const PUT_CAR_EDIT_FAILURE = "[CAR_EDIT] PUT DATA FAILURE";

export const FETCH_IMAGE_CAR_SUCCESS = "[IMAGE] FETCH IMAGE SUCCESS";
export const FETCH_IMAGE_CAR_FAILURE = "[IMAGE] FETCH IMAGE FAILURE";

export const POST_CAR_SUBMIT_SUCCESS = "[CAR_SUBMIT] POST DATA SUCCESS";
export const POST_CAR_SUBMIT = "[CAR_SUBMIT] POST DATA";
export const POST_CAR_SUBMIT_FAILURE = "[CAR_SUBMIT] POST DATA FAILURE";

export const POST_IMAGE_CAR_SUBMIT_SUCCESS =
  "[IMAGE_CAR_SUBMIT] POST IMAGE SUCCESS";
export const POST_IMAGE_CAR_SUBMIT_FAILURE =
  "[IMAGE_CAR_SUBMIT] POST IMAGE FAILURE";

export const FETCH_BRAND_SUCCESS = "[BRAND] FETCH BRAND SUCCESS";
export const FETCH_BRAND_FAILURE = "[BRAND] FETCH BRAND FAILURE";

export const FETCH_MODEL_SUCCESS = "[MODEL] FETCH MODEL SUCCESS";
export const FETCH_MODEL_FAILURE = "[MODEL] FETCH MODEL FAILURE";

export const POST_REVIEW_SUBMIT_SUCCESS =
  "[REVIEW_SUBMIT] POST REVIEW SUBMIT SUCCESS";
export const POST_REVIEW_SUBMIT_FAILURE =
  "[REVIEW-SUBMIT] POST REVIEW SUBMIT FAILURE";
export const POST_REVIEW_SUBMIT = "[REVIEW-SUBMIT] POST REVIEW SUBMIT";

export const POST_BOOKING_SUCCESS = "[BOOKING] POST BOOKING SUCCESS";
export const POST_BOOKING_FAILURE = "[BOOKING] POST BOOKING FAILURE";

export const PUT_BOOKING_SUCCESS = "[BOOKING] PUT BOOKING SUCCESS";
export const PUT_BOOKING_FAILURE = "[BOOKING] PUT BOOKING FAILURE";
export const CREATE_BOOKING_REQUEST = "[BOOKING] CREATE BOOKING";
export const FETCH_BOOKING_SUCCESS = "[BOOKING] FETCH BOOKING SUCCESS";

export const CREATE_AGREEMENT_SUCCESS = "[AGREEMENT] CREATE AGREEMENT SUCCESS";
export const UPDATE_CAR_STATUS = "[CAR] UPDATE CAR STATUS";
export const DELETE_IMAGE_CAR = "[IMAGE] DELETE IMAGE CAR";
export const CHANGE_IMAGE_TYPE = "[IMAGE] CHANGE IMAGE TYPE";
export const GET_IMAGE_LINK = "[IMAGE] GET LINK IMAGE";
export const POST_DISTANCE_LOCATION = "[MAPS] GET DISTANCE LOCATION";
export const FETCH_LICENSE_CAR = "[IMAGE] FETCH LICENSE CAR";
export const POST_IMAGES_CAR = "[IMAGE] POST IMAGES CAR";
export const LOADING_CREATE_BOOKING = "[BOOKING] LOADING";
export const RESET_CREATE_BOOKING = "[BOOKING] RESET CREATE";

export function resetFlagCreateBooking() {
  return {
    type: RESET_CREATE_BOOKING,
  };
}
export function createBooking(booking) {
  return {
    type: CREATE_BOOKING_REQUEST,
    payload: booking,
  };
}
export function changeLoadingBooking() {
  return {
    type: LOADING_CREATE_BOOKING,
  };
}
export function getImageDownloadURL(urls) {
  return {
    type: GET_IMAGE_LINK,
    payload: urls,
  };
}
export function changeImageType(image) {
  return {
    type: CHANGE_IMAGE_TYPE,
    payload: image,
  };
}
export function deleteImageCar(image) {
  return {
    type: DELETE_IMAGE_CAR,
    payload: image,
  };
}
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
export function getDistanceLocation(distance) {
  return {
    type: POST_DISTANCE_LOCATION,
    payload: distance,
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
export function postReview() {
  return {
    type: POST_REVIEW_SUBMIT,
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
export function postReviewSubmitSuccess(review) {
  return {
    type: POST_REVIEW_SUBMIT_SUCCESS,
    payload: review,
  };
}
export function postReviewSubmitFailure(error) {
  return {
    type: POST_REVIEW_SUBMIT_FAILURE,
    payload: error,
  };
}
export function postBookingSuccess(booking) {
  return {
    type: POST_BOOKING_SUCCESS,
    payload: booking,
  };
}
export function postBookingError() {
  return {
    type: POST_BOOKING_FAILURE,
  };
}
export function putBookingSuccess(booking) {
  return {
    type: PUT_BOOKING_SUCCESS,
    payload: booking,
  };
}
export function createAgreementSuccess(agreements) {
  return {
    type: CREATE_AGREEMENT_SUCCESS,
    payload: agreements,
  };
}
export function fetchBookingSuccess(booking) {
  return {
    type: FETCH_BOOKING_SUCCESS,
    payload: booking,
  };
}
export function updateCarStatusSuccess(car) {
  return {
    type: UPDATE_CAR_STATUS,
    payload: car.status,
  };
}
export function fetchLicenseCar(images) {
  return {
    type: FETCH_LICENSE_CAR,
    payload: images,
  };
}
export function postImagesCar(images) {
  return {
    type: POST_IMAGES_CAR,
    payload: images,
  };
}

export function fetchCarList(page, size) {
  return (dispatch) => {
    const request = GET(ENDPOINT.CAR_CONTROLLER_GETALL, {
      page,
      size,
    });
    request.then(
      (response) =>
        dispatch(fetchCarSuccess(response.success ? response.data : [])),
      (error) => {
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
  toPrice,
  locationPickup
) {
  return (dispatch) => {
    const params = { page, size };

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
      fromPrice,
      toPrice,
      locationPickup,
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
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function fetchCarDetail(id) {
  return async (dispatch) => {
    const response = await GET(ENDPOINT.CAR_CONTROLLER_GETBYID(id));
    if (response.success) {
      dispatch(fetchCarDetailSuccess(response.data));
    } else {
      dispatch(showMessageError(response.message));
    }
  };
}
export function fetchCarDetailWithDistance(id, location) {
  return async (dispatch) => {
    const response = await GET(ENDPOINT.CAR_CONTROLLER_GETBYID(id));
    if (response.success) {
      dispatch(fetchCarDetailSuccess(response.data));
      console.log(response.data.location);
      dispatch(distanceBetweenTwoLocation(location, response.data.location));
    } else {
      dispatch(showMessageError(response.message));
    }
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
          dispatch(showMessageSuccess("Update success"));
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

export function fetchImageList(page, size, carId, type) {
  return (dispatch) => {
    const request = GET(ENDPOINT.IMAGE_CONTROLLER_GETALL, {
      carId,
      page,
      size,
      type,
    });
    request.then(
      (response) => {
        type === "CAR"
          ? dispatch(fetchImageSuccess(response.success ? response.data : []))
          : dispatch(fetchLicenseCar(response.success ? response.data : []));
      },
      (error) => {
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
          console.log(listImage);
          dispatch(submitImagesCar(response.data.id, listImage));
          dispatch(addNewCarRegister(response.data));
          dispatch(
            showMessageSuccess(
              "Register successfully ! Your car will be checked and available soon"
            )
          );
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
  };
}

export function submitImagesCar(carId, images) {
  return (dispatch) => {
    console.log(images);
    const request = POST(
      ENDPOINT.IMAGE_CONTROLLER_CAR_GETBYID(carId),
      {},
      { images }
    );
    request.then(
      (response) => {
        console.log(response.data);
        dispatch(postImagesCar(response.success ? response.data : []));
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function postImageCar(link, carId, type) {
  return (dispatch) => {
    // const params = { carId, link, type };
    const request = POST(
      ENDPOINT.IMAGE_CONTROLLER_GETALL,
      { type },
      {
        carId,
        link,
      }
    );
    request.then(
      (response) => {
        if (response.success) {
          dispatch(postImageCarSubmitSuccess(response.data));
          console.log("Success submit image car", response.data);
        } else {
          dispatch(showMessageError(response.message));
          console.log("Success submit image car error");
        }
      },
      (error) => {
        dispatch(postImageCarSubmitFailure(error));
      }
    );
  };
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

export function postBookingRequest(booking) {
  return (dispatch) => {
    const request = POST(ENDPOINT.BOOKING_CONTROLLER_GETALL, {}, booking);
    request.then(
      (response) => {
        if (!response.success) {
          dispatch(postBookingError());
        } else {
          dispatch(postBookingSuccess(response.data));
          notificationBooking(response.data);
          notificationMyBooking(response.data, "BOOKED");
          dispatch(showMessageSuccess("Book success"));
        }
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function putBookingRequest(id, booking) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.BOOKING_CONTROLLER_GETBYID(id), {}, booking);
    request.then(
      (response) => {
        dispatch(putBookingSuccess(response.success ? response.data : []));
      },
      (error) => {
        dispatch(showMessageError(error.message));
      }
    );
  };
}

export function postReviewSubmit(review) {
  return (dispatch) => {
    const request = POST(ENDPOINT.REVIEW_CONTROLLER_GETALL, {}, review);
    request.then(
      (response) => {
        if (response.success) {
          dispatch(postReviewSubmitSuccess(response.data));
          console.log("Success submit review car");
        } else {
          dispatch(showMessageError(response.message));
          dispatch(postReviewSubmitFailure(response.message));
          console.log("Success submit review car error");
        }
      },
      (error) => {
        dispatch(showMessageError(error.message));
        dispatch(postReviewSubmitFailure(error.message));
      }
    );
  };
}

export function notificationBooking(booking) {
  firebase
    .firestore()
    .collection("notification")
    .doc(`${booking.car.owner.email}`)
    .collection("requests")
    .add({
      status: booking.status,
      car: booking.car,
      owner: booking.car.owner,
      renter: booking.renter,
      bookingId: booking.id,
      createAt: new Date().getTime(),
      isSeen: false,
    });
}
export function notificationMyBooking(booking, status) {
  firebase
    .firestore()
    .collection("notification")
    .doc(`${booking.renter.email}`)
    .collection("requests")
    .add({
      status: status,
      car: booking.car,
      owner: booking.car.owner,
      renter: booking.renter,
      bookingId: booking.id,
      createAt: new Date().getTime(),
      isSeen: false,
    });
}

export function storeImageToFirebase(imgs) {
  const metadata = {
    contentType: "image/jpeg",
  };
  const date = new Date().getTime();
  imgs.map((img) => {
    const uploadTask = firebase
      .storage()
      .ref("Img/" + date)
      .child(img.name);

    uploadTask.put(img, metadata).then(function (result) {
      uploadTask.getDownloadURL().then(function (url) {
        console.log("file available at ", url);
      });
    });
  });
}

export function updateImageCar(images, carId, type) {
  const metadata = {
    contentType: "image/jpeg",
  };
  const date = new Date().getTime();
  images.map((img) => {
    const uploadTask = firebase
      .storage()
      .ref("Img/" + date)
      .child(img.name);

    uploadTask.put(img, metadata).then(function (result) {
      uploadTask.getDownloadURL().then(function (url) {
        console.log("file available at ", url);
      });
    });
  });
}

export function updateCarStatus(id, status) {
  return (dispatch) => {
    const request = PUT(
      ENDPOINT.CAR_CONTROLLER_STATUS_GETBYID(id),
      { status },
      {}
    );
    request.then(
      (response) => {
        if (response.success) {
          dispatch(
            updateCarStatusSuccess(response.success ? response.data : "")
          );
          dispatch(showMessageSuccess("Update status success"));
        } else {
          dispatch(showMessageError("Can not update"));
        }
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function deleteImage(image) {
  return (dispatch) => {
    const request = DELETE(ENDPOINT.IMAGE_CONTROLLER_GETBYID(image.id));
    request.then(
      (response) => {
        dispatch(deleteImageCar(image));
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function changeImageByType(image, type) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.IMAGE_CONTROLLER_GETBYID(image.id), { type });
    request.then(
      (response) => {
        dispatch(changeImageType(response.success ? response.data : ""));
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function distanceBetweenTwoLocation(destination, location) {
  console.log(destination, location);
  return (dispatch) => {
    const request = POST(
      ENDPOINT.MAPS_CONTROLLER_POST,
      {},
      { destination, location }
    );
    request.then(
      (response) => {
        dispatch(
          getDistanceLocation(
            response.success
              ? {
                  value: response.data.distance
                    .replace(".", "")
                    .match(/\d+/)[0],
                  text: response.data.distance,
                }
              : ""
          )
        );
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}
