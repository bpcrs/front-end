import jwtService from "app/services/jwtService";
import { setUserData } from "./user.actions";
import { showMessage } from "../../../store/actions/fuse";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function submitLogin(token) {
  return (dispatch) =>
    jwtService
      .signInWithToken(token)
      .then((token) => {
        const userFromToken = jwtService.getUserDataFromToken();
        dispatch(
          setUserData({
            role: userFromToken.roleName,
            data: {
              displayName: userFromToken.fullName,
              photoURL: userFromToken.imageUrl,
              email: userFromToken.email,
              id: userFromToken.id,
              city: userFromToken.city,
              district: userFromToken.district,
              ward: userFromToken.ward,
              street: userFromToken.street,
              shortcuts: []
            },
          })
        );

        return dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: error.message,
            variant: "error",
          })
        );
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
}
