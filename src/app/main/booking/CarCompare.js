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
import { APP_PATH } from "../../../constant";
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

export default function CarCompare(props) {
  const classes = useStyles();
  const carCompare = useSelector((state) => state.booking.carCompare);
  const carDetail1 = carCompare[0];
  const carDetail2 = carCompare[1];
  const rows = [
    createData("Name", carDetail1.info.name, carDetail2.info.name),
    createData("Price", carDetail1.info.price, carDetail2.info.price),
    createData("Seats", carDetail1.info.seat, carDetail2.info.seat),
    createData("Year", carDetail1.info.year, carDetail2.info.year),
    // createData("Sound", carDetail1.info.sound, carDetail2.info.sound),
    createData(
      "Auto Drive",
      carDetail1.info.auto_driver ? "Automatic" : "Manual",
      carDetail2.info.auto_driver ? "Automatic" : "Manual"
    ),
    createData("Screen", carDetail1.info.screen, carDetail2.info.screen),
  ];
  //   const displayName = () => {
  //     switch (rows.name) {
  //       case "Name":
  //         return <Grid></Grid>;
  //     }
  //   };
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
                <Grid item xs={12} sm={2} lg={4}>
                  {/* <StyledTableCell></StyledTableCell> */}
                </Grid>

                <Grid item xs={6} lg={4}>
                  <img
                    alt=""
                    style={{ borderRadius: "10px", align: "right" }}
                    width="150px"
                    height="150px"
                    src={
                      "https://www.cstatic-images.com/car-pictures/xl/USD00HOS021A021001.jpg"
                    }
                  />
                </Grid>

                <Grid item xs={6} lg={4}>
                  {/* <StyledTableCell align="right"> */}
                  <img
                    alt=""
                    style={{ borderRadius: "10px", align: "right" }}
                    width="150px"
                    height="150px"
                    src={
                      "https://www.cstatic-images.com/car-pictures/xl/USC80GMS281B021001.jpg"
                    }
                  />
                  {/* </StyledTableCell> */}
                </Grid>
              </Grid>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={3} lg={4}>
                    {/* <StyledTableCell component="th" scope="row"> */}
                    <Grid spacing={1} container alignItems="baseline">
                      {row.name}
                    </Grid>

                    {/* </StyledTableCell> */}
                  </Grid>

                  <Grid item xs={6} lg={4}>
                    {/* <StyledTableCell align="right"> */}
                    <p style={{ fontSize: "12" }}>{row.property1}</p>

                    {/* </StyledTableCell> */}
                  </Grid>

                  <Grid item xs={6} lg={4}>
                    {/* <StyledTableCell align="right"> */}
                    <p style={{ fontSize: "12" }}>{row.property2}</p>

                    {/* </StyledTableCell> */}
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
