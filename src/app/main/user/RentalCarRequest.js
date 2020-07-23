// import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Backdrop,
  TableCell,
  TableRow,
  TableHead,
  IconButton,
  Icon,
  Collapse,
  Box,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookingRentalMyCar,
  approveBookingRequest,
} from "./profile.action";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    margin: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  detailBooking: {
    marginLeft: theme.spacing(1),
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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { booking } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleConfirm = (id, status) => {
    dispatch(approveBookingRequest(id, !status ? "DENY" : "PENDING"));
  };
  const agreementChat = () => {
    history.push({
      pathname: APP_PATH.CHAT,
    });
  };
  const handleBookingStatus = (booking) => {
    switch (booking.status) {
      case "REQUEST":
        return (
          <TableCell component="th" scope="row">
            <IconButton onClick={() => handleConfirm(booking.id, true)}>
              <Icon style={{ color: "green" }}>done</Icon>
            </IconButton>
            <IconButton onClick={() => handleConfirm(booking.id, false)}>
              <Icon style={{ color: "red" }}>remove_circle_outline</Icon>
            </IconButton>
          </TableCell>
        );
      case "PENDING":
        return (
          <TableCell component="th" scope="row">
            <IconButton onClick={() => agreementChat()}>
              <Icon style={{ color: "blue" }}>chat</Icon>
            </IconButton>
          </TableCell>
        );
      case "CONFIRM":
        return (
          <TableCell component="th" scope="row">
            <IconButton>
              <Icon>done</Icon>
            </IconButton>
          </TableCell>
        );
      default:
        return null;
    }
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <TableRow
        className="h-64 cursor-pointer"
        hover
        // role="checkbox"
        // aria-checked={isSelected}
        tabIndex={-1}
        // key={index}
      >
        <TableCell component="th" scope="row">
          {booking.renter.fullName}
        </TableCell>
        <TableCell component="th" scope="row">
          {Math.round(
            (new Date(booking.toDate) - new Date(booking.fromDate)) /
              (1000 * 60 * 60 * 24)
          ) + 1}{" "}
          days
        </TableCell>
        <TableCell component="th" scope="row">
          {new Date(booking.fromDate).toDateString()}
        </TableCell>
        <TableCell component="th" scope="row">
          <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
            <Icon style={{ color: "purple" }}>details</Icon>
          </IconButton>
        </TableCell>
        {handleBookingStatus(booking)}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detail:
              </Typography>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <Typography color="textSecondary" variant="subtitle2">
                  Renter name:{" "}
                </Typography>
                <Typography className={classes.detailBooking}>
                  {" "}
                  {booking.renter.fullName}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <Typography color="textSecondary" variant="subtitle2">
                  Pick-up location:{" "}
                </Typography>
                <Typography className={classes.detailBooking}>
                  {" "}
                  {booking.location}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <Typography color="textSecondary" variant="subtitle2">
                  Drop location:{" "}
                </Typography>
                <Typography className={classes.detailBooking}>
                  {" "}
                  {booking.destination}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <Typography color="textSecondary" variant="subtitle2">
                  From date:{" "}
                </Typography>
                <Typography className={classes.detailBooking}>
                  {" "}
                  {new Date(booking.fromDate).toDateString()}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <Typography color="textSecondary" variant="subtitle2">
                  End date:{" "}
                </Typography>
                <Typography className={classes.detailBooking}>
                  {" "}
                  {new Date(booking.toDate).toDateString()}
                </Typography>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const RentalCarRequest = (props) => {
  const size = 5;
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const rentalBookings = useSelector((state) => state.profile.bookings);
  const { carId, bookingStatus } = props;
  // const [open, setOpen] = useState(false);

  // const currentUser = useSelector((state) => state.auth.user);
  // const history = useHistory();

  const handleTableRowStatusBooking = (booking) => {
    switch (booking) {
      case "REQUEST":
        return <StyledTableCell>Approve</StyledTableCell>;
      case "PENDING":
        return <StyledTableCell>Agreement</StyledTableCell>;
      case "CONFIRM":
        return <StyledTableCell>Status</StyledTableCell>;
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(fetchBookingRentalMyCar(carId, bookingStatus, currentPage, size));
  }, [currentPage, dispatch, carId, bookingStatus]);

  return (
    <Grid>
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
              <StyledTableCell>Detail</StyledTableCell>
              {handleTableRowStatusBooking(bookingStatus)}
            </TableRow>
          </TableHead>
          <TableBody>
            <Backdrop className={classes.backdrop} open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
            {rentalBookings.data &&
              rentalBookings.data.map((booking, index) => (
                <Row key={index} booking={booking} />
              ))}
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
