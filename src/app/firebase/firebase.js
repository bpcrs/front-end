import * as firebase from "firebase";
import "firebase/firestore";
import { APP_CONST } from "../../constant";

firebase.initializeApp(APP_CONST.FIREBASE_CONFIG);
firebase.firestore();
export default firebase;
