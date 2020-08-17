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
import {
  fetchRevenueAllDoneBooking,
  fetchLastMonthTransactions,
} from "./checking.action";
import { green } from "@material-ui/core/colors";
import NumberFormat from "react-number-format";
import { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  graph: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
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
const formatMoney = (
  amount,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
};

const Widget = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const price = useSelector((state) => state.checking.priceTransaction);
  const lastMonthTransaction = useSelector(
    (state) => state.checking.lastMonthTransaction
  );
  const priceTransactions = useSelector(
    (state) => state.checking.priceTransactions
  );
  const currentDay = new Date(Date.now()).toISOString().split(".")[0];
  const firstDayOfLastMonth = new Date(
    new Date(Date.now()).getFullYear(),
    new Date(Date.now()).getMonth(),
    -29
  )
    .toISOString()
    .split(".")[0];
  const lastDayOfLastMonth = new Date(
    new Date(currentDay).getFullYear(),
    new Date(currentDay).getMonth(),
    1
  )
    .toISOString()
    .split(".")[0];
  const firstDayOfMonth = new Date(
    new Date(currentDay).getFullYear(),
    new Date(currentDay).getMonth(),
    2
  )
    .toISOString()
    .split(".")[0];
  console.log(firstDayOfMonth);

  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const graphDates = [];

  const [dates] = useState([]);

  const getGraphDates = () => {
    for (var i = 1; i < 8; i++) {
      graphDates.push(labels[new Date(dates[i]).getDay()]);
    }
  };

  const getLastWeekDate = () => {
    for (var i = 1; i < 9; i++) {
      dates.push(
        new Date(currentDay).setDate(new Date(currentDay).getDate() - i)
      );
    }
  };

  console.log(new Date(dates[0]).getDay());
  const datasets = [
    {
      label: "Revenue",
      data: priceTransactions,
    },
  ];
  const dataWithColors = datasets.map((obj) => ({
    ...obj,
    borderColor: green[600],
    backgroundColor: green[600],
  }));

  const conversion = {
    ofTarget: (price / lastMonthTransaction - 1) * 100,
  };

  useEffect(
    () => {
      dispatch(fetchRevenueAllDoneBooking(firstDayOfMonth, currentDay, false));
      dispatch(
        fetchLastMonthTransactions(firstDayOfLastMonth, lastDayOfLastMonth)
      );
      getLastWeekDate();
      getGraphDates();
      const fetchTransactionsWeek = () => {
        for (var i = 0; i < dates.length - 1; i++) {
          if (i)
            dispatch(
              fetchRevenueAllDoneBooking(
                new Date(dates[i + 1]).toISOString().split(".")[0],
                new Date(dates[i]).toISOString().split(".")[0],
                true
              )
            );
        }
      };
      fetchTransactionsWeek();
      console.log(graphDates);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="p-16 pb-0 flex flex-row flex-wrap items-end">
        <div className="pr-16">
          <Grid container item>
            <Icon>monetization_on</Icon>
            <Typography className="h3" color="textSecondary">
              Monthly Transactions
            </Typography>
          </Grid>
          {price ? (
            <Typography className="text-56 font-300 leading-none mt-8">
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" đ"}
              />
            </Typography>
          ) : (
            <Skeleton animation="wave" variant="rect" width={100} height={40} />
          )}
        </div>

        <div className="py-4 text-16 flex flex-row items-center">
          {conversion.ofTarget ? (
            <div className="flex flex-row items-center">
              {conversion.ofTarget > 0 && (
                <Icon className="text-green mr-4">trending_up</Icon>
              )}
              {conversion.ofTarget < 0 && (
                <Icon className="text-red mr-4">trending_down</Icon>
              )}
              <Typography variant="subtitle2">
                {conversion.ofTarget.toFixed(1)} % (last month)
              </Typography>
            </div>
          ) : (
            <Skeleton
              className={classes.graph}
              animation="wave"
              variant="rect"
              width={100}
              height={80}
            />
          )}
        </div>
      </div>
      <div className="h-96 w-100-p">
        {priceTransactions && priceTransactions.length > 0 ? (
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
                    display: true,
                    ticks: {
                      min: 0,
                      max:
                        Math.round(Math.max(...priceTransactions) / 1000000) *
                        1000000,
                      callback: function (value) {
                        return formatMoney(value);
                      },
                    },
                  },
                ],
              },
            }}
          />
        ) : (
          <Skeleton
            className={classes.graph}
            animation="wave"
            variant="rect"
            width={300}
            height={80}
          />
        )}
      </div>
    </Card>
  );
};

export default withStyles(null, { withTheme: true })(Widget);
