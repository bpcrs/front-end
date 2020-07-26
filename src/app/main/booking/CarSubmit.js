import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Card,
  Grid,
  makeStyles,
  Typography,
  Box,
  Tabs,
  Tab,
  Icon,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import firebase from "../../firebase/firebase";
import {
  postCarSubmit,
  fetchBrandList,
  fetchModelList,
  postCar,
} from "./booking.action";
import { useDispatch, useSelector } from "react-redux";
import { orange } from "@material-ui/core/colors";
import { processingRegister } from "../user/profile.action";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

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
    height: "50px",
    width: "50px",
    // marginRight: 10,
  },
  formControl: {
    width: 250,
    margin: theme.spacing(1),
    maxHeight: 150,
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1),
  },
  smallTextField: {
    // width: "100%",
    margin: theme.spacing(1),
    // paddingLeft: theme.spacing(1),
  },
  card: {
    margin: 20,
    padding: 20,
  },
  button: {
    margin: theme.spacing(1),
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
  productImageItem: {
    width: 128,
    height: 128,
    display: "flex",

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
      thousandsGroupStyle
      thousandSeparator
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

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

export default function CarSubmit(props) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [images, setImages] = useState([]);
  const now = new Date().getUTCFullYear();
  const years = Array(now - (now - 10))
    .fill("")
    .map((v, idx) => now - idx);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandList());
    dispatch(fetchModelList());
  }, [dispatch]);

  const brands = useSelector((state) => state.booking.brands);
  const models = useSelector((state) => state.booking.models);
  const userLogged = useSelector((state) => state.auth.user);
  const [currentCar, setCurrentCar] = useState({});
  const handleInputChange = (event) => {
    setCurrentCar({
      ...currentCar,
      [event.target.name]: event.target.value,
    });
  };

  const [brand, setBrand] = React.useState("");
  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
    setCurrentCar({
      ...currentCar,
      brandId: event.target.value.id,
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
  var linkImageArr = new Array();
  const linkLicen = new Array();
  var [imageCarArr, setImageCarArr] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [linkLicenses, setLinkLicenses] = useState([]);

  const uploadLicences = (event) => {
    setLicenses([...licenses, ...event.target.files]);
  };

  const uploadImage = (event) => {
    console.log(event.target.files);
    setImageCarArr([...imageCarArr, ...event.target.files]);
  };
  console.log(imageCarArr);

  var getLinkImageFromFireBase = (date) => {
    var storage = firebase.storage();
    var storageRef = storage.ref("Car");
    var count = 0;
    var flag2 = false;

    for (let i = 0; i < imageCarArr.length; i++) {
      // Create a reference to the file we want to download
      var starsRef = storageRef.child(date + "/" + imageCarArr[i].name);

      // Get the download URL
      starsRef
        .getDownloadURL()
        .then(function (url) {
          // Insert url into an <img> tag to "download"
          console.log("test vi tri: " + (i + 1) + "-" + url);

          linkImageArr.push(url);

          count = count + 1;
          if (count == imageCarArr.length) {
            count = 0;

            flag2 = true;
            if (flag2) {
              flag2 = false;
              console.log("length link download image: " + linkImageArr.length);
              console.log("Starting store car info to DB...");
              storeLicenseToFirebase();
            }
          }
        })
        .catch(function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              // File doesn't exist
              console.log("File doesn't exist vi tri: " + (i + 1));
              break;
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;
          }
        });
    }
  };

  const storeLicenseToFirebase = () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const date = new Date().getTime();
    // eslint-disable-next-line array-callback-return
    licenses.map((img) => {
      const uploadTask = firebase
        .storage()
        .ref("Img/License" + date)
        .child(img.name);
      uploadTask.put(img, metadata).then(function (result) {
        uploadTask.getDownloadURL().then(function (url) {
          console.log("file available at ", url);
          linkLicen.push(url);
          // setLinkLicenses([...linkLicenses, url]);
        });
      });
    });
    console.log("link licenses", linkLicen);
    submitCarToDB();
  };

  var storeImageToFireBase = () => {
    if (imageCarArr.length > 0) {
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

      for (let i = 0; i < imageCarArr.length; i++) {
        var uploadTask = firebase
          .storage()
          .ref("Car/" + date + "/")
          .child(imageCarArr[i].name)
          .put(imageCarArr[i], metadata);
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

            if (count == imageCarArr.length) {
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

  var submitCarToDB = () => {
    dispatch(postCarSubmit(currentCar, linkImageArr, linkLicen));
    // console.log("Owner info ", userLogged);

    // handleChangePage();
  };

  var submitCarInfor = () => {
    dispatch(processingRegister());
    storeImageToFireBase();
    // storeLicenseToFirebase();
    // submitCarToDB();
  };
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  // function RegisterInfo() {
  //   return (

  //   );
  // }

  return (
    <Grid>
      <Grid spacing={1} container justify="center" alignItems="center">
        <Typography variant="h6" color="initial" className={classes.head}>
          Register Car
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
              label="Upload image"
              {...a11yProps(1)}
            />
            <Tab
              className="h-64 normal-case"
              label="Upload license"
              {...a11yProps(2)}
            />
          </Tabs>
        }
        <Grid>
          <TabPanel value={tabValue} index={0}>
            <Grid>
              <Grid container>
                <Grid item xs={6} lg={6}>
                  <FormControl
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
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Year
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={year}
                      onChange={handleChangeYear}
                      label="Year"
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          <Typography>{year}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6} lg={6}>
                  <FormControl
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
                {/* </Card> */}
              </Grid>

              <Grid container>
                <Grid item xs={4} lg={4}>
                  <TextField
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
                <Grid item xs={4} lg={4}>
                  <TextField
                    className={classes.smallTextField}
                    id="sound"
                    name="sound"
                    value={currentCar.sound}
                    label="Sound"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4} lg={4}>
                  <TextField
                    className={classes.smallTextField}
                    id="screen"
                    name="screen"
                    value={currentCar.screen}
                    label="Screen"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  className={classes.textField}
                  id="name"
                  value={currentCar.name}
                  label="Name"
                  name="name"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  className={classes.textField}
                  id="vin"
                  name="vin"
                  value={currentCar.vin}
                  label="Vin number"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  className={classes.textField}
                  id="price"
                  name="price"
                  value={currentCar.price}
                  label="Price (per day)"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
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
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid>
              <Grid container item lg={12} spacing={2}>
                <div className="flex justify-center sm:justify-start flex-wrap">
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
                        <Icon>cloud_upload</Icon>
                      </span>
                    </label>
                  </Grid>
                  {imageCarArr &&
                    imageCarArr.map((image, index) => (
                      <Grid item lg={3}>
                        <div className={classes.productImageItem} key={index}>
                          {/* <Icon className={classes.productImageFeaturedStar}>
                            star
                          </Icon> */}
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
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Grid>
              <Grid container item lg={12} spacing={2}>
                <div className="flex justify-center sm:justify-start flex-wrap">
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
                        <Icon>cloud_upload</Icon>
                      </span>
                    </label>
                  </Grid>
                  {licenses &&
                    licenses.map((image, index) => (
                      <Grid item lg={3}>
                        <div className={classes.productImageItem} key={index}>
                          <Icon className={classes.productImageFeaturedStar}>
                            star
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
            </Grid>
          </TabPanel>
          <Grid container justify="center">
            <Button
              variant="contained"
              color="primary"
              onClick={submitCarInfor}
              startIcon={<PublishIcon />}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // <Layout name="Car renting form">
    //   <div>
    //     <Dialog
    //       open={loading}
    //       TransitionComponent={Transition}
    //       keepMounted
    //       aria-labelledby="alert-dialog-slide-title"
    //       aria-describedby="alert-dialog-slide-description"
    //     >
    //       <DialogTitle id="alert-dialog-slide-title">
    //         {"Uploading Car"}
    //       </DialogTitle>
    //       <DialogContent>
    //         <div align="center" className={classes.progressBar}>
    //           <CircularProgress color="secondary" />
    //           <p>We are upload your car, please wait...</p>
    //         </div>
    //       </DialogContent>
    //     </Dialog>
    //   </div>

    // </Layout>
  );
}
