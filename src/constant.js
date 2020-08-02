import firebaseDev from "./firebase.dev.json";
import firebaseProd from "./firebase.prod.json";
require("dotenv").config();

export const APP_CONST = {
  API_URL: process.env.REACT_APP_API_URL,
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  GOOGE_MAP_KEY: process.env.REACT_APP_GOOGE_MAP_KEY,
  FIREBASE_CONFIG:
    process.env.NODE_ENV === "production" ? firebaseProd : firebaseDev,
};
console.log(APP_CONST);
export const APP_ROLE = {
  ADMINISTRATOR: "ADMINISTRATOR",
  USER: "USER",
  GUEST: "GUEST",
};

export const APP_PATH = {
  HOME: "/",
  ADMIN: "/checking",
  LOGIN: "/login",
  PROFILE: "/profile",
  CAR_LIST: "/cars",
  CAR_ITEM: "/car",
  CAR_SUBMIT: "/submit",
  CAR_EDIT: "/car-edit",
  VIEW_BOOKING: "/view-booking",
  LICENSE_SUBMIT: "/submitLicense",
  CAR_COMPARE: "/car-compare",
  CHAT: "/chat",
  ERORR_404: "/error/404",
  LANDING_MOBILE: "/landing-mobile",
  CHECKING: "/checking",
  CAR_CHECKING: "/car-check",
  USER_CHECK_LICENSE: "/user-check-license",
  USER_REVIEW_BOOKING :"/reviewBooking",
};
export const BOOKING_STATUS = {
  PENDING: "PENDING",
  REQUEST: "REQUEST",
  DENY: "DENY",
  OWNER_ACCEPTED: "OWNER_ACCEPTED",
  CONFIRM: "CONFIRM",
};
export const CAR_STATUS = {
  REGISTER: "REGISTER",
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
  BOOKED: "BOOKED",
  REQUEST: "REQUEST",
  RENTING: "RENTING",
};
