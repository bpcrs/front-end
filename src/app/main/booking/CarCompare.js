import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Icon } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Layout from "../../layout";
import SwipeableTextMobileStepper from "../booking/SlideShow";
import { useSelector } from "react-redux";

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

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function CarCompare() {
  const classes = useStyles();
  const fakeImg =
    "https://www.indianbluebook.com/images/selected_car.png";
  const carCompare = useSelector((state) => state.booking.carCompare);
  const carDetail1 = carCompare[0];
  const carDetail2 = carCompare[1];
  const rows = [
    createData("Brand", carDetail1.info.brand.name, carDetail2.info.brand.name),
    createData("Name", carDetail1.info.name, carDetail2.info.name),
    createData("Model", carDetail1.info.year, carDetail2.info.year),
    createData("Screen", carDetail1.info.screen, carDetail2.info.screen),
    createData("Seats", carDetail1.info.seat, carDetail2.info.seat),
    createData("Price", carDetail1.info.price, carDetail2.info.price),
    createData(
      "Type",
      carDetail1.info.auto_driver ? "Automatic" : "Manual",
      carDetail2.info.auto_driver ? "Automatic" : "Manual"
    ),
  ];
  return (
    <Layout name="Compare your car">
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="customized table"
          width="100%"
        >
          <TableHead>
            <TableRow>
              <Grid container spacing={0}>
                <Grid item xs={2} lg={2}>
                </Grid>

                <Grid item xs={5} lg={5}>
                  <SwipeableTextMobileStepper
                    images={
                      carDetail1.info.images.length > 0
                        ? carDetail1.info.images.filter((image) => image.type == "CAR")
                        : [fakeImg]
                    }
                  />
                </Grid>

                <Grid item xs={5} lg={5}>
                  <SwipeableTextMobileStepper
                    images={
                      carDetail2.info.images.length > 0
                        ? carDetail2.info.images.filter((image) => image.type == "CAR")
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
                <Grid container spacing={0} justify="space-between"
                  alignItems="baseline">
                  <Grid item xs={2} lg={2} align="center">
                    <p style={{ fontSize: "14" }}>{row.name}</p>
                  </Grid>
                  <Grid item xs={5} lg={5} align="center">
                    <p style={{ fontSize: "14" }}>{row.property1}</p>
                  </Grid>
                  <Grid item xs={5} lg={5} align="center">
                    <p style={{ fontSize: "14" }}>{row.property2}</p>
                  </Grid>
                </Grid>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
