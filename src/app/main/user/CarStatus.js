import React from "react";
import classNames from "classnames";
import _ from "@lodash";

export const carStatus = [
  {
    id: 1,
    name: "Renting",
    color: "bg-green text-white",
  },
  {
    id: 2,
    name: "Available",
    color: "bg-blue text-white",
  },
  {
    id: 3,
    name: "Unavailable",
    color: "bg-red text-white",
  },
  {
    id: 4,
    name: "Booked",
    color: "bg-purple text-white",
  },
];

const CarStatus = ({ name }) => {
  return (
    <div
      className={classNames(
        "inline text-12 p-4 rounded truncate",
        _.find(carStatus, { name: name }).color
      )}
    >
      {name}
    </div>
  );
};

export default CarStatus;
