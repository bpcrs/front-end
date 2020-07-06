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
    marginLeft: "8px",
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
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  valueLabel: {
    left: "calc(-50%)",
    top: 22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  mark: {
    backgroundColor: "#f1f1f1",
    height: 8,
    width: 1,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
})(Slider);
export default function Agreement() {
  const agreement = useSelector((state) => state.chat.agreement);
  const dispatch = useDispatch();
  const [scope, setScope] = useState(15);
  const handleChange = (event, newValue) => {
    setScope(newValue);
  };
  const AgreementByType = () => {
    switch (agreement.type) {
      case "SCOPE":
        return (
          <Box className="px-4 py-4 w-3/4">
            <PrettoSlider
              valueLabelDisplay="on"
              aria-labelledby="continuous-slider"
              value={scope}
              marks={true}
              onChange={handleChange}
              onDragStop={(e) => console.log(e)}
              step={5}
              min={15}
              valueLabelFormat={(value) =>
                value === 100 ? "Unlimited" : value
              }
            />
            <Typography>
              You will offer {scope === 100 ? "unlimited" : scope + " km"} not
              exceeded destination registered.
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
        <Typography>Decide your offer</Typography>
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
