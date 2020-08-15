import React from "react";
import {
  Drawer,
  Button,
  Grid,
  Typography,
  Icon,
  Fab,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import VerticalLinearStepper from "./VerticalLinearStepper";
import { useCallback } from "react";
import { fetchAgreementList, closeAgreementDrawer } from "./chat.action";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    top: 100,
    right: 20,
    bottom: "auto",
    left: "auto",
    position: "fixed",
    textTransform: "none",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function StepAgreement() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedBooking = useSelector((state) => state.chat.selectedBooking);
  const change = useSelector((state) => state.chat.change);
  const handleOpenAgreement = () => {
    dispatch(fetchAgreementList(selectedBooking.id));
    dispatch(closeAgreementDrawer());
  };
  const handleClose = () => {
    dispatch(closeAgreementDrawer());
  };
  return (
    <div>
      <Fab
        variant="extended"
        className={classes.button}
        onClick={handleOpenAgreement}
      >
        <Icon className={classes.extendedIcon}>rate_reviews</Icon>
        Agreements
      </Fab>
      {/* <Button
        variant="outlined"
        onClick={handleOpenAgreement}
        startIcon={<Icon>event</Icon>}
      >
        Agreements
      </Button> */}
      <Drawer anchor={"right"} open={change} onClose={handleClose}>
        <Grid className="px-2 py-2" container>
          <Typography>Agreements of booking</Typography>
        </Grid>
        <Grid container style={{ maxWidth: "700px", width: "700px" }}>
          <VerticalLinearStepper />
        </Grid>
      </Drawer>
    </div>
  );
}
