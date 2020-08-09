import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Agreement from "./Agreement";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  createAgreement,
  submitMessage,
  deleteAllMsgByTypeFromFirebase,
  fetchAgreementList,
  closeAgreementDrawer,
  changeBookingStatusRequest,
} from "./chat.action";
import { useEffect } from "react";
import { BOOKING_STATUS } from "../../../constant";
import { useCallback } from "react";
import { Grid, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { showMessageSuccess } from "../../store/actions/fuse";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));
function getSteps() {
  return [
    "Select Extra",
    "Choose Indemnification plan",
    "Choose Deposit",
    "Commplete agreement",
  ];
}
function getStepsRenter() {
  return ["Select Mileage limit", "Select Insurance", "Commplete agreement"];
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const criteria = useSelector((state) => state.chat.criteria);
  const dispatch = useDispatch();
  const selectedBooking = useSelector((state) => state.chat.selectedBooking);
  const userLogged = useSelector((state) => state.auth.user);
  const steps =
    selectedBooking.renter.id === userLogged.id ? getStepsRenter() : getSteps();

  const useAgreements = () => useSelector((state) => state.chat.agreements);

  const agreements = useAgreements();
  useEffect(() => {
    if (
      agreements.length === steps.length - 1 &&
      selectedBooking.status === BOOKING_STATUS.CONFIRM
    ) {
      setActiveStep(steps.length);
    } else {
      setActiveStep(0);
      agreements.forEach((item) => {
        if (item.approved) {
          setActiveStep((activeStep) => activeStep + 1);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBooking.status, steps.length, agreements]);

  const isStepOptional = (step) => {
    return step === 0 || step === 1 || step === 2;
  };
  const [currentAgreement, setCurrentAgreement] = useState();
  const [open, setOpen] = useState(false);
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      dispatch(
        changeBookingStatusRequest(
          selectedBooking.id,
          selectedBooking.renter.id !== userLogged.id
            ? BOOKING_STATUS.OWNER_ACCEPTED
            : BOOKING_STATUS.CONFIRM
        )
      );
      dispatch(closeAgreementDrawer());
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      dispatch(
        createAgreement(
          criteria.find((item) => item.name === currentAgreement.type).id,
          JSON.stringify(currentAgreement.value),
          selectedBooking.id
        )
      );
      await deleteAllMsgByTypeFromFirebase(
        currentAgreement.type,
        selectedBooking.id
      );
      submitMessage(
        currentAgreement.value,
        selectedBooking,
        currentAgreement.type,
        selectedBooking.renter.id === userLogged.id
      );
    }
  };

  const getStepContentOwner = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Agreement type="Extra" onSubmit={setCurrentAgreement} />
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Agreement type="Indemnification" onSubmit={setCurrentAgreement} />
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Agreement type="Deposit" onSubmit={setCurrentAgreement} />
          </React.Fragment>
        );
      case 3:
        return <React.Fragment>You comfirm agreement</React.Fragment>;
      default:
        return "Unknown step";
    }
  };

  const getStepContentRenter = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Agreement type="Mileage limit" onSubmit={setCurrentAgreement} />
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Agreement type="Insurance" onSubmit={setCurrentAgreement} />
          </React.Fragment>
        );
      case 2:
        return <React.Fragment>You comfirm agreement</React.Fragment>;
      default:
        return "Unknown step";
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped((prevSkipped) => {
    //   const newSkipped = new Set(prevSkipped.values());
    //   newSkipped.add(activeStep);
    //   return newSkipped;
    // });
    handleNext();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Dialog open={open} scroll="body" onClose={handleClose}>
                <DialogContent>
                  <Typography variant="subtitle2" color="textPrimary">
                    If you skip this agreement, This agreement will take the
                    default value.
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                  >
                    I skip this agreement
                  </Button>
                </DialogActions>
              </Dialog>
              <Typography>
                {selectedBooking.renter.id === userLogged.id
                  ? getStepContentRenter(index)
                  : getStepContentOwner(index)}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  {isStepOptional(activeStep) &&
                    (activeStep === steps.length - 1 ? null : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpen(true)}
                        className={classes.button}
                      >
                        Skip
                      </Button>
                    ))}
                  {/* )} */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Send"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
        </Paper>
      )}
    </div>
  );
}
