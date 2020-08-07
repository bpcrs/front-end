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
} from "@material-ui/core";

import BookingRequest from "./BookingRequest";
import BookingStatus from "./BookingStatus";
import BookingFilter from "./BookingFilter";
import { useEffect } from "react";

const MyBooking = () => {
  const [statusFilter, setStatusFilter] = useState();
  const [refresh, setRefesh] = useState(1);
  const handleClickRefresh = () => {
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
