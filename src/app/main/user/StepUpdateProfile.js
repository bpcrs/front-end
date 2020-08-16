import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  TextField,
  Icon,
  InputAdornment,
  Tooltip,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { blue } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import { processingRegister } from "./profile.action";
import { useEffect } from "react";
import firebase from "../../firebase/firebase";
import { info } from "autoprefixer";
import {
  updateUserLicense,
  fetchUserDetail,
} from "../submitLicense/license.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  inputStyle: {
    width: "4rem !important",
    height: "4rem",
    margin: "0 1rem",
    fontSize: "2rem",
    fontFamily: theme.typography.fontFamily,
    fontWeight: "80",
    borderRadius: "4px",
    border: "1px solid rgba(0,0,0,0.3)",
  },
  productImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: blue[400],
    opacity: 0,
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
  textField: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function getSteps() {
  return [
    "Update Phone Number",
    "Update License-Image",
    "Update Indentification-Image",
  ];
}

function GetStepContent(stepIndex, setInformation, currentUser, imageJson) {
  console.log(currentUser);
  const classes = useStyles();
  const [info, setInfo] = useState({
    phone: currentUser && currentUser.phone,
    identification: currentUser && currentUser.identification,
    imgLicense: [],
    imgIdentification: [],
  });
  console.log(info);
  const [licenses, setLicense] = useState([]);
  const [identification, setIdentification] = useState([]);

  const handleChangeInfo = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };
  const uploadLicenseImage = (event) => {
    setLicense([...licenses, ...event.target.files]);
    setInfo({ ...info, imgLicense: event.target.files });
  };
  const uploadIdenImage = (event) => {
    setIdentification([...identification, ...event.target.files]);
    setInfo({ ...info, imgIdentification: event.target.files });
  };
  const handleRemoveLicenseImage = (image) => {
    setLicense(licenses.filter((item) => item.name !== image.name));
    setInfo({
      ...info,
      imgLicense: delete info.imgLicense[image],
    });
  };
  const handleRemoveIdenImage = (image) => {
    setIdentification(
      identification.filter((item) => item.name !== image.name)
    );
    setInfo({
      ...info,
      imgIdentification: delete info.imgIdentification[image],
    });
  };

  useEffect(() => {
    setInformation(info);
  }, [info, setInformation]);

  switch (stepIndex) {
    case 0:
      return (
        <Grid container justify="center" alignItems="center">
          <Grid lg={12} item>
            <TextField
              className={classes.textField}
              id="phone"
              name="phone"
              type="number"
              value={info.phone}
              onChange={handleChangeInfo}
              label="Phone Number"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={
                        <Typography variant="caption">
                          Your phone number must be 10 numbers
                        </Typography>
                      }
                      placement="top"
                    >
                      <Icon style={{ cursor: "pointer" }}>error_outline</Icon>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              error={info.phone && info.phone.length < 10}
              helperText={
                info.phone && info.phone.length < 10
                  ? "Phone number must be 10 charaters"
                  : ""
              }
            />
          </Grid>
          <Grid lg={12} item>
            <TextField
              className={classes.textField}
              id="identification"
              name="identification"
              value={info.identification}
              onChange={handleChangeInfo}
              label="Identification Number"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={
                        <Typography variant="caption">
                          Identification must be from 9 to 12 charaters
                        </Typography>
                      }
                      placement="top"
                    >
                      <Icon style={{ cursor: "pointer" }}>error_outline</Icon>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              error={
                info.identification &&
                (info.identification.length < 9 ||
                  info.identification.length > 12)
              }
              helperText={
                info.identification &&
                (info.identification.length < 9 ||
                  info.identification.length > 12)
                  ? "Identification must be larger than 9 charaters"
                  : ""
              }
            />
          </Grid>
        </Grid>
      );
    case 1:
      return (
        <Grid container item lg={12}>
          <Grid item lg={3}>
            <label className={classes.productImageItem} variant="outlined">
              <input
                type="file"
                style={{ display: "none" }}
                multiple
                accept="image/*"
                name="image"
                id="file"
                onChange={uploadLicenseImage}
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
          {imageJson &&
            imageJson.map((image, index) => (
              <Grid item lg={3}>
                <div className={classes.productImageItem} key={index}>
                  <Icon
                    className={classes.productImageFeaturedStar}
                    // onClick={() => handleRemoveLicenseImage(image)}
                  >
                    remove_circle
                  </Icon>
                  <img
                    src={image}
                    alt="img"
                    style={{ width: "90%", height: "90%" }}
                  />
                </div>
              </Grid>
            ))}
          <Typography variant="subtitle2" color="error">
            {imageJson ? "" : "Please upload minimal 2 images of your license"}
          </Typography>
        </Grid>
      );
    case 2:
      return (
        <Grid container item lg={12}>
          <Grid item lg={3}>
            <label className={classes.productImageItem} variant="outlined">
              <input
                type="file"
                style={{ display: "none" }}
                multiple
                accept="image/*"
                name="image"
                id="file"
                onChange={uploadIdenImage}
              />
              <span aria-hidden="true">
                <Icon style={{ color: "blue" }}>cloud_upload</Icon>
              </span>
            </label>
          </Grid>

          {identification &&
            identification.map((image, index) => (
              <Grid item lg={3}>
                <div className={classes.productImageItem} key={index}>
                  <Icon
                    className={classes.productImageFeaturedStar}
                    onClick={() => handleRemoveIdenImage(image)}
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
          {imageJson &&
            imageJson.map((image, index) => (
              <Grid item lg={3}>
                <div className={classes.productImageItem} key={index}>
                  <Icon
                    className={classes.productImageFeaturedStar}
                    // onClick={() => handleRemoveLicenseImage(image)}
                  >
                    remove_circle
                  </Icon>
                  <img
                    src={image}
                    alt="img"
                    style={{ width: "90%", height: "90%" }}
                  />
                </div>
              </Grid>
            ))}
          <Typography variant="subtitle2" color="error">
            {imageJson ? "" : "Please upload minimal 2 images of your license"}
          </Typography>
        </Grid>
      );
    default:
      return "Unknown stepIndex";
  }
}

export default function UpdateProfileStepper() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [information, setInformation] = useState({
    phone: 0,
    identification: 0,
    imgLicense: [],
    imgIdentification: [],
  });
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  var linkImageArr = new Array();
  const handleUpdate = () => {
    console.log(information);
    dispatch(processingRegister());
    uploadFile();
  };
  const handleSubmitInfo = () => {
    const imageLicense = JSON.stringify(linkImageArr);
    dispatch(
      updateUserLicense({
        phone: information.phone,
        identification: information.identification,
        imageLicense: imageLicense,
      })
    );
  };
  const userLogged = useSelector((state) => state.auth.user);
  let uploadFile = () => {
    if (information.imgLicense && information.imgLicense.length > 0) {
      //   dispatch(updateUserLicenseLoading());
      // Create the file metadata
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

      for (let i = 0; i < information.imgLicense.length; i++) {
        var uploadTask = firebase
          .storage()
          .ref("License/" + date + "/" + userLogged.email)
          .child(information.imgLicense[i].name)
          .put(information.imgLicense[i], metadata);

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
            if (count == information.imgLicense.length) {
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
                console.log("start get link download!!!");
                await new Promise((resolve, reject) =>
                  setTimeout(resolve, 3000)
                );
                downloadFile(date);
              } else {
                console.log("check lai cho nay");
              }
            }
          }
        );
      }
    } else {
      console.log("Khong co file");
    }
  };

  var downloadFile = (date) => {
    var storage = firebase.storage();
    var storageRef = storage.ref("License");
    var count = 0;
    var flag2 = false;

    for (let i = 0; i < information.imgLicense.length; i++) {
      // Create a reference to the file we want to download
      var starsRef = storageRef.child(
        date + "/" + userLogged.email + "/" + information.imgLicense[i].name
      );

      // Get the download URL
      console.log("state download: " + starsRef.state);
      starsRef
        .getDownloadURL()
        .then(function (url) {
          // Insert url into an <img> tag to "download"
          console.log("test vi tri: " + (i + 1) + "-" + url);
          linkImageArr.push(url);

          count = count + 1;
          if (count == information.imgLicense.length) {
            count = 0;

            flag2 = true;
            if (flag2) {
              flag2 = false;
              console.log(
                "length link download image: " + information.imgLicense.length
              );
              console.log("Starting store car info to DB...");
              handleSubmitInfo();
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
  const [currentUser, setCurrentUser] = useState({});
  const [imageJson, setImageJson] = useState([]);
  const userDetail = useSelector((state) => state.license.userDetail);

  useEffect(() => {
    const fetchUser = () => {
      //   dispatch(fetchUserDetail(userLogged.id));
      //   setCurrentUser(userDetail);
    };

    if (userDetail.imageLicense) {
      setImageJson(JSON.parse(userDetail.imageLicense));
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {GetStepContent(
                activeStep,
                setInformation,
                userDetail,
                imageJson
              )}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                  disabled={
                    (information.imgLicense &&
                      information.imgLicense.length < 2) ||
                    (information.imgIdentification &&
                      information.imgIdentification.length < 2)
                  }
                >
                  Update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!information.phone || !information.identification}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
