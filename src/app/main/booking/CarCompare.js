import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SwipeableTextMobileStepper from "../booking/SlideShow";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, property1, property2) {
  return { name, property1, property2 };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  imageGrid: {
    margin: 20,
  },
  compare: {
    marginTop: theme.spacing(10),
  },
  icon: {
    width: 25,
    height: 25,
  },
}));

function Row({ row }) {
  const classes = useStyles();
  switch (row.name) {
    case "Price":
      return (
        <React.Fragment>
          <Grid item xs={5} lg={5} align="center">
            <p style={{ fontSize: "20", fontWeight: "bold" }}>
              <NumberFormat
                value={row.property1}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" đ/ day"}
              />
            </p>
          </Grid>
          <Grid item xs={2} lg={2} align="center">
            <p style={{ fontSize: "14" }}>{row.name}</p>
          </Grid>
          <Grid item xs={5} lg={5} align="center">
            <p style={{ fontSize: "20", fontWeight: "bold" }}>
              <NumberFormat
                value={row.property2}
                displayType={"text"}
                thousandSeparator={true}
                // prefix={"$"}
                suffix={" đ/ day"}
              />
            </p>
          </Grid>
        </React.Fragment>
      );
    case "Brand":
      return (
        <React.Fragment>
          <Grid item xs={5} lg={5} align="center">
            <p style={{ fontSize: "20", fontWeight: "bold" }}>
              <img
                src={row.property1.logoLink}
                className={classes.icon}
                alt=""
              />
              {row.property1.name}
            </p>
            {console.log(row.property1)}
          </Grid>
          <Grid item xs={2} lg={2} align="center">
            <p style={{ fontSize: "14" }}>{row.name}</p>
          </Grid>
          <Grid item xs={5} lg={5} align="center">
            <p style={{ fontSize: "20", fontWeight: "bold" }}>
              <img
                src={row.property2.logoLink}
                alt=""
                className={classes.icon}
              />
              {row.property2.name}
            </p>
          </Grid>
        </React.Fragment>
      );
    default:
      return (
        <React.Fragment>
          <Grid item xs={5} lg={5} align="center">
            <p style={{ fontSize: "15", fontWeight: "bold" }}>
              {row.property1}
            </p>
            {console.log(row.property1)}
          </Grid>
          <Grid item xs={2} lg={2} align="center">
            <p style={{ fontSize: "14" }}>{row.name}</p>
          </Grid>
          <Grid item xs={5} lg={5} align="center">
            <p style={{ fontSize: "15", fontWeight: "bold" }}>
              {row.property2}
            </p>
          </Grid>
        </React.Fragment>
      );
  }
}

export default function CarCompare() {
  const classes = useStyles();
  const fakeImg = "https://www.indianbluebook.com/images/selected_car.png";
  var carDetail1 = [];
  var carDetail2 = [];
  var rows = [];
  const carCompare = useSelector((state) => state.booking.carCompare);
  if (carCompare.length === 2) {
    carDetail1 = carCompare[0];
    carDetail2 = carCompare[1];
    console.log(carDetail1);
    rows = [
      createData("Brand", carDetail1.brand, carDetail2.brand),
      createData("Name", carDetail1.name, carDetail2.name),
      createData("Model", carDetail1.model.name, carDetail2.model.name),
      createData("Screen", carDetail1.screen, carDetail2.screen),
      createData("Seats", carDetail1.seat, carDetail2.seat),
      createData("Price", carDetail1.price, carDetail2.price),
      createData(
        "Type",
        carDetail1.auto_driver ? "Automatic" : "Manual",
        carDetail2.auto_driver ? "Automatic" : "Manual"
      ),
      createData("Car Location", carDetail1.location, carDetail2.location),
      createData(
        "Distance to pickup location",
        carDetail1.distance,
        carDetail2.distance
      ),
    ];
  }

  return (
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <Grid container spacing={5}>
            <Grid item xs={5} lg={5}>
              <SwipeableTextMobileStepper
                images={
                  carDetail1
                    ? carDetail1.images.filter((image) => image.type === "CAR")
                    : [fakeImg]
                }
              />
            </Grid>
            <Grid item xs={2} lg={2} align="center">
              <Typography
                variant="h3"
                color="primary"
                className={classes.compare}
              >
                VS
              </Typography>
            </Grid>
            <Grid item xs={5} lg={5}>
              <SwipeableTextMobileStepper
                images={
                  carDetail2
                    ? carDetail2.images.filter((image) => image.type === "CAR")
                    : [fakeImg]
                }
              />
            </Grid>
          </Grid>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.name}>
            <Grid container>
              <Row row={row} />
            </Grid>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}
