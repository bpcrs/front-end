import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Grid,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Icon,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import BookingRequest from "./BookingRequest";
import BookingStatus from "./BookingStatus";
import BookingFilter from "./BookingFilter";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const MyBooking = () => {
  const classes = useStyles();
  const [statusFilter, setStatusFilter] = useState();
  const [refresh, setRefesh] = useState(1);
  const [open, setOpen] = useState(false);
  const handleClickRefresh = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setRefesh((refresh) => refresh + 1);
  };

  return (
    <Grid container>
      <Grid container item justify="space-between">
        <Button
          variant="text"
          style={{ textTransform: "none", color: "blue" }}
          onClick={() => handleClickRefresh()}
          startIcon={<Icon>refresh</Icon>}
        >
          Refresh Requests
        </Button>
        <Backdrop
          className={classes.backdrop}
          open={open}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid item lg={6} container justify="flex-end">
          <BookingFilter key={refresh} onFilter={setStatusFilter} />
        </Grid>
      </Grid>
      <Grid item lg={12}>
        <BookingRequest key={refresh} status={statusFilter} />
      </Grid>
    </Grid>
  );
};

export default MyBooking;
