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
  Backdrop,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewList, fetchCarDetailWithDistance } from "./booking.action";
import NumberFormat from "react-number-format";
import { DateRangePicker, DateRangeDelimiter } from "@material-ui/pickers";
import GoogleMaps from "../landing/GoogleMaps";
import SwipeableTextMobileStepper from "./SlideShow";
import Divider from "@material-ui/core/Divider";
import Pagination from "@material-ui/lab/Pagination";
import Alert from "@material-ui/lab/Alert";

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
    margin: theme.spacing(1),
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Review = ({ comment, rating, renter, createdDate, id }) => {
  const classes = useStyles();
  const [hoving, setHoving] = useState();
  return (
    <Card
      className={classes.review}
      elevation={hoving === id ? 4 : 0}
      onMouseOver={() => setHoving(id)}
      onMouseOut={() => setHoving(0)}
    >
      <CardContent>
        <Grid container spacing={1}>
          <Grid
            spacing={1}
            item
            lg={6}
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
          </Grid>
          <Grid spacing={1} item lg={6} container alignContent="center">
            <Rating name="read-only" value={rating} readOnly size="small" />
            <Grid item lg={12} xs={12}>
              <Typography variant="subtitle2">{comment}</Typography>
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
  const { booking, callback } = props.location.state;
  const [bookingChange, setBookingChange] = useState(booking);
  const distance = useSelector((state) => state.booking.distance);
  const [selectedDate, setDateChange] = useState([
    bookingChange.fromDate,
    bookingChange.toDate,
  ]);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const size = 3;
  const isLogged = useSelector((state) => state.auth.login.success);

  const isInArea = () => {
    const isKm = distance && distance.text.indexOf("km") !== -1;
    return isKm && distance.value <= 50;
  };
  const handleChangeInfo = () => {
    setLoadingProcess(true);
    setTimeout(() => {
      setLoadingProcess(false);
    }, 3000);
  };

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

  const handleDateProcess = (date) => {
    setDateChange(date);
    handleChangeInfo();
  };

  const handleDestinationChange = (value) => {
    setBookingChange({
      ...bookingChange,
      destination: value,
    });
    handleChangeInfo();
  };
  const handleLocationChange = (value) => {
    console.log(value);

    setBookingChange({
      ...bookingChange,
      location: value !== null ? value : booking.location.description,
    });
    handleChangeInfo();
  };
  useEffect(() => {
    const carId = props.match.params.id;
    dispatch(fetchReviewList(currentPage, size, carId));
    dispatch(
      fetchCarDetailWithDistance(carId, bookingChange.location.description)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id, currentPage, bookingChange.location.description]);

  return (
    <Grid container spacing={3}>
      <Grid item xl={8} lg={8}>
        <Grid container spacing={3}>
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
                            <Icon fontSize={"default"} color="primary">
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
                          Plate Number: {carDetail.plateNum}
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
                  {distance.text ? (
                    <Typography
                      variant="subtitle2"
                      align="center"
                      color="inherit"
                      className={classes.platenum}
                    >
                      Distance to pick-up location: {distance.text}
                    </Typography>
                  ) : (
                    <Typography
                      variant="subtitle2"
                      align="center"
                      color="error"
                      className={classes.platenum}
                    >
                      Please fill out location
                    </Typography>
                  )}
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
                  <Grid spacing={1} container alignItems="baseline">
                    <Icon className={classes.review}>rate_review</Icon>
                    <Typography variant="h6">Customer Review</Typography>
                    <Box hidden={reviews.count !== 0}>
                      <Grid container justify="center" alignItems="center">
                        <Grid item>
                          <img
                            src="assets/images/review.jpg"
                            alt="No Review"
                            // width="300px"
                            height="300px"
                          ></img>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2">
                            The car doesn't any review. Be a first reviewer ^_^.
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid item xl={12} lg={12}>
                    {reviews.data &&
                      reviews.data.map((review) => (
                        <Review key={review.id} {...review} />
                      ))}
                    <Grid container xs={12} lg={12} item justify="flex-end">
                      <Pagination
                        hidden={reviews.count === 0}
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
                  <Icon className={classes.review}>description</Icon>
                  <Typography variant="h6">Info</Typography>
                </Grid>
                <div className={classes.paper}></div>
                <DateRangePicker
                  value={selectedDate}
                  onChange={(date) => handleDateProcess(date)}
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
                  id="location"
                  name="location"
                  value={bookingChange.location}
                  onChange={handleLocationChange}
                />

                <GoogleMaps
                  label="Destination"
                  id="destination"
                  name="destination"
                  value={bookingChange.destination}
                  // onChange={(value) =>
                  //   setBookingChange({ ...bookingChange, destination: value })
                  // }
                  onChange={handleDestinationChange}
                />
                <br />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} xl={12} lg={12}>
            <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
              <CardContent>
                <Typography variant="h6" color="initial" display="initial">
                  Price detail
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
                  {!isInArea() || !isLogged ? (
                    <Grid item lg={12}>
                      <Alert severity="warning" className={classes.comment}>
                        {!isLogged && "Please login to booking car"}
                        {!isInArea() &&
                          isLogged &&
                          "Distance should less than 50 km"}
                      </Alert>
                    </Grid>
                  ) : null}
                  <Button
                    variant="contained"
                    color="primary"
                    className="w-full mt-20"
                    disabled={
                      !bookingChange.location ||
                      !bookingChange.destination ||
                      !isInArea() ||
                      !isLogged
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
      <Backdrop
        className={classes.backdrop}
        open={loadingProcess}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
