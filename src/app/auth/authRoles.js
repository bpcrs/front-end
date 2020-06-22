import { APP_ROLE } from "../../constant";

/**
 * Authorization Roles
 */
const authRoles = {
  admin: [APP_ROLE.ADMINISTRATOR],
  user: [APP_ROLE.USER],
  userAndGuest: [APP_ROLE.GUEST, APP_ROLE.USER],
  onlyGuest: [APP_ROLE.GUEST],
};

export default authRoles;
