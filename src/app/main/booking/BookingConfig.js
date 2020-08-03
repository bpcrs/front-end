import FuseLoadable from "@fuse/components/FuseLoadable/FuseLoadable";
import CarDetail from "./CarDetail";
import CarEdit from "./CarEdit";
import CarCompare from "./CarCompare";
import { APP_PATH } from "../../../constant";
import Review from "./Review";

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
      component: CarCompare,
    },
    {
      path: APP_PATH.LICENSE_SUBMIT,
      component: FuseLoadable({
        loader: () => import("../submitLicense/submitLicense")
      }),
    },
    {
      path: APP_PATH.USER_REVIEW_BOOKING,
      component: Review,
    },
  ],
};
