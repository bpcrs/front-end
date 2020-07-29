import React, { useState, useEffect } from "react";
import {
  FormControl,
  Button,
  TextField,
  Card,
  Grid,
  makeStyles,
  Switch,
  Typography,
  IconButton,
  Icon,
  CardMedia,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Tabs,
  Tab,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCarDetail,
  putCarUpdate,
  fetchImageList,
  updateCarStatus,
} from "./booking.action";
import NumberFormat from "react-number-format";
import CarStatus from "../user/CarStatus";
import InputAdornment from "@material-ui/core/InputAdornment";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
  media: {
    height: 240,
    width: "50%",
  },
  imageUploading: {
    height: 100,
  },
  icon: {
    height: "1.5em",
    width: 50,
    marginRight: 10,
  },
  formControl: {
    width: "100%",
    maxHeight: ITEM_HEIGHT * 4.5,
  },
  status: {
    margin: theme.spacing(1),
  },
  updateButton: {
    marginTop: theme.spacing(3),
  },
  smallText: {
    marginRight: theme.spacing(1),
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1),
  },
  card: {
    margin: 20,
    padding: 20,
  },
  switchButton: {
    marginLeft: theme.spacing(2),
  },
  productImageItem: {
    width: 128,
    height: 128,
    display: "flex",
    position: "relative",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    rounded: 4,
    mr: 16,
    mb: 16,
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      boxShadow: theme.shadows[5],
      "& $productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& $productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover $productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      // prefix="$"
      suffix=" ₫"
    />
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function CarEdits(props) {
  const maxNumber = 10;
  const maxMbFileSize = 5 * 1024 * 1024; // 5Mb
  const { carId } = props;
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  const dispatch = useDispatch();

  const classes = useStyles();

  const carDetail = useSelector((state) => state.booking.carDetail);

  const [editState, setEditState] = useState(false);

  const [currentCar, setCurrentCar] = useState({});

  const handleInputChange = (event) => {
    setCurrentCar({
      ...currentCar,
      [event.target.name]: event.target.value,
    });
  };

  function HandleAvailable() {
    const [open, setOpen] = useState(false);

    const handleChangeStatus = () => {
      const nextStatus =
        carDetail.status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";
      console.log(nextStatus);
      dispatch(updateCarStatus(carDetail.id, nextStatus));
      setOpen(false);
    };

    return (
      <React.Fragment>
        <Grid
          spacing={1}
          container
          justify="space-between"
          alignItems="baseline"
        >
          <Typography variant="subtitle2" color="inherit">
            Turn off your car
          </Typography>
          <FormControlLabel
            classes={classes.switchButton}
            control={
              <IOSSwitch
                id="staus"
                checked={carDetail.status === "AVAILABLE"}
                onChange={() => setOpen(true)}
                name="staus"
              />
            }
          />
        </Grid>
        <Dialog open={open} scroll="body">
          {carDetail.status === "AVAILABLE" ||
          carDetail.status === "UNAVAILABLE" ? (
            <Grid>
              <DialogContent>
                <Grid container justify="center"></Grid>
                <Typography variant="subtitle1" color="initial">
                  Are you sure to{" "}
                  {carDetail.status === "AVAILABLE" ? "turn off" : "turn on"}{" "}
                  your car?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleChangeStatus}
                >
                  Yes
                </Button>
                <Button
                  autoFocus
                  onClick={() => setOpen(false)}
                  color="secondary"
                  variant="contained"
                >
                  No
                </Button>
              </DialogActions>
            </Grid>
          ) : (
            <Grid>
              <DialogContent>
                <Grid container justify="center"></Grid>
                <Typography variant="subtitle1" color="initial">
                  Can not turn on/off when car is {carDetail.status}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => setOpen(false)}
                  color="primary"
                  variant="contained"
                >
                  Ok
                </Button>
              </DialogActions>
            </Grid>
          )}
        </Dialog>
      </React.Fragment>
    );
  }

  function HandlePrice() {
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <Grid container justify="space-between" alignItems="baseline">
          <Grid item lg={5}>
            <TextField
              // className={classes.textField}
              variant="outlined"
              label="Price (per day)"
              value={currentCar.price}
              onChange={handleInputChange}
              name="price"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
          </Grid>
          <Grid item>
            <Button
              className={classes.updateButton}
              color="primary"
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Update
            </Button>
          </Grid>
        </Grid>
        <Dialog open={open} scroll="body">
          <DialogContent>
            <Grid container justify="center"></Grid>
            <Typography variant="subtitle1" color="initial">
              Are you want to update price of your car is {currentCar.price} per
              day ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={updateCar}>
              Yes
            </Button>
            <Button
              autoFocus
              onClick={() => setOpen(false)}
              color="secondary"
              variant="outlined"
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  const updateCar = () => {
    dispatch(putCarUpdate(currentCar.id, currentCar));
  };

  useEffect(() => {
    const fetchCar = () => {
      dispatch(fetchCarDetail(carId));
      setCurrentCar(carDetail);
    };
    fetchCar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carDetail.id, carDetail.status]);

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  return (
    <Grid>
      <Grid spacing={1} container justify="center" alignItems="center">
        <Typography variant="h6" color="initial" className={classes.head}>
          Car Information
        </Typography>
        {
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: "w-full h-64" }}
          >
            <Tab
              className="h-64 normal-case"
              label="Car Information"
              {...a11yProps(0)}
            />
            <Tab
              className="h-64 normal-case"
              label="Car's Images"
              {...a11yProps(1)}
            />
            <Tab
              className="h-64 normal-case"
              label="Licenses"
              {...a11yProps(2)}
            />
          </Tabs>
        }
        <Grid>
          <TabPanel value={tabValue} index={0}>
            <Grid>
              <Grid container>
                <Grid item xs={12} lg={12}>
                  <Grid container className={classes.status}>
                    <Typography className={classes.smallText}>
                      Car Status:
                    </Typography>
                    <CarStatus
                      name={carDetail.status ? carDetail.status : "AVAILABLE"}
                    />
                    <HandleAvailable />
                    <HandlePrice />
                  </Grid>

                  <TextField
                    className={classes.textField}
                    id="brand"
                    value={currentCar.brand ? currentCar.brand.name : ""}
                    label="Brand"
                    name="brand"
                    variant="outlined"
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            className={classes.icon}
                            src={
                              currentCar.brand
                                ? currentCar.brand.logoLink
                                : "https://static.carmudi.vn/wp-content/uploads/2016/04/Honda-Carmudi.jpg"
                            }
                            alt=""
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    className={classes.textField}
                    id="model"
                    value={currentCar.model ? currentCar.model.name : ""}
                    label="Model"
                    name="model"
                    variant="outlined"
                    disabled
                    // onChange={handleInputChange}
                  />
                  <TextField
                    className={classes.textField}
                    id="name"
                    value={currentCar.name ? currentCar.name : ""}
                    label="Name"
                    disabled
                    name="name"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                  <TextField
                    className={classes.textField}
                    id="year"
                    value={currentCar.year ? currentCar.year : ""}
                    label="Year"
                    disabled
                    name="year"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                  <TextField
                    className={classes.textField}
                    id="plateNum"
                    value={currentCar.plateNum ? currentCar.plateNum : ""}
                    label="Plate Number"
                    disabled
                    name="plateNum"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                  <TextField
                    className={classes.textField}
                    id="vin"
                    value={currentCar.vin ? currentCar.vin : ""}
                    label="Vin Number"
                    disabled
                    name="vin"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {currentCar.images ? (
              <Grid container item lg={12}>
                {currentCar.images.map((image, index) => (
                  <Grid item lg={3}>
                    <div className={classes.productImageItem} key={index}>
                      <img
                        src={image.link}
                        alt="img"
                        style={{ width: "90%", height: "90%" }}
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid>
                <Typography>The car dont have images</Typography>
              </Grid>
            )}
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
}
