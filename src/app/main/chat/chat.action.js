import firebase from "../../firebase/firebase";

export const SET_SELECTED_USER = "[CHAT] SET SELECTED USER";
export const OPEN_AGREEMENT = "[AGREEMENT] OPEN";
export const CLOSE_AGREEMENT = "[AGREEMENT] CLOSE";

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
