/* eslint-disable no-unused-vars */
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
import classNames from "classnames";

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
  cardHeader: {
    backgroundColor: theme.palette.primary[800],
    color: theme.palette.getContrastText(theme.palette.primary[800]),
  },
}));

export default function StepAgreement() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedBooking = useSelector((state) => state.chat.selectedBooking);
  const userLogged = useSelector((state) => state.auth.user);

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
      <Drawer anchor={"right"} open={change} onClose={handleClose}>
        <Grid className="px-2 py-2">
          <div className={classNames(classes.cardHeader, "px-24 py-16")}>
            <Typography variant="subtitle1" color="inherit">
              Agreements of{" "}
              {selectedBooking.renter.id === userLogged.id ? "Renter" : "Owner"}
            </Typography>
          </div>
        </Grid>
        <Grid container style={{ maxWidth: "700px", width: "700px" }}>
          <VerticalLinearStepper />
        </Grid>
      </Drawer>
    </div>
  );
}
