import React from "react";
import {
  withStyles,
  Card,
  Icon,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { blue } from "@material-ui/core/colors";
import { useEffect } from "react";
import { fetchCountBookingRequest } from "./checking.action";
import { BOOKING_STATUS } from "../../../constant";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({}));

const getDateArray = function (start, end) {
  console.log(start);
  console.log(end);

  var arr = new Array();
  var dt = new Date(start);
  while (dt <= end) {
    dt.setDate(dt.getDate() + 1);
    arr.push(new Date(dt).toISOString().split("T")[0]);
  }
  return arr;
};
const now = new Date();
const BookingWidget = ({ data, theme }) => {
  const dispatch = useDispatch();
  const requestsLastMonth = useSelector(
    (state) => state.checking.requestsLastMonth
  );
  const requests = useSelector((state) => state.checking.requests);
  const dayInWeek = getDateArray(
    new Date(new Date().setDate(now.getDate() - 7)),
    now
  );
  const currentDay = new Date(Date.now()).toISOString().split("T")[0];
  const firstDayOfMonth = new Date(
    new Date(currentDay).getFullYear(),
    new Date(currentDay).getMonth(),
    2
  )
    .toISOString()
    .split("T")[0];
  const firstDayOfLastMonth = new Date(
    new Date(Date.now()).getFullYear(),
    new Date(Date.now()).getMonth(),
    -29
  )
    .toISOString()
    .split("T")[0];
  const lastDayOfLastMonth = new Date(
    new Date(currentDay).getFullYear(),
    new Date(currentDay).getMonth(),
    1
  )
    .toISOString()
    .split("T")[0];
  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const datasets = [
    {
      label: "Book Requests",
      data:
        requests.bookingByDate &&
        dayInWeek.map((key) =>
          requests.bookingByDate[key] ? requests.bookingByDate[key] : 0
        ),
    },
  ];
  const dataWithColors = datasets.map((obj) => ({
    ...obj,
    borderColor: blue[600],
    // backgroundColor: blue[600],
  }));

  const compare = {
    ofTarget: (requests.count / requestsLastMonth.count - 1) * 100,
  };

  // console.log(requests.bookingByDate["2020-08-11"]);
  console.log(dayInWeek);
  useEffect(
    () => {
      dispatch(
        fetchCountBookingRequest(
          firstDayOfMonth,
          currentDay,
          BOOKING_STATUS.REQUEST,
          true
        )
      );
      dispatch(
        fetchCountBookingRequest(
          firstDayOfLastMonth,
          lastDayOfLastMonth,
          BOOKING_STATUS.REQUEST,
          false
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="p-16 pb-0 flex flex-row items-end flex-wrap">
        <div className="pr-16">
          <Typography className="h3" color="textSecondary">
            Booking Requests
          </Typography>
          {requests ? (
            <Typography className="text-56 font-300 leading-none mt-8">
              {requests.count}
            </Typography>
          ) : (
            <Skeleton animation="wave" variant="rect" width={100} height={40} />
          )}
        </div>
        <div className="py-4 text-16 flex flex-row items-center">
          {compare.ofTarget ? (
            <div className="flex flex-row items-center">
              {compare.ofTarget > 0 && (
                <Icon className="text-blue mr-4">trending_up</Icon>
              )}
              {compare.ofTarget < 0 && (
                <Icon className="text-red mr-4">trending_down</Icon>
              )}
              <Typography>{compare.ofTarget}% (last month)</Typography>
            </div>
          ) : (
            <Skeleton animation="wave" variant="rect" width={100} height={80} />
          )}
        </div>
      </div>
      <div className="h-96 w-100-p">
        <Line
          data={{
            labels: dayInWeek,
            datasets: dataWithColors,
          }}
          options={{
            maintainAspectRatio: false,
            spanGaps: false,
            legend: { display: false },
            layout: {
              padding: {
                top: 16,
                left: 10,
                right: 10,
                bottom: 10,
              },
            },
            scales: {
              xAxes: [
                {
                  display: false,
                },
              ],
              yAxes: [
                {
                  display: true,
                  ticks: {
                    min: 0,
                    max:
                      requests.bookingByDate &&
                      Math.round(
                        Math.max(...Object.values(requests.bookingByDate)) / 10
                      ) * 10,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </Card>
  );
};

export default withStyles(null, { withTheme: true })(BookingWidget);
