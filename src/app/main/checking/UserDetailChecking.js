import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PublishIcon from "@material-ui/icons/Publish";
import CancelIcon from "@material-ui/icons/Cancel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { notificationLicenseUser, approveUser } from "./checking.action";
import { updateUserLicense } from "../submitLicense/license.action";
import PropTypes from "prop-types";
import { showMessageSuccess } from "../../store/actions/fuse";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
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

export default function UserDetailChecking({ user, callback }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [linkImage, setLinkImage] = useState(JSON.parse(user.imageLicense));
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const reason1 = "License not clear";
  const reason2 = "Identification not clear";
  const reason3 = "Don't have Identificatoin";
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

  const handleAcceptUserLicense = () => {
    notificationLicenseUser(
      "Your license have been Accepted",
      user.email,
      true,
      user
    );
    dispatch(approveUser(user.id, true));
    callback();
  };

  const handleSendNotificationCheckLicense = () => {
    notificationLicenseUser(valueCheckBox, user.email, false, user);
    dispatch(showMessageSuccess("Denied success"));
    setOpen(false);
    callback();
  };

  const handleSetTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
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
          <Tab label="User Infomation" {...a11yProps(0)} />
          <Tab label="License Image" {...a11yProps(1)} />
          {/* <Tab label="Indentification Image" {...a11yProps(2)} /> */}
        </Tabs>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TabPanel value={tab} index={0} tab={0}>
          <Grid item lg={12} xs={12}>
            <Grid item xs={12} sm={12} lg={12}>
              <Grid spacing={2} container justify="center" alignItems="center">
                <Grid item xs={12} lg={12}>
                  <TextField
                    className={classes.textField}
                    label="Full Name"
                    variant="outlined"
                    value={user.fullName ? user.fullName : ""}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <TextField
                    className={classes.textField}
                    label="Email"
                    variant="outlined"
                    value={user.email ? user.email : ""}
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  className={classes.textField}
                  disabled
                  label="Phone"
                  value={user.phone ? user.phone : ""}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  className={classes.textField}
                  disabled
                  label="Date Join"
                  value={new Date(user.createdDate).toLocaleDateString()}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  className={classes.textField}
                  disabled
                  value={user.identification ? user.identification : ""}
                  label="Identification"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tab} index={1} tab={1}>
          <Grid container>
            {linkImage &&
              linkImage.map((image, index) => (
                <Grid item xs={12} lg={6}>
                  <div style={{ textAlign: "center" }}>
                    <p>Picture {index + 1}</p>
                    <p>
                      <img
                        alt={index}
                        src={image}
                        id="output"
                        width="200"
                        height="200"
                      />
                    </p>
                  </div>
                </Grid>
              ))}
          </Grid>
        </TabPanel>
        {/* <TabPanel value={tab} index={2} tab={2}></TabPanel> */}
        <Grid container justify="center">
          <Grid item xs={6} lg={6}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PublishIcon />}
              style={{ marginLeft: "30%" }}
              onClick={handleAcceptUserLicense}
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
              onClick={() => {
                setOpen(true);
              }}
            >
              Deny
            </Button>

            <Dialog open={open}>
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
                <Grid item container justify="space-around">
                  <Grid item>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red" }}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSendNotificationCheckLicense}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
