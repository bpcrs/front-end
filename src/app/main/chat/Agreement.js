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
  Icon,
  Tooltip,
  InputAdornment,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { useEffect } from "react";
import { CRITERIA_NAME } from "../../../constant";

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
    carDamage: true,
    overdue: true,
    violate: true,
  });
  const [insurance, setInsurance] = useState({
    value: 200000,
    type: "basic",
  });
  // const criterias = useSelector((state) => state.chat.criteria);
  const [scope, setScope] = useState(15);
  const [limit, setLimit] = useState(100);
  const [extra, setExtra] = useState(2000);
  const handleLimit = (event, newValue) => {
    setLimit(newValue);
  };
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
      case CRITERIA_NAME.MILEAGE_LIMIT:
        onSubmit({ type, value: limit });
        break;
      case CRITERIA_NAME.INSURANCE:
        onSubmit({ type, value: insurance });
        break;
      case CRITERIA_NAME.EXTRA:
        onSubmit({ type, value: extra });
        break;
      case CRITERIA_NAME.INDEMNTIFICATION:
        onSubmit({ type, value: checkboxValue });
        break;
      case CRITERIA_NAME.DEPOSIT:
        onSubmit({ type, value: scope });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, selectedValue, scope, checkboxValue, insurance]);

  const handleChangeCheckbox = (event) => {
    setCheckboxValue({
      ...checkboxValue,
      [event.target.name]: event.target.checked,
    });
  };
  const classes = useStyles();
  const AgreementByType = () => {
    switch (type) {
      case CRITERIA_NAME.MILEAGE_LIMIT:
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
                        value={limit}
                        marks={true}
                        onChange={handleLimit}
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
                        {limit === 15 ? 100 + " km" : limit + " km"} not
                        exceeded destination registered.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </Box>
        );
      case CRITERIA_NAME.EXTRA:
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
      case CRITERIA_NAME.INSURANCE:
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
                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Collision Damage Waiver (CDW)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                During the rental period, CDW covers physical
                                damage that the car might suffer in the event of
                                an accident. However, it usually comes with some
                                exclusion – for example, it might not cover
                                damage to windscreens, tires, undercarriage,
                                replacement locks, replacement keys, and towing
                                charges.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>
                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Loss Damage Waiver (LDW)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                Coverage for both CDW and LDW are similar – both
                                waive your financial responsibility for any
                                damage that the rental car might incur.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>
                        <Grid item container justify="space-between">
                          <Typography
                            variant="subtitle1"
                            style={{ color: "white" }}
                          >
                            .
                          </Typography>
                        </Grid>
                        <Grid item container justify="space-between">
                          <Typography
                            variant="subtitle1"
                            style={{ color: "white" }}
                          >
                            .
                          </Typography>
                        </Grid>
                      </div>
                    </CardContent>

                    <div className="flex justify-center pb-32">
                      <GreenRadio
                        checked={insurance.type === "basic"}
                        onChange={() =>
                          setInsurance({ type: "basic", value: 200000 })
                        }
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
                        Save 30%
                      </Typography>
                    </div>

                    <CardContent className="p-32">
                      <div className="flex justify-center">
                        <Typography variant="h6" color="textSecondary">
                          +400.000VND
                        </Typography>
                      </div>

                      <Divider className="my-32" />

                      <div className="flex flex-col">
                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Collision Damage Waiver (CDW)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                During the rental period, CDW covers physical
                                damage that the car might suffer in the event of
                                an accident. However, it usually comes with some
                                exclusion – for example, it might not cover
                                damage to windscreens, tires, undercarriage,
                                replacement locks, replacement keys, and towing
                                charges.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>
                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Loss Damage Waiver (LDW)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                Coverage for both CDW and LDW are similar – both
                                waive your financial responsibility for any
                                damage that the rental car might incur.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>

                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Theft Protection (TP)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                TP covers part of the cost for replacing the
                                hire car if it’s stolen or damaged as a result
                                of attempted theft, while you have it. However,
                                TP coverage excludes items inside the car, such
                                as your luggage, phone or GPS.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>
                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Third–Party Liability (TPL)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                TPL covers the third party’s bodily injuries,
                                death, and damage to property. In most
                                countries, either you, the driver, or your
                                rental company are legally required to purchase
                                Third-Party liability coverage before renting a
                                car, thus TPL is most likely already included in
                                your rental package.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>
                      </div>
                    </CardContent>

                    <div className="flex justify-center pb-32">
                      <GreenRadio
                        checked={insurance.type === "super"}
                        onChange={() =>
                          setInsurance({ type: "super", value: 400000 })
                        }
                        value="super"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "super" }}
                      />
                    </div>
                    {console.log(insurance)}
                  </Card>
                </div>
              </Grid>
            </Grid>
          </Box>
        );
      case CRITERIA_NAME.DEPOSIT:
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
                        Deposit
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
      case CRITERIA_NAME.INDEMNTIFICATION:
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
