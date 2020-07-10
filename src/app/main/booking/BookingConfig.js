import FuseLoadable from "@fuse/components/FuseLoadable/FuseLoadable";
import CarDetail from "./CarDetail";
import CarEdit from "./CarEdit";
import { APP_PATH } from "../../../constant";
export const BookingConfig = {
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
          display: true,
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
      path: APP_PATH.CAR_LIST,
      component: FuseLoadable({
        loader: () => import("./CarList"),
      }),
    },
    {
      path: APP_PATH.CAR_ITEM + "/:id",
      component: CarDetail,
    },
    {
      path: APP_PATH.VIEW_BOOKING,
      component: FuseLoadable({
        loader: () => import("./ViewBooking"),
      }),
    },
    {
      path: APP_PATH.CAR_SUBMIT,
      component: FuseLoadable({
        loader: () => import("./CarSubmit"),
      }),
    },
    {
      path: APP_PATH.CAR_EDIT + "/:id",
      component: CarEdit,
    },
    {
      path: APP_PATH.CAR_COMPARE,
      component: FuseLoadable({
        loader: () => import("../CompareCar/CompareCar")
      }),
    },
    {
      path: APP_PATH.LICENSE_SUBMIT,
      component: FuseLoadable({
        loader: () => import("../submitLicense/submitLicense")
      }),
    },
  ],
};
