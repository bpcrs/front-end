import React from "react";
import {
  withStyles,
  Card,
  Icon,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRevenueAllDoneBooking } from "./checking.action";
import { tr } from "date-fns/locale";
import { green } from "@material-ui/core/colors";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  options: {
    spanGaps: false,
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 24,
        left: 16,
        right: 16,
        bottom: 16,
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
          display: false,
          ticks: {
            min: 100,
            max: 500,
          },
        },
      ],
    },
  },
}));

const Widget = ({ theme }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const price = useSelector((state) => state.checking.price);
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
      label: "Revenue",
      data: [221, 428, 492, 471, 413, 344, 294],
    },
  ];
  const dataWithColors = datasets.map((obj) => ({
    ...obj,
    borderColor: green[600],
    backgroundColor: green[600],
  }));

  const conversion = {
    value: 492,
    ofTarget: 13,
  };

  useEffect(() => {
    dispatch(
      fetchRevenueAllDoneBooking("2020-07-20T07:00", "2020-08-11T07:00")
    );
  }, [dispatch]);

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="p-16 pb-0 flex flex-row flex-wrap items-end">
        <div className="pr-16">
          <Grid container item>
            <Icon>monetization_on</Icon>
            <Typography className="h3" color="textSecondary">
              Monthly Revenue
            </Typography>
          </Grid>
          <Typography className="text-56 font-300 leading-none mt-8">
            <NumberFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" đ"}
            />
          </Typography>
        </div>

        <div className="py-4 text-16 flex flex-row items-center">
          <div className="flex flex-row items-center">
            {conversion.ofTarget > 0 && (
              <Icon className="text-green mr-4">trending_up</Icon>
            )}
            {conversion.ofTarget < 0 && (
              <Icon className="text-red mr-4">trending_down</Icon>
            )}
            <Typography>{conversion.ofTarget}%</Typography>
          </div>
          <Typography className="ml-4 whitespace-no-wrap">of target</Typography>
        </div>
      </div>

      <div className="h-96 w-100-p">
        <Bar
          data={{
            labels: labels,
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
                  display: false,
                  ticks: {
                    min: 100,
                    max: 500,
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

export default withStyles(null, { withTheme: true })(Widget);
