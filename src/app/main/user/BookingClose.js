import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "@chakra-ui/core";
import {
  Grid,
  Typography,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
  Icon,
  Divider,
} from "@material-ui/core";
import classNames from "classnames";
import { useState } from "react";
import ContractTable from "./ContractTable";
import { blue } from "@material-ui/core/colors";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { getPreReturnPriceBooking } from "./profile.action";
import { fetchAgreementList } from "../chat/chat.action";
import { CRITERIA_NAME } from "../../../constant";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.primary[800],
    color: theme.palette.getContrastText(theme.palette.primary[800]),
  },
  info: {
    paddingRight: theme.spacing(5),
  },
  button: {
    margin: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "12%",
    marginTop: -14,
    marginLeft: 420,
  },
  buttonConfirm: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "12%",
    marginTop: -11,
    marginLeft: 12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  agreement: {
    marginTop: theme.spacing(2),
  },
  totalPrice: {
    marginTop: theme.spacing(1),
  },
}));

export default function BookingClose({ booking, openClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const preReturnPrice = useSelector((state) => state.profile.preReturnPrice);
  // const limitAgreement =
  //   preReturnPrice.agreements &&
  //   preReturnPrice.agreements.find(
  //     (item) => item.criteria.name === CRITERIA_NAME.MILEAGE_LIMIT
  //   );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingBill, setLoadingBill] = useState(false);
  const [totalBill, openTotalBill] = useState(false);
  const [odemeter, setOdemeter] = useState(0);
  const [checkboxValue, setCheckboxValue] = useState({
    carDamage: false,
    overdue: false,
    violate: false,
  });
  console.log(booking.id);
  const handleChangeCheckbox = (event) => {
    setCheckboxValue({
      ...checkboxValue,
      [event.target.name]: event.target.checked,
    });
  };
  const handleExceedLimit = () => {
    setLoading(true);
    console.log(odemeter);
    dispatch(getPreReturnPriceBooking(booking.id, odemeter));
    setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 3000);
  };
  const handleChangeOdemeter = (event) => {
    setOdemeter(event.target.value);
  };
  const handleConfirmTotalPrice = () => {
    setLoadingBill(true);
    setTimeout(() => {
      setLoadingBill(false);
      openTotalBill(true);
    }, 3000);
  };

  return (
    <Grid container>
      <Grid item container lg={6} className={classes.info}>
        {totalBill ? (
          <Grid item lg={12}>
            <div className="w-full">
              <Card raised square>
                <div className={classNames(classes.cardHeader, "px-24 py-16")}>
                  <Typography variant="subtitle1" color="inherit">
                    Booking Billing
                  </Typography>
                </div>
                <CardContent className="p-32">
                  <Grid item lg={12}>
                    <Grid container justify="space-between">
                      <Typography
                        variant="subtitle1"
                        color="initial"
                        align="right"
                        display="initial"
                      >
                        $ Deposit :
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        align="left"
                      >
                        <NumberFormat
                          value={preReturnPrice.deposit}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" đ"}
                        />
                      </Typography>
                    </Grid>
                    <Grid container justify="space-between">
                      <Typography
                        variant="subtitle1"
                        color="initial"
                        align="right"
                        display="initial"
                      >
                        - Rental price
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        align="left"
                      >
                        <NumberFormat
                          value={booking.rentalPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" đ"}
                        />
                      </Typography>
                    </Grid>
                    <Grid container justify="space-between">
                      <Typography
                        variant="subtitle1"
                        color="initial"
                        align="right"
                        display="initial"
                      >
                        + Insurance price
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        align="left"
                      >
                        <NumberFormat
                          value={preReturnPrice.insurance}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" đ"}
                        />
                      </Typography>
                    </Grid>
                    <Grid container justify="space-between">
                      <Typography
                        variant="subtitle1"
                        color="initial"
                        align="right"
                        display="initial"
                      >
                        - Extra mileage price
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        align="left"
                      >
                        <NumberFormat
                          value={preReturnPrice.extra}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" đ"}
                        />
                      </Typography>
                    </Grid>
                    <Divider
                      orientation="horizontal"
                      light="true"
                      className={classes.totalPrice}
                    />
                    <Grid
                      container
                      justify="space-between"
                      className={classes.totalPrice}
                    >
                      <Typography
                        variant="subtitle1"
                        color="initial"
                        align="right"
                        display="initial"
                      >
                        $ Total price :
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        align="left"
                      >
                        <NumberFormat
                          value={preReturnPrice.totalPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" đ"}
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          </Grid>
        ) : (
          <Grid item lg={12}>
            <Grid item lg={12}>
              <div className="w-full">
                <Card raised square>
                  <div
                    className={classNames(classes.cardHeader, "px-24 py-16")}
                  >
                    <Typography variant="subtitle1" color="inherit">
                      Car Status
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
                      {checkboxValue.carDamage ? (
                        <FormControl
                          fullWidth
                          className={classes.margin}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Amount
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            //   value={values.amount}
                            //   onChange={handleChange("amount")}
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                            labelWidth={60}
                          />
                        </FormControl>
                      ) : null}
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
                      {checkboxValue.overdue ? (
                        <FormControl
                          fullWidth
                          className={classes.margin}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Amount
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            //   value={values.amount}
                            //   onChange={handleChange("amount")}
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                            labelWidth={60}
                          />
                        </FormControl>
                      ) : null}
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
                      {checkboxValue.violate ? (
                        <FormControl
                          fullWidth
                          className={classes.margin}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Amount
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            //   value={values.amount}
                            //   onChange={handleChange("amount")}
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                            labelWidth={60}
                          />
                        </FormControl>
                      ) : null}
                    </FormGroup>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item lg={12} className={classes.agreement}>
              <div className="w-full">
                <Card raised square>
                  <div
                    className={classNames(classes.cardHeader, "px-24 py-16")}
                  >
                    <Typography variant="subtitle1" color="inherit">
                      Mileage limit
                    </Typography>
                  </div>
                  {open ? (
                    <CardContent className="p-32">
                      <Grid item container>
                        <Grid item container lg={12} justify="flex-start">
                          <Grid item lg={6}>
                            <Typography
                              variant="subtitle1"
                              color="primary"
                              className={classes.button}
                            >
                              Detail
                            </Typography>
                          </Grid>
                          <Grid item lg={6}>
                            <Grid container justify="space-between">
                              <Typography
                                variant="subtitle1"
                                color="initial"
                                align="right"
                                display="initial"
                              >
                                Total km
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                align="left"
                              >
                                {odemeter}
                              </Typography>
                            </Grid>
                            <Grid container justify="space-between">
                              <Typography
                                variant="subtitle1"
                                color="initial"
                                align="right"
                                display="initial"
                              >
                                - Mileage agreement
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                align="left"
                              >
                                {preReturnPrice.agreements &&
                                  preReturnPrice.agreements.filter(
                                    (item) =>
                                      item.criteria.name ===
                                      CRITERIA_NAME.MILEAGE_LIMIT
                                  )}
                              </Typography>
                            </Grid>
                            <Divider orientation="horizontal" light="true" />
                            <Grid container justify="space-between">
                              <Typography
                                variant="subtitle1"
                                color="initial"
                                align="right"
                                display="initial"
                              >
                                Extra Mileage
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                align="left"
                              >
                                {preReturnPrice.mileageLimit}
                              </Typography>
                            </Grid>
                            <Grid container justify="space-between">
                              <Typography
                                variant="subtitle1"
                                color="initial"
                                align="right"
                                display="initial"
                              >
                                $ Extra fees
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                align="left"
                              >
                                <NumberFormat
                                  value="2000"
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  suffix={" đ"}
                                />
                              </Typography>
                            </Grid>
                            <Divider orientation="horizontal" light="true" />
                            <Grid container justify="space-between">
                              <Typography
                                variant="subtitle1"
                                color="initial"
                                align="right"
                                display="initial"
                              >
                                $ Total price :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                align="left"
                              >
                                <NumberFormat
                                  value={preReturnPrice.extra}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  suffix={" đ"}
                                />
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  ) : (
                    <CardContent className="p-32">
                      <Grid item container>
                        <Grid item container lg={12} justify="flex-start">
                          <Typography
                            variant="subtitle1"
                            color="textPrimary"
                            className={classes.button}
                          >
                            Car Odmeter
                          </Typography>
                          <Grid item lg={12}>
                            <div className={classes.wrapper}>
                              <FormControl
                                fullWidth
                                // className={classes.margin}
                                variant="outlined"
                              >
                                <InputLabel htmlFor="outlined-adornment-amount">
                                  Number
                                </InputLabel>
                                <OutlinedInput
                                  id="odemeter"
                                  name="odemeter"
                                  type="number"
                                  value={odemeter}
                                  onChange={handleChangeOdemeter}
                                  startAdornment={
                                    <InputAdornment position="start">
                                      Km
                                    </InputAdornment>
                                  }
                                  labelWidth={60}
                                />
                              </FormControl>
                              {loading && (
                                <CircularProgress
                                  size={35}
                                  className={classes.buttonProgress}
                                />
                              )}
                            </div>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          justify="flex-start"
                          className={classes.button}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleExceedLimit}
                          >
                            Next
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  )}
                </Card>
              </div>
            </Grid>
            <Grid
              item
              container
              justify="center"
              lg={12}
              //   className={classes.agreement}
            >
              <div className={classes.wrapper}>
                <Button
                  variant="outlined"
                  disabled={!preReturnPrice.extra}
                  startIcon={
                    <Icon style={{ color: "green" }}>attach_money</Icon>
                  }
                  style={{ textTransform: "none" }}
                  onClick={handleConfirmTotalPrice}
                >
                  Confirm
                </Button>
                {loadingBill && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonConfirm}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item lg={6}>
        <ContractTable booking={booking} />
      </Grid>
    </Grid>
  );
}
