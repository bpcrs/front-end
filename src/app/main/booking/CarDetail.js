import React from "react";
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewList, fetchCarDetail } from "./booking.action";
import NumberFormat from "react-number-format";

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
const Review = ({ comment, rating }) => {
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
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              title="Trần Đức Thái"
              subheader="May 14, 2020"
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
  const { booking } = props.location.state;
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
        carDetail,
      },
    });
  };
  return (
    <Grid container spacing={3}>
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
                              aria-label="recipe"
                              className={classes.avatar}
                            >
                              R
                            </Avatar>
                          }
                          title="Trần Đức Thái"
                          subheader="May 14, 2020"
                        />
                        <Rating
                          name="Rating"
                          value={5}
                          size="large"
                          // onChange={(event, newValue) => {
                          //     setValue(newValue);
                          // }}
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
                        <Button fullWidth variant="contained" color="primary">
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
                  <Typography variant="body2" align="left" color="textPrimary">
                    Car rental fee
                  </Typography>
                  <Typography variant="body2" align="right" color="textPrimary">
                    {
                      <NumberFormat
                        value={carDetail.price}
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
