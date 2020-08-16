import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import SettingIcon from "@material-ui/icons/Settings";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import PublishIcon from "@material-ui/icons/Publish";
import CancelIcon from "@material-ui/icons/Cancel";
import Layout from "../../layout";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  notificationLicenseUser,
  fetchUserDetailChecking,
  approveUser,
} from "./checking.action";
import { updateUserLicense } from "../submitLicense/license.action";

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

export default function UserDetailChecking(props) {
  const classes = useStyles();
  const { userId } = props.location.state;
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.checking.userDetail);
  const [currentUser, setCurrentUser] = useState({});
  const changePage = useSelector((state) => state.checking.changePage);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [linkImage, setLinkImage] = useState([]);
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

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(await fetchUserDetailChecking(userId));
      setCurrentUser(userDetail);

      if (userDetail.imageLicense) {
        setLinkImage(JSON.parse(userDetail.imageLicense));
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail]);

  const handleAcceptUserLicense = () => {
    notificationLicenseUser(
      "Your license have been Accepted",
      currentUser.email,
      true
    );
    dispatch(approveUser(userId, true));
    history.push({
      pathname: APP_PATH.CHECKING,
    });
  };

  const handleSendNotificationCheckLicense = () => {
    notificationLicenseUser(valueCheckBox, currentUser.email, false);
    setOpen(false);

    history.push({
      pathname: APP_PATH.CHECKING,
    });
  };

  return (
    <Layout name="User checking form">
      <Grid spacing={1} container justify="center" alignItems="center">
        <h1>Information User</h1>
      </Grid>

      <Grid container justify="center">
        <Grid item lg={5} xs={12}>
          <Grid item xs={12} sm={6} lg={10}>
            <Card className={classes.card}>
              <Grid spacing={2} container justify="center" alignItems="center">
                <Grid item xs={12} lg={12}>
                  <TextField
                    className={classes.textField}
                    label="Full Name"
                    variant="outlined"
                    value={currentUser.fullName ? currentUser.fullName : ""}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <TextField
                    className={classes.textField}
                    label="Email"
                    variant="outlined"
                    value={currentUser.email ? currentUser.email : ""}
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  className={classes.textField}
                  disabled
                  label="Phone"
                  value={currentUser.phone ? currentUser.phone : ""}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  className={classes.textField}
                  disabled
                  label="Date Join"
                  value={new Date(currentUser.createdDate).toLocaleDateString()}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  className={classes.textField}
                  disabled
                  value={
                    currentUser.identification ? currentUser.identification : ""
                  }
                  label="Identification"
                  variant="outlined"
                />
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Card className={classes.card}>
            <Grid container>
              {linkImage &&
                linkImage.map((image, index) => (
                  <Grid item xs={12} lg={6}>
                    <div style={{ textAlign: "center" }}>
                      <p>Picture {index + 1}</p>
                      <p>
                        <img src={image} id="output" width="200" height="200" />
                      </p>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>

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
              {/* <TextField
                                // className={classes.textField}
                                label="Notification"
                                variant="outlined"
                                onChange={handleChangeInput}
                            /> */}
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
              <Grid container>
                <Grid xs={6} lg={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>

                <Grid item xs={6} lg={6}>
                  <Button
                    variant="contained"
                    color="secondary"
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
    </Layout>
  );
}
