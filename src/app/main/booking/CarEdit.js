import React, { useState, useEffect } from "react";
import firebase from "../../firebase/firebase";
import {
  Button,
  TextField,
  Grid,
  makeStyles,
  Switch,
  Typography,
  Icon,
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
import { blue } from "@material-ui/core/colors";
import NumberFormat from "react-number-format";
import CarStatus from "../user/CarStatus";
import InputAdornment from "@material-ui/core/InputAdornment";
import GoogleMaps from "../landing/GoogleMaps";
import { CAR_STATUS } from "../../../constant";

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
    // width: "100%",
    margin: theme.spacing(1),
  },
  location: {
    margin: theme.spacing(1),
    width: 350,
    height: 400,
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
  const { carId } = props;
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  const dispatch = useDispatch();

  const classes = useStyles();

  const carDetail = useSelector((state) => state.booking.carDetail);

  const change = useSelector((state) => state.booking.change);
  const [currentCar, setCurrentCar] = useState({});

  const handleInputChange = (event) => {
    setCurrentCar({
      ...currentCar,
      [event.target.name]: event.target.value,
    });
    console.log(currentCar);
  };

  function HandleAvailable() {
    const [open, setOpen] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);
    const [checkSure, setCheckSure] = useState(false);
    const selectCar = useSelector((state) => state.booking.carDetail);
    const [upCar, setUpCar] = useState(selectCar);
    const handleChangeLocation = (value) => {
      setUpCar({ ...upCar, location: value.description });
    };
    console.log(upCar);
    const handleChangeStatus = () => {
      if (carDetail.status === CAR_STATUS.AVAILABLE) {
        dispatch(updateCarStatus(carDetail.id, CAR_STATUS.UNAVAILABLE));
      } else {
        setUpCar({ ...upCar, status: CAR_STATUS.AVAILABLE });
        setOpenLocation(true);
      }
      setOpen(false);
    };
    const handleConfirmUpdate = () => {
      dispatch(putCarUpdate(upCar.id, upCar));
      setOpenLocation(false);
    };

    return (
      <React.Fragment>
        {carDetail.status === CAR_STATUS.AVAILABLE ||
          carDetail.status === CAR_STATUS.UNAVAILABLE ||
          carDetail.status === CAR_STATUS.REQUEST ? (
            <Grid
              spacing={1}
              container
              justify="space-between"
              alignItems="baseline"
            >
              <Grid item lg={6}>
                <Typography variant="subtitle1" color="inherit">
                  Available for Rental
              </Typography>
                <Typography variant="subtitle2" color="primary">
                  The car will appear in search
              </Typography>
              </Grid>

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
          ) : (
            <Grid></Grid>
          )}
        <Dialog open={openLocation} scroll="body">
          <Grid>
            <DialogContent>
              <Typography variant="subtitle1" color="primary">
                Please update current location of your car before available for
                rental
              </Typography>
              <Grid container item lg={12} className={classes.location}>
                <GoogleMaps
                  label="Location"
                  name="location"
                  value={
                    selectCar.location ? selectCar.location : "Ho Chi Minh City"
                  }
                  onChange={(value) => handleChangeLocation(value)}
                />
                <img
                  src="assets/images/location.jpg"
                  alt="Location"
                  width="400px"
                  height="250px"
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => setOpenLocation(false)}
                style={{ backgroundColor: "red", color: "white" }}
                variant="contained"
              >
                No
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmUpdate}
              >
                Yes
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
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => setOpen(false)}
                  >
                    No
                </Button>
                  <Button
                    autoFocus
                    onClick={handleChangeStatus}
                    color="primary"
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

  const updateCar = () => {
    setOpen(false);
    dispatch(putCarUpdate(currentCar.id, currentCar));
  };
  const [imagesCar, setImagesCar] = useState([]);
  const [imagesLicense, setImageLicense] = useState([]);
  const [, setLinkImagesCar] = useState([]);
  const uploadImage = (event) => {
    // storeImageToFirebase(event.target.files);
    setImagesCar([...imagesCar, ...event.target.files]);
    // if (event.target.files && event.target.files.length >= 2 && event.target.files.length <= 5) {
    //   postImg(event.target.files);
    //   dispatch(updateCarStatus(carDetail.id, CAR_STATUS.REGISTER));
    // } else {

    // }

  };
  const uploadImageLicense = (event) => {
    setImageLicense([...imagesLicense, ...event.target.files]);
    // if (event.target.files.length >= 2 && event.target.files.length <= 5) {
    //   postImgLicense(event.target.files);
    //   dispatch(updateCarStatus(carDetail.id, CAR_STATUS.REGISTER));
    // } else {

    // }
  };

  const handleSubmitImageCar = () => {
    if (imagesCar.length >= 2 && imagesCar.length <= 5) {
      const lengthTotal = imagesCar.length + images.count;
      if (lengthTotal >= 2 && lengthTotal <= 5) {
        postImg(imagesCar);
        dispatch(updateCarStatus(carDetail.id, CAR_STATUS.REGISTER));
      }

    }
  };

  const handleSubmitImageCarLicense = () => {
    if (imagesLicense.length >= 2 && imagesLicense.length <= 5) {
      const lengthTotal = imagesLicense.length + licenses.count;
      if (lengthTotal >= 2 && lengthTotal <= 5) {
        postImgLicense(imagesLicense);
        dispatch(updateCarStatus(carDetail.id, CAR_STATUS.REGISTER));
      }
    }
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
        uploadTask.put(img, metadata).then(function () {
          uploadTask.getDownloadURL().then(function (url) {
            const link = [url];
            dispatch(postImageCar(link, carId, "CAR"));
          });
        }),
      ]);
    });
  };
  const postImgLicense = (images) => {
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
        uploadTask.put(img, metadata).then(function () {
          uploadTask.getDownloadURL().then(function (url) {
            const link = [url];
            dispatch(postImageCar(link, carId, "LICENSE"));
          });
        }),
      ]);
    });
  };
  const handleRemoveItem = (image) => {
    console.log(imagesCar);
    setImagesCar(imagesCar.filter((item) => item.name !== image.name));
  };
  const handleRemoveLicItem = (image) => {
    // console.log(imagesCar);
    // setImagesCar(imagesLicense.filter((item) => item.name !== image.name));
    setImageLicense(imagesLicense.filter((item) => item.name !== image.name));
  };
  const handleRemoveImage = (image) => {
    console.log(image.id);
    dispatch(changeImageByType(image, "DELETE"));
    dispatch(updateCarStatus(carDetail.id, CAR_STATUS.REGISTER));
  };
  const images = useSelector((state) => state.booking.images);
  const licenses = useSelector((state) => state.booking.licenses);

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const handleOpenUpdate = (event) => {
    console.log(event);
    setOpenUpdate(true);
  };
  const [openUpload, setOpenUpload] = useState(false);
  const handleUpdateImage = (event) => {
    setOpenUpdate(false);
    setOpenUpload(true);
    // uploadImage(event);
  };

  useEffect(() => {
    const fetchCar = async () => {
      dispatch(await fetchCarDetail(carId));
      dispatch(fetchImageList(1, 20, carId, "CAR"));
      dispatch(fetchImageList(1, 20, carId, "LICENSE"));
      setCurrentCar(carDetail);
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
            indicatorColor="primary"
            textColor="primary"
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
          <Dialog open={openUpdate} onClose={handleCloseUpdate}>
            <DialogContent>
              <Typography variant="subtitle1" color="primary">
                If you update image, your car will be unavailable until BPCRS
                System confirm your images is valid !
              </Typography>
              <DialogActions>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={handleCloseUpdate}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateImage}
                >
                  Continue
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
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

                    <Grid
                      container
                      justify="space-between"
                      alignItems="baseline"
                    >
                      <Grid item lg={5}>
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          label="Price (per day)"
                          value={currentCar.price ? currentCar.price : ""}
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
                        <Typography variant="subtitle1" color="initial">
                          Are you want to update price of your car is{" "}
                          {currentCar.price} per day ?
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
            {images.data ? (
              <Grid container item lg={12}>
                {carDetail.status === CAR_STATUS.RENTING ||
                  !openUpload ? null : (
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
                  )}
                {images.data.map((image, index) => (
                  <Grid item lg={3}>
                    <div className={classes.productImageItem} key={index}>
                      {openUpload ? (
                        <Icon
                          className={classes.productImageFeaturedStar}
                          onClick={() => handleRemoveImage(image)}
                        >
                          remove_circle
                        </Icon>
                      ) : null}
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

                {carDetail.status === CAR_STATUS.RENTING ||
                  !openUpload ? null : (
                    <Grid container item xs={12} lg={12}>
                      <Grid>
                        <Button
                          variant="outlined"
                          style={{ textTransform: "none" }}
                          color="primary"
                          className={classes.status}
                          onClick={handleSubmitImageCar}
                        >
                          Submit
                      </Button>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <Typography variant="subtitle2" color="error">
                          {imagesCar.length + images.count >= 2 && imagesCar.length + images.count <= 5 ? "" : "Please upload from 2 to 5 images of your car"}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}


                <Grid item lg={12}>
                  {carDetail.status === CAR_STATUS.RENTING ? null : (
                    <Button
                      variant="outlined"
                      style={{ textTransform: "none" }}
                      color="primary"
                      className={classes.status}
                      startIcon={<Icon>update</Icon>}
                      onClick={() => setOpenUpdate(true)}
                    >
                      Update Image
                    </Button>
                  )}
                </Grid>
              </Grid>
            ) : (
                <Grid>
                  <Typography>The car dont have images</Typography>
                </Grid>
              )}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Grid container item lg={12}>
              {carDetail.status === CAR_STATUS.RENTING || !openUpload ? null : (
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
                      onChange={uploadImageLicense}
                    />
                    <span aria-hidden="true">
                      <Icon style={{ color: "blue" }}>cloud_upload</Icon>
                    </span>
                  </label>
                </Grid>
              )}

              {licenses.data &&
                licenses.data.map((image, index) => (
                  <Grid item lg={3}>
                    <div className={classes.productImageItem} key={index}>
                      {openUpload ? (
                        <Icon
                          className={classes.productImageFeaturedStar}
                          onClick={() => handleRemoveImage(image)}
                        >
                          remove_circle
                        </Icon>
                      ) : null}
                      <img
                        src={image.link}
                        alt="img"
                        style={{ width: "90%", height: "90%" }}
                      />
                    </div>
                  </Grid>
                ))}
              {imagesLicense &&
                imagesLicense.map((image, index) => (
                  <Grid item lg={3}>
                    <div className={classes.productImageItem} key={index}>
                      <Icon
                        className={classes.productImageFeaturedStar}
                        onClick={() => handleRemoveLicItem(image)}
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

              {carDetail.status === CAR_STATUS.RENTING ||
                !openUpload ? null : (
                  <Grid container item xs={12} lg={12}>
                    <Grid>
                      <Button
                        variant="outlined"
                        style={{ textTransform: "none" }}
                        color="primary"
                        className={classes.status}
                        onClick={handleSubmitImageCarLicense}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <Typography variant="subtitle2" color="error">
                        {imagesLicense.length + licenses.count >= 2 && imagesLicense.length + licenses.count <= 5 ? "" : "Please upload from 2 to 5 images of your license"}
                      </Typography>
                    </Grid>

                  </Grid>
                )}


              <Grid item lg={12}>
                {carDetail.status === CAR_STATUS.RENTING ? null : (
                  <Button
                    variant="outlined"
                    style={{ textTransform: "none" }}
                    color="primary"
                    className={classes.status}
                    startIcon={<Icon>update</Icon>}
                    onClick={() => setOpenUpdate(true)}
                  >
                    Update Image
                  </Button>
                )}
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
}
