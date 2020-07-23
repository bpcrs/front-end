// import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';
import User from "./User";
import Profile from "./Profile";
import MyCar from "./MyCar";
import RentalCarRequest from "./RentalCarRequest";
import { FuseLoadable } from "@fuse";
import { APP_PATH } from "../../../constant";

export const UserConfig = {
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
      path: "/user",
      component: User,
    },
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/MyCar",
      component: MyCar,
    },
  ],
};
