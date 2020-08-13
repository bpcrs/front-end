import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Icon,
  Chip,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../layout";
import { logoutUser } from "../../auth/store/actions";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import MyBooking from "./MyBooking";
import MyCar from "./MyCar";
import MyLicense from "../submitLicense/MyLicense";
import { green, red } from "@material-ui/core/colors";
import VerifyOTP from "./VerifyOTP";
import { useEffect } from "react";
import { resetFlagCreateBooking } from "../booking/booking.action";
import { checkVerifyRequest } from "./profile.action";

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
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.user);
  const history = useHistory();
  const [tab, setTab] = useState(0);
  const isVerified = useSelector((state) => state.profile.isVerify);
  const handleSetTab = (event, newTab) => {
    setTab(newTab);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    history.push(APP_PATH.HOME);
  };

  useEffect(() => {
    dispatch(resetFlagCreateBooking());
    dispatch(checkVerifyRequest());
  }, [dispatch]);
  return (
    <Layout name="Profile">
      <div className={classes.root}>
        <Grid container>
          <h2>Personal Information</h2>
          <Grid container spacing={2}>
            <Grid item lg={12} container>
              <Grid item lg={1}>
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={userLogged.photoURL}
                />
              </Grid>
              <Grid item lg>
                <div className="hidden md:flex flex-col ml-12 items-start">
                  <Typography
                    variant="h5"
                    // className="normal-case font-1000 flex"
                  >
                    {userLogged.displayName}
                  </Typography>
                  <Typography
                    className="text-11 capitalize"
                    color="textSecondary"
                    variant="overline"
                  >
                    {userLogged.role}
                  </Typography>
                  {!isVerified && (
                    <VerifyOTP
                      content=" Please verify you phone before renting or register new car"
                      title="Verify Phone number"
                    >
                      <Chip
                        icon={
                          <Icon style={{ color: red[600] }}>check_circle</Icon>
                        }
                        label="Unverified Member"
                        style={{ color: red[600], backgroundColor: red[50] }}
                      />
                    </VerifyOTP>
                  )}
                  {isVerified && (
                    <Chip
                      icon={
                        <Icon style={{ color: green[600] }}>check_circle</Icon>
                      }
                      label="Verified Member"
                      style={{ color: green[600], backgroundColor: green[50] }}
                    />
                  )}
                  {/* <Chip
                    icon={
                      <Icon style={{ color: green[600] }}>check_circle</Icon>
                    }
                    label="Verified Member"
                    style={{ color: green[600], backgroundColor: green[50] }}
                  /> */}
                </div>
              </Grid>
              <Grid item lg={2}>
                <Typography
                  className="text-11 capitalize"
                  color="textSecondary"
                  // variant="overline"
                >
                  <MyLicense />
                </Typography>
                <Button
                  variant="text"
                  style={{ textTransform: "none", color: "red" }}
                  onClick={handleLogout}
                  startIcon={<Icon>settings_power</Icon>}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
            <Grid item lg={12} container>
              <Grid item lg={2}></Grid>
              <Grid item lg={5}>
                <Typography variant="subtitle1">PHONE</Typography>
                <Typography variant="subtitle2">{userLogged.phone} </Typography>
                {/* <Typography>{userLogged.displayName}</Typography> */}
              </Grid>
              <Grid item lg={5}>
                <Typography variant="subtitle1">EMAIL</Typography>
                <Typography variant="subtitle2">{userLogged.email}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Tabs
              orientation="horizontal"
              variant="scrollable"
              value={tab}
              onChange={handleSetTab}
              aria-label="Vertical tabs example"
            >
              <Tab
                // icon={<DriveEtaIcon />}
                label="Car Information"
                {...a11yProps(0)}
              />
              <Tab
                // icon={<HistoryIcon />}
                label="My Booking"
                {...a11yProps(1)}
              />
              {/* <Tab
                // icon={<PaymentIcon />}
                label="Payment Method"
                {...a11yProps(2)}
              />
              <Tab
                // icon={<UpdateIcon />}
                label="Lease History"
                {...a11yProps(3)}
              /> */}
            </Tabs>
          </Grid>
          <Grid item xs={9} sm={9}>
            <TabPanel value={tab} index={0}>
              <MyCar />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <MyBooking />
            </TabPanel>
            {/* <TabPanel value={tab} index={2}></TabPanel> */}
            {/* <TabPanel value={tab} index={3}></TabPanel> */}
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Profile;
