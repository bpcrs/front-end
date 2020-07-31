import React, { useState, useEffect } from "react";
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
  Icon,
} from "@material-ui/core";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types";
import Layout from "../../layout";
import CheckCar from "./CheckCar";
import CheckUser from "./CheckUser";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../auth/store/actions";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";

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

export default function Cheking() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [tab, setTab] = React.useState(0);
  const userLogged = useSelector((state) => state.auth.user);

  const handleSetTab = (event, newTab) => {
    setTab(newTab);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    history.push(APP_PATH.HOME);
  };

  return (
    <Layout name="Checking">
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
              </div>
            </Grid>
            <Grid item lg={2}>
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
              <Typography variant="subtitle2">
                {userLogged.displayName}
              </Typography>
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
              label="Car Approval & Infomation"
              {...a11yProps(0)}
            />
            <Tab
              // icon={<PaymentIcon />}
              label="License Approval"
              {...a11yProps(1)}
            />
            {/* <Tab
              // icon={<HistoryIcon />}
              label="My Booking"
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
            <CheckUser />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <CheckCar />
          </TabPanel>
          <TabPanel value={tab} index={2}></TabPanel>
          <TabPanel value={tab} index={3}></TabPanel>
        </Grid>
      </Grid>
    </Layout>
  );
}
