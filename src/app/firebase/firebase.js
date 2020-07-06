import * as firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDxPb9GRCjiq7lAc_Y3SxY3P8f0phC1Ttc",
  authDomain: "chat-bpcrs.firebaseapp.com",
  databaseURL: "https://chat-bpcrs.firebaseio.com",
  projectId: "chat-bpcrs",
  storageBucket: "chat-bpcrs.appspot.com",
  messagingSenderId: "870258342172",
  appId: "1:870258342172:web:2a642dd31ef26e5d9162d9",
  measurementId: "G-4MECWYVPQ8",

  //     apiKey: "AIzaSyBMLX5wGqHi-DD1RjHPVCds0_-g702ABDg",
  //   authDomain: "chat-demo-9c847.firebaseapp.com",
  //   databaseURL: "https://chat-demo-9c847.firebaseio.com",
  //   projectId: "chat-demo-9c847",
  //   storageBucket: "chat-demo-9c847.appspot.com",
  //   messagingSenderId: "789391879508"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
