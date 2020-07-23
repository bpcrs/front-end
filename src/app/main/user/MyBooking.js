import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Grid, Tabs, Tab, Box, Typography } from "@material-ui/core";

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
  root: {},
  card: {
    margin: theme.spacing(2),
  },
  status: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.info,
  },
}));

const MyBooking = () => {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const handleChangeTab = (event, newValue) => {
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
            label="My booking request"
            {...a11yProps(0)}
          />
          <Tab
            className="h-64 normal-case"
            label="Pending requests"
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
          <BookingRequest status={"REQUEST"} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <BookingRequest status={"PENDING"} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <BookingRequest status={"DONE"} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default MyBooking;
