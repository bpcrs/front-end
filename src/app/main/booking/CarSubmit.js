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
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import Layout from "../../layout";
import firebase from "../submitLicense/firebase";
import {
  postCarSubmit,
  fetchBrandList,
  fetchModelList,
  postCar,
} from "./booking.action";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";

const ITEM_HEIGHT = 48;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    height: "100%",
    width: 50,
    marginRight: 10,
  },
  formControl: {
    width: "100%",
    maxHeight: ITEM_HEIGHT * 4.5,
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1),
  },
  card: {
    margin: 20,
    padding: 20,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CarSubmit(props) {
  const classes = useStyles();

  // const maxNumber = 4;
  // const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

  const history = useHistory();
  const handleChangePage = () => {
    history.push({
      pathname: APP_PATH.HOME,
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandList());
    dispatch(fetchModelList());
  }, [dispatch]);

  const loading = useSelector((state) => state.booking.loading);
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

  const handleChangeAutoDriver = (event) => {
    setCurrentCar({
      ...currentCar,
      autoDriver: event.target.value,
    });
  };
  var linkImageArr = new Array();
  var [imageCarArr, setImageCarArr] = useState([]);

  var loadFile = function (event) {
    if (event.target.files[0]) {
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
      if (imageCarArr.length > 0) {
        imageCarArr[0] = event.target.files[0];
      } else {
        setImageCarArr([...imageCarArr, event.target.files[0]]);
      }
    }
  };

  var loadFile2 = function (event) {
    if (event.target.files[0]) {
      var image = document.getElementById("output2");
      image.src = URL.createObjectURL(event.target.files[0]);
      //fileArr.push(event.target.files[0]);
      imageCarArr[1] = event.target.files[0];
    }
  };

  var loadFile3 = function (event) {
    if (event.target.files[0]) {
      var image = document.getElementById("output3");
      image.src = URL.createObjectURL(event.target.files[0]);
      // fileArr.push(event.target.files[0]);
      imageCarArr[2] = event.target.files[0];
    }
  };

  var loadFile4 = function (event) {
    if (event.target.files[0]) {
      var image = document.getElementById("output4");
      image.src = URL.createObjectURL(event.target.files[0]);
      // fileArr.push(event.target.files[0]);
      imageCarArr[3] = event.target.files[0];
    }
  };

  var getLinkImageFromFireBase = (date, vinCarNumber) => {
    var storage = firebase.storage();
    var storageRef = storage.ref("Car");
    var count = 0;
    var flag2 = false;

    for (let i = 0; i < imageCarArr.length; i++) {
      // Create a reference to the file we want to download
      var starsRef = storageRef.child(
        date + "/" + vinCarNumber + "/" + imageCarArr[i].name
      );

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
              submitCarToDB();
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
      var vinCarNumber = document.getElementById("vin").value;

      for (let i = 0; i < imageCarArr.length; i++) {
        var uploadTask = firebase
          .storage()
          .ref("Car/" + date + "/" + vinCarNumber)
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
                getLinkImageFromFireBase(date, vinCarNumber);
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
    dispatch(postCarSubmit(currentCar, linkImageArr));
    console.log("Owner info ", userLogged);
    if (loading === false) {
      handleChangePage();
    }
  };

  var submitCarInfor = () => {
    storeImageToFireBase();
  };

  return (
    <Layout name="Car renting form">
      <div>
        <Dialog
          open={loading}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Uploading Car"}
          </DialogTitle>
          <DialogContent>
            <div align="center" className={classes.progressBar}>
              <CircularProgress color="secondary" />
              <p>We are upload your car, please wait...</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Grid spacing={1} container justify="center" alignItems="center">
        <h1>Tell us about your car</h1>
      </Grid>

      <Grid container justify="center">
        <Grid item lg={5} xs={12}>
          <Grid item xs={12} sm={6} lg={10}>
            <Card className={classes.card}>
              <Grid spacing={2} container justify="center" alignItems="center">
                <Grid item xs={12} lg={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      variant="outlined"
                    >
                      Brand
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={brand}
                      onChange={handleChangeBrand}
                    >
                      {brands.map((brand) => (
                        <MenuItem key={brand.name} value={brand}>
                          <img
                            className={classes.icon}
                            src={brand.logoLink}
                            alt=""
                          />
                          <Typography>{brand.name}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      variant="outlined"
                    >
                      Model
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={model}
                      name="model"
                      onChange={handleChangeModel}
                      className={classes.selectEmpty}
                    >
                      {models.map((model) => (
                        <MenuItem key={model.name} value={model}>
                          <em>{model.name}</em>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  className={classes.textField}
                  id="year"
                  name="year"
                  value={currentCar.year}
                  label="Years"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                />
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
                <FormControl className={classes.formControl}>
                  <InputLabel
                    id="demo-simple-select-required-label"
                    variant="outlined"
                  >
                    Auto Drive
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="txtAutoDriver"
                    onChange={handleChangeAutoDriver}
                    className={classes.selectEmpty}
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
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={10}>
            <Card className={classes.card}>
              <Grid
                spacing={1}
                container
                justify="space-between"
                alignItems="baseline"
              >
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

              <Grid
                spacing={1}
                container
                justify="space-between"
                alignItems="baseline"
              >
                <TextField
                  className={classes.textField}
                  id="seat"
                  name="seat"
                  value={currentCar.seat}
                  label="Seat"
                  type="number"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid
                spacing={1}
                container
                justify="space-between"
                alignItems="baseline"
              >
                <TextField
                  className={classes.textField}
                  id="sound"
                  name="sound"
                  value={currentCar.sound}
                  label="Sound"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid
                spacing={1}
                container
                justify="space-between"
                alignItems="baseline"
              >
                <TextField
                  className={classes.textField}
                  id="screen"
                  name="screen"
                  value={currentCar.screen}
                  label="Screen"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                spacing={1}
                container
                justify="space-between"
                alignItems="baseline"
              >
                <TextField
                  className={classes.textField}
                  id="price"
                  name="price"
                  value={currentCar.price}
                  label="Price (per day)"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid
                spacing={1}
                container
                justify="space-between"
                alignItems="baseline"
              >
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
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Card className={classes.card}>
            <div className="mt-20">
              <Grid container>
                <Grid item xs={12} lg={6}>
                  <div style={{ textAlign: "center" }}>
                    <p>Picture 1</p>
                    <p>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        name="image"
                        id="file"
                        onChange={loadFile}
                      />
                    </p>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<CloudUploadIcon />}
                    >
                      <label htmlFor="file">Choose File</label>
                    </Button>
                    <p>
                      <img id="output" width="200" height="200" />
                    </p>
                  </div>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <div style={{ textAlign: "center" }}>
                    <p>Picture 2</p>
                    <p>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        name="image"
                        id="file2"
                        onChange={loadFile2}
                      />
                    </p>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<CloudUploadIcon />}
                    >
                      <label htmlFor="file2">Choose File</label>
                    </Button>
                    <p>
                      <img
                        id="output2"
                        width="200"
                        height="200"
                        onChange={handleInputChange}
                      />
                    </p>
                  </div>
                </Grid>

                <Grid item xs={12} lg={6} sm={6}>
                  <div style={{ textAlign: "center" }}>
                    <p>Picture 3</p>
                    <p>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        name="image"
                        id="file3"
                        onChange={loadFile3}
                      />
                    </p>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<CloudUploadIcon />}
                    >
                      <label htmlFor="file3">Choose File</label>
                    </Button>
                    <p>
                      <img id="output3" width="200" height="200" />
                    </p>
                  </div>
                </Grid>

                <Grid item xs={12} lg={6} sm={6}>
                  <div style={{ textAlign: "center" }}>
                    <p>Picture 4</p>
                    <p>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        name="image"
                        id="file4"
                        onChange={loadFile4}
                      />
                    </p>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<CloudUploadIcon />}
                    >
                      <label htmlFor="file4">Choose File</label>
                    </Button>
                    <p>
                      <img id="output4" width="200" height="200" />
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
      </Grid>

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
    </Layout>
  );
}
