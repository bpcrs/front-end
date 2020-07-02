import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Card,
  Grid,
  makeStyles,
  Switch,
  Typography,
  IconButton,
  Icon,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import ImageUploading from "react-images-uploading";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Layout from "../../layout";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarDetail, putCarUpdate } from "./booking.action";
// import { useDispatch, useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
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
    margin: theme.spacing(1),
  },
  card: {
    margin: 20,
    padding: 20,
  },
  switchButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function CarEdits(props) {
  const maxNumber = 10;
  const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

  const dispatch = useDispatch();

  const classes = useStyles();

  const carDetail = useSelector((state) => state.booking.carDetail);

  const [editState, setEditState] = useState(false);

  const [currentCar, setCurrentCar] = useState({});

  const handleInputChange = (event) => {
    setCurrentCar({ ...currentCar, [event.target.name]: event.target.value });
  };

  const handleAvailable = (event) => {
    setCurrentCar({ currentCar, available: event.target.checked });
  };

  const updateCar = () => {
    dispatch(putCarUpdate(currentCar.id, currentCar));
  };

  useEffect(() => {
    const fetchCar = () => {
      dispatch(fetchCarDetail(props.match.params.id));
      setCurrentCar(carDetail);
    };
    fetchCar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carDetail.id]);

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
    <Layout name="Vinfast SA 2.0">
      <Grid container justify="center">
        <Grid item xs={12} sm={6} lg={10}>
          <Card className={classes.card}>
            <Grid
              spacing={1}
              container
              justify="flex-end"
              alignItems="flex-end"
            >
              <IconButton onClick={() => setEditState(false)}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton onClick={() => setEditState(true)}>
                <Icon>done</Icon>
              </IconButton>
            </Grid>

            <Grid
              spacing={1}
              container
              justify="space-between"
              alignItems="baseline"
            >
              <TextField
                id="input-with-icon-textfield"
                label="Brand"
                className={classes.textField}
                value={carDetail.branch}
                disabled
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <img
                      alt=""
                      className={classes.icon}
                      src="https://static.carmudi.vn/wp-content/uploads/2016/04/Honda-Carmudi.jpg"
                    />
                  ),
                }}
              />
            </Grid>
            <Grid
              spacing={1}
              container
              justify="space-between"
              alignItems="baseline"
            >
              <TextField
                id="input-with-icon-textfield"
                label="Model"
                variant="outlined"
                value={carDetail.model}
                className={classes.textField}
                disabled
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
                id="name"
                value={currentCar.name}
                label="Name"
                name="name"
                variant="outlined"
                onChange={handleInputChange}
                disabled={editState}
              />
            </Grid>

            <Grid
              spacing={1}
              container
              justify="space-between"
              alignItems="baseline"
            >
              <Typography variant="h6"></Typography>
              <FormControlLabel
                classes={classes.switchButton}
                control={
                  <IOSSwitch
                    id="isAvailable"
                    checked={currentCar.available}
                    onChange={handleAvailable}
                    name="isAvailable"
                  />
                }
                label="Available"
              />
            </Grid>

            <div className="mt-20">
              <ImageUploading
                onChange={classes.onChange}
                maxNumber={maxNumber}
                multiple
                maxFileSize={maxMbFileSize}
                acceptType={["jpg", "gif", "png"]}
              >
                {({ imageList, onImageUpload }) => (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onImageUpload}
                      component="span"
                      startIcon={<DriveEtaIcon />}
                    >
                      Change Image
                    </Button>
                    {imageList.map((image) => (
                      <div key={image.key} className="mt-20">
                        <Grid container spacing={1}>
                          <Grid item xs={9} sm={9}>
                            <img
                              alt=""
                              src={image.dataURL}
                              className={classes.imageUploading}
                            />
                          </Grid>
                          <Grid item xs={3} sm={3}>
                            <Button
                              startIcon={<EditIcon />}
                              onClick={image.onUpdate}
                            >
                              Update
                            </Button>
                            <Button
                              startIcon={<DeleteIcon />}
                              onClick={image.onRemove}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
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
                id="standard-required"
                value={currentCar.vin}
                label="Vin number"
                variant="outlined"
                onChange={handleInputChange}
                disabled={editState}
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
                id="standard-required"
                value={currentCar.seat}
                label="Seat"
                variant="outlined"
                disabled={editState}
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
                id="standard-required"
                value={currentCar.sound}
                label="Sound"
                variant="outlined"
                disabled={editState}
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
                id="standard-required"
                value={currentCar.price}
                label="Price (per day)"
                variant="outlined"
                disabled={editState}
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
                id="standard-required"
                value={currentCar.plateNum}
                label="Plate number"
                variant="outlined"
                disabled={editState}
              />
            </Grid>
          </Card>
        </Grid>
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={updateCar}
            startIcon={<PublishIcon />}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}
