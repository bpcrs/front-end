import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase";
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
  FormControlLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCarDetail,
  putCarUpdate,
  updateCarStatus,
  changeImageByType,
  fetchImageList,
  postImageCar,
} from "./booking.action";
import { blue, green } from "@material-ui/core/colors";
import NumberFormat from "react-number-format";
import CarStatus from "../user/CarStatus";
import InputAdornment from "@material-ui/core/InputAdornment";
import GoogleMaps from "../landing/GoogleMaps";

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
  productImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: blue[400],
    opacity: 0,
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
  location: {
    margin: theme.spacing(1),
    width: 350,
    height: 200,
  },
  card: {
    margin: 20,
    padding: 20,
  },
  button: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
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

  const change = useSelector((state) => state.booking.change);
  const [currentCar, setCurrentCar] = useState({});
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState();

  const handleInputChange = (event) => {
    setCurrentCar({
      ...currentCar,
      [event.target.name]: event.target.value,
    });
    console.log(currentCar);
  };

  function HandleAvailable() {
    const [location, setLocation] = useState();
    const [open, setOpen] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);
    const [checkSure, setCheckSure] = useState(false);
    const selectCar = useSelector((state) => state.booking.carDetail);
    const [upCar, setUpCar] = useState(selectCar);
    const handleChangeLocation = (value) => {
      setUpCar({ ...upCar, location: value.description });
    };
    console.log(upCar);
    // console.log(location);
    const handleChangeStatus = () => {
      const nextStatus =
        carDetail.status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";
      console.log(nextStatus);
      dispatch(updateCarStatus(carDetail.id, nextStatus));
      setOpen(false);
    };
    const handleConfirmUpdate = () => {
      setCheckSure(true);
    };
    const handleUpdateLocation = () => {
      setOpenLocation(false);
      setCheckSure(false);
      dispatch(putCarUpdate(upCar.id, upCar));
    };

    // useEffect(() => {
    //   dispatch(fetchCarDetail(upCar.id));
    // }, [])
    return (
      <React.Fragment>
        {carDetail.status === "AVAILABLE" ||
        carDetail.status === "UNAVAILABLE" ? (
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

            <Button
              className={classes.updateButton}
              color="primary"
              variant="contained"
              onClick={() => setOpenLocation(true)}
            >
              Update location
            </Button>
          </Grid>
        ) : (
          <Grid></Grid>
        )}
        <Dialog open={openLocation} scroll="body">
          <Grid>
            <DialogContent>
              <Grid container item lg={12} className={classes.location}>
                <GoogleMaps
                  label="Location"
                  name="location"
                  value={
                    selectCar.location ? selectCar.location : "Ho Chi Minh City"
                  }
                  onChange={(value) => handleChangeLocation(value)}
                />
                {/* {console.log(openLocation)} */}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmUpdate}
              >
                Yes
              </Button>
              <Button
                autoFocus
                onClick={() => setOpenLocation(false)}
                color="secondary"
                variant="contained"
              >
                No
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>
        <Dialog open={checkSure} scroll="body">
          <Grid>
            <DialogContent>
              <Typography variant="subtitle1" color="initial">
                Are you sure want to change your car location from{" "}
                {carDetail.location} to {upCar.location} ?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateLocation}
              >
                Yes
              </Button>
              <Button
                autoFocus
                onClick={() => setCheckSure(false)}
                color="secondary"
                variant="contained"
              >
                No
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>
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
                  // onClick={handleChangeStatus}
                  onClick={() => setOpen(false)}
                >
                  No
                </Button>
                <Button
                  autoFocus
                  onClick={handleChangeStatus}
                  color="secondary"
                  variant="contained"
                >
                  Yes
                </Button>
              </DialogActions>
            </Grid>
          ) : null}
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
            {/* <TextField
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
            /> */}
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
              Are you want to update price of your car is {price} per day ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => setOpen(false)}
              variant="contained"
            >
              No
            </Button>
            <Button
              autoFocus
              onClick={updateCar}
              color="default"
              variant="outlined"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  const updateCar = () => {
    dispatch(putCarUpdate(currentCar.id, currentCar));
  };
  const [imagesCar, setImagesCar] = useState([]);
  const [linkImagesCar, setLinkImagesCar] = useState([]);
  const uploadImage = (event) => {
    // storeImageToFirebase(event.target.files);
    setImagesCar([...imagesCar, ...event.target.files]);
    postImg(event.target.files);
    console.log(event.target.files);
  };
  const postImg = (images) => {
    // console.log(imagesCar);
    console.log(images);
    const metadata = {
      contentType: "image/jpeg",
    };
    const date = new Date().getTime();
    Array.from(images).forEach((img) => {
      const uploadTask = firebase
        .storage()
        .ref("Img/" + date)
        .child(img.name);
      setLinkImagesCar((linkImagesCar) => [
        ...linkImagesCar,
        uploadTask.put(img, metadata).then(function (result) {
          uploadTask.getDownloadURL().then(function (url) {
            const link = [url];
            dispatch(postImageCar(link, carId, "CAR"));
          });
        }),
      ]);
    });
  };
  const handleRemoveItem = (image) => {
    console.log(imagesCar);
    setImagesCar(imagesCar.filter((item) => item.name !== image.name));
  };
  const handleRemoveImage = (image) => {
    console.log(image.id);
    // dispatch(deleteImage(image));
    dispatch(changeImageByType(image, "DELETE"));
  };
  const images = useSelector((state) => state.booking.images);

  useEffect(() => {
    const fetchCar = () => {
      dispatch(fetchCarDetail(carId));
      dispatch(fetchImageList(1, 20, carId, "CAR"));
      setCurrentCar(carDetail);
      // setPrice(carDetail.price);
      // setLocation(carDetail.location);
    };
    fetchCar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carDetail.id, carDetail.status, change]);
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
                  {/* <GoogleMaps
                    className={classes.textField}
                    label="Location"
                    name="location"
                    value={currentCar && currentCar.location}
                    onChange={(value) => setLocation(value)}
                  /> */}
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
            {images.data ? (
              <Grid container item lg={12}>
                <Grid item lg={3}>
                  <label
                    className={classes.productImageItem}
                    variant="outlined"
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      multiple
                      accept="image/*"
                      name="image"
                      id="file"
                      onChange={uploadImage}
                    />
                    <span aria-hidden="true">
                      <Icon style={{ color: "blue" }}>cloud_upload</Icon>
                    </span>
                  </label>
                </Grid>
                {images.data.map((image, index) => (
                  <Grid item lg={3}>
                    <div className={classes.productImageItem} key={index}>
                      <Icon
                        className={classes.productImageFeaturedStar}
                        onClick={() => handleRemoveImage(image)}
                      >
                        remove_circle
                      </Icon>
                      <img
                        src={image.link}
                        alt="img"
                        style={{ width: "90%", height: "90%" }}
                      />
                    </div>
                  </Grid>
                ))}
                {imagesCar &&
                  imagesCar.map((image, index) => (
                    <Grid item lg={3}>
                      <div className={classes.productImageItem} key={index}>
                        <Icon
                          className={classes.productImageFeaturedStar}
                          onClick={() => handleRemoveItem(image)}
                        >
                          remove_circle
                        </Icon>
                        <img
                          src={URL.createObjectURL(image)}
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
            {/* <Grid container item justify="center">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Update
              </Button>
            </Grid> */}
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
}
