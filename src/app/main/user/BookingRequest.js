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
  DialogContent,
  Dialog,
  DialogActions,
  Button,
  Tooltip,
  DialogTitle,
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
import { APP_PATH, BOOKING_STATUS } from "../../../constant";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import BookingStatus from "./BookingStatus";
import TimeAgo from "react-timeago";
import { changeBookingStatusRequest } from "../user/profile.action";
import CustomizedTimeline from "../user/BookingTimeline";
import classNames from "classnames";
import Review from "../booking/Review";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      width: "100%",
    },
  },
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

function Row(props) {
  const dispatch = useDispatch();
  const { booking } = props;
  const [open, setOpen] = useState(false);
  const [openTimeline, setOpenTimeline] = useState(false);
  const history = useHistory();
  const handleAgreement = () => {
    history.push({
      pathname: APP_PATH.CHAT,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSelected = (booking) => {
    console.log(booking);
    setOpenTimeline(true);
  };

  const handleCloseTimeline = () => {
    setOpenTimeline(false);
  };

  const pendingText = `Click to join chat room with car owner`;
  const cancelText = `Click to view info`;
  const requestText = `Cancel this booking request`;
  const confirmText = `Sign contract`;
  // const doneText = `View completed contract`;
  const doneText = `Review and Rating this car`;
  const denyText = `View info`;
  const ownerAcceptedText = `Click to join chat room with car owner`;

  function StatusAction(props) {
    const [open, setOpen] = useState(false);
    const { booking } = props;

    const handleCancelRequest = () => {
      console.log(booking.id);
      dispatch(changeBookingStatusRequest(booking.id, BOOKING_STATUS.CANCEL));
    };

    switch (booking.status) {
      case "PENDING":
        return (
          <TableCell component="th" scope="row">
            <Tooltip title={pendingText}>
              <IconButton onClick={() => handleAgreement()}>
                <Icon style={{ color: "black" }}>chat</Icon>
              </IconButton>
            </Tooltip>
          </TableCell>
        );
      case "REQUEST":
        return (
          <React.Fragment>
            <TableCell component="th" scope="row">
              <Tooltip title={requestText}>
                <IconButton onClick={() => setOpen(true)}>
                  <Icon style={{ color: "red" }}>cancel</Icon>
                </IconButton>
              </Tooltip>
            </TableCell>
            <Dialog open={open} scroll="body">
              <DialogContent>
                <Typography variant="subtitle1" color="initial">
                  Are you want to cancel your booking request ?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCancelRequest}
                >
                  Yes
                </Button>
                <Button
                  autoFocus
                  onClick={() => setOpen(false)}
                  color="secondary"
                  variant="contained"
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        );
      case "CONFIRM":
        return (
          <Tooltip title={confirmText}>
            <Button
              variant="outlined"
              startIcon={<Icon style={{ color: "green" }}>assignment</Icon>}
              style={{ textTransform: "none" }}
            >
              {confirmText}
              {/* <IconButton
              // onClick={() => handleAgreement()}
              >
                <Icon style={{ color: "green" }}>assignment</Icon>
              </IconButton> */}
            </Button>
          </Tooltip>
        );
      case "DONE":
        return (
          <React.Fragment>
            <TableCell component="th" scope="row">
              <Tooltip title={doneText}>
                <IconButton
                // onClick={() => handleAgreement()}
                >
                  <Icon
                    style={{ color: "green" }}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    start
                  </Icon>
                </IconButton>
              </Tooltip>
            </TableCell>

            <Dialog open={open} scroll="body">
              <DialogContent>
                <Review carId={booking.car.id} bookingId={booking.id} />
              </DialogContent>

              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => setOpen(false)}
                  color="secondary"
                  variant="contained"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        );
      case "DENY":
        return (
          <TableCell component="th" scope="row">
            <Tooltip title={denyText}>
              <IconButton
              // onClick={() => handleAgreement()}
              >
                <Icon style={{ color: "black" }}>error</Icon>
              </IconButton>
            </Tooltip>
          </TableCell>
        );
      case "CANCEL":
        return (
          <TableCell component="th" scope="row">
            <Tooltip title={cancelText}>
              <IconButton
              // onClick={() => handleAgreement()}
              >
                <Icon style={{ color: "red" }}>clear</Icon>
              </IconButton>
            </Tooltip>
          </TableCell>
        );
      case "OWNER_ACCEPTED":
        return (
          <TableCell component="th" scope="row">
            <Tooltip title={ownerAcceptedText}>
              <IconButton
              // onClick={() => handleAgreement()}
              >
                <Icon style={{ color: "purple" }}>chat</Icon>
              </IconButton>
            </Tooltip>
          </TableCell>
        );
      default:
        return null;
    }
  }

  return (
    <React.Fragment>
      <Dialog open={openTimeline} scroll="body" onClose={handleCloseTimeline}>
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="overline">BOOKING INFOMATION</Typography>
        </DialogTitle>

        <DialogContent>
          <CustomizedTimeline booking={booking} />
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between" alignItems="center">
            <Grid>
              <StatusAction booking={booking} />
            </Grid>
            <Grid>
              <Button
                autoFocus
                onClick={handleCloseTimeline}
                color="default"
                variant="contained"
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <TableRow
        className="h-64 cursor-pointer"
        hover
        // role="checkbox"
        // aria-checked={isSelected}
        tabIndex={-1}
        // key={index}
        onClick={() => handleSelected(booking)}
        // selected={isSelected}
      >
        <TableCell component="th" scope="row">
          {Math.round(
            (Date.now() - new Date(booking.createdDate)) / (1000 * 60 * 60 * 24)
          ) > 0 ? (
            new Date(booking.createdDate).toDateString()
          ) : (
            <TimeAgo date={booking.createdDate} />
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {booking.car.name}
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
          <BookingStatus name={booking.status} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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
          <Table aria-label="customized table" width="100%">
            <TableHead>
              <TableRow>
                <StyledTableCell>Book time</StyledTableCell>
                <StyledTableCell>Car Name</StyledTableCell>
                <StyledTableCell>Time Rental</StyledTableCell>
                <StyledTableCell>Start date</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                {/* <StyledTableCell>Action</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
              </Backdrop>
              {myBookings.data &&
                myBookings.data.map((booking, index) => (
                  <Row key={index} booking={booking} />
                ))}
            </TableBody>
          </Table>
          <Grid item container justify="flex-end">
            <Pagination
              size="small"
              count={
                myBookings.count !== 0 && myBookings.count % size === 0
                  ? Math.floor(myBookings.count / size)
                  : Math.floor(myBookings.count / size) + 1
              }
              color="primary"
              onChange={(e, page) => setCurrentPage(page)}
            />
          </Grid>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default BookingRequest;
