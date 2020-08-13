import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { theme } from "@chakra-ui/core";
import { blue, green, red, grey } from "@material-ui/core/colors";
import {
  Grid,
  CircularProgress,
  Chip,
  Icon,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { sendOTPRequest } from "./profile.action";

const useStyles = makeStyles((theme) => ({
  inputStyle: {
    width: "4rem !important",
    height: "4rem",
    margin: "0 1rem",
    fontSize: "2rem",
    fontFamily: theme.typography.fontFamily,
    fontWeight: "100",
    borderRadius: "4px",
    border: "1px solid rgba(0,0,0,0.3)",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "12%",
    marginTop: -12,
    marginLeft: -12,
  },
  loadingProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "-10%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function VerifyOTP({ children, callBack, title, content }) {
  const [open, setOpen] = useState(false);
  const [OTP, setOTP] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // const otpConfirm = useSelector((state) => state.profile.otpConfirm);
  const [counter, setCounter] = useState(60);
  const classes = useStyles();
  const [confirming, setConfirming] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSendOTP = () => {
    setCounter(60);
    setLoading(true);
    dispatch(sendOTPRequest());
    const timer = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
    setTimeout(() => {
      setLoading(false);
      clearInterval(timer);
    }, 60000);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangeOTP = (value) => {
    setOTP(value);
    if (value.toString().length === 7) {
      setConfirming(true);
      setTimeout(() => {
        setConfirming(false);
        setLoading(false);
        setCounter(60);
        setOpen(false);
        callBack(value);
      }, 3000);
      // // dispatch(sendOTPConfirm(value));
      // if (otpConfirm) {
      // }
    }
  };

  return (
    <React.Fragment>
      {React.cloneElement(children, { onClick: handleClickOpen })}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        disableEscapeKeyDown={confirming}
        disableBackdropClick={confirming}
      >
        <DialogTitle id="max-width-dialog-title">
          <Grid container justify="space-between">
            <Grid>{title}</Grid>
            <Grid>
              <Button
                autoFocus
                style={{
                  color: confirming || loading ? grey[500] : red[500],
                }}
                onClick={handleClose}
                startIcon={<Icon>close</Icon>}
                disabled={confirming || loading}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          <Grid container justify="center" alignItems="center">
            <Grid lg={9} item>
              <OtpInput
                value={OTP}
                isInputNum
                onChange={handleChangeOTP}
                numInputs={7}
                separator={" "}
                inputStyle={classes.inputStyle}
                focusStyle={{ borderColor: "#1976d2" }}
                isDisabled={confirming}
              />
            </Grid>
            {/* <Grid lg={3} item>
              <div className={classes.wrapper}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  disabled={loading}
                  onClick={handleSendOTP}
                  style={{ textTransform: "none" }}
                >
                  {loading ? `${counter} s` : "Send OTP"}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          {!confirming && (
            <React.Fragment>
              <Grid lg={8} item></Grid>
              <Grid lg={4} item justify="flex-end">
                <div className={classes.wrapper}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    disabled={loading}
                    onClick={handleSendOTP}
                    style={{ textTransform: "none" }}
                  >
                    {loading ? `Resend in ${counter} s` : "Send OTP"}
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>
            </React.Fragment>
          )}
          {confirming && (
            <Grid lg={12}>
              <LinearProgress />
            </Grid>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
