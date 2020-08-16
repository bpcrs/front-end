import { combineReducers } from "redux";
import fuse from "./fuse";
import auth from "app/auth/store/reducers";
import quickPanel from "app/fuse-layouts/shared-components/quickPanel/store/reducers";
import chat from "../../main/chat/chat.reducer";
import profile from "../../main/user/profile.reducer";
import booking from "../../main/booking/booking.reducer";
import checking from "../../main/checking/checking.reducer";
import license from "../../main/submitLicense/license.reducer";

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    fuse,
    quickPanel,
    chat,
    booking,
    profile,
    checking,
    license,
    ...asyncReducers,
  });

export default createReducer;
