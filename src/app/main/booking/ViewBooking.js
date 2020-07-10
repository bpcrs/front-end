import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  TextField,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import CarItem from "./CarItem";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import { useDispatch } from "react-redux";
import { postBookingRequest, postBookingSuccess } from "./booking.action";

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
  const { booking, carDetail } = props.location.state;
  const classes = useStyles();
  const { bookingRequest, setBookingRequest } = useState({});

  console.log("Booking ", booking);

  const handleBooking = () => {
    createBookingRequest();
    history.push({
      pathname: APP_PATH.CHAT,
      state: {
        booking,
        carDetail,
      },
    });
  };

  const createBookingRequest = () => {
    setBookingRequest(...bookingRequest, booking);
    console.log("Booking Request: ", bookingRequest);
    // dispatch(postBookingRequest(bookingRequest));
  };

  return (
    <Layout name="Review Plan">
      <div>
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
                  <TextField
                    id="pickup-basic"
                    label="Pickup"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={booking.location.description}
                  />
                </FormControl>
                <FormControl fullWidth className={classes.spacingCard}>
                  <TextField
                    id="destinaion-basic"
                    label="Destinaion"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={booking.destination.description}
                  />
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
                    (new Date(booking.toDate) - new Date(booking.fromDate)) /
                      (1000 * 60 * 60 * 24)
                  ) + 1}{" "}
                  days)
                </Typography>
              </Grid>

              <Grid item xl={5} lg={5} container direction="row" spacing={1}>
                <Grid item xs={6} xl={6} lg={6} style={{ textAlign: "right" }}>
                  <Typography variant="h4">
                    {new Date(booking.fromDate).getDate()}
                  </Typography>
                </Grid>
                <Grid item xs={6} xl={6} lg={6}>
                  <Grid>
                    <Typography variant="caption">
                      {`${new Date(booking.fromDate).toLocaleString("default", {
                        month: "short",
                      })}-${new Date(booking.fromDate).getFullYear()}`}
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
                    {new Date(booking.toDate).getDate()}
                  </Typography>
                  {/* <p className="text-base sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">09</p> */}
                </Grid>
                <Grid item xs={6} xl={6} lg={6}>
                  <Grid>
                    <Typography variant="caption">{`${new Date(
                      booking.toDate
                    ).toLocaleString("default", { month: "short" })}-${new Date(
                      booking.toDate
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
                    <Typography variant="subtitle1">
                      GUILINES & POLICIES
                    </Typography>
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
                  // checked={state.checkedB}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label={
                <div>
                  <span>I am over 21 years old, I agree to all </span>
                  <Link href="#" to="/" variant="body2">
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
            >
              Book
            </Button>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}
