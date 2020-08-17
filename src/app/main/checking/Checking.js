import React from "react";
import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Icon,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Layout from "../../layout";
import CheckCar from "./CheckCar";
import CheckUser from "./CheckUser";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../auth/store/actions";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import ManageBrand from "./ManageBrand";
import Widget from "../checking/Widget";
import BookingWidget from "../checking/BookingWidget";
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

export default function Cheking() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tab, setTab] = React.useState(0);

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
        <h2>Admin page</h2>
        <Grid container spacing={2}>
          <Grid item lg={12} container>
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
            <div className="widget flex w-full sm:w-1/3 p-16">
              <Widget />
            </div>
            <div className="widget flex w-full sm:w-1/3 p-16">
              <BookingWidget />
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={tab}
            onChange={handleSetTab}
            aria-label="Vertical tabs example"
            indicatorColor="primary"
            textColor="primary"
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
            <Tab
              // icon={<HistoryIcon />}
              label="Manage brand"
              {...a11yProps(2)}
            />
            <Tab
              // icon={<UpdateIcon />}
              label="Manage model"
              {...a11yProps(3)}
            />
          </Tabs>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TabPanel value={tab} index={0}>
            <CheckCar />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <CheckUser />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <ManageBrand />
          </TabPanel>
          <TabPanel value={tab} index={3}></TabPanel>
        </Grid>
      </Grid>
    </Layout>
  );
}
