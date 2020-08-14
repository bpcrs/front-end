import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { Icon, Grid, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getTrackingsByBooking } from "../user/profile.action";
import BookingStatus from "../user/BookingStatus";
import { BOOKING_STATUS } from "../../../constant";
import ContractTable from "./ContractTable";

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
  switch (status) {
    case BOOKING_STATUS.PROCESSING:
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
                N/A
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {track ? (
              <TimelineDot color="secondary" variant="outlined">
                <Icon style={{ color: "black" }}>directions_car</Icon>
              </TimelineDot>
            ) : (
              <TimelineDot color="grey" variant="outlined">
                <Icon style={{ color: "yellow" }}>priority_high</Icon>
              </TimelineDot>
            )}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} done={track ? false : true} />
              <Typography variant="subtitle2" color="primary">
                Car is renting
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
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
                N/A
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {track ? (
              <TimelineDot color="secondary" variant="outlined">
                <Icon style={{ color: "blue" }}>send</Icon>
              </TimelineDot>
            ) : (
              <TimelineDot color="grey" variant="outlined">
                <Icon style={{ color: "yellow" }}>priority_high</Icon>
              </TimelineDot>
            )}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} done={track ? false : true} />
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
                N/A
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {track ? (
              <TimelineDot color="secondary" variant="outlined">
                <Icon style={{ color: "black" }}>chat</Icon>
              </TimelineDot>
            ) : (
              <TimelineDot color="grey" variant="outlined">
                <Icon style={{ color: "yellow" }}>priority_high</Icon>
              </TimelineDot>
            )}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} done={track ? false : true} />
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
                N/A
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {track ? (
              <TimelineDot color="secondary" variant="outlined">
                <Icon style={{ color: "purple" }}>check_circle</Icon>
              </TimelineDot>
            ) : (
              <TimelineDot color="grey" variant="outlined">
                <Icon style={{ color: "yellow" }}>priority_high</Icon>
              </TimelineDot>
            )}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} done={track ? false : true} />
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
                N/A
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {track ? (
              <TimelineDot color="secondary" variant="outlined">
                <Icon style={{ color: "green" }}>done_all</Icon>
              </TimelineDot>
            ) : (
              <TimelineDot color="grey" variant="outlined">
                <Icon style={{ color: "yellow" }}>priority_high</Icon>
              </TimelineDot>
            )}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} done={track ? false : true} />
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
                N/A
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {track ? (
              <TimelineDot color="secondary" variant="outlined">
                <Icon style={{ color: "green" }}>done_all</Icon>
              </TimelineDot>
            ) : (
              <TimelineDot color="grey" variant="outlined">
                <Icon style={{ color: "yellow" }}>priority_high</Icon>
              </TimelineDot>
            )}
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} done={track ? false : true} />
              <Typography variant="subtitle2" color="primary">
                Done rental.
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    case BOOKING_STATUS.CANCEL:
    case BOOKING_STATUS.DENY:
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
                N/A
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {track ? (
              <TimelineDot color="secondary" variant="outlined">
                <Icon style={{ color: "red" }}>block</Icon>
              </TimelineDot>
            ) : (
              <TimelineDot color="grey" variant="outlined">
                <Icon style={{ color: "yellow" }}>priority_high</Icon>
              </TimelineDot>
            )}
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} done={track ? false : true} />
              <Typography variant="subtitle2" color="primary">
                {status === BOOKING_STATUS.CANCEL
                  ? "Cancelled booking"
                  : "Car's owner had denied your request"}
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    case BOOKING_STATUS.RENTER_SIGNED:
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
                N/A
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {track ? (
              <TimelineDot color="secondary" variant="outlined">
                <Icon style={{ color: "green" }}>create</Icon>
              </TimelineDot>
            ) : (
              <TimelineDot color="grey" variant="outlined">
                <Icon style={{ color: "yellow" }}>priority_high</Icon>
              </TimelineDot>
            )}
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <BookingStatus name={status} done={track ? false : true} />
              <Typography variant="subtitle2" color="primary">
                Renter signed successful
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

  const signBook = trackings.find(
    (item) => item.status === BOOKING_STATUS.RENTER_SIGNED
  );

  const rentingBook = trackings.find(
    (item) => item.status === BOOKING_STATUS.PROCESSING
  );

  useEffect(() => {
    dispatch(getTrackingsByBooking(booking.id));
  }, [booking.id, dispatch]);

  return (
    <div>
      <Grid container>
        <Grid item lg={6}>
          <Timeline align="alternate">
            {cancelBook || denyBook ? (
              <Grid>
                {trackings &&
                  trackings.map((track, index) => (
                    <Track track={track} status={track.status} key={index} />
                  ))}
              </Grid>
            ) : (
              <Grid>
                <Track track={requestBook} status={BOOKING_STATUS.REQUEST} />
                <Track track={pendingBook} status={BOOKING_STATUS.PENDING} />
                <Track
                  track={ownerAcceptedBook}
                  status={BOOKING_STATUS.OWNER_ACCEPTED}
                />
                <Track track={confirmBook} status={BOOKING_STATUS.CONFIRM} />
                <Track track={signBook} status={BOOKING_STATUS.RENTER_SIGNED} />
                <Track track={rentingBook} status={BOOKING_STATUS.PROCESSING} />
                <Track track={doneBook} status={BOOKING_STATUS.DONE} />
              </Grid>
            )}
          </Timeline>
        </Grid>
        <Grid item lg={6}>
          <ContractTable booking={booking} />
        </Grid>
      </Grid>
    </div>
  );
}
