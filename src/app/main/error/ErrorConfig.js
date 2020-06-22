import FuseLoadable from "@fuse/components/FuseLoadable/FuseLoadable";
import { APP_PATH } from "../../../constant";

export const ErrorConfig = {
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
      path: APP_PATH.ERORR_404,
      component: FuseLoadable({
        loader: () => import("./Error404Page"),
      }),
    },
  ],
};
