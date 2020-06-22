import * as Actions from "../actions";
import { APP_ROLE } from "../../../../constant";
import jwtService from "../../../services/jwtService";

const initialState = {
  role: APP_ROLE.GUEST,
  displayName: "John Doe",
  photoURL: "assets/images/avatars/Velazquez.jpg",
  email: "johndoe@withinpixels.com",
  id: 0,
};

const user = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      return {
        ...initialState,
        ...action.payload,
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState,
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    default: {
      const userFromToken = jwtService.getUserDataFromToken();
      if (userFromToken) {
        return {
          ...initialState,
          ...{
            role: userFromToken.role,
            displayName: userFromToken.fullName,
            photoURL: userFromToken.imageUrl,
            email: userFromToken.email,
            id: userFromToken.id,
          },
        };
      }
      return state;
    }
  }
};

export default user;
