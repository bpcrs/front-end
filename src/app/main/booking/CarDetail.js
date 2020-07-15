import React, { useState, useEffect } from "react";
import {
  CardHeader,
  Avatar,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Icon,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewList,
  fetchCarDetail,
  postReviewSubmit,
  postReview,
} from "./booking.action";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";
import NumberFormat from "react-number-format";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
  media: {
    height: 140,
    width: "100%",
  },
  review: {
    margin: theme.spacing(1),
  },
  comment: {
    margin: theme.spacing(2),
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

  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.booking.loading);
  const { booking, carDetails } = props.location.state;
  const summaryPrice =
    carDetail.price *
    (Math.round(
      (new Date(booking.toDate) - new Date(booking.fromDate)) /
        (1000 * 60 * 60 * 24)
    ) +
      1);

  // const owner = carDetail.owner;

  // console.log("Car Detail", carDetail.owner);
  // console.log("Booking Request", bookingReq);

  useEffect(() => {
    const carId = props.match.params.id;
    dispatch(fetchReviewList(1, 10, carId));
    dispatch(fetchCarDetail(carId));
  }, [dispatch, props]);

  const handleBooking = () => {
    history.push({
      pathname: APP_PATH.VIEW_BOOKING,
      state: {
        booking,
        carDetails,
        carDetail,
      },
    });
  };

  const [currentRating, setCurrentRating] = useState({
    carId: props.match.params.id,
    accountId: currentUser.id,
    rating: 5,
    comment: "",
  });
  const handleInputComment = (event) => {
    setCurrentRating({
      ...currentRating,
      comment: event.target.value,
    });
  };

  const [rateSart, setRateStar] = useState(5);
  const handleInputRateStar = (event) => {
    setRateStar(event.target.value);
    setCurrentRating({
      ...currentRating,
      rating: event.target.value,
    });
  };

  const submitReviewCarToDB = () => {
    dispatch(postReview());
    dispatch(postReviewSubmit(currentRating));
    setCurrentRating({ comment: "" });
  };

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
          <Grid item xl={12} xs={12} lg={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Car Details
                </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <CardMedia
                      className={classes.media}
                      image="https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg"
                      title="Contemplative Reptile"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      align="center"
                    >
                      {carDetail.name}
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
                            <Icon fontSize={"default"}>
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
                            <Icon fontSize={"default"}>gamepad</Icon>
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
                            <Icon fontSize={"default"}>directions_car</Icon>
                          </Grid>
                          <Grid item container justify="center">
                            <Typography variant="caption">
                              {carDetail.model}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardContent>
                      <Grid align="center">
                        <Chip label="4.5" style={{ marginBottom: 15 }} />

                        <Rating
                          name="half-rating-read"
                          defaultValue={4.5}
                          precision={0.5}
                          readOnly
                        />
                      </Grid>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        component="p"
                      >
                        FPT University - Ho Chi Minh City
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        component="p"
                      >
                        {carDetail.plateNum}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardContent>
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
                {reviews &&
                  reviews.map((review) => (
                    <Review key={review.id} {...review} />
                  ))}
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
                              src={currentUser.photoURL}
                              aria-label="recipe"
                              className={classes.avatar}
                            ></Avatar>
                          }
                          title={currentUser.displayName}
                          // subheader="May 14, 2020"
                        />
                        <Rating
                          name="Rating"
                          value={rateSart}
                          size="large"
                          onChange={handleInputRateStar}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      lg={12}
                      xs={12}
                      container
                      spacing={1}
                      className={classes.review}
                    >
                      <TextField
                        id="outlined-textarea"
                        label="Comment"
                        placeholder="Tell us about your experience"
                        value={currentRating.comment}
                        onChange={handleInputComment}
                        multiline
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>

                    <Grid
                      className={classes.review}
                      item
                      xl={12}
                      xs={12}
                      lg={12}
                      justify="flex-end"
                      container
                    >
                      <Grid item lg={4} xs={12}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={submitReviewCarToDB}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
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
                  <Icon>gps_fixed</Icon>
                  <Typography variant="h6">Pick-up</Typography>
                </Grid>
                <Typography variant="body2" color="textPrimary" component="p">
                  {new Date(booking.fromDate).toDateString()}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  {booking.location.description}
                </Typography>
                <br />
                <Grid spacing={1} container alignItems="baseline">
                  <Icon>gps_fixed</Icon>
                  <Typography variant="h6">Drop-off</Typography>
                </Grid>
                <Typography variant="body2" color="textPrimary" component="p">
                  {new Date(booking.toDate).toDateString()}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  {booking.destination.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} xl={12} lg={12}>
            <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
              <CardContent>
                <Typography variant="h6">Price summary</Typography>
                <Grid container justify="space-between">
                  {/* <Typography variant="body2" align="left" color="textPrimary">
                    Car rental fee
                  </Typography> */}
                  <Typography variant="body2" align="right" color="textPrimary">
                    {
                      <NumberFormat
                        value={carDetail.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        // prefix={"$"}
                        // suffix={" VNĐ"}
                      />
                    }{" "}
                    {" * "}{" "}
                    {Math.round(
                      (new Date(booking.toDate) - new Date(booking.fromDate)) /
                        (1000 * 60 * 60 * 24)
                    ) + 1}{" "}
                    {"(days) = "}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="textPrimary"
                  >
                    {
                      <NumberFormat
                        value={summaryPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        // prefix={"$"}
                        suffix={" VNĐ"}
                      />
                    }
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className="w-full mt-20"
                    onClick={handleBooking}
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
