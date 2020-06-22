import * as firebase from 'firebase';
import "firebase/firestore";

 var firebaseConfig = {
    apiKey: "AIzaSyBVST1MnPWJDFkO5EgCP-1J9hoBg-RRt-k",
    authDomain: "bpcrs-24e90.firebaseapp.com",
    databaseURL: "https://bpcrs-24e90.firebaseio.com",
    projectId: "bpcrs-24e90",
    storageBucket: "bpcrs-24e90.appspot.com",
    messagingSenderId: "1028858504286",
    appId: "1:1028858504286:web:df0821aecaa56bed06c0cf",
    measurementId: "G-NDTPLZL46K"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
// firebase.analytics();