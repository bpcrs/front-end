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
import { fetchCarDetail } from "./booking.action";
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
    width: "85%",
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
  // const [brand, setBrand] = React.useState('');
  // const [model, setModel] = React.useState('');
  const maxNumber = 10;
  const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

  const dispatch = useDispatch();

  const classes = useStyles();

  const [state, setState] = useState({
    checkedAvailable: true,
  });

  const carDetail = useSelector((state) => state.booking.carDetail);

  const [btnNameState, setBtnNameState] = useState(true);
  const [btnVinState, setBtnVinState] = useState(true);
  const [btnSeatState, setBtnSeatState] = useState(true);
  const [btnSoundState, setBtnSoundState] = useState(true);
  const [btnPriceState, setBtnPriceState] = useState(true);
  const [btnPlateState, setBtnPlateState] = useState(true);

  const handleChange = (event) => {
    setState({
      state,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    dispatch(fetchCarDetail(props.match.params.id));
  }, [dispatch, props]);

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
                id="standard-required"
                value={carDetail.name}
                label="Name"
                variant="outlined"
                disabled={btnNameState}
              />
              <IconButton onClick={() => setBtnNameState(false)}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton onClick={() => setBtnNameState(true)}>
                <Icon>done</Icon>
              </IconButton>
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
                    checked={state.checkedAvailable}
                    onChange={handleChange}
                    name="checkedAvailable"
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
                value={carDetail.vin}
                label="Vin number"
                variant="outlined"
                disabled={btnVinState}
              />
              <IconButton onClick={() => setBtnVinState(false)}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton onClick={() => setBtnVinState(true)}>
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
                className={classes.textField}
                id="standard-required"
                value={carDetail.seat}
                label="Seat"
                variant="outlined"
                disabled={btnSeatState}
              />
              <IconButton onClick={() => setBtnSeatState(false)}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton onClick={() => setBtnSeatState(true)}>
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
                className={classes.textField}
                id="standard-required"
                value={carDetail.sound}
                label="Sound"
                variant="outlined"
                disabled={btnSoundState}
              />
              <IconButton onClick={() => setBtnSoundState(false)}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton onClick={() => setBtnSoundState(true)}>
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
                className={classes.textField}
                id="standard-required"
                value={carDetail.price}
                label="Price (per day)"
                variant="outlined"
                disabled={btnPriceState}
              />
              <IconButton onClick={() => setBtnPriceState(false)}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton onClick={() => setBtnPriceState(true)}>
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
                className={classes.textField}
                id="standard-required"
                value={carDetail.plateNum}
                label="Plate number"
                variant="outlined"
                disabled={btnPlateState}
              />
              <IconButton onClick={() => setBtnPlateState(false)}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton onClick={() => setBtnPlateState(true)}>
                <Icon>done</Icon>
              </IconButton>
            </Grid>
          </Card>
        </Grid>
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<PublishIcon />}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}
