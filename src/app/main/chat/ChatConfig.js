// import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';
import { APP_PATH, APP_ROLE } from "../../../constant";
import { ChatArea } from "./ChatArea";
export const ChatConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: true,
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
      path: APP_PATH.CHAT,
      component: ChatArea,
      auth: [APP_ROLE.USER],
    },
  ],
};
