import firebase from "../../firebase/firebase";
import { showMessageError, showMessageSuccess } from "../../store/actions/fuse";
import { GET, ENDPOINT, POST, PUT } from "../../services/api";
import { BOOKING_STATUS } from "../../../constant";
import { notificationBooking } from "../booking/booking.action";

export const SET_SELECTED_USER = "[CHAT] SET SELECTED USER";
export const OPEN_AGREEMENT = "[AGREEMENT] OPEN";
export const CLOSE_AGREEMENT = "[AGREEMENT] CLOSE";
export const CHANGE_CHIP = "[CHIP] CHANGE";
export const INIT_CHIP = "[CHIP] INIT";
export const UPDATE_CHIP = "[CHIP] UPDATE";
export const FETCH_CRITERIA_SUCCESS = "[CRITERIA] FETCH CRITERIA SUCCESS";
export const FETCH_AGREEMENT_SUCCESS = "[AGREEMENT] FETCH AGREEMENT SUCCESS";
export const CREATE_AGREEMENT_SUCCESS = "[AGREEMENT] CREATE AGREEMENT SUCCESS";
export const FETCH_BOOKING_REQUEST = "[BOOKING] FETCH BOOKING REQUEST";
export const GET_REQUEST_FIREBASE = "[FIREBASE] GET REQUEST";
export const GET_USERS_REQUEST = "[FIREBASE] GET USERS REQUEST";
export const GET_IMG_URL = "[FIREBASE] GET IMAGE URL";
export const FETCH_BOOKING_PENDING = "[BOOKING] FETCH BOOKING PENDING";
export const SET_SELECTED_BOOKING = "[CHAT] SET SELECTED BOOKING";
export const SET_IS_RENTER_BOOKING = "[BOOKING] SET USER ROLE";
export const ACCEPT_AGREEMENT_SUCCESS = "[AGREEMENT] ACCEPT AGREEMENT SUCCESS";
export const CLOSE_AGREEMENT_DRAWER = "[AGREEMENT] CLOSE DRAWER";
export const CHAT_CHANGE_STATUS_BOOKING = "[CHAT] CHANGE BOOKING STATUS";
export const RESET_AGREEMENTS = "[AGREEMENTS] RESET AGREEMENTS";

export function resetAgreements() {
  return {
    type: RESET_AGREEMENTS,
  };
}
export function changeBookingStatus(booking) {
  return {
    type: CHAT_CHANGE_STATUS_BOOKING,
    payload: booking,
  };
}
export function closeAgreementDrawer() {
  return {
    type: CLOSE_AGREEMENT_DRAWER,
  };
}
export function getRequestFirebase(request) {
  return {
    type: GET_REQUEST_FIREBASE,
    payload: request,
  };
}
export function setIsRenterBooking(isRenter) {
  return {
    type: SET_IS_RENTER_BOOKING,
    payload: isRenter,
  };
}
export function fetchPendingBookingSuccess(bookings) {
  return {
    type: FETCH_BOOKING_PENDING,
    payload: bookings,
  };
}
export function getImgUrlFromFirebase(url) {
  return {
    type: GET_IMG_URL,
    payload: url,
  };
}
export function getUsersRequest(users) {
  return {
    type: GET_USERS_REQUEST,
    payload: users,
  };
}
export function setSelectedUser(user) {
  return {
    type: SET_SELECTED_USER,
    payload: user,
  };
}
export function setSelectedBooking(booking) {
  return {
    type: SET_SELECTED_BOOKING,
    payload: booking,
  };
}
export function openAgreement(type) {
  return {
    type: OPEN_AGREEMENT,
    payload: {
      isOpen: true,
      type,
    },
  };
}
export function closeAgreement() {
  return {
    type: CLOSE_AGREEMENT,
    payload: {
      isOpen: false,
    },
  };
}
export function changeChip(name, value, bookingId) {
  return {
    type: CHANGE_CHIP,
    payload: {
      approved: true,
      name,
      value,
      bookingId: bookingId,
    },
  };
}
export function initChip(criteras) {
  return {
    type: INIT_CHIP,
    payload: criteras,
  };
}
export function updateChip(chips) {
  return {
    type: UPDATE_CHIP,
    payload: chips,
  };
}
export function fetchCriteriaSuccess(critera) {
  return {
    type: FETCH_CRITERIA_SUCCESS,
    payload: critera,
  };
}
export function fetchAgreementSuccess(agreements) {
  return {
    type: FETCH_AGREEMENT_SUCCESS,
    payload: agreements,
  };
}
export function acceptedAgreementSuccess(agreement) {
  return {
    type: ACCEPT_AGREEMENT_SUCCESS,
    payload: agreement,
  };
}
export function createAgreementSuccess(agreement) {
  return {
    type: CREATE_AGREEMENT_SUCCESS,
    payload: agreement,
  };
}
export function fetchBookingRequest(booking) {
  return {
    type: FETCH_BOOKING_REQUEST,
    payload: booking,
  };
}

