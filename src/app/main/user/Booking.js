import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Tabs, Tab, Box, Typography } from "@material-ui/core";
import RentalCarRequest from "./RentalCarRequest";
import PropTypes from "prop-types";

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

const Booking = (props) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const { carId } = props;

  const handleChangeTab = (event, newValue) => {
    // console.log("value", value);
    setTabValue(newValue);
  };

  return (
    <Grid>
      {
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
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
            label="Pending request"
            {...a11yProps(1)}
          />
          <Tab
            className="h-64 normal-case"
            label="History booking"
            {...a11yProps(2)}
          />
        </Tabs>
      }
      <Grid>
        <TabPanel value={tabValue} index={0}>
          <RentalCarRequest carId={carId} bookingStatus={"REQUEST"} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <RentalCarRequest carId={carId} bookingStatus={"PENDING"} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <RentalCarRequest carId={carId} bookingStatus={"CONFIRM"} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default Booking;
