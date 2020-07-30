import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Grid, Tabs, Tab, Box, Typography } from "@material-ui/core";

import BookingRequest from "./BookingRequest";
import BookingStatus from "./BookingStatus";
import BookingFilter from "./BookingFilter";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    margin: theme.spacing(2),
  },
  status: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.info,
  },
}));

const MyBooking = () => {
  const [statusFilter, setStatusFilter] = useState();

  return (
    <Grid container>
      <Grid item lg={12} container justify="flex-end">
        <BookingFilter onFilter={setStatusFilter} />
      </Grid>
      <Grid item lg={12}>
        <BookingRequest status={statusFilter} />
      </Grid>
    </Grid>
  );
};

export default MyBooking;