export function submitMessage(message, booking, type, fromRenter) {
  firebase
    .firestore()
    .collection("chatRooms")
    .doc(`booking-${booking.id}`)
    .collection("messages")
    .add({
      send: fromRenter ? booking.renter.id : booking.car.owner.id,
      createAt: new Date().getTime(),
      message: message,
      receive: !fromRenter ? booking.renter.id : booking.car.owner.id,
      type,
    });
}

export async function getUser(id) {
  return await firebase.firestore().collection("users").doc(`${id}`).get();
}

export function fetchCriteriaList() {
  return (dispatch) => {
    const request = GET(ENDPOINT.CRITERIA_CONTROLLER_GETALL);
    request.then(
      (response) => {
        dispatch(fetchCriteriaSuccess(response.success ? response.data : []));
        dispatch(initChip(response.data));
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function fetchAgreementList(id) {
  return async (dispatch) => {
    const response = await GET(
      ENDPOINT.AGREEMENT_CONTROLLER_GETBY_BOOKINGID(id)
    );
    if (response) {
      if (response.success) {
        dispatch(fetchAgreementSuccess(response.data));
      } else {
        dispatch(resetAgreements());
      }
    } else {
      showMessageError(response.message);
    }
  };
}
export function createAgreement(criteriaId, value, bookingId) {
  return (dispatch) => {
    const request = POST(
      ENDPOINT.AGREEMENT_CONTROLLER_GETALL,
      {},
      {
        bookingId,
        criteriaId,
        value,
      }
    );
    request.then(
      (response) => {
        dispatch(createAgreementSuccess(response.success ? response.data : {}));
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function acceptAgreement(criteriaId, bookingId) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.AGREEMENT_CONTROLLER_GETALL, {
      criteriaId,
      bookingId,
    });
    request.then(
      (response) => {
        dispatch(
          acceptedAgreementSuccess(response.success ? response.data : {})
        );
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function getBookingRequest(id) {
  return (dispatch) => {
    const request = GET(ENDPOINT.BOOKING_CONTROLLER_GETBYID(id));
    request.then(
      (response) => {
        dispatch(fetchBookingRequest(response.success ? response.data : {}));
      },
      (error) => {
        showMessageError(error);
      }
    );
  };
}

export function storeImage(img, booking, fromRenter) {
  const metadata = {
    contentType: "image/jpeg",
  };
  const date = new Date().getTime();
  const uploadTask = firebase
    .storage()
    .ref("Chat/" + date)
    .child(img.name);

  uploadTask.put(img, metadata).then(function (result) {
    uploadTask.getDownloadURL().then(function (url) {
      console.log("file available at ", url);
      submitMessage(url, booking, "IMG", fromRenter);
    });
  });
}

export async function deleteAllMsgByTypeFromFirebase(type, bookingId) {
  await firebase
    .firestore()
    .collection("chatRooms")
    .doc(`booking-${bookingId}`)
    .collection("messages")
    .where("type", "==", type)
    .get()
    .then((response) =>
      response.docs.forEach((item) => {
        item.ref.delete();
      })
    );
}

export function fetchPendingBooking(user, page, size, status, isRenter) {
  return (dispatch) => {
    const params = { isRenter, page, size, status: status.join(",") };
    const request = GET(
      ENDPOINT.BOOKING_CONTROLLER_USER_GETBYID(user),
      { ...params },
      {}
    );
    request.then(
      (response) => {
        dispatch(
          fetchPendingBookingSuccess(response.success ? response.data.data : [])
        );
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function changeBookingStatusRequest(bookingId, status) {
  return (dispatch) => {
    const request = PUT(ENDPOINT.BOOKING_CONTROLLER_GETBYID(bookingId), {
      status,
    });
    request.then(
      (response) => {
        if (response.success) {
          dispatch(changeBookingStatus(response.data));
          notificationBooking(response.data);
          if (status === BOOKING_STATUS.CONFIRM) {
            dispatch(showMessageSuccess("All agreements confirm successful!"));
          } else if (status === BOOKING_STATUS.CANCEL) {
            dispatch(showMessageSuccess("Cancel agreements successful!"));
          }
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
