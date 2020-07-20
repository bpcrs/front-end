// import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  Backdrop,
  TableCell,
  TableRow,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // fetchCarInformationOwner,
  fetchBookingRentalMyCar,
} from "./profile.action";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    margin: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const RentalCarRequest = (props) => {
  const size = 5;
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const rentalBookings = useSelector((state) => state.profile.bookings);
  const currentUser = useSelector((state) => state.auth.user);
  const history = useHistory();

  useEffect(() => {
    const { carId } = props;
    // dispatch(fetchCarInformationOwner(currentUser.id));
    dispatch(fetchBookingRentalMyCar(carId, currentPage, size));
  }, [currentPage, size, dispatch, props]);

  return (
    <TableContainer>
      <Table
        className={classes.table}
        aria-label="customized table"
        width="100%"
      >
        <TableBody>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          {rentalBookings.data &&
            rentalBookings.data.map((booking, index) => (
              <Grid item xs={12} xl={12} lg={12}>
                <TableRow
                  className="h-64 cursor-pointer"
                  hover
                  // role="checkbox"
                  // aria-checked={isSelected}
                  tabIndex={-1}
                  key={index}
                  // selected={isSelected}
                >
                  <TableCell component="th" scope="row">
                    {booking.car.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {booking.location}
                  </TableCell>
                </TableRow>
              </Grid>
            ))}
          <Grid xs={12} lg={12} item container justify="flex-end">
            <Pagination
              count={
                rentalBookings.count !== 0 && rentalBookings.count % size === 0
                  ? Math.floor(rentalBookings.count / size)
                  : Math.floor(rentalBookings.count / size) + 1
              }
              color="primary"
              onChange={(e, page) => setCurrentPage(page)}
            />
          </Grid>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RentalCarRequest;
