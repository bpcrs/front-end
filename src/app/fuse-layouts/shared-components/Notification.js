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
import { useSelector } from "react-redux";
import firebase from "../../firebase/firebase";
import { makeStyles } from "@material-ui/styles";
import { APP_PATH } from "../../../constant";
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
  // const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notification, setNotification] = useState([]);
  const userLogged = useSelector((state) => state.auth.user);
  // console.log("User ", userLogged.displayName);
  // console.log("Notification ", notification);
  const notificationClick = (event) => {
    setAnchorEl(event.currentTarget);
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
    setNotification([]);
    async function getNotificationFromFirebase() {
      // const userId = userLogged.id
      await firebase
        .firestore()
        .collection("notification")
        .doc(`${userLogged.id}`)
        .collection("requests")
        //   .get();
        // return snapshot
        //   .docs.map((doc))

        //   .collection("info")
        .orderBy("createAt", "asc")
        .limitToLast(10)
        .onSnapshot((ns) => {
          setNotification([]);
          ns.docs.map(
            (notify) => setNotification((noti) => [...noti, notify.data()])
            // getUsersRequest((noti) => [...noti, notify.data()]);
          );
        });
    }
    // dispatch(getUsersRequest(notification));
    getNotificationFromFirebase();
  }, [userLogged.id]);
  return (
    <React.Fragment>
      <Button className="h-64" onClick={notificationClick}>
        {/* <div className="hidden md:flex flex-col ml-12 items-start">
          </div> */}

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
                    <Typography>
                      {notify.displayName} request to rental you at car{" "}
                      {notify.car}
                    </Typography>
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
