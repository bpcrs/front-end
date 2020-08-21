import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Grid,
  makeStyles,
  Typography,
  Icon,
  Stepper,
  Step,
  StepLabel,
  withStyles,
  StepConnector,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import firebase from "../../firebase/firebase";
import {
  postCarSubmit,
  fetchBrandList,
  fetchModelList,
  postCar,
  checkCar,
} from "./booking.action";
import { useDispatch, useSelector } from "react-redux";
import { orange, green } from "@material-ui/core/colors";
import { processingRegister } from "../user/profile.action";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import clsx from "clsx";
import { showMessageError } from "../../store/actions/fuse";
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
    height: "20px",
    width: "20px",
  },
  formControl: {
    width: 275,
    margin: theme.spacing(1),
    maxHeight: 150,
  },
  formScreen: {
    width: "100%",
    margin: theme.spacing(1),
    maxHeight: 150,
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1),
  },
  priceField: {
    width: "95%",
    margin: theme.spacing(1),
  },

  smallTextField: {
    margin: theme.spacing(1),
  },
  card: {
    margin: 20,
    padding: 20,
  },
  button: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
  head: {
    marginTop: theme.spacing(2),
  },
  productImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },
  imgContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
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

const touchScreens = [
  "Boss Audio Touch Screen Car Stereo",
  "Jensen Multimedia Touch Screen Stereo",
  "Pioneer In-Dash DVD Receiver Car Stereo",
  "Boss Audio Single Din Touch Screen Car Stereo",
  "Kenwood 2 Din Receiver with HD Radio",
  "Pioneer AVH4200NEX Double Din Receiver",
  "Regetek 7 Inch Touch Screen Car Stereo",
  "JVC In-Dash 6.2-Inch Car Stereo",
  "Other",
];

function getSteps() {
  return ["Fill information", "Upload image of car", "Upload license of car"];
}

