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
import { blue, green } from "@material-ui/core/colors";
import { Grid, CircularProgress, Chip, Icon } from "@material-ui/core";

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
}));

export default function VerifyOTP({ component }) {
  const [open, setOpen] = useState(false);
  const [OTP, setOTP] = useState();
  const [loading, setLoading] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [counter, setCounter] = useState(60);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSendOTP = () => {
    setCounter(60);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 60000);
    setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
  };

  const handleChangeOTP = (value) => {
    setOTP(value);
    if (value.toString().length === 6) {
      console.log("OK");
    }
  };
  return (
    <React.Fragment>
      <Chip
        icon={<Icon style={{ color: green[600] }}>check_circle</Icon>}
        label="Verified Member"
        style={{ color: green[600], backgroundColor: green[50] }}
        onClick={handleClickOpen}
      />
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Verify your number phone
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please verify you phone before renting or register new car
          </DialogContentText>
          <Grid container justify="space-between" alignItems="center">
            <Grid lg={9} item>
              <OtpInput
                value={OTP}
                isInputNum
                onChange={handleChangeOTP}
                numInputs={6}
                separator={" "}
                inputStyle={classes.inputStyle}
                focusStyle={{ borderColor: "#1976d2" }}
                shouldAutoFocus
                isDisabled={loading}
              />
            </Grid>
            <Grid lg={3} item>
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
