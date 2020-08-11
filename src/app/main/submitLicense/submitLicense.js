import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, makeStyles, Typography, Icon, DialogActions } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../../firebase/firebase";
import Slide from "@material-ui/core/Slide";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { updateUserLicense, updateUserLicenseLoading, fetchUserDetail } from "./license.action";


// import event from '';
const ITEM_HEIGHT = 48;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
  media: {
    height: 140,
    width: "100%",
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
  },
  card: {
    margin: 20,
    padding: 20,
  },
  smallTextField: {
    margin: theme.spacing(1),
  },
  head: {
    marginTop: theme.spacing(2),
  },
}));

export default function SubmitLicense(props) {
  const classes = useStyles();
  // const currentUser = useSelector((state) => state.auth.user);
  const [currentUser, setCurrentUser] = useState({});
  const userDetail = useSelector((state) => state.license.userDetail);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.license.loading);
  // const [license, setLicense] = useState({});
  const userLogged = useSelector((state) => state.auth.user);
  const [disableButton, setDisableButton] = useState(false);
  const [open, setOpen] = useState(true);
  var [imageLicenseArr, setImageLicenseArr] = useState([]);
  var linkImageArr = new Array();

  const [imageJson, setImageJson] = useState([]);
  useEffect(() => {

    const fetchUser = () => {
      dispatch(fetchUserDetail(userLogged.id));
      setCurrentUser(userDetail);
    }

    if (userDetail.imageLicense) {
      setImageJson(JSON.parse(userDetail.imageLicense));
    }
    fetchUser();
  }, [userDetail.id]);

  const handleInputChange = (event) => {
    // setLicense({
    //   ...license,
    //   [event.target.name]: event.target.value
    // })
    setCurrentUser({
      ...currentUser,
      [event.target.name]: event.target.value,
    })
  };


  const updateLicense = () => {
    const imageLicense = JSON.stringify(linkImageArr);

    dispatch(updateUserLicense(currentUser.id, {
      phone: currentUser.phone,
      identification: currentUser.identification,
      imageLicense: imageLicense,
      licenseCheck: currentUser.licenseCheck,
    }))
    setDisableButton(true);
  };

  const handleClickSave = () => {
    console.log("license: ", userDetail.licenseCheck);
    if (!userDetail.licenseCheck) {
      uploadFile();
    } else {
      dispatch(updateUserLicense(currentUser.id, {
        phone: currentUser.phone,
        licenseCheck: currentUser.licenseCheck,
      }))
      setDisableButton(true);
    }
  };

  let uploadFile = () => {
    if (imageLicenseArr.length > 0) {
      dispatch(updateUserLicenseLoading());
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

      for (let i = 0; i < imageLicenseArr.length; i++) {
        var uploadTask = firebase
          .storage()
          .ref("License/" + date + "/" + currentUser.email)
          .child(imageLicenseArr[i].name)
          .put(imageLicenseArr[i], metadata);

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
            if (count == imageLicenseArr.length) {
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
      setOpen(true);
      return (
        <Dialog
          open={open}
        >

          <DialogContent>
            <div align="center" className={classes.progressBar}>
              <p>You must upload your image License and Identification</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => { setOpen(false) }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  };

  var downloadFile = (date) => {
    var storage = firebase.storage();
    var storageRef = storage.ref("License");
    var count = 0;
    var flag2 = false;

    for (let i = 0; i < imageLicenseArr.length; i++) {
      // Create a reference to the file we want to download
      var starsRef = storageRef.child(
        date + "/" + currentUser.email + "/" + imageLicenseArr[i].name);

      // Get the download URL
      console.log("state download: " + starsRef.state);
      starsRef
        .getDownloadURL()
        .then(function (url) {
          // Insert url into an <img> tag to "download"
          console.log("test vi tri: " + (i + 1) + "-" + url);
          linkImageArr.push(url);

          count = count + 1;
          if (count == imageLicenseArr.length) {
            count = 0;

            flag2 = true;
            if (flag2) {
              flag2 = false;
              console.log("length link download image: " + linkImageArr.length);
              console.log("Starting store car info to DB...");
              updateLicense();
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

  var loadFile = function (event) {
    // if (event.target.files[0]) {
    //   var image = document.getElementById("output");
    //   image.src = URL.createObjectURL(event.target.files[0]);
    //   if (imageLicenseArr.length > 0) {
    //     imageLicenseArr[0] = event.target.files[0];
    //   } else {
    //     setImageLicenseArr([...imageLicenseArr, event.target.files[0]]);
    //   }
    // }
    setImageLicenseArr([...imageLicenseArr, ...event.target.files]);
  };

  var loadFile2 = function (event) {
    if (event.target.files[0]) {
      var image = document.getElementById("output2");
      image.src = URL.createObjectURL(event.target.files[0]);
      //fileArr.push(event.target.files[0]);
      imageLicenseArr[1] = event.target.files[0];
    }
  };

  var loadFile3 = function (event) {
    if (event.target.files[0]) {
      var image = document.getElementById("output3");
      image.src = URL.createObjectURL(event.target.files[0]);
      // fileArr.push(event.target.files[0]);
      imageLicenseArr[2] = event.target.files[0];
    }
  };

  var loadFile4 = function (event) {
    if (event.target.files[0]) {
      var image = document.getElementById("output4");
      image.src = URL.createObjectURL(event.target.files[0]);
      // fileArr.push(event.target.files[0]);
      imageLicenseArr[3] = event.target.files[0];
    }
  };


  return (
    <Grid spacing={1} container justify="center" alignItems="center">


      <div>
        <Dialog
          open={loading}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Updating Profile"}
          </DialogTitle>
          <DialogContent>
            <div align="center" className={classes.progressBar}>
              <CircularProgress color="secondary" />
              <p>We are update your information, please wait...</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Typography variant="h6" color="initial" className={classes.head}>
        Update Information
        </Typography>

      <Grid container spacing={2} component={Paper} style={{ wordWrap: "break-word", textAlign: "center" }}>

        {/* <Grid item xs={12} lg={12}>
          <TextField
            className={classes.textField}
            id="phone"
            name="phone"
            value={currentUser.phone ? currentUser.phone : ""}
            onChange={handleInputChange}
            label="Phone Number"
            variant="outlined"
          />
        </Grid>


        <Grid item xs={12} lg={12}>
          <TextField
            className={classes.textField}
            id="identification"
            name="identification"
            onChange={handleInputChange}
            value={currentUser.identification ? currentUser.identification : ""}
            label="Identification Number"
            variant="outlined"
          />
        </Grid> */}

        <Grid item xs={12} lg={12}>
          {
            userDetail.licenseCheck == true ? (
              <Grid container>

                <Grid item xs={12} lg={12}>
                  <TextField
                    className={classes.textField}
                    id="phone"
                    name="phone"
                    value={currentUser.phone ? currentUser.phone : ""}
                    onChange={handleInputChange}
                    label="Phone Number"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <Typography variant="h6" color="initial" className={classes.head}>
                    Your License and Identification
                  </Typography>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <div style={{ textAlign: "center" }}>
                    <h2>Picture 1</h2>
                    <p>
                      <img
                        id="output"
                        width="200"
                        height="200"
                        src={imageJson[0]}
                      />
                    </p>
                  </div>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <div style={{ textAlign: "center" }}>
                    <h2>Picture 2</h2>
                    <p>
                      <img
                        id="output2"
                        width="200"
                        height="200"
                        src={imageJson[1]}
                      />
                    </p>
                  </div>
                </Grid>


                <Grid item xs={12} lg={6}>
                  <div style={{ textAlign: "center" }}>
                    <h2>Picture 3</h2>
                    <p>
                      <img
                        id="output3"
                        width="200"
                        height="200"
                        src={imageJson[2]}
                      />
                    </p>
                  </div>
                </Grid>


                <Grid item xs={12} lg={6}>
                  <div style={{ textAlign: "center" }}>
                    <h2>Picture 4</h2>
                    <p>
                      <img
                        id="output4"
                        width="200"
                        height="200"
                        src={imageJson[3]}
                      />
                    </p>
                  </div>
                </Grid>
              </Grid>
            ) : (

                <Grid container spacing={2}>

                  <Grid item xs={12} lg={12}>
                    <TextField
                      className={classes.textField}
                      id="phone"
                      name="phone"
                      value={currentUser.phone ? currentUser.phone : ""}
                      onChange={handleInputChange}
                      label="Phone Number"
                      variant="outlined"
                    />
                  </Grid>


                  <Grid item xs={12} lg={12}>
                    <TextField
                      className={classes.textField}
                      id="identification"
                      name="identification"
                      onChange={handleInputChange}
                      value={currentUser.identification ? currentUser.identification : ""}
                      label="Identification Number"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} lg={12}>
                    <Typography variant="h6" color="initial" className={classes.head}>
                      Upload your two picture License and two picture Identification
                  </Typography>
                  </Grid>

                  <Grid item lg={12} xs={12}>
                    <label className={classes.productImageItem} variant="outlined">
                      <input
                        type="file"
                        style={{ display: "none" }}
                        multiple
                        accept="image/*"
                        name="image"
                        id="file"
                        onChange={loadFile}
                      />
                      <span aria-hidden="true" style={{ margin: "center", textAlign: "center" }}>
                        {/* <Icon style={{ color: "blue", margin: "center" }}>cloud_upload</Icon> */}
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<CloudUploadIcon />}
                        >
                          <label htmlFor="file">Choose File</label>
                        </Button>
                      </span>
                    </label>
                  </Grid>

                  <Grid container item lg={12} xs={12}>
                    {
                      imageLicenseArr &&
                      imageLicenseArr.map((image, index) => (
                        <Grid item lg={6} xs={12}>
                          <div className={classes.productImageItem} key={index}>

                            <img
                              src={URL.createObjectURL(image)}
                              alt="img"
                              width="200"
                              height="200"

                            />
                          </div>
                        </Grid>
                      ))
                    }
                  </Grid>
                </Grid>
              )
          }
        </Grid>




        {/* <Grid item xs={12} lg={6}>
          <div style={{ textAlign: "center" }}>
            <h2>Picture 1</h2>
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
              <img
                id="output"
                width="200"
                height="200"
                src={imageJson[0]}
              />
            </p>
          </div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <div style={{ textAlign: "center" }}>
            <h2>Picture 2</h2>
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
                src={imageJson[1]}
              />
            </p>
          </div>
        </Grid>


        <Grid item xs={12} lg={6}>
          <div style={{ textAlign: "center" }}>
            <h2>Picture 3</h2>
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
              <img
                id="output3"
                width="200"
                height="200"
                src={imageJson[2]}
              />
            </p>
          </div>
        </Grid>


        <Grid item xs={12} lg={6}>
          <div style={{ textAlign: "center" }}>
            <h2>Picture 4</h2>
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
              <img
                id="output4"
                width="200"
                height="200"
                src={imageJson[3]}
              />
            </p>
          </div>
        </Grid> */}

        <Grid container justify="center">
          <Button
            id="submitButton"
            variant="contained"
            color="secondary"
            // onClick={uploadFile}
            onClick={handleClickSave}
            disabled={disableButton}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>

    </Grid >
  );
}
