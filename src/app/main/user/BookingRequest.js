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
  Box,
  // IconButton,
  // Icon,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingRequest } from "./profile.action";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import BookingStatus from "./BookingStatus";
import TimeAgo from "react-timeago";

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

const BookingRequest = (props) => {
  const size = 5;
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const myBookings = useSelector((state) => state.profile.bookings);
  const { status } = props;
  const history = useHistory();

  const currentUser = useSelector((state) => state.auth.user);

  const handleAgreement = () => {
    history.push({
      pathname: APP_PATH.CHAT,
    });
  };
  useEffect(() => {
    dispatch(
      fetchBookingRequest(
        currentUser.id,
        status && status.map((item) => item.name),
        currentPage,
        size
      )
    );
  }, [currentPage, dispatch, currentUser.id, status]);

  return (
    <Grid>
      <Box hidden={myBookings.data && myBookings.data.length !== 0}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <img
              src="assets/images/empty.jpg"
              alt="No resourse"
              height="300px"
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              We did't find any booking right now.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box hidden={!myBookings.data || myBookings.data.length === 0}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-label="customized table"
            width="100%"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Book time</StyledTableCell>
                <StyledTableCell>Car Name</StyledTableCell>
                <StyledTableCell>Time Rental</StyledTableCell>
                <StyledTableCell>Start date</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
                {/* {booking === "PENDING" ? (
                  <StyledTableCell>Agreement</StyledTableCell>
                ) : null} */}
              </TableRow>
            </TableHead>
            <TableBody>
              <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
              </Backdrop>
              {myBookings.data &&
                myBookings.data.reverse().map((booking, index) => (
                  // <Grid item xs={12} xl={12} lg={12}>
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
                      <TimeAgo date={booking.createdDate} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.car.name}
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
                      <BookingStatus name={booking.status} />
                    </TableCell>
                    {booking.status === "PENDING" ? (
                      <TableCell component="th" scope="row">
                        <IconButton onClick={() => handleAgreement()}>
                          <Icon style={{ color: "blue" }}>send</Icon>
                        </IconButton>
                      </TableCell>
                    ) : null}
                  </TableRow>
                  // </Grid>
                ))}
              <Grid xs={12} lg={12} item container justify="flex-end">
                <Pagination
                  count={
                    myBookings.count !== 0 && myBookings.count % size === 0
                      ? Math.floor(myBookings.count / size)
                      : Math.floor(myBookings.count / size) + 1
                  }
                  color="primary"
                  onChange={(e, page) => setCurrentPage(page)}
                />
              </Grid>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default BookingRequest;
