import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Icon,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import Layout from "../../layout";
import { putCarUpdate, notificationUserCar } from "./checking.action";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SwipeableTextMobileStepper from "../booking/SlideShow";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "prop-types";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
  textArea: {
    width: 500,
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
    margin: 10,
    padding: 10,
  },
  button: {
    margin: theme.spacing(1),
  },
  slide: {
    width: "100%",
    margin: theme.spacing(1),
  },
}));

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  tab: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function CarDetailChecking({ car }) {
  console.log(car);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = useState(0);

  const reason1 = "License not clear";
  const reason2 = "Image car not clear";
  const reason3 = "Wrong information car";
  const reason4 = "Don't have License";

  const [valueCheckBox, setValueCheckBox] = useState({
    checkedA: "",
    checkedB: "",
    checkedC: "",
    checkedD: "",
    checkedE: "",
  });

  const handleChangeBox = (event) => {
    if (event.target.checked) {
      setValueCheckBox({
        ...valueCheckBox,
        [event.target.name]: event.target.value,
      });
    } else {
      setValueCheckBox({
        ...valueCheckBox,
        [event.target.name]: "",
      });
    }
  };

  const handleChangeBoxAnotherReason = (event) => {
    setValueCheckBox({
      ...valueCheckBox,
      checkedE: event.target.value,
    });
  };

  const handleValueAutoDrive = (state) => {
    if (state) {
      return "TRUE";
    } else {
      return "FALSE";
    }
  };

  const handleAcceptCar = () => {
    notificationUserCar(
      "Car is accepted. Now your car is Available on system and can be rent!",
      car.owner.email,
      true,
      car,
      car.owner
    );
    dispatch(putCarUpdate(car.id, "UNAVAILABLE"));
    history.push({
      pathname: APP_PATH.CHECKING,
    });
  };

  const handleDenyCar = () => {
    notificationUserCar(valueCheckBox, car.owner.email, false, car, car.owner);
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

  const handleSetTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
    // <Layout name="Car checking form">
    <Grid item container>
      <Grid item xs={12} lg={12}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          orientation="horizontal"
          variant="scrollable"
          value={tab}
          onChange={handleSetTab}
          aria-label="Vertical tabs example"
        >
          <Tab label="Car Information" {...a11yProps(0)} />
          <Tab label="Car Image" {...a11yProps(1)} />
          <Tab label="License Image" {...a11yProps(2)} />
        </Tabs>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TabPanel value={tab} index={0} tab={0}>
          <Grid item container lg={12}>
            <Grid item container lg={6}>
              <TextField
                className={classes.textField}
                label="Brand"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                value={car.brand ? car.brand.name : ""}
              />
              <TextField
                className={classes.textField}
                label="Model"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                value={car.model ? car.model.name : ""}
              />
              <TextField
                className={classes.textField}
                id="year"
                name="year"
                value={car.year ? car.year : ""}
                label="Years"
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                id="name"
                value={car.name ? car.name : ""}
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
                value={handleValueAutoDrive(car.autoDrive)}
              />
            </Grid>
            <Grid item container lg={6}>
              <TextField
                className={classes.textField}
                id="vin"
                InputProps={{
                  readOnly: true,
                }}
                name="vin"
                value={car.vin ? car.vin : ""}
                label="Vin number"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                id="seat"
                name="seat"
                value={car.seat ? car.seat : ""}
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
                value={car.screen ? car.screen : ""}
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
                value={car.price ? car.price : ""}
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
                value={car.plateNum ? car.plateNum : ""}
                label="Plate number"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tab} index={1} tab={1}>
          <Card className={classes.card}>
            <SwipeableTextMobileStepper
              images={
                car.images && car.images.filter((image) => image.type === "CAR")
              }
            />
          </Card>
        </TabPanel>
        <TabPanel value={tab} index={2} tab={2}>
          <Card className={classes.card}>
            <SwipeableTextMobileStepper
              images={
                car.images &&
                car.images.filter((image) => image.type === "LICENSE")
              }
            />
          </Card>
        </TabPanel>
      </Grid>
      <Grid item container justify="space-around">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAcceptCar()}
            startIcon={<CheckCircleIcon />}
          >
            Accept
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon>cancel</Icon>}
            onClick={handleClickOpen}
          >
            Deny
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Deny car reason</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedA"
                    value={reason1}
                    onChange={handleChangeBox}
                  />
                }
                label={reason1}
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    value={reason2}
                    onChange={handleChangeBox}
                  />
                }
                label={reason2}
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedC"
                    value={reason3}
                    onChange={handleChangeBox}
                  />
                }
                label={reason3}
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedD"
                    value={reason4}
                    onChange={handleChangeBox}
                  />
                }
                label={reason4}
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <TextField
                className={classes.textField}
                variant="outlined"
                multiline
                value={valueCheckBox.checkedE}
                onChange={handleChangeBoxAnotherReason}
                placeholder="Another reason..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDenyCar} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
