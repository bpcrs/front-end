import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Popover,
  MenuItem,
  Typography,
  Grid,
} from "@material-ui/core";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../firebase/firebase";
import { makeStyles } from "@material-ui/styles";
import { APP_PATH } from "../../../constant";
import { showMessage } from "../../store/actions/fuse";
import { fetchNotification } from "../../main/user/profile.action";
// import { theme } from "@chakra-ui/core";
// import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  notification: {
    padding: theme.spacing(2),
  },
  icon: {
    paddingRight: theme.spacing(1),
  },
}));

const Notification = () => {
  // const [notificationMenu, setNotificationMenu] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userLogged = useSelector((state) => state.auth.user);
  const [notification, setNotification] = useState([]);
  // const [notifyMsg, setNotifyMsg] = useState();
  const notificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const renderNotification = (notify) => {
    console.log(notify.status);
    switch (notify.status) {
      case "CONFIRM":
        return (
          <Typography>
            {" "}
            {notify.owner.fullName} has accepted your booking request{" "}
          </Typography>
        );
      case "DENY":
        return (
          <Typography>
            {" "}
            {notify.owner.fullName} has denied your booking request{" "}
          </Typography>
        );
      case "REQUEST":
        return (
          <Typography>
            {" "}
            {notify.renter.fullName} has requested your car {notify.car.name}{" "}
          </Typography>
        );
      default:
        return <Typography>Nothing</Typography>;
    }
  };

  const notficationClose = () => {
    setAnchorEl(null);
  };
  const handleClick = () => {
    history.push({
      pathname: APP_PATH.CHAT,
      state: {
        notification,
        // bookingInStore,
      },
    });
  };
  // getUsersRequest(notification);
  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  useEffect(() => {
    const fetchNotificationFromFirebase = () => {
      firebase
        .firestore()
        .collection("notification")
        .doc(`${userLogged.email}`)
        .collection("requests")
        .orderBy("createAt", "desc")
        .limitToLast(10)
        .onSnapshot((ns) => {
          setNotification(
            ns.docs.map((noti) => {
              dispatch(
                showMessage({
                  message: "Your have new notification",
                })
              );
              return noti.data();
            })
          );
        });
    };
    fetchNotificationFromFirebase();
    // eslint-disable-next-line
  }, [userLogged.email]);
  return (
    <React.Fragment>
      <Button className="h-64" onClick={notificationClick}>
        <Icon style={{ color: "red" }}>notifications_active</Icon>
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={notficationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        <React.Fragment>
          {notification.length !== 0 &&
            notification
              .sort((first, second) => first.createAt - second.createAt)
              .map((notify) => (
                <Grid className={classes.notification} onClick={handleClick}>
                  <MenuItem>
                    <Icon style={{ color: "blue" }} className={classes.icon}>
                      chat
                    </Icon>
                    {renderNotification(notify)}
                  </MenuItem>
                </Grid>
              ))}
        </React.Fragment>
        {notification.length === 0 ? (
          <React.Fragment>
            <Typography>No new notification</Typography>
          </React.Fragment>
        ) : (
          ""
        )}
      </Popover>
    </React.Fragment>
  );
};
export default Notification;
