import React from "react";
import {
  Slide,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Paper,
  Collapse,
  Box,
  Slider,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { closeAgreement } from "./chat.action";
import { withStyles } from "@material-ui/styles";
import { useState } from "react";
const PrettoSlider = withStyles({
  root: {
    height: 6,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
export default function Agreement() {
  const agreement = useSelector((state) => state.chat.agreement);
  const dispatch = useDispatch();
  const [scope, setScope] = useState(20);
  const AgreementByType = () => {
    switch (agreement.type) {
      case "SCOPE":
        return (
          <Box className="px-4 py-4">
            <PrettoSlider
              valueLabelDisplay="on"
              aria-label="pretto slider"
              defaultValue={20}
              onChange={(e, newValue) => {
                setScope(newValue);
              }}
            />
            <Typography>
              You offer 60 km not exceeded destination registered.
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => dispatch(closeAgreement())}
            >
              Send
            </Button>
          </Box>
        );
      default:
        return <Box>Error</Box>;
    }
  };

  return (
    <Collapse in={agreement.isOpen}>
      <Paper elevation={5}>
        <AgreementByType />
        <Button
          variant="outlined"
          color="default"
          onClick={() => dispatch(closeAgreement())}
        >
          Close
        </Button>
      </Paper>
    </Collapse>
  );
}
