import FuseLoadable from "@fuse/components/FuseLoadable/FuseLoadable";
import { APP_PATH } from "../../../constant";

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
      auth: null,
      component: FuseLoadable({
        loader: () => import("./Landing"),
      }),
    },
  ],
};
