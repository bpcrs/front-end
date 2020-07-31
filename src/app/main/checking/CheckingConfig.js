import { APP_PATH, APP_ROLE } from "../../../constant";
import FuseLoadable from "@fuse/components/FuseLoadable/FuseLoadable";
import CarCheck from "./CarDetailChecking";
import UserCheckLicense from "./UserDetailChecking";

export const CheckingConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: APP_PATH.CHECKING,
      component: FuseLoadable({
        loader: () => import("./Checking"),
      }),
      auth: [APP_ROLE.ADMINISTRATOR],
    },
    {
      path: APP_PATH.CAR_CHECKING + "/:id",
      component: CarCheck,
      auth: [APP_ROLE.ADMINISTRATOR],
    },
    {
      path: APP_PATH.USER_CHECK_LICENSE + "/:id",
      component: UserCheckLicense,
      auth: [APP_ROLE.ADMINISTRATOR],
    },
  ],
};
