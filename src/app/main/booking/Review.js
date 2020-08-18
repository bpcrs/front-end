import React, { useState, useEffect } from "react";
import {
  CardHeader,
  Avatar,
  Grid,
  Card,
  CardContent,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import { postReviewSubmit } from "./booking.action";
import PublishIcon from "@material-ui/icons/Publish";
import CancelIcon from "@material-ui/icons/Cancel";

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

export default function Review(props) {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.user);
  // const disableButton = useSelector((state) => state.booking.disableButton);
  const dispatch = useDispatch();
  const { carId } = props;
  const { bookingId } = props;
  const { callBack } = props;
  const [error, setError] = useState(false);
  const [errortext, setErrorText] = useState("");

  const [review, setReview] = useState({
    rating: 5,
    comment: "",
    carId: carId,
    bookingId: bookingId,
  });

  // useEffect(() => {
  //   if (carId > 0) {
  //     if (bookingId > 0) {
  //       setReview({
  //         ...review,
  //         carId: carId,
  //         bookingId: bookingId,
  //       });
  //     }
  //   }
  // }, [carId, bookingId]);

  const handleChangeInput = (event) => {
    setReview({
      ...review,
      [event.target.name]: event.target.value,
    });
  };

  const submitReviewBooking = () => {
    const check = checkNotNullReview();
    if (check) {
      setError(true);
      setErrorText("Your filed is empty!!");
    } else {
      dispatch(postReviewSubmit(review));
      setReview({
        ...review,
        comment: "",
        rating: 5,
      });
      callBack();
    }
  };

  const checkNotNullReview = () => {
    if (!review.comment) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Grid>
  
      {/* <Card className={classes.review} elevation={20}>
        <CardContent> */}
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
                src={currentUser.photoURL}
              ></Avatar>
            }
            title={currentUser.displayName}
          // subheader={new Date(createdDate).toLocaleDateString()}
          />
          <Rating
            name="rating"
            value={review.rating}
            size="small"
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid
          spacing={1}
          item
          xs={12}
          xl={4}
          container
          alignContent="center"
        >
          <Grid item lg={12} xs={12}>
            <TextField
              error={error}
              name="comment"
              value={review.comment}
              className={classes.textField}
              variant="outlined"
              multiline
              placeholder="Tell us about your feeling..."
              helperText={errortext}
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>

        <Grid container justify="space-around">

          <Grid item>
            <Button
              id="submitButton"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "red" }}
              startIcon={<CancelIcon />}
              // disabled={disableButton}
              onClick={() => { callBack() }}
            >
              Close
              </Button>
          </Grid>

          <Grid item >
            <Button
              id="submitButton"
              variant="contained"
              color="primary"
              startIcon={<PublishIcon />}
              // disabled={disableButton}
              onClick={submitReviewBooking}
            >
              Rate
              </Button>
          </Grid>

        </Grid>
      </Grid>
      {/* </CardContent>
      </Card> */}
    </Grid>
  );
}
