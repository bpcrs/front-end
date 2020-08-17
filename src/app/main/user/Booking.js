import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Icon,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import RentalCarRequest from "./RentalCarRequest";
import PropTypes from "prop-types";
import BookingFilter from "../user/BookingFilter";
import BookingRequest from "./BookingRequest";
import CalendarApp from "../../calendar/CalendarApp";

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
  root: {},
  card: {
    margin: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Booking = ({ carId }) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [statusFilter, setStatusFilter] = useState();
  const [open, setOpen] = useState(false);
  const [refresh, setRefesh] = useState(1);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleClickRefresh = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setRefesh((refresh) => refresh + 1);
  };

  return (
    <Grid>
      {
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-full h-64" }}
        >
          <Tab
            className="h-64 normal-case"
            label="Rental request"
            {...a11yProps(0)}
          />

          <Tab
            className="h-64 normal-case"
            label="History booking"
            {...a11yProps(1)}
          />
          <Tab
            className="h-64 normal-case"
            label="Calendar"
            {...a11yProps(2)}
          />
        </Tabs>
      }
      <Grid item container lg={12} style={{ minHeight: "480px" }}>
        <Grid item lg={12}>
          <TabPanel value={tabValue} index={0}>
            <Button
              variant="text"
              style={{ textTransform: "none", color: "blue" }}
              onClick={() => handleClickRefresh()}
              startIcon={<Icon>refresh</Icon>}
            >
              Refresh Requests
            </Button>
            <Backdrop
              className={classes.backdrop}
              open={open}
              // onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <RentalCarRequest
              key={refresh}
              carId={carId}
              bookingStatus={"REQUEST"}
            />
          </TabPanel>
        </Grid>
        <Grid item lg={12}>
          <TabPanel value={tabValue} index={1}>
            <Grid container item justify="space-between">
              <Button
                variant="text"
                style={{ textTransform: "none", color: "blue" }}
                onClick={() => handleClickRefresh()}
                startIcon={<Icon>refresh</Icon>}
              >
                Refresh Requests
              </Button>
              <Backdrop
                className={classes.backdrop}
                open={open}
                // onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Grid item lg={6} container justify="flex-end">
                <BookingFilter key={refresh} onFilter={setStatusFilter} />
              </Grid>
            </Grid>
            <Grid item lg={12}>
              <BookingRequest
                key={refresh}
                status={statusFilter}
                carId={carId}
              />
            </Grid>
          </TabPanel>
        </Grid>
        <Grid item lg={12}>
          <TabPanel value={tabValue} index={2} tab={2}>
            <CalendarApp carId={carId} />
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Booking;
