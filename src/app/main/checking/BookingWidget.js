import React from "react";
import { withStyles, Card, Icon, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { bindActionCreators } from "redux";
import { blue } from "@material-ui/core/colors";

const BookingWidget = ({ data, theme }) => {
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
      data: [345, 134, 222, 333, 444, 134, 217],
    },
  ];
  const dataWithColors = datasets.map((obj) => ({
    ...obj,
    borderColor: blue[600],
    // backgroundColor: blue[600],
  }));

  const requests = {
    value: 412,
    ofTarget: 31,
  };

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="p-16 pb-0 flex flex-row items-end flex-wrap">
        <div className="pr-16">
          <Typography className="h3" color="textSecondary">
            Booking Requests
          </Typography>
          <Typography className="text-56 font-300 leading-none mt-8">
            1103
          </Typography>
        </div>

        <div className="py-4 text-16 flex flex-row items-center">
          <div className="flex flex-row items-center">
            {requests.ofTarget > 0 && (
              <Icon className="text-blue mr-4">trending_up</Icon>
            )}
            {requests.ofTarget < 0 && (
              <Icon className="text-red mr-4">trending_down</Icon>
            )}
            <Typography>{requests.ofTarget}%</Typography>
          </div>
          <Typography className="ml-4 whitespace-no-wrap">of target</Typography>
        </div>
      </div>

      <div className="h-96 w-100-p">
        <Line
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

export default withStyles(null, { withTheme: true })(BookingWidget);
