import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Avatar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PaymentIcon from "@material-ui/icons/Payment";
import HistoryIcon from "@material-ui/icons/History";
import UpdateIcon from "@material-ui/icons/Update";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Layout from "../../layout";
import SaveIcon from "@material-ui/icons/Save";
import RentalCarRequest from "./RentalCarRequest";
import CarInformationProfile from "./CarInformationProfile";
import BookingRequest from "./BookingRequest";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  typography: {
    width: "100%",
  },
  textField: {
    width: "90%",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const userLogged = useSelector((state) => state.auth.user);
  const [tab, setTab] = useState(0);

  const handleSetTab = (event, newTab) => {
    setTab(newTab);
  };
  const onAddressUpdate = () => {};
  return (
    <Layout name="Profile">
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={3} sm={3}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tab}
              onChange={handleSetTab}
              aria-label="Vertical tabs example"
            >
              <Tab
                icon={<AccountCircleIcon />}
                label="Personal Information"
                {...a11yProps(0)}
              />
              <Tab icon={<DriveEtaIcon />} label="My Cars" {...a11yProps(1)} />
              <Tab
                icon={<PaymentIcon />}
                label="Payment Method"
                {...a11yProps(2)}
              />
              <Tab
                icon={<HistoryIcon />}
                label="My Booking"
                {...a11yProps(3)}
              />
              <Tab
                icon={<UpdateIcon />}
                label="Lease History"
                {...a11yProps(4)}
              />
            </Tabs>
          </Grid>
          <Grid item xs={9} sm={9}>
            <TabPanel value={tab} index={0}>
              <h2>Personal Information</h2>
              <Grid container spacing={2}>
                <Grid item lg={12}>
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src={userLogged.photoURL}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    id="standard-helperText"
                    label="Full Name"
                    className={classes.textField}
                    defaultValue={userLogged.displayName}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    id="standard-helperText"
                    label="Email"
                    defaultValue={userLogged.email}
                    className={classes.textField}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
              <h2>Physical Address</h2>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard"
                    label="City"
                    defaultValue={userLogged.city}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard"
                    label="District"
                    className={classes.textField}
                    defaultValue={userLogged.district}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard"
                    label="Ward"
                    defaultValue={userLogged.ward}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard"
                    label="Address"
                    defaultValue={userLogged.street}
                    className={classes.textField}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => onAddressUpdate()}
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <div>
                {/* <h2>Car Information</h2> */}
                <CarInformationProfile />
              </div>
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <h2>Payment Method</h2>
            </TabPanel>
            <TabPanel value={tab} index={3}>
              {/* <h2>Rental Car</h2> */}
              <BookingRequest />
            </TabPanel>
            <TabPanel value={tab} index={4}>
              <h2>Lease History</h2>
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Profile;
