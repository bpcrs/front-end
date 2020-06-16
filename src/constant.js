
require('dotenv').config()
export const APP_CONST = {
    API_URL: process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://localhost:5000",
    GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : "861476715885-0ge3nqdop06mu3qo1u29fubknpgngo1l.apps.googleusercontent.com"
}
console.log(APP_CONST);
console.log(process.env);

export const APP_ROLE = {
    ADMINISTRATOR: 'ADMINISTRATOR',
    USER: 'ADMINISTRATOR',
    GUEST: 'GUEST',
}

export const APP_PATH = {
    LANDING: "/landing",
    LOGIN: "/login",
    CAR_LIST: "/cars",
    CAR_ITEM: "/car",
    CAR_SUBMIT: "/submit",
    CAR_EDIT: "/car-edit",
    VIEW_BOOKING: "/view-booking"
}