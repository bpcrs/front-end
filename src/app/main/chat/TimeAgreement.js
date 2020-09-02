import React from "react";
import { Fab, makeStyles, Icon } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    top: 50,
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
  time: {
    margin: theme.spacing(1),
  },
}));

export default function TimeAgreement() {
  const classes = useStyles();
  const selectedBooking = useSelector((state) => state.chat.selectedBooking);
  const [timeAgreement, setTime] = useState();
  useEffect(() => {
    console.log(selectedBooking);
    const timeAgreement = moment
      .duration(
        moment(
          moment(new Date(selectedBooking.fromDate)).subtract({ hours: 12 })
        ).diff(moment())
      )
      .humanize();
    setTime(timeAgreement);
  }, [selectedBooking]);
  return (
    <div>
      <Fab variant="extended" className={classes.button}>
        <Icon className={classes.extendedIcon}>access_time</Icon>
        Time left: {`${timeAgreement}`}
      </Fab>
    </div>
  );
}
