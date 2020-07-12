import React from "react";
import {
  Button,
  Paper,
  Collapse,
  Box,
  Slider,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { closeAgreement, submitMessage } from "./chat.action";
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
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const userLogged = useSelector((state) => state.auth.user);
  const criterias = useSelector((state) => state.chat.criteria);
  const dispatch = useDispatch();
  const [scope, setScope] = useState(15);
  const handleChange = (event, newValue) => {
    setScope(newValue);
  };
  const handleSubmitScope = () => {
    dispatch(closeAgreement());
    submitMessage(scope, userLogged.id, selectedUser.id, "SCOPE");
  };
  const AgreementByType = () => {
    switch (agreement.type) {
      case "Mileage limit":
        return (
          <Box className="px-24 py-24">
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
              Mileage limit: You will offer{" "}
              {scope === 100 ? "unlimited" : scope + " km"} not exceeded
              destination registered.
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleSubmitScope}
            >
              Send
            </Button>
          </Box>
        );
      case "Extra":
        return (
          <Box className="px-24 py-24">
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
              Extra: You will offer{" "}
              {scope === 100 ? "unlimited" : scope + " km"} not exceeded
              destination registered.
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleSubmitScope}
            >
              Send
            </Button>
          </Box>
        );
      case "Insurance":
        return (
          <Box className="px-24 py-24">
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
              Insurance: You will offer{" "}
              {scope === 100 ? "unlimited" : scope + " km"} not exceeded
              destination registered.
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleSubmitScope}
            >
              Send
            </Button>
          </Box>
        );
      case "Deposit":
        return (
          <Box className="px-24 py-24">
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
              Deposit: You will offer{" "}
              {scope === 100 ? "unlimited" : scope + " km"} not exceeded
              destination registered.
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleSubmitScope}
            >
              Send
            </Button>
          </Box>
        );
      case "Indemnification":
        return (
          <Box className="px-24 py-24">
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
              Indemnification: You will offer{" "}
              {scope === 100 ? "unlimited" : scope + " km"} not exceeded
              destination registered.
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleSubmitScope}
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
