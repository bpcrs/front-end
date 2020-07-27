import React from "react";
import {
  Box,
  Slider,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  Radio,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { closeAgreement } from "./chat.action";
import { withStyles } from "@material-ui/styles";
import { useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
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
  const [selectedValue, setSelectedValue] = React.useState("basic");
  const [checkboxValue, setCheckboxValue] = useState({
    carDamage: false,
    overdue: false,
    violate: false,
  });

  // const criterias = useSelector((state) => state.chat.criteria);
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
    switch (type) {
      case "Insurance":
      case "Mileage limit":
      case "Extra":
        onSubmit({ type, value: selectedValue });
        break;
      case "Indemnification":
        onSubmit({ type, value: checkboxValue });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, scope, checkboxValue]);

  const handleChangeCheckbox = (event) => {
    setCheckboxValue({
      ...checkboxValue,
      [event.target.name]: event.target.checked,
    });
  };
  const classes = useStyles();
  const AgreementByType = () => {
    switch (type) {
      case "Mileage limit":
        return (
          <Box>
            <Grid container spacing={1}>
              <Grid lg={12} item>
                <div className="w-full">
                  <Card raised square>
                    <div
                      className={classNames(classes.cardHeader, "px-24 py-16")}
                    >
                      <Typography variant="subtitle1" color="inherit">
                        Mileage Limit
                      </Typography>
                    </div>

                    <CardContent className="p-32">
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
                        valueLabelFormat={(value) =>
                          value === 15 ? "Unlimited" : value
                        }
                      />
                      <Typography variant="subtitle1" color="primary">
                        Mileage limit: You will offer{" "}
                        {scope === 15 ? 100 + " km" : scope + " km"} not
                        exceeded destination registered.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </Box>
        );
      case "Extra":
        return (
          <Box>
            <Grid container spacing={1}>
              <Grid lg={12} item>
                <div className="w-full">
                  <Card raised square>
                    <div
                      className={classNames(classes.cardHeader, "px-24 py-16")}
                    >
                      <Typography variant="subtitle1" color="inherit">
                        Extra Charge Cost
                      </Typography>
                    </div>

                    <CardContent className="p-32">
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
                        You will be charged {extra + " đ"} for every km you
                        travel above. If required, please select a higher limit.
                        All fuel bills will be reimbursed on a fair usage basis.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
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
          <Box>
            <Grid container spacing={1}>
              <Grid lg={12} item>
                <div className="w-full">
                  <Card raised square>
                    <div
                      className={classNames(classes.cardHeader, "px-24 py-16")}
                    >
                      <Typography variant="subtitle1" color="inherit">
                        Deposit Checklist
                      </Typography>
                    </div>

                    <CardContent className="p-32">
                      <PrettoSlider
                        valueLabelDisplay="on"
                        aria-labelledby="continuous-slider"
                        value={scope}
                        marks={true}
                        onChange={handleChange}
                        onDragStop={(e) => console.log(e)}
                        step={1}
                        min={10}
                        max={30}
                        valueLabelFormat={(value) => value}
                      />
                      <Typography variant="subtitle1" color="primary">
                        Deposit: You will offer price {scope + " days"} rent for
                        rental this car.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </Box>
        );
      case "Indemnification":
        return (
          <Box>
            <Grid container spacing={1}>
              <Grid lg={12} item>
                <div className="w-full">
                  <Card raised square>
                    <div
                      className={classNames(classes.cardHeader, "px-24 py-16")}
                    >
                      <Typography variant="subtitle1" color="inherit">
                        Indemnification Checklist
                      </Typography>
                    </div>

                    <CardContent className="p-32">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkboxValue.carDamage}
                              onChange={handleChangeCheckbox}
                              name="carDamage"
                            />
                          }
                          label="Car damage"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkboxValue.overdue}
                              onChange={handleChangeCheckbox}
                              name="overdue"
                            />
                          }
                          label="Overdue return time"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkboxValue.violate}
                              onChange={handleChangeCheckbox}
                              name="violate"
                            />
                          }
                          label="Violate transport"
                        />
                      </FormGroup>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return <Box>Error</Box>;
    }
  };

  return <AgreementByType />;
}
