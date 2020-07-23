import * as Actions from "../actions";
import { APP_ROLE } from "../../../../constant";
import jwtService from "../../../services/jwtService";

const initialState = {
  role: APP_ROLE.GUEST,
  displayName: "Customer",
  photoURL:
    "https://images.glints.com/unsafe/120x0/glints-dashboard.s3.amazonaws.com/profile-picture-default/1.jpg",
  email: "empty",
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
            city: userFromToken.city,
            district: userFromToken.district,
            ward: userFromToken.ward,
            street: userFromToken.street,
          },
        };
      }
      return state;
    }
  }
};

export default user;
