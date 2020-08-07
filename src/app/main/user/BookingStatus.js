import React from "react";
import classNames from "classnames";
import _ from "@lodash";
import { BOOKING_STATUS } from "../../../constant";

export const bookingStatus = [
  {
    id: 1,
    name: BOOKING_STATUS.REQUEST,
    color: "bg-blue text-white",
  },
  {
    id: 2,
    name: BOOKING_STATUS.CONFIRM,
    color: "bg-green text-white",
  },
  {
    id: 3,
    name: BOOKING_STATUS.DENY,
    color: "bg-red text-white",
  },
  {
    id: 4,
    name: BOOKING_STATUS.CANCEL,
    color: "bg-red text-white",
  },
  {
    id: 5,
    name: BOOKING_STATUS.PENDING,
    color: "bg-yellow text-white",
  },
  {
    id: 6,
    name: BOOKING_STATUS.OWNER_ACCEPTED,
    color: "bg-purple text-white",
  },
  {
    id: 7,
    name: BOOKING_STATUS.CONFIRM,
    color: "bg-yellow text-white",
  },
  {
    id: 8,
    name: BOOKING_STATUS.DONE,
    color: "bg-green text-white",
  },
];

const BookingStatus = ({ name, done }) => {
  return !done ? (
    <div
      className={classNames(
        "inline text-12 p-4 rounded truncate",
        _.find(bookingStatus, { name: name }).color
      )}
    >
      {name}
    </div>
  ) : (
    <div
      className={classNames(
        "inline text-12 p-4 rounded truncate bg-grey text-white"
      )}
      // style={{ backgroundColor: "grey", textCo }}
    >
      {name}
    </div>
  );
};

export default BookingStatus;
