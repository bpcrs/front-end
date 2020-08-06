import React, { useState, useEffect } from "react";
import {
  CardHeader,
  Avatar,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Icon,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewList,
  fetchCarDetail,
  fetchCarDetailWithDistance,
} from "./booking.action";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";
import NumberFormat from "react-number-format";
import { DateRangePicker, DateRangeDelimiter } from "@material-ui/pickers";
import GoogleMaps from "../landing/GoogleMaps";
import SwipeableTextMobileStepper from "./SlideShow";
import Divider from "@material-ui/core/Divider";
import Pagination from "@material-ui/lab/Pagination";
// import HorizontalLinearStepper from "../booking/StepperBooking";
// import ReviewComponent from "./Review";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
  media: {
    height: 160,
    width: "100%",
    marginLeft: theme.spacing(22),
  },
  review: {
    margin: theme.spacing(1),
  },
  comment: {
    margin: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "100%",
  },
  platenum: {
    marginLeft: theme.spacing(1),
  },
  imgs: {
    height: 100,
    width: "100%",
  },
  textField: {
    width: "100%",
},
}));
const Review = ({ comment, rating, renter, createdDate }) => {
  const classes = useStyles();
  return (
    <Card className={classes.review} elevation={20}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid
            spacing={1}
            item
            xs={12}
            xl={4}
            container
            justify="space-between"
            alignItems="baseline"
          >
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={renter.imageUrl}
                ></Avatar>
              }
              title={renter.fullName}
              subheader={new Date(createdDate).toLocaleDateString()}
            />
            <Rating name="read-only" value={rating} readOnly size="small" />
          </Grid>
          <Grid spacing={1} item xs={12} xl={4} container alignContent="center">
            <Grid item lg={12} xs={12}>
              {/* <Typography variant="subtitle2">{comment}</Typography> */}
              <TextField
                value={comment ? comment: ""}
                className={classes.textField}
                variant="outlined"
                multiline
                disabled />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default function CarDetails(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.booking.reviews);
  const carDetail = useSelector((state) => state.booking.carDetail);
  // const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.booking.loading);
  const { booking } = props.location.state;
  const [bookingChange, setBookingChange] = useState(booking);
  const distance = useSelector((state) => state.booking.distance);
  const [selectedDate, setDateChange] = useState([
    bookingChange.fromDate,
    bookingChange.toDate,
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const size = 3;

  const fakeImg =
    "https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg";

  const summaryPrice =
    carDetail.price *
    (Math.round(
      (new Date(selectedDate[1]) - new Date(selectedDate[0])) /
      (1000 * 60 * 60 * 24)
    ) +
      1);

  const handleBookingChange = () => {
    console.log(bookingChange);
    history.push({
      pathname: APP_PATH.VIEW_BOOKING,
      state: {
        bookingChange,
        carDetail,
        fromDate: selectedDate[0],
        toDate: selectedDate[1],
        totalPrice: summaryPrice,
      },
    });
  };

  useEffect(() => {
    const carId = props.match.params.id;
    dispatch(fetchReviewList(currentPage, size, carId));
    dispatch(
      fetchCarDetailWithDistance(carId, bookingChange.location.description)
    );
    // dispatch(
    //   distanceBetweenTwoLocation(
    //     bookingChange.location.description,
    //     carDetail.location
    //   )
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props, currentPage]);

  return (
    <Grid container spacing={3}>
      <div>
        <Dialog
          open={loading}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Uploading Review"}
          </DialogTitle>
          <DialogContent>
            <div align="center" className={classes.progressBar}>
              <CircularProgress color="secondary" />
              <p>We are upload your Review, please wait...</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Grid item xl={8} lg={8}>
        <Grid container spacing={3}>
          {/* <Grid container item lg={12} justify="center">
            <HorizontalLinearStepper step={1} />
          </Grid> */}
          <Grid item xl={12} xs={12} lg={12}>
            <Card>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={6} sm={6}>
                    <Grid>
                      <SwipeableTextMobileStepper
                        images={carDetail.images ? carDetail.images : [fakeImg]}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      align="center"
                      color="primary"
                    >
                      {carDetail.brand ? carDetail.brand.name : ""}{" "}
                      {carDetail.name} {carDetail.year}
                    </Typography>
                    <CardContent>
                      <Grid
                        spacing={1}
                        container
                        justify="space-between"
                        alignItems="baseline"
                      >
                        <Grid
                          xs={3}
                          item
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-around"
                        >
                          <Grid justify="center" container>
                            <Icon
                              fontSize={"default"}
                              color="primary"
                            // style={{ color: "primary" }}
                            >
                              airline_seat_recline_normal_outlined
                            </Icon>
                          </Grid>
                          <Grid item container justify="center">
                            <Typography variant="caption">
                              {carDetail.seat} people
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          xs={3}
                          item
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-around"
                        >
                          <Grid item container justify="center">
                            <Icon fontSize={"default"} color="primary">
                              gamepad
                            </Icon>
                          </Grid>
                          <Grid item container justify="center">
                            <Typography variant="caption">
                              {carDetail.autoDriver ? "Automatic" : "Manual"}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          xs={3}
                          item
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-around"
                        >
                          <Grid item container justify="center">
                            <Icon fontSize={"default"} color="primary">
                              directions_car
                            </Icon>
                          </Grid>
                          <Grid item container justify="center">
                            <Typography variant="caption">
                              {carDetail.model ? carDetail.model.name : ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardContent>
                      <Grid
                        spacing={1}
                        container
                        justify="space-between"
                        alignItems="baseline"
                      >
                        <Grid
                          xs={3}
                          item
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-around"
                        >
                          <Grid justify="center" container>
                            <Icon fontSize={"default"} color="primary">
                              gps_fixed
                            </Icon>
                          </Grid>
                          <Grid item container justify="center">
                            <Typography variant="caption">GPS</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          xs={3}
                          item
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-around"
                        >
                          <Grid justify="center" container>
                            <Icon fontSize={"default"} color="primary">
                              usb
                            </Icon>
                          </Grid>
                          <Grid item container justify="center">
                            <Typography variant="caption">USB</Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          xs={3}
                          item
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-around"
                        >
                          <Grid item container justify="center">
                            <Icon fontSize={"default"} color="primary">
                              person_outline
                            </Icon>
                          </Grid>
                          <Grid item container justify="center">
                            <Typography variant="caption">
                              {carDetail.owner ? carDetail.owner.fullName : ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardContent>
                      <Grid container item justify="center">
                        <Icon color="primary">confirmation_number</Icon>
                        <Typography
                          variant="subtitle1"
                          align="center"
                          color="textSecondary"
                          className={classes.platenum}
                        >
                          {carDetail.plateNum}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardContent>
              <Grid
                container
                item
                lg={12}
                alignItems="center"
                className={classes.review}
              >
                <Grid container>
                  <Icon color="primary">location_searching</Icon>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    color="inherit"
                    className={classes.platenum}
                  >
                    {distance ? distance.distance : "? km"}
                  </Typography>
                </Grid>
                <Grid container>
                  <Icon color="primary">location_on</Icon>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    color="inherit"
                    className={classes.platenum}
                  >
                    {carDetail.location
                      ? carDetail.location
                      : "Ho Chi Minh City"}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xl={12} lg={12}>
            <Card>
              <CardContent>
                <Grid container spacing={1}>
                  <Typography gutterBottom variant="h5">
                    Customer reviews
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item xl={12} lg={12}>
                    {reviews.data &&
                      reviews.data.map((review) => (
                        <Review key={review.id} {...review} />
                      ))}
                  </Grid>

                  <Grid item xl={12} lg={12}>
                    <Pagination
                      count={
                        reviews.count !== 0 && reviews.count % size === 0
                          ? Math.floor(reviews.count / size)
                          : Math.floor(reviews.count / size) + 1
                      }
                      color="primary"
                      onChange={(e, page) => setCurrentPage(page)}
                    />
                  </Grid>
                </Grid>


              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={4} lg={4}>
        <Grid container spacing={1}>
          <Grid item xs={12} xl={12} lg={12}>
            <Card square>
              <CardContent>
                <Grid spacing={1} container alignItems="baseline">
                  <Icon className={classes.review}>info</Icon>
                  <Typography variant="h6">Info</Typography>
                </Grid>
                <div className={classes.paper}></div>
                <DateRangePicker
                  value={selectedDate}
                  onChange={(date) => setDateChange(date)}
                  disablePast
                  showTodayButton
                  inputFormat="dd/MM/yyyy"
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} helperText="" />
                      <DateRangeDelimiter> to </DateRangeDelimiter>
                      <TextField {...endProps} helperText="" />
                    </React.Fragment>
                  )}
                />
                <GoogleMaps
                  label="Pick-up location"
                  value={bookingChange.location}
                  onChange={(value) =>
                    setBookingChange({ ...bookingChange, location: value })
                  }
                />
                <GoogleMaps
                  label="Destination"
                  value={bookingChange.destination}
                  onChange={(value) =>
                    setBookingChange({ ...bookingChange, destination: value })
                  }
                />
                <br />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} xl={12} lg={12}>
            <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
              <CardContent>
                <Typography variant="h6" color="initial" display="initial">
                  Price detail{" "}
                </Typography>
                <Grid container justify="space-between">
                  <Typography
                    variant="subtitle1"
                    color="initial"
                    align="right"
                    display="initial"
                  >
                    Price
                  </Typography>
                  <Typography variant="body2" color="textPrimary" align="left">
                    <NumberFormat
                      value={carDetail.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" đ"}
                    />
                  </Typography>
                </Grid>
                <Grid container justify="space-between">
                  <Typography
                    variant="subtitle1"
                    color="initial"
                    align="right"
                    display="initial"
                  >
                    Rental period
                  </Typography>
                  <Typography variant="body2" color="textPrimary" align="left">
                    <NumberFormat
                      value={
                        Math.round(
                          (new Date(selectedDate[1]) -
                            new Date(selectedDate[0])) /
                          (1000 * 60 * 60 * 24)
                        ) + 1
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" days"}
                    />
                  </Typography>
                </Grid>
                <Divider orientation="horizontal" light="true" />
                <Grid
                  container
                  justify="space-between"
                  className={classes.paper}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    align="right"
                    display="initial"
                  >
                    Total:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    color="textPrimary"
                  >
                    {
                      <NumberFormat
                        value={summaryPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" đ"}
                      />
                    }
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className="w-full mt-20"
                    disabled={
                      !bookingChange.location || !bookingChange.destination
                    }
                    onClick={handleBookingChange}
                  >
                    Book Now
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
