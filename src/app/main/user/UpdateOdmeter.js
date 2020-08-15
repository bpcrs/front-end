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
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateOdometer } from "./profile.action";
import { showMessageError } from "../../store/actions/fuse";
import VerifyOTP from "./VerifyOTP";

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
}));

function getSteps() {
  return ["Update car odometer", "Verify OTP"];
}

function GetStepContent(
  stepIndex,
  booking,
  onUpdateOdometer,
  handleSignContract
) {
  const classes = useStyles();
  const [odemeter, setOdemeter] = useState(booking && booking.car.odometer);

  const handleUpdate = (event) => {
    setOdemeter(event.target.value);
    onUpdateOdometer(event.target.value);
  };

  switch (stepIndex) {
    case 0:
      return (
        <Grid className={classes.wrapper}>
          <FormControl
            fullWidth
            // className={classes.margin}
            variant="outlined"
          >
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
              helperText={"Current Odometer must be bigger than old odometer"}
            />
          </FormControl>
        </Grid>
      );
    case 1:
      return (
        <VerifyOTP
          callBack={(value) => handleSignContract(value)}
          content=" Please verify you phone before renting or register new car"
          title="Verify Phone number"
        ></VerifyOTP>
      );
    default:
      return "Unknown stepIndex";
  }
}

export default function UpdateOdmeter({
  children,
  handleSignContract,
  title,
  content,
  booking,
  currentUser,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(
    booking && booking.car.owner.email === currentUser.email ? 0 : 1
  );
  const steps = getSteps();
  const [open, setOpen] = useState(false);
  // const [updateSuccess, setUpdateSuccess]
  const [odometer, onUpdateOdometer] = useState();

  const handleNext = () => {
    if (activeStep === 0) {
      updateOdometer(booking.car.id, odometer, ({ success, message }) => {
        if (success) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          dispatch(showMessageError(message));
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
                    handleSignContract
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
