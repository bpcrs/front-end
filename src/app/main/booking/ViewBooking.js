import React from "react";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Checkbox,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import CarItem from "./CarItem";
// import { Link } from "react-router-dom";
import Layout from "../../layout";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import { useDispatch, useSelector } from "react-redux";
import { postBookingRequest, changeLoadingBooking } from "./booking.action";
import { useState } from "react";
import NumberFormat from "react-number-format";
import SubmitLicense from "../submitLicense/submitLicense";
import { useEffect } from "react";
import UpdateProfileStepper from "../user/StepUpdateProfile";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  spacingCard: {
    marginTop: theme.spacing(1),
    marginLeft: 0,
    marginRight: 0,
  },
}));

export default function ViewBooking(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    bookingChange,
    carDetail,
    fromDate,
    toDate,
    totalPrice,
  } = props.location.state;
  const [checkTerms, SetCheckTerms] = useState(false);
  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.user);
  const loadingBooking = useSelector((state) => state.booking.loadingBooking);
  const flagBookSuccess = useSelector((state) => state.booking.flagBookSuccess);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleCheckBox = () => {
    SetCheckTerms(!checkTerms);
  };
  const convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  const bookingReq = {
    description: bookingChange.location.description || "description",
    destination: bookingChange.destination.description || "destination",
    status: "REQUEST",
    fromDate: convert(fromDate) || "",
    toDate: convert(toDate) + "T12:00:00" || "",
    location: bookingChange.location.description || "",
    carId: carDetail.id || "",
    price: carDetail.price || "",
    renterId: currentUser.id || "",
    totalPrice: totalPrice || "",
  };

  console.log(bookingReq);

  const handleUpdate = () => {
    dispatch(changeLoadingBooking());
    setOpenUpdate(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(changeLoadingBooking());
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const handleBooking = () => {
    createBookingRequest();
  };
  const createBookingRequest = () => {
    dispatch(postBookingRequest(bookingReq, carDetail.name, currentUser));
  };

  useEffect(() => {
    if (flagBookSuccess) history.push({ pathname: APP_PATH.PROFILE });
  }, [flagBookSuccess, history]);

  return (
    <Layout name="Review Plan">
      <div>
        <Dialog open={loadingBooking} scroll="body" onClose={handleClose}>
          <DialogContent>
            <Grid container justify="center" alignItems="center">
              <Grid item lg={12} container justify="center" alignItems="center">
                <img
                  src="assets/images/car-loading.jpg"
                  alt="CarSubmiLoading"
                  // width="300px"
                  height="300px"
                ></img>
              </Grid>
              <Grid item style={{ textAlign: "center" }}>
                <Typography variant="subtitle1" color="initial">
                  Please update phone number and your license before book !
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openUpdate} scroll="body" onClose={handleUpdateClose}>
          <DialogContent>
            {/* <SubmitLicense /> */}
            <UpdateProfileStepper />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={12} xl={6}>
                <Typography variant="subtitle1">
                  PICK UP & DESTINAION
                </Typography>
              </Grid>
              <Grid item xs={12} xl={6} justify="flex-end" container>
                <FormControl fullWidth className={classes.spacingCard}>
                  <Grid container justify="space-between">
                    <Typography variant="h6" color="primary" display="initial">
                      Pickup:
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {bookingChange.location.description}
                    </Typography>
                  </Grid>
                </FormControl>
                <FormControl fullWidth className={classes.spacingCard}>
                  <Grid container justify="space-between">
                    <Typography variant="h6" color="primary" display="initial">
                      Destinaion:
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {bookingChange.destination.description}
                    </Typography>
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <div className={classes.spacingCard}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  TRIP DURATION{" ("}
                  {Math.round(
                    (new Date(toDate) - new Date(fromDate)) /
                      (1000 * 60 * 60 * 24)
                  ) + 1}{" "}
                  days)
                </Typography>
              </Grid>

              <Grid item xl={5} lg={5} container direction="row" spacing={1}>
                <Grid item xs={6} xl={6} lg={6} style={{ textAlign: "right" }}>
                  <Typography variant="h4">
                    {new Date(fromDate).getDate()}
                  </Typography>
                </Grid>
                <Grid item xs={6} xl={6} lg={6}>
                  <Grid>
                    <Typography variant="caption">
                      {`${new Date(fromDate).toLocaleString("default", {
                        month: "short",
                      })}-${new Date(fromDate).getFullYear()}`}
                    </Typography>
                    <Typography variant="caption" component="p">
                      7:00 AM
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                xl={2}
                lg={2}
                container
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <Typography variant="overline">To</Typography>
                </Grid>
              </Grid>
              <Grid item xl={5} lg={5} container direction="row" spacing={1}>
                <Grid item xs={6} xl={6} lg={6} style={{ textAlign: "right" }}>
                  <Typography variant="h4">
                    {new Date(toDate).getDate()}
                  </Typography>
                  {/* <p className="text-base sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">09</p> */}
                </Grid>
                <Grid item xs={6} xl={6} lg={6}>
                  <Grid>
                    <Typography variant="caption">{`${new Date(
                      toDate
                    ).toLocaleString("default", { month: "short" })}-${new Date(
                      toDate
                    ).getFullYear()}`}</Typography>
                    <Typography variant="caption" component="p">
                      7:00 PM
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <div className={classes.spacingCard}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} lg={4} xl={4} className={classes.paper}>
            <CarItem isAction={false} info={carDetail} />
          </Grid>
          <Grid item xs={12} lg={8} xl={8} className={classes.paper}>
            <Card>
              <CardContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={12}>
                    <FormControl fullWidth className={classes.spacingCard}>
                      <Grid container justify="space-between">
                        <Typography
                          variant="h6"
                          color="primary"
                          display="initial"
                        >
                          Estimate price:
                        </Typography>
                        <NumberFormat
                          value={bookingReq.totalPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" đ"}
                        />
                      </Grid>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="primary">
                      GUILINES & POLICIES
                    </Typography>
                    <li>
                      Please carry your original driving license along with an
                      additional ID proof when you come to pick up your vehicle
                    </li>
                    <li>
                      If you plan to travel out-of-state, please ensure that you
                      take the required state permits
                    </li>
                    <li>
                      Our vehicles have a maximum speed limit of 120 km/hr.
                      Over-speeding will attract fines. To check our
                      over-speeding policy,{" "}
                      <Link href="#" color="inherit">
                        click here
                      </Link>
                    </li>
                    <li>
                      Your license must be verified by our system before you
                      start your trip or else your trip will be cancelled. To
                      check your license status,{" "}
                      <Link href="#" color="inherit">
                        click here
                      </Link>
                    </li>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div className={classes.spacingCard}>
        <Grid container className={classes.root} spacing={2} justify="center">
          <Grid item xs={12} lg={12} xl={12} className={classes.paper}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkTerms}
                  onChange={handleCheckBox}
                  name="checkedB"
                  color="primary"
                />
              }
              label={
                <div>
                  <span>I am over 21 years old, I agree to all </span>
                  <Link
                    href="https://drivezy.com/terms"
                    target="_blank"
                    variant="body2"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              }
            />
          </Grid>
          <Grid item xs={12} lg={6} xl={6} className={classes.paper}>
            <Button
              color="primary"
              onClick={handleBooking}
              variant="contained"
              fullWidth
              disabled={!checkTerms}
            >
              Book
            </Button>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}
