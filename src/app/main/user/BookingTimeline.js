import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Icon } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getTrackingsByBooking } from "../user/profile.action";
import { Grid } from "@material-ui/core";
import BookingStatus from "../user/BookingStatus";
import { BOOKING_STATUS } from "../../../constant";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Track(props) {
  const classes = useStyles();
  const { track, status } = props;
  console.log(status);
  switch (status) {
    case BOOKING_STATUS.REQUEST:
      return (
        <TimelineItem>
          <TimelineOppositeContent>
            {track ? (
              <Typography variant="subtitle2" color="textSecondary">
                {new Date(track.createdDate).toLocaleTimeString()}{" "}
                {new Date(track.createdDate).toLocaleDateString()}
              </Typography>
            ) : (
              <Typography variant="subtitle2" color="textSecondary">
                ???
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="secondary" variant="outlined">
              <Icon style={{ color: "blue" }}>send</Icon>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} />
              <Typography variant="subtitle2" color="primary">
                Book car
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    case BOOKING_STATUS.PENDING:
      return (
        <TimelineItem>
          <TimelineOppositeContent>
            {track ? (
              <Typography variant="subtitle2" color="textSecondary">
                {new Date(track.createdDate).toLocaleTimeString()}{" "}
                {new Date(track.createdDate).toLocaleDateString()}
              </Typography>
            ) : (
              <Typography variant="subtitle2" color="textSecondary">
                ???
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="inherit">
              <Icon style={{ color: "black" }}>chat</Icon>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} />
              <Typography variant="subtitle2" color="primary">
                Negotiate with car's owner
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    case BOOKING_STATUS.OWNER_ACCEPTED:
      return (
        <TimelineItem>
          <TimelineOppositeContent>
            {track ? (
              <Typography variant="subtitle2" color="textSecondary">
                {new Date(track.createdDate).toLocaleTimeString()}{" "}
                {new Date(track.createdDate).toLocaleDateString()}
              </Typography>
            ) : (
              <Typography variant="subtitle2" color="textSecondary">
                ???
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined">
              <Icon style={{ color: "purple" }}>check_circle</Icon>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} />
              <Typography variant="subtitle2" color="primary">
                Car's owner accpeted agreement
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    case BOOKING_STATUS.CONFIRM:
      return (
        <TimelineItem>
          <TimelineOppositeContent>
            {track ? (
              <Typography variant="subtitle2" color="textSecondary">
                {new Date(track.createdDate).toLocaleTimeString()}{" "}
                {new Date(track.createdDate).toLocaleDateString()}
              </Typography>
            ) : (
              <Typography variant="subtitle2" color="textSecondary">
                ???
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="secondary" variant="outlined">
              <Icon style={{ color: "green" }}>done_all</Icon>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} />
              <Typography variant="subtitle2" color="primary">
                Close agreement. Waiting for receive car
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    case BOOKING_STATUS.DONE:
      return (
        <TimelineItem>
          <TimelineOppositeContent>
            {track ? (
              <Typography variant="subtitle2" color="textSecondary">
                {new Date(track.createdDate).toLocaleTimeString()}{" "}
                {new Date(track.createdDate).toLocaleDateString()}
              </Typography>
            ) : (
              <Typography variant="subtitle2" color="textSecondary">
                ???
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="secondary" variant="outlined">
              <Icon style={{ color: "green" }}>done_all</Icon>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} />
              <Typography variant="subtitle2" color="primary">
                Done rental.
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    default:
      return null;
  }
}

export default function CustomizedTimeline(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { booking } = props;
  const trackings = useSelector((state) => state.profile.trackings);
  const requestBook = trackings.find(
    (item) => item.status === BOOKING_STATUS.REQUEST
  );
  const pendingBook = trackings.find(
    (item) => item.status === BOOKING_STATUS.PENDING
  );
  const ownerAcceptedBook = trackings.find(
    (item) => item.status === BOOKING_STATUS.OWNER_ACCEPTED
  );
  const confirmBook = trackings.find(
    (item) => item.status === BOOKING_STATUS.CONFIRM
  );
  const doneBook = trackings.find(
    (item) => item.status === BOOKING_STATUS.DONE
  );
  const cancelBook = trackings.find(
    (item) => item.status === BOOKING_STATUS.CANCEL
  );
  const denyBook = trackings.find(
    (item) => item.status === BOOKING_STATUS.DENY
  );
  useEffect(() => {
    dispatch(getTrackingsByBooking(booking.id));
  }, [booking.id, dispatch]);

  return (
    <Timeline align="alternate">
      {/* {trackings &&
        trackings.map((track, index) => (
          <Track
            track={track}
            key={index}
            length={trackings.length}
            pos={index}
          />
        ))} */}
      <Track track={requestBook} status={BOOKING_STATUS.REQUEST} />
      <Track track={pendingBook} status={BOOKING_STATUS.PENDING} />
      <Track track={ownerAcceptedBook} status={BOOKING_STATUS.OWNER_ACCEPTED} />
      <Track track={confirmBook} status={BOOKING_STATUS.CONFIRM} />
      <Track track={doneBook} status={BOOKING_STATUS.DONE} />
    </Timeline>
  );
}
