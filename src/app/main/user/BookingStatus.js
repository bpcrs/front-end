import React from "react";
import classNames from "classnames";
import _ from "@lodash";

export const bookingStatus = [
  {
    id: 1,
    name: "REQUEST",
    color: "bg-blue text-white",
  },
  {
    id: 2,
    name: "CONFIRM",
    color: "bg-green text-white",
  },
  {
    id: 3,
    name: "DENY",
    color: "bg-red text-white",
  },
  {
    id: 4,
    name: "CANCEL",
    color: "bg-purple text-white",
  },
];

const BookingStatus = ({ name }) => {
  return (
    <div
      className={classNames(
        "inline text-12 p-4 rounded truncate",
        _.find(bookingStatus, { name: name }).color
      )}
    >
      {name}
    </div>
  );
};

export default BookingStatus;
