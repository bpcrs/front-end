import firebase from "../../firebase/firebase";
import { showMessageError } from "../../store/actions/fuse";
import { GET, ENDPOINT, PUT, POST } from "../../services/api";

export const SET_SELECTED_USER = "[CHAT] SET SELECTED USER";
export const OPEN_AGREEMENT = "[AGREEMENT] OPEN";
export const CLOSE_AGREEMENT = "[AGREEMENT] CLOSE";
export const FETCH_CRITERIA_SUCCESS = "[CRITERIA] FETCH CRITERIA SUCCESS";

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
export function fetchCriteriaSuccess(critera) {
  return {
    type: FETCH_CRITERIA_SUCCESS,
    payload: critera,
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
      },
      (error) => {
        showMessageError(error.message);
      }
    );
  };
}
