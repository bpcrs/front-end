// import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Backdrop,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  IconButton,
  Icon,
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
  approveBookingRequest,
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const RentalCarRequest = (props) => {
  const size = 5;
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const rentalBookings = useSelector((state) => state.profile.bookings);
  const { carId } = props;
  // const confirm = "";

  // const currentUser = useSelector((state) => state.auth.user);
  // const history = useHistory();

  const handleConfirm = (id, status) => {
    dispatch(approveBookingRequest(id, !status ? "DENY" : "CONFIRM"));
  };

  useEffect(() => {
    // dispatch(fetchCarInformationOwner(currentUser.id));
    // if (rentalBookings.count % size === 0) {
    //   setCurrentPage((currentPage) => currentPage - 1);
    // }
    dispatch(fetchBookingRentalMyCar(carId, "REQUEST", currentPage, size));
  }, [currentPage, dispatch, carId]);

  return (
    <Grid>
      <Typography></Typography>
      <TableContainer>
        <Table
          className={classes.table}
          aria-label="customized table"
          width="100%"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Renter Name</StyledTableCell>
              <StyledTableCell>Time Rental</StyledTableCell>
              <StyledTableCell>Start date</StyledTableCell>
              <StyledTableCell>Approve</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Backdrop className={classes.backdrop} open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
            {rentalBookings.data &&
              rentalBookings.data.map(
                ((booking, index) => (
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
                      {booking.renter.fullName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {Math.round(
                        (new Date(booking.toDate) -
                          new Date(booking.fromDate)) /
                          (1000 * 60 * 60 * 24)
                      ) + 1}{" "}
                      days
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(booking.fromDate).toDateString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton
                        onClick={() => handleConfirm(booking.id, true)}
                      >
                        <Icon style={{ color: "green" }}>done</Icon>
                      </IconButton>
                      <IconButton
                        onClick={() => handleConfirm(booking.id, false)}
                      >
                        <Icon style={{ color: "red" }}>
                          remove_circle_outline
                        </Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ): null)
              )}
            <Grid xs={12} lg={12} item container justify="flex-end">
              <Pagination
                count={
                  rentalBookings.count !== 0 &&
                  rentalBookings.count % size === 0
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
    </Grid>
  );
};

export default RentalCarRequest;