function GetStepContent(step, onSubmit, onSubmitImage, onSubmitLicense) {
  const dispatch = useDispatch();
  const now = new Date().getUTCFullYear();
  const classes = useStyles();
  const brands = useSelector((state) => state.booking.brands);
  const models = useSelector((state) => state.booking.models);
  const [currentCar, setCurrentCar] = useState({});
  const [brand, setBrand] = React.useState("");
  const [imageCarArr, setImageCarArr] = useState([]);
  const [licenses, setLicenses] = useState([]);
  // const [linkLicenses, setLinkLicenses] = useState([]);

  const years = Array(now - (now - 10))
    .fill("")
    .map((v, idx) => now - idx);

  const uploadLicences = (event) => {
    // setImageCarArr([...imageCarArr, ...event.target.files]);
    setLicenses([...licenses, ...event.target.files]);
  };
  const uploadImage = (event) => {
    // console.log(event.target.files);
    setImageCarArr([...imageCarArr, ...event.target.files]);
  };
  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
    setCurrentCar({
      ...currentCar,
      brandId: event.target.value.id,
    });
  };
  const handleInputChange = (event) => {
    setCurrentCar({
      ...currentCar,
      [event.target.name]: event.target.value,
    });
  };

  const [model, setModel] = React.useState("");
  const handleChangeModel = (event) => {
    setModel(event.target.value);
    setCurrentCar({
      ...currentCar,
      modelId: event.target.value.id,
    });
  };

  const [year, setYear] = useState("");
  const handleChangeYear = (event) => {
    setYear(event.target.value);
    setCurrentCar({
      ...currentCar,
      year: event.target.value,
    });
  };

  const handleChangeAutoDriver = (event) => {
    setCurrentCar({
      ...currentCar,
      autoDriver: event.target.value,
    });
  };

  const handleRemoveCarImage = (image) => {
    setImageCarArr(imageCarArr.filter((item) => item.name !== image.name));
  };

  const handleRemoveLicenseImage = (image) => {
    setLicenses(licenses.filter((item) => item.name !== image.name));
  };

  useEffect(() => {
    if (brands.length === 0) dispatch(fetchBrandList());
    if (models.length === 0) dispatch(fetchModelList());
    onSubmit(currentCar);
    onSubmitImage(imageCarArr);
    onSubmitLicense(licenses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCar, imageCarArr, licenses]);
  switch (step) {
    case 0:
      return (
        <Grid>
          <Grid container>
            <Grid item xs={6} lg={6}>
              <FormControl
                required
                className={classes.formControl}
                variant="outlined"
              >
                <InputLabel id="demo-simple-select-required-label">
                  Brand
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={brand}
                  onChange={handleChangeBrand}
                  label="Brand"
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.name} value={brand}>
                      <Typography>
                        <img
                          className={classes.icon}
                          src={brand.logoLink}
                          alt=""
                        />
                        {brand.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} lg={6}>
              <FormControl
                required
                className={classes.formControl}
                variant="outlined"
              >
                <InputLabel id="demo-simple-select-required-label">
                  Model
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={model}
                  onChange={handleChangeModel}
                  label="Brand"
                >
                  {models.map((model) => (
                    <MenuItem key={model.name} value={model}>
                      <Typography>{model.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} lg={6}>
              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel>Year</InputLabel>
                <Select value={year} onChange={handleChangeYear} label="Year">
                  {years &&
                    years.map((year) => (
                      <MenuItem key={year} value={year}>
                        <Typography>{year}</Typography>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} lg={6}>
              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel
                  id="demo-simple-select-outlined-label"
                  // variant="outlined"
                >
                  Auto Drive
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={handleChangeAutoDriver}
                  className={classes.selectEmpty}
                  label="Auto Drive"
                >
                  <MenuItem key="true" value="true">
                    Yes
                  </MenuItem>
                  <MenuItem key="false" value="false">
                    No
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} lg={3}>
              <TextField
                required
                className={classes.smallTextField}
                id="seat"
                name="seat"
                value={currentCar.seat}
                label="Seat"
                type="number"
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={9} lg={9}>
              <FormControl
                required
                variant="outlined"
                className={classes.formScreen}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  TouchScreen
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={currentCar.screen}
                  onChange={handleInputChange}
                  label="TouchScreen"
                  name="screen"
                >
                  {touchScreens.map((screen, index) => (
                    <MenuItem key={index} value={screen}>
                      <Typography>{screen}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              required
              className={classes.textField}
              id="name"
              value={currentCar.name}
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid container>
            <Grid item xs={7} lg={7}>
              <TextField
                required
                className={classes.priceField}
                id="vin"
                name="vin"
                value={currentCar.vin}
                label="VIN number"
                variant="outlined"
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title={
                          <Typography variant="caption">
                            The car's vehicle identification number (VIN) is the
                            identifying code for a SPECIFIC automobile. A VIN is
                            composed of 17 characters (digits and capital
                            letters) that act as a unique identifier for the
                            vehicle.
                          </Typography>
                        }
                        placement="top"
                      >
                        <Icon style={{ cursor: "pointer" }}>error_outline</Icon>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                error={currentCar.vin && currentCar.vin.length !== 17}
                helperText={
                  currentCar.vin && currentCar.vin.length !== 17
                    ? "VIN must be 17 characters"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={5} lg={5}>
              <TextField
                required
                className={classes.textField}
                variant="outlined"
                label="Price (per day)"
                value={currentCar.price}
                onChange={handleInputChange}
                name="price"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                error={currentCar.price < 100000}
                helperText={
                  currentCar.price < 100000 ? "Minimum 100.000 đ/day" : ""
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              required
              className={classes.textField}
              id="plateNum"
              name="plateNum"
              value={currentCar.plateNum}
              label="Plate number"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      );
    case 1:
      return (
        <Grid>
          <Grid container item lg={12} spacing={2}>
            <div className="flex justify-center sm:justify-start flex-wrap">
              <Grid item lg={3}>
                <label className={classes.productImageItem} variant="outlined">
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
              {imageCarArr &&
                imageCarArr.map((image, index) => (
                  <Grid item lg={3}>
                    <div className={classes.productImageItem} key={index}>
                      <Icon
                        className={classes.productImageFeaturedStar}
                        onClick={() => handleRemoveCarImage(image)}
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
            </div>
          </Grid>
          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.smallTextField}
          >
            Please upload 2 ~ 5 images about your car
          </Typography>
        </Grid>
      );
    case 2:
      return (
        <Grid>
          <Grid container item lg={12} spacing={2}>
            <div className={classes.imgContainer}>
              <Grid item lg={3}>
                <label className={classes.productImageItem}>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    multiple
                    accept="image/*"
                    name="image"
                    id="file"
                    onChange={uploadLicences}
                  />
                  <span aria-hidden="true">
                    <Icon style={{ color: "blue" }}>cloud_upload</Icon>
                  </span>
                </label>
              </Grid>
              {licenses &&
                licenses.map((image, index) => (
                  <Grid item lg={3}>
                    <div className={classes.productImageItem} key={index}>
                      <Icon
                        className={classes.productImageFeaturedStar}
                        onClick={() => handleRemoveLicenseImage(image)}
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
            </div>
          </Grid>
          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.smallTextField}
          >
            Please upload 2 ~ 5 images about your licenses
          </Typography>
        </Grid>
      );
    default:
      return "Unknown step";
  }
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundColor: green[600],
    },
  },
  completed: {
    "& $line": {
      backgroundColor: green[600],
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundColor: green[600],
  },
}));

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <Icon>playlist_add</Icon>,
    2: <Icon>cloud_upload</Icon>,
    3: <Icon>event_note</Icon>,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

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
      allowNegative={false}
      // prefix="$"
      suffix=" ₫"
    />
  );
}

export default function CarSubmit(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const handleStepNext = () => {
    if (activeStep === 0) {
      checkCar(currentCar.vin, currentCar.plateNum, ({ success, message }) => {
        if (success) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          dispatch(showMessageError(message));
        }
      });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const [currentCar, setCurrentCar] = useState({});
  const [carImages, setCarImages] = useState([]);
  const [carLicense, setCarLicenses] = useState([]);

  const handleStepBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepReset = () => {
    setActiveStep(0);
  };
  //2
  const getLinkImageFromFireBase = (date) => {
    var storage = firebase.storage();
    var storageRef = storage.ref("Car");
    var count = 0;
    var flag2 = false;

    for (let i = 0; i < carImages.length; i++) {
      // Create a reference to the file we want to download
      var starsRef = storageRef.child(date + "/" + carImages[i].name);

      // Get the download URL
      starsRef.getDownloadURL().then(function (url) {
        // Insert url into an <img> tag to "download"
        console.log("test vi tri: " + (i + 1) + "-" + url);
        const link = { link: url, type: "CAR" };
        linkImageArr.push(link);
        // setLinks([...links, link]);
        count = count + 1;
        if (count == carImages.length) {
          count = 0;

          flag2 = true;
          if (flag2) {
            flag2 = false;
            console.log("length link download image: " + carImages.length);
            console.log("Starting store license info to firebase...");
            storeLicenseToFireBase();
            // submitCarToDB();
          }
        }
      });
    }
  };
  //1
  const storeImageToFireBase = () => {
    if (carImages.length > 0) {
      dispatch(postCar());

      var metadata = {
        contentType: "image/jpeg",
      };

      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var count = 0;
      var flag = false;

      for (let i = 0; i < carImages.length; i++) {
        var uploadTask = firebase
          .storage()
          .ref("Car/" + date + "/")
          .child(carImages[i].name)
          .put(carImages[i], metadata);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function (snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }

            if (progress == 100) {
              console.log("count: " + count);
              count = count + 1;
            }

            if (count == carImages.length) {
              count = 0;
              flag = true;
            }
          },
          function (error) {
            // Errors list: https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;

              case "storage/canceled":
                // User canceled the upload
                break;

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          async function () {
            if (flag) {
              flag = false;
              if (count == 0) {
                console.log("starting get link download image...");
                await new Promise((resolve, reject) =>
                  setTimeout(resolve, 3000)
                );
                getLinkImageFromFireBase(date);
              }
            }
          }
        );
      }
    } else {
      console.log("khong co file");
      return;
    }
  };
  const getLinkLicenseFromFireBase = (date) => {
    var storage = firebase.storage();
    var storageRef = storage.ref("Car/license");
    var count = 0;
    var flag2 = false;

    for (let i = 0; i < carLicense.length; i++) {
      // Create a reference to the file we want to download
      var starsRef = storageRef.child(date + "/" + carLicense[i].name);

      // Get the download URL
      starsRef.getDownloadURL().then(function (url) {
        // Insert url into an <img> tag to "download"
        console.log("test vi tri: " + (i + 1) + "-" + url);
        const link = { link: url, type: "LICENSE" };
        linkImageArr.push(link);
        // setLinks([...links, link]);
        count = count + 1;
        if (count == carLicense.length) {
          count = 0;

          flag2 = true;
          if (flag2) {
            flag2 = false;
            // console.log("length link download image: " + carImages.length);
            console.log("Starting store car info to DB...");
            // storeLicenseToFirebase();
            submitCarToDB();
          }
        }
      });
    }
  };
  //1
  const storeLicenseToFireBase = () => {
    if (carLicense.length > 0) {
      dispatch(postCar());

      var metadata = {
        contentType: "image/jpeg",
      };

      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var count = 0;
      var flag = false;
      // var vinCarNumber = document.getElementById("vin").value;

      for (let i = 0; i < carLicense.length; i++) {
        var uploadTask = firebase
          .storage()
          .ref("Car/license/" + date + "/")
          .child(carLicense[i].name)
          .put(carLicense[i], metadata);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function (snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }

            if (progress == 100) {
              console.log("count: " + count);
              count = count + 1;
            }

            if (count == carLicense.length) {
              count = 0;
              flag = true;
            }
          },
          function (error) {
            // Errors list: https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;

              case "storage/canceled":
                // User canceled the upload
                break;

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          async function () {
            if (flag) {
              flag = false;
              if (count == 0) {
                console.log("starting get link download firebase...");
                await new Promise((resolve, reject) =>
                  setTimeout(resolve, 2000)
                );
                getLinkLicenseFromFireBase(date);
              }
            }
          }
        );
      }
    } else {
      console.log("khong co file");
      return;
    }
  };
  const linkImageArr = new Array();
  const submitCarToDB = () => {
    console.log("check submit", linkImageArr);
    dispatch(postCarSubmit(currentCar, linkImageArr));
  };

  const submitCarInfor = () => {
    dispatch(processingRegister());
    storeImageToFireBase();
  };

  const handleSubmit = () => {
    submitCarInfor();
  };

  return (
    <Grid className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleStepReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Grid>
              {GetStepContent(
                activeStep,
                setCurrentCar,
                setCarImages,
                setCarLicenses
              )}
            </Grid>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleStepBack}
                className={classes.button}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <React.Fragment>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.button}
                    disabled={
                      carImages.length < 2 ||
                      carImages.length > 5 ||
                      carLicense.length < 2 ||
                      carLicense.length > 5
                    }
                  >
                    Register
                  </Button>
                  {carImages.length < 2 ||
                  carImages.length > 5 ||
                  carLicense.length < 2 ||
                  carLicense.length > 5 ? (
                    <Typography
                      variant="subtitle2"
                      color="error"
                      className={classes.smallTextField}
                    >
                      Your car images or license images are invalid! Please
                      upload 2 ~ 5 images of each kind{" "}
                    </Typography>
                  ) : null}
                </React.Fragment>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleStepNext}
                  className={classes.button}
                  disabled={
                    // !currentCar.name ||
                    // !currentCar.brandId ||
                    // !currentCar.modelId ||
                    // !currentCar.year ||
                    // !currentCar.seat ||
                    // !currentCar.screen ||
                    // !currentCar.vin ||
                    // !currentCar.price > 0 ||
                    // !currentCar.plateNum ||
                    (currentCar.vin && currentCar.vin.length !== 17) ||
                    (currentCar.price && currentCar.price < 100000)
                  }
                >
                  Next
                </Button>
                // </Grid>
              )}
            </div>
          </div>
        )}
      </div>
    </Grid>
  );
}
