import { authRoles } from "app/auth";
import submitLicense from "./submitLicense";
import MyLicense from "./MyLicense";
import { APP_PATH } from "../../../constant";

export const SubmitLicenseConfig = {
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
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: APP_PATH.LICENSE_SUBMIT,
      component: submitLicense,
    },
    {
      path: "/MyLicense",
      component: MyLicense,
    },
  ],
};
