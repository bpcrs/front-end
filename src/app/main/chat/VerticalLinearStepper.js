import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ViewBooking from "../booking/ViewBooking";
import Agreement from "./Agreement";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  createAgreement,
  submitMessage,
  deleteAllMsgByTypeFromFirebase,
} from "./chat.action";
import { useEffect } from "react";

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
    "Select Insurance",
    "Choose Indemnification plan",
    "Commit your side",
  ];
}
function getStepsRenter() {
  return [
    "Select Mileage limit",
    "Select Extra",
    "Choose Deposit",
    "Commit your side",
  ];
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const criteria = useSelector((state) => state.chat.criteria);
  const dispatch = useDispatch();
  const selectedBooking = useSelector((state) => state.chat.selectedBooking);
  const userLogged = useSelector((state) => state.auth.user);
  const agreements = useSelector((state) => state.chat.agreements);
  const steps =
    selectedBooking.renter.id === userLogged.id ? getStepsRenter() : getSteps();

  useEffect(() => {
    agreements.forEach((item) => {
      if (item.approved) {
        setActiveStep((activeStep) => activeStep + 1);
      }
    });
  }, [agreements]);

  const isStepOptional = (step) => {
    return step === 0 || step === 1;
  };
  const [currentAgreement, setCurrentAgreement] = useState();
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = async () => {
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
        currentAgreement.value,
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
  };

  const getStepContentOwner = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Agreement type="Insurance" onSubmit={setCurrentAgreement} />
            {/* <Typography>
              `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and
              more.`
            </Typography> */}
          </React.Fragment>
        );
      case 1:
        return "An ad group contains one or more ads which target a shared set of keywords.";
      case 2:
        return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
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
            <Agreement type="Extra" onSubmit={setCurrentAgreement} />
          </React.Fragment>
        );
      case 2:
        return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
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

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>
                {selectedBooking.renter.id === userLogged.id
                  ? getStepContentRenter(index)
                  : getStepContentOwner(index)}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  {/* <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button> */}
                  {isStepOptional(activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSkip}
                      className={classes.button}
                    >
                      Skip
                    </Button>
                  )}
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
          {/* <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button> */}
        </Paper>
      )}
      {/* <ViewBooking /> */}
    </div>
  );
}
