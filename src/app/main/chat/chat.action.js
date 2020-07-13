import firebase from "../../firebase/firebase";
import { showMessageError } from "../../store/actions/fuse";
import { GET, ENDPOINT, PUT } from "../../services/api";

export const SET_SELECTED_USER = "[CHAT] SET SELECTED USER";
export const OPEN_AGREEMENT = "[AGREEMENT] OPEN";
export const CLOSE_AGREEMENT = "[AGREEMENT] CLOSE";
export const CHANGE_CHIP = "[CHIP] CHANGE";
export const INIT_CHIP = "[CHIP] INIT";
export const FETCH_CRITERIA_SUCCESS = "[CRITERIA] FETCH CRITERIA SUCCESS";
export const FETCH_AGREEMENT_SUCCESS = "[AGREEMENT] FETCH AGREEMENT SUCCESS";
export const UPDATE_AGREEMENT_SUCCESS = "[AGREEMENT] UPDATE AGREEMENT SUCCESS";

export function setSelectedUser(user) {
  return {
    type: SET_SELECTED_USER,
    payload: user,
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
export function changeChip(type, value) {
  return {
    type: CHANGE_CHIP,
    payload: {
      approved: true,
      type,
      value,
    },
  };
}
export function initChip(criteras) {
  return {
    type: INIT_CHIP,
    payload: criteras.map((data) => ({
      type: data.name,
      approved: false,
      value: 30,
    })),
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
export function updateAgreementSuccess(agreements) {
  return {
    type: UPDATE_AGREEMENT_SUCCESS,
    payload: agreements.map((data) => ({
      approved: data.approved,
      value: data.value,
    })),
  };
}

export function submitMessage(message, send, receive, type) {
  const arr = [send, receive].sort();
  firebase
    .firestore()
    .collection("chatRooms")
    .doc(`${arr[0]}v${arr[1]}`)
    .collection("messages")
    .add({
      send,
      createAt: new Date().getTime(),
      message: message,
      receive,
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
  return (dispatch) => {
    const request = GET(ENDPOINT.AGREEMENT_CONTROLLER_GETBYID(id));
    request.then(
      (response) => {
        dispatch(fetchAgreementSuccess(response.success ? response.data : []));
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}

export function updateAgreement(id, agreement) {
  return (dispatch) => {
    const request = PUT(
      ENDPOINT.AGREEMENT_CONTROLLER_PUTBYID(id),
      {},
      agreement
    );
    request.then(
      (response) => {
        dispatch(updateAgreementSuccess(response.success ? response.data : []));
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}
