import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useState } from "react";
import { blue } from "@material-ui/core/colors";
import {
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  updateOdometer,
  sendOTPRequest,
  signContractRequest,
} from "./profile.action";
import OtpInput from "react-otp-input";

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
  step: {
    margin: theme.spacing(1),
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
}));

function getSteps() {
  return ["Update car odometer", "Verify OTP"];
}

function GetStepContent(
  stepIndex,
  booking,
  onUpdateOdometer,
  setOpen,
  message
) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [odemeter, setOdemeter] = useState(booking && booking.car.odometer);
  const [OTP, setOTP] = useState();
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(60);
  const [confirming, setConfirming] = useState(false);

  const handleUpdate = (event) => {
    setOdemeter(event.target.value);
    onUpdateOdometer(event.target.value);
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

  const handleChangeOTP = (value) => {
    setOTP(value);
    if (value.toString().length === 7) {
      setConfirming(true);
      dispatch(signContractRequest(booking.id, value));
      setTimeout(() => {
        setConfirming(false);
        setLoading(false);
        setCounter(60);
        setOpen(false);
      }, 3000);
    }
  };

  switch (stepIndex) {
    case 0:
      return (
        <Grid className={classes.wrapper} item lg={6}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Number</InputLabel>
            <OutlinedInput
              id="odemeter"
              name="odemeter"
              type="number"
              value={odemeter}
              onChange={handleUpdate}
              startAdornment={
                <InputAdornment position="start">Km</InputAdornment>
              }
              labelWidth={60}
              error={booking && odemeter < booking.car.odometer}
            />
          </FormControl>
          {message ? (
            <Typography color="error" variant="subtitle2">
              {message}
            </Typography>
          ) : null}
        </Grid>
      );
    case 1:
      return (
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
              <Grid lg={12} className={classes.step}>
                <LinearProgress />
              </Grid>
            )}
          </Grid>
        </Grid>
      );
    default:
      return "Unknown stepIndex";
  }
}

export default function UpdateOdmeter({ children, booking, currentUser }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(
    booking && booking.car.owner.email === currentUser.email ? 0 : 1
  );
  const steps = getSteps();
  const [open, setOpen] = useState(false);
  // const [updateSuccess, setUpdateSuccess]
  const [odometer, onUpdateOdometer] = useState();
  const [message, setMessage] = useState();

  const handleNext = () => {
    if (activeStep === 0) {
      updateOdometer(booking.car.id, odometer, ({ success, message }) => {
        if (success) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          setMessage(message);
        }
      });
    } else if (activeStep === steps.length - 1) {
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onClick: handleClickOpen,
      })}
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div></div>
            ) : (
              <div>
                <Grid className={classes.step}>
                  {GetStepContent(
                    activeStep,
                    booking,
                    onUpdateOdometer,
                    setOpen,
                    message
                  )}
                </Grid>
                <div>
                  {activeStep === steps.length - 1 ? (
                    <Grid></Grid>
                  ) : (
                    <Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </Grid>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
