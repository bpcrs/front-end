import FuseLoadable from "@fuse/components/FuseLoadable/FuseLoadable";
import { APP_PATH } from "../../../constant";
import { authRoles } from "app/auth";

export const LandingConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
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
      path: APP_PATH.HOME,
      exact: true,
      auth: authRoles.userAndGuest,
      component: FuseLoadable({
        loader: () => import("./Landing"),
      }),
    },
  ],
};
