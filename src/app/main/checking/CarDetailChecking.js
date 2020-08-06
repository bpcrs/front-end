import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, Button, Typography, TextField, Dialog, DialogTitle, DialogContent, TextareaAutosize, DialogActions } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import CancelIcon from "@material-ui/icons/Cancel";
import Layout from "../../layout";
import { fetchCarDetailCheck, putCarUpdate, notificationUser, notificationUserCar } from "./checking.action";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SwipeableTextMobileStepper from "../booking/SlideShow";
const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
  textArea: {
    width: 500
  },

  gridList: {
    width: 500,
    height: 450,
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
  slide: {
    width: "100%",
    margin: theme.spacing(1),
  },
}));



const fakeImg =
  "https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg";

export default function CarDetailChecking(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const carDetail = useSelector((state) => state.checking.carDetail);
  const [currentCar, setCurrentCar] = useState({});
  const [open, setOpen] = React.useState(false);
  const { carId } = props.location.state;
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchCar = () => {
      dispatch(fetchCarDetailCheck(carId));
      setCurrentCar(carDetail);
    };
    fetchCar();
  }, [
    carDetail.id,
  ]);

  const handleChangeInput = (event) => {
    setMessage(event.target.value);
  };

  const handleValueAutoDrive = (state) => {
    if (state) {
      return "TRUE";
    } else {
      return "FALSE";
    }
  };

  const handleAcceptCar = () => {
    // notificationUser("Car is accepted. Now your car is Available on system and can be rent!", currentCar.owner.email, true);
    notificationUserCar("Car is accepted. Now your car is Available on system and can be rent!", currentCar.owner.email, true, carDetail)
    dispatch(
      putCarUpdate(currentCar.id, {
        available: true,
        status: "AVAILABLE"
      })
    );
    history.push({
      pathname: APP_PATH.CHECKING,
    });
  };

  const handleDenyCar = () => {
    // notificationUser(message, currentCar.owner.email, false);
    notificationUserCar(message, currentCar.owner.email, false, carDetail)
    dispatch(
      putCarUpdate(currentCar.id, {
        available: false,
        status: "UNAVAILABLE"
      })
    );
    history.push({
      pathname: APP_PATH.CHECKING,
    });
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Layout name="Car checking form">
      <Grid container>
        <Grid item xs={12} lg={6} sm={6}>
          <Card className={classes.card}>
            <TextField
              className={classes.textField}
              label="Brand"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              value={currentCar.brand ? currentCar.brand.name : ""}
            />
            <TextField
              className={classes.textField}
              label="Model"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              value={currentCar.model ? currentCar.model.name : ""}
            />
            <TextField
              className={classes.textField}
              id="year"
              name="year"
              value={currentCar.year ? currentCar.year : ""}
              label="Years"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              id="name"
              value={currentCar.name ? currentCar.name : ""}
              label="Name"
              name="name"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Auto Drive"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              value={handleValueAutoDrive(currentCar.autoDrive)}
            />
          </Card>
        </Grid>

        <Grid item xs={12} lg={6} sm={6}>
          <Card className={classes.card}>
            <TextField
              className={classes.textField}
              id="vin"
              InputProps={{
                readOnly: true,
              }}
              name="vin"
              value={currentCar.vin ? currentCar.vin : ""}
              label="Vin number"
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              id="seat"
              name="seat"
              value={currentCar.seat ? currentCar.seat : ""}
              label="Seat"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              className={classes.textField}
              id="screen"
              name="screen"
              value={currentCar.screen ? currentCar.screen : ""}
              label="Screen"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              className={classes.textField}
              id="price"
              name="price"
              value={currentCar.price ? currentCar.price : ""}
              label="Price (per day)"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              className={classes.textField}
              id="plateNum"
              name="plateNum"
              value={currentCar.plateNum ? currentCar.plateNum : ""}
              label="Plate number"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} lg={8} sm={12}>
          <Card className={classes.card}>
            <SwipeableTextMobileStepper
              images={
                currentCar.images
                  ? currentCar.images.filter((image) => image.type == "CAR")
                  : [fakeImg]
              }
            />
            <SwipeableTextMobileStepper
              images={
                currentCar.images
                  ? currentCar.images.filter((image) => image.type == "LICENSE")
                  : [fakeImg]
              }
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={6} lg={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAcceptCar()}
            startIcon={<CheckCircleIcon />}
            style={{ marginLeft: "30%" }}
          >
            Accept
          </Button>
        </Grid>
        <Grid item xs={6} lg={6}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CancelIcon />}
            style={{ marginLeft: "30%" }}
            onClick={handleClickOpen}
          >
            Deny
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Deny car reason</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            className={classes.textArea}
            autoFocus
            margin="dense"
            onChange={handleChangeInput}
            id="message"
            name="message"
            label="Reason"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDenyCar} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog >
    </Layout >
  );
}
