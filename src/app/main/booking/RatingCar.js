import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import { postReview, postReviewSubmit } from "./booking.action";
import { theme } from "@chakra-ui/core";

const useStyles = makeStyles((theme) => ({
  review: {
    margin: theme.spacing(1),
  },
}));

const RatingCar = (props) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.user);
  const [rateSart, setRateStar] = useState(5);

  const { carId } = props;

  const [currentRating, setCurrentRating] = useState({
    carId: carId,
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
  );
};

export default RatingCar;
