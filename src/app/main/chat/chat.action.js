import Axios from "axios";
import { APP_CONST } from "../../../constant";

export const SET_SELECTED_USER = '[CHAT] SET SELECTED USER';


export function setSelectedUser(user) {
	return {
		type: SET_SELECTED_USER,
		payload: user
	};
}

