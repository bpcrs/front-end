import * as firebase from 'firebase';
import "firebase/firestore";

 var firebaseConfig = {
    // apiKey: "AIzaSyBVST1MnPWJDFkO5EgCP-1J9hoBg-RRt-k",
    // authDomain: "bpcrs-24e90.firebaseapp.com",
    // databaseURL: "https://bpcrs-24e90.firebaseio.com",
    // projectId: "bpcrs-24e90",
    // storageBucket: "bpcrs-24e90.appspot.com",
    // messagingSenderId: "1028858504286",
    // appId: "1:1028858504286:web:df0821aecaa56bed06c0cf",
    // measurementId: "G-NDTPLZL46K"
    apiKey: "AIzaSyDxPb9GRCjiq7lAc_Y3SxY3P8f0phC1Ttc",
    authDomain: "chat-bpcrs.firebaseapp.com",
    databaseURL: "https://chat-bpcrs.firebaseio.com",
    projectId: "chat-bpcrs",
    storageBucket: "chat-bpcrs.appspot.com",
    messagingSenderId: "870258342172",
    appId: "1:870258342172:web:2a642dd31ef26e5d9162d9",
    measurementId: "G-4MECWYVPQ8"
};


// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
}
export default firebase;
// firebase.analytics();