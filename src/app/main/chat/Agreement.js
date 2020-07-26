import React from "react";
import {
  Button,
  Paper,
  Collapse,
  Box,
  Slider,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  Radio,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { closeAgreement, submitMessage } from "./chat.action";
import { withStyles } from "@material-ui/styles";
import { useState } from "react";
import { FuseAnimateGroup } from "@fuse";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { truncate } from "lodash";
import { useEffect } from "react";

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
const useStyles = makeStyles((theme) => ({
  header: {
    height: 600,
    background:
      "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    color: theme.palette.primary.contrastText,
  },
  cardHeader: {
    backgroundColor: theme.palette.primary[800],
    color: theme.palette.getContrastText(theme.palette.primary[800]),
  },
}));
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
export default function Agreement({ type, onSubmit = () => {} }) {
  const agreement = useSelector((state) => state.chat.agreement);
  const [selectedValue, setSelectedValue] = React.useState("basic");

  // const criterias = useSelector((state) => state.chat.criteria);
  const dispatch = useDispatch();
  const [scope, setScope] = useState(15);
  const [extra, setExtra] = useState(2000);
  const handleChange = (event, newValue) => {
    setScope(newValue);
    setSelectedValue(newValue);
  };
  const handleExtra = (event, newValue) => {
    setExtra(newValue);
    setSelectedValue(newValue);
  };
  useEffect(() => {
    function setAgreementValue() {
      onSubmit({ type, value: selectedValue });
    }
    setAgreementValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, scope]);
  const handleSubmitScope = (type) => {
    dispatch(closeAgreement());
  };
  const classes = useStyles();
  const AgreementByType = () => {
    switch (type) {
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
              step={50}
              min={100}
              max={500}
              valueLabelFormat={(value) => (value === 15 ? "Unlimited" : value)}
            />
            <Typography variant="subtitle1" color="primary">
              Mileage limit: You will offer{" "}
              {scope === 15 ? 100 + " km" : scope + " km"} not exceeded
              destination registered.
            </Typography>
          </Box>
        );
      case "Extra":
        return (
          <Box className="px-24 py-24">
            <PrettoSlider
              valueLabelDisplay="on"
              aria-labelledby="continuous-slider"
              value={extra}
              marks={true}
              onChange={handleExtra}
              onDragStop={(e) => console.log(e)}
              step={1000}
              min={2000}
              max={15000}
              valueLabelFormat={(value) => value}
            />
            <Typography variant="subtitle2" color="inherit">
              You will be charged {extra + " đ"} for every km you travel above.
              If required, please select a higher limit. All fuel bills will be
              reimbursed on a fair usage basis.
            </Typography>
          </Box>
        );
      case "Insurance":
        return (
          <Box>
            <Grid container spacing={1}>
              <Grid lg={6} item>
                <div className="w-full">
                  <Card raised square>
                    <div
                      className={classNames(classes.cardHeader, "px-24 py-16")}
                    >
                      <Typography variant="subtitle1" color="inherit">
                        Basic Protection
                      </Typography>
                      <Typography variant="caption" color="inherit">
                        Save 15%
                      </Typography>
                    </div>

                    <CardContent className="p-32">
                      <div className="flex justify-center">
                        <Typography variant="h6" color="textSecondary">
                          +200.000VND
                        </Typography>
                      </div>

                      <Divider className="my-32" />

                      <div className="flex flex-col">
                        <Typography variant="subtitle1" className="">
                          <span className="font-bold mr-4">10</span>
                          Projects
                        </Typography>
                        <Typography variant="subtitle1" className="">
                          <span className="font-bold mr-4">10</span>
                          Pages
                        </Typography>
                        <Typography variant="subtitle1" className="">
                          <span className="font-bold mr-4">100</span>
                          Mb Disk Space
                        </Typography>
                      </div>
                    </CardContent>

                    <div className="flex justify-center pb-32">
                      <GreenRadio
                        checked={selectedValue === "basic"}
                        onChange={() => setSelectedValue("basic")}
                        value="basic"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "basic" }}
                      />
                    </div>
                  </Card>
                </div>
              </Grid>
              <Grid lg={6} item>
                <div className="w-full">
                  <Card square raised>
                    <div
                      className={classNames(classes.cardHeader, "px-24 py-16")}
                    >
                      <Typography variant="subtitle1" color="inherit">
                        Super Protection
                      </Typography>
                      <Typography variant="caption" color="inherit">
                        Save 20%
                      </Typography>
                    </div>

                    <CardContent className="p-32">
                      <div className="flex justify-center">
                        <Typography variant="h6" color="textSecondary">
                          +300.000VND
                        </Typography>
                      </div>

                      <Divider className="my-32" />

                      <div className="flex flex-col">
                        <Typography variant="subtitle1" className="">
                          <span className="font-bold mr-4">10</span>
                          Projects
                        </Typography>
                        <Typography variant="subtitle1" className="">
                          <span className="font-bold mr-4">10</span>
                          Pages
                        </Typography>
                        <Typography variant="subtitle1" className="">
                          <span className="font-bold mr-4">100</span>
                          Mb Disk Space
                        </Typography>
                      </div>
                    </CardContent>

                    <div className="flex justify-center pb-32">
                      <GreenRadio
                        checked={selectedValue === "super"}
                        onChange={() => setSelectedValue("super")}
                        value="super"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "super" }}
                      />
                    </div>
                  </Card>
                </div>
              </Grid>
            </Grid>
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
              onClick={() => handleSubmitScope("Deposit")}
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
              onClick={() => handleSubmitScope("Indemnification")}
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
    <Collapse in={true}>
      {/* <Paper elevation={5}>
        <Typography>Decide your offer</Typography> */}
      <AgreementByType />
      {/* <Button
          variant="outlined"
          color="default"
          onClick={() => dispatch(closeAgreement())}
        >
          Close
        </Button>
      </Paper> */}
    </Collapse>
  );
}
