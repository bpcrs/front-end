import React from "react";
import {
  Button,
  Drawer,
  Grid,
  Icon,
  Fab,
  makeStyles,
  Typography,
} from "@material-ui/core";
import BookingTimeline from "../user/BookingTimeline";
import { useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    top: 160,
    right: 20,
    bottom: "auto",
    left: "auto",
    position: "fixed",
    textTransform: "none",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  cardHeader: {
    backgroundColor: theme.palette.primary[800],
    color: theme.palette.getContrastText(theme.palette.primary[800]),
  },
}));
export default function DetailBooking() {
  const [openDetail, setOpenDetail] = useState(false);
  const selectedBooking = useSelector((state) => state.chat.selectedBooking);
  const classes = useStyles();
  return (
    <div>
      <Fab
        variant="extended"
        className={classes.button}
        onClick={() => setOpenDetail(true)}
      >
        <Icon className={classes.extendedIcon}>library_books</Icon>
        View Booking
      </Fab>
      <Drawer
        anchor={"right"}
        open={openDetail}
        onClose={() => setOpenDetail(false)}
      >
        <Grid className="px-2 py-2">
          <div className={classNames(classes.cardHeader, "px-24 py-16")}>
            <Typography variant="subtitle1" color="inherit">
              Booking Infomation
            </Typography>
          </div>
        </Grid>
        <Grid
          container
          style={{ maxWidth: "700px", width: "700px", padding: "16px" }}
        >
          <BookingTimeline booking={selectedBooking} isChat={true} />
        </Grid>
      </Drawer>
    </div>
  );
}
