


const Login = (firebase, firestore, provider, dispatch, getState) => {
    dispatch({
      type: "LOADING_CREATE",
      payload: {
        status: "warning",
        head: "Please Wait",
        body: "Complete SingIn in order to proceed"
      }
    });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(res => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            fullname: res.user.displayName,
            image: res.user.photoURL,
            isLogin: true,
            lastLogin: new Date().getTime().toString(),
            uid: res.user.uid
          });
      })
      .then(res => {
        const { auth } = getState().firebase;
  
        dispatch({
          type: "AUTH_LOGIN_SUCCESS",
          payload: {
            fullname: auth.displayName,
            image: auth.photoURL
          }
        });
      })
      .catch(err => {
        dispatch({
          type: "AUTH_LOGIN__FAILED",
          payload: err.message
        });
        dispatch({
          type: "LOADING_CREATE",
          payload: {
            status: "danger",
            head: "Error In Signing",
            body: err.message
          }
        });
        setTimeout(() => {
          dispatch({ type: "LOADING_REMOVE" });
        }, 3000);
      });
  };

  export function SignOut() {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      dispatch({
        type: "LOADING_CREATE",
        payload: {}
      });
      const firebase = getFirebase();
      const firestore = getFirestore();
      const { uid } = getState().firebase.auth;
      firestore
        .collection("users")
        .doc(uid)
        .set(
          {
            isLogin: false
          },
          { merge: true }
        )
        .then(() => {
          firebase
            .auth()
            .signOut()
            .then(data => {
              dispatch({ type: "AUTH_LOGOUT_SUCCESS" });
              dispatch({ type: "LOADING_REMOVE" });
            });
        })
        .catch(err => {
          dispatch({
            type: "AUTH_LOGIN__FAILED",
            payload: err.message
          });
          dispatch({
            type: "LOADING_CREATE",
            payload: {
              status: "danger",
              head: "Error In Signing Out",
              body: err.message
            }
          });
          setTimeout(() => {
            dispatch({ type: "LOADING_REMOVE" });
          }, 3000);
        });
    };
  }

  export function GoogleLogin() {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      const provider = new firebase.auth.GoogleAuthProvider();
      Login(firebase, firestore, provider, dispatch, getState);
    };
  }


  export function LoadingCreate(pram, head, body) {
    const status = pram ? pram : null;
    return (dispatch, getState) => {
      dispatch({ type: "LOADING_CREATE", payload: { status, head, body } });
    };
  }
  
  export function LoadingRemove() {
    return (dispatch, getState) => {
      dispatch({ type: "LOADING_REMOVE" });
    };
  }
  