// import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';
import User from "./User";
import Profile from "./Profile";
import { APP_ROLE } from "../../../constant";
import MyCar from "./MyCar";

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
      auth: [APP_ROLE.USER],
    },
    {
      path: "/MyCar",
      component: MyCar,
    },
  ],
};
