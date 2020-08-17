import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Backdrop,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  Icon,
  Box,
  DialogContent,
  Dialog,
  DialogActions,
  Button,
  Tooltip,
  DialogTitle,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingRequest, fetchBookingRentalMyCar } from "./profile.action";
import { signContractRequest } from "./profile.action";
import { useHistory } from "react-router-dom";
import { APP_PATH, BOOKING_STATUS } from "../../../constant";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import BookingStatus from "./BookingStatus";
import { changeBookingStatusRequest } from "../user/profile.action";
import CustomizedTimeline from "../user/BookingTimeline";
import Review from "../booking/Review";
import { red } from "@material-ui/core/colors";
import VerifyOTP from "./VerifyOTP";
import BookingClose from "../user/BookingClose";
import UpdateOdmeter from "./UpdateOdmeter";

import moment from "moment";
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
    zIndex: theme.zIndex.drawer + 0,
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

function Row({ booking, carId, currentUser, flag }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openTimeline, setOpenTimeline] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCloseBook, setOpenCloseBook] = useState(false);
  const history = useHistory();
  const handleAgreement = () => {
    history.push({
      pathname: APP_PATH.CHAT,
    });
  };

  const handleSelected = (booking) => {
    setOpenTimeline(true);
  };

  const handleCloseTimeline = () => {
    setOpenTimeline(false);
    // setOpenClose(true);
  };

  const handleSignContract = (otp) => {
    dispatch(signContractRequest(booking.id, otp));
    setOpenTimeline(false);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const pendingText = `Join chat room`;
  const requestText = `Cancel booking`;
  const confirmText = `Sign contract`;
  const doneText = `Review trip`;
  const ownerAcceptedText = `Join chat room`;
  const processingText = `Complete the rental process`;
  const completeText = `Complete booking`;

  function StatusAction(props) {
    const [open, setOpen] = useState(false);
    const { booking, carId, isProcess } = props;
    const handleCancelRequest = () => {
      dispatch(changeBookingStatusRequest(booking.id, BOOKING_STATUS.CANCEL));
      handleCloseTimeline();
    };
    const handleProcessRequest = () => {
      setOpenCloseBook(true);
    };
    const handleCompleteBooking = () => {
      dispatch(changeBookingStatusRequest(booking.id, BOOKING_STATUS.DONE));
      handleCloseTimeline();
    };

    switch (booking.status) {
      case BOOKING_STATUS.PROCESSING:
        return (
          <React.Fragment>
            <Tooltip title={isProcess ? completeText : processingText}>
              <Button
                variant="outlined"
                style={{ textTransform: "none" }}
                startIcon={
                  <Icon style={{ color: isProcess ? "green" : "black" }}>
                    assignment_return
                  </Icon>
                }
                onClick={() => setOpen(true)}
              >
                {isProcess ? completeText : processingText}
              </Button>
            </Tooltip>
            <Dialog open={open} scroll="body">
              <DialogContent>
                {isProcess ? (
                  <Typography variant="subtitle1" color="initial">
                    Are you want to finish this booking?
                  </Typography>
                ) : (
                  <Typography variant="subtitle1" color="initial">
                    Are you want to finish rental process and go to bill
                    payment?
                  </Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => setOpen(false)}
                  style={{ backgroundColor: "red", color: "white" }}
                  variant="contained"
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    isProcess ? handleCompleteBooking : handleProcessRequest
                  }
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        );
      case BOOKING_STATUS.REQUEST:
        return (
          <React.Fragment>
            <Tooltip title={requestText}>
              <Button
                variant="outlined"
                style={{ textTransform: "none" }}
                startIcon={<Icon style={{ color: "red" }}>cancel</Icon>}
                onClick={() => setOpen(true)}
              >
                {requestText}
              </Button>
            </Tooltip>
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
                  style={{ backgroundColor: "red", color: "white" }}
                  variant="contained"
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        );
      case BOOKING_STATUS.CONFIRM:
        return (
          <Tooltip title={confirmText}>
            <VerifyOTP
              callBack={handleSignContract}
              content="Please verify OTP before signing"
              title="Verify OTP"
            >
              <Button
                variant="outlined"
                startIcon={<Icon style={{ color: "green" }}>fingerprint</Icon>}
                style={{ textTransform: "none" }}
              >
                {confirmText}
              </Button>
            </VerifyOTP>
          </Tooltip>
        );
      case BOOKING_STATUS.RENTER_SIGNED:
        return (
          <React.Fragment>
            <Tooltip title={confirmText}>
              <UpdateOdmeter
                children={handleSignContract}
                content="Please verify OTP before signing"
                title="Verify OTP"
                booking={booking}
                currentUser={currentUser}
              >
                <Button
                  variant="outlined"
                  startIcon={<Icon style={{ color: "green" }}>fingerprint</Icon>}
                  style={{ textTransform: "none" }}
                >
                  {confirmText}
                </Button>
              </UpdateOdmeter>
            </Tooltip>
          </React.Fragment>
        );
      case BOOKING_STATUS.DONE:
        return (
          <React.Fragment>
            {booking.car.owner.email === currentUser.email ? (
              <Grid></Grid>
            ) : (
              <React.Fragment>
                <Tooltip title={doneText}>
                  <Button
                    variant="outlined"
                    startIcon={<Icon style={{ color: "green" }}>start</Icon>}
                    style={{ textTransform: "none" }}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    {doneText}
                  </Button>
                </Tooltip>

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
            )}
          </React.Fragment>
        );
      case BOOKING_STATUS.DENY:
        return <Grid></Grid>;
      case BOOKING_STATUS.CANCEL:
        return <Grid></Grid>;
      case BOOKING_STATUS.OWNER_ACCEPTED:
      case BOOKING_STATUS.PENDING:
        return (
          <Tooltip title={carId ? pendingText : ownerAcceptedText}>
            <Button
              variant="outlined"
              style={{ textTransform: "none" }}
              onClick={handleAgreement}
              startIcon={<Icon style={{ color: "purple" }}>chat</Icon>}
            >
              {carId ? pendingText : ownerAcceptedText}
            </Button>
          </Tooltip>
        );
      default:
        return null;
    }
  }

  return (
    <React.Fragment>
      <Backdrop
        className={classes.backdrop}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={openTimeline}
        scroll="body"
        onClose={handleCloseTimeline}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Grid container justify="space-between">
            <Grid>
              <Typography variant="overline">BOOKING INFOMATION</Typography>
            </Grid>
            <Grid>
              <Button
                autoFocus
                style={{ color: red[500] }}
                onClick={handleCloseTimeline}
                startIcon={<Icon>close</Icon>}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {openCloseBook ? (
            <BookingClose booking={booking} />
          ) : (
            <CustomizedTimeline booking={booking} />
          )}
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-end" alignItems="center">
            <Grid>
              {openCloseBook ? (
                <StatusAction
                  booking={booking}
                  carId={carId}
                  isProcess={true}
                />
              ) : (
                <StatusAction booking={booking} carId={carId} />
              )}
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <TableRow
        className="h-64 cursor-pointer"
        hover
        tabIndex={-1}
        onClick={() => handleSelected(booking)}
      >
        <TableCell component="th" scope="row">
          {Math.round(
            (Date.now() - new Date(booking.createdDate)) / (1000 * 60 * 60 * 24)
          ) > 0
            ? moment.utc(booking.createdDate).local().format("LLL")
            : moment.utc(booking.createdDate).local().fromNow()}
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
  const { status, carId } = props;
  const currentUser = useSelector((state) => state.auth.user);
  const flag = useSelector((state) => state.profile.flag);

  useEffect(() => {
    carId
      ? dispatch(
          fetchBookingRentalMyCar(
            carId,
            status && status.map((item) => item.name),
            currentPage,
            size
          )
        )
      : dispatch(
          fetchBookingRequest(
            currentUser.id,
            status && status.map((item) => item.name),
            currentPage,
            size
          )
        );
  }, [currentPage, dispatch, currentUser.id, status, carId]);

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
                  <Row
                    key={index}
                    booking={booking}
                    carId={carId}
                    currentUser={currentUser}
                    flag={flag}
                  />
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
