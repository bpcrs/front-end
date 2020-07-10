require("dotenv").config();
export const APP_CONST = {
  API_URL: process.env.REACT_APP_API_URL,
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  GOOGE_MAP_KEY: process.env.REACT_APP_GOOGE_MAP_KEY,
};
console.log(APP_CONST);
console.log(process.env);

export const APP_ROLE = {
  ADMINISTRATOR: "ADMINISTRATOR",
  USER: "USER",
  GUEST: "GUEST",
};

export const APP_PATH = {
  HOME: "/",
  ADMIN: "/admin",
  LOGIN: "/login",
  CAR_LIST: "/cars",
  CAR_ITEM: "/car",
  CAR_SUBMIT: "/submit",
  CAR_EDIT: "/car-edit",
  CAR_COMPARE: "/car-compare",
  VIEW_BOOKING: "/view-booking",
  LICENSE_SUBMIT: "/submitLicense",
  CAR_COMPARE: "/compareCar",

  CHAT: "/chat",
  ERORR_404: "/error/404",
  LANDING_MOBILE: "/landing-mobile",
};
