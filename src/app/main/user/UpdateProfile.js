import React from "react";
import {
  Drawer,
  Button,
  Grid,
  Typography,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdateProfileStepper from "./StepUpdateProfile";
import { makeStyles } from "@material-ui/styles";
import { theme } from "@chakra-ui/core";
import { useEffect } from "react";
import { fetchUserDetail } from "../submitLicense/license.action";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function UpdateProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const change = useSelector((state) => state.chat.change);
  const handleOpenUpdateProfile = () => {
    handleOpen();
  };
  const handleOpen = () => {
    setLoadingProcess(true);
    setTimeout(() => {
      setOpen(true);
      setLoadingProcess(false);
    }, 1000);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={loadingProcess}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Button
        variant="text"
        style={{ textTransform: "none", color: "blue" }}
        onClick={handleOpenUpdateProfile}
        startIcon={<Icon>edit</Icon>}
      >
        Update Profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Infomation</DialogTitle>
        <DialogContent>
          <UpdateProfileStepper />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
