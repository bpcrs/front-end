import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Popover,
  Typography,
  Grid,
  Chip,
  Card,
  CardActionArea,
  Badge,
} from "@material-ui/core";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../firebase/firebase";
import { makeStyles } from "@material-ui/styles";
import { APP_PATH, BOOKING_STATUS } from "../../../constant";
import { blue, grey, green, red } from "@material-ui/core/colors";
import ReactTimeago from "react-timeago";
// import { theme } from "@chakra-ui/core";
// import { blue } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  notification: {
    padding: theme.spacing(1),
  },
  icon: {
    paddingRight: theme.spacing(1),
  },
  notificationHeader: {
    width: "400px",
    padding: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
    backgroundColor: grey[200],
    color: grey[500],
  },
}));

const Notification = () => {
  // const [notificationMenu, setNotificationMenu] = useState(null);
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userLogged = useSelector((state) => state.auth.user);
  const [notification, setNotification] = useState([]);
  const [hoving, setHoving] = useState();
  const [shadow, setShadow] = useState(0);
  // const [notifyMsg, setNotifyMsg] = useState();
  const notificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = (state, id) => {
    const path = !state ? APP_PATH.CHAT : APP_PATH.PROFILE;
    history.push({
      pathname: path,
    });
    firebase
      .firestore()
      .collection("notification")
      .doc(`${userLogged.email}`)
      .collection("requests")
      .doc(id)
      .update({
        isSeen: true,
      });
  };

  const handleMarkAllRead = () => {
    firebase
      .firestore()
      .collection("notification")
      .doc(`${userLogged.email}`)
      .collection("requests")
      // .orderBy("createAt", "desc")
      // .limitToLast(10)
      .onSnapshot((ns) => {
        ns.forEach((doc) => {
          doc.ref.update({ isSeen: true });
        });
      });
  };
  const renderNotification = (notify) => {
    switch (notify.status) {
      case BOOKING_STATUS.CONFIRM:
        return (
          <Card
            onMouseOver={() => {
              setShadow(4);
              setHoving(notify.createAt);
            }}
            onMouseOut={() => {
              setShadow(0);
              setHoving(0);
            }}
            elevation={notify.createAt === hoving ? shadow : 0}
            onClick={() => handleClick(true, notify.id)}
          >
            <CardActionArea>
              <Grid container className={classes.notification}>
                <Grid
                  lg={4}
                  item
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Chip
                    label={<strong>INFO</strong>}
                    style={{ backgroundColor: green[200], color: green[900] }}
                  />
                </Grid>
                <Grid lg item>
                  <Typography variant="subtitle1">
                    Booking #{notify.bookingId} has been confirmed.
                  </Typography>
                  <Typography variant="caption" style={{ color: grey[500] }}>
                    <ReactTimeago
                      date={new Date(notify.createAt)}
                    ></ReactTimeago>
                  </Typography>
                </Grid>
                <Grid
                  lg={1}
                  item
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Badge
                    variant="dot"
                    color="primary"
                    invisible={notify.isSeen}
                  />
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        );
      case BOOKING_STATUS.DENY:
        return (
          <Card
            onMouseOver={() => {
              setShadow(4);
              setHoving(notify.createAt);
            }}
            onMouseOut={() => {
              setShadow(0);
              setHoving(0);
            }}
            elevation={notify.createAt === hoving ? shadow : 0}
            onClick={() => handleClick(true, notify.id)}
          >
            <CardActionArea>
              <Grid container className={classes.notification}>
                <Grid
                  lg={4}
                  item
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Chip
                    label={<strong>INFO</strong>}
                    style={{ backgroundColor: red[200], color: red[900] }}
                  />
                </Grid>
                <Grid lg item>
                  <Typography variant="subtitle1">
                    Booking #{notify.bookingId} has been denied.
                  </Typography>
                  <Typography variant="caption" style={{ color: grey[500] }}>
                    <ReactTimeago
                      date={new Date(notify.createAt)}
                    ></ReactTimeago>
                  </Typography>
                </Grid>
                <Grid
                  lg={1}
                  item
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Badge
                    variant="dot"
                    color="primary"
                    invisible={notify.isSeen}
                  />
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        );
      case BOOKING_STATUS.REQUEST:
        return (
          <Card
            onMouseOver={() => {
              setShadow(4);
              setHoving(notify.createAt);
            }}
            onMouseOut={() => {
              setShadow(0);
              setHoving(0);
            }}
            elevation={notify.createAt === hoving ? shadow : 0}
            onClick={() => handleClick(true, notify.id)}
          >
            <CardActionArea>
              <Grid container className={classes.notification}>
                <Grid
                  lg={4}
                  item
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Chip
                    label={<strong>INFO</strong>}
                    style={{ backgroundColor: blue[200], color: blue[900] }}
                  />
                </Grid>
                <Grid lg item>
                  <Typography variant="subtitle1">
                    Booking #{notify.bookingId} has been requested.
                  </Typography>
                  <Typography variant="caption" style={{ color: grey[500] }}>
                    <ReactTimeago
                      date={new Date(notify.createAt)}
                    ></ReactTimeago>
                  </Typography>
                </Grid>
                <Grid
                  lg={1}
                  item
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Badge
                    variant="dot"
                    color="primary"
                    invisible={notify.isSeen}
                  />
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        );
      case BOOKING_STATUS.PENDING:
        return (
          <Card
            onMouseOver={() => {
              setShadow(4);
              setHoving(notify.createAt);
            }}
            onMouseOut={() => {
              setShadow(0);
              setHoving(0);
            }}
            elevation={notify.createAt === hoving ? shadow : 0}
            onClick={() => handleClick(true, notify.id)}
          >
            <CardActionArea>
              <Grid container className={classes.notification}>
                <Grid
                  lg={4}
                  item
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Chip
                    label={<strong>INFO</strong>}
                    style={{ backgroundColor: green[200], color: green[900] }}
                  />
                </Grid>
                <Grid lg item>
                  <Typography variant="subtitle1">
                    Booking #{notify.bookingId} was accepted.
                  </Typography>
                  <Typography variant="caption" style={{ color: grey[500] }}>
                    <ReactTimeago
                      date={new Date(notify.createAt)}
                    ></ReactTimeago>
                  </Typography>
                </Grid>
                <Grid
                  lg={1}
                  item
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Badge
                    variant="dot"
                    color="primary"
                    invisible={notify.isSeen}
                  />
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        );
      case BOOKING_STATUS.OWNER_ACCEPTED:
        return (
          <Card
            onMouseOver={() => {
              setShadow(4);
              setHoving(notify.createAt);
            }}
            onMouseOut={() => {
              setShadow(0);
              setHoving(0);
            }}
            elevation={notify.createAt === hoving ? shadow : 0}
            onClick={() => handleClick(true, notify.id)}
          >
            <CardActionArea>
              <Grid container className={classes.notification}>
                <Grid
                  lg={4}
                  item
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Chip
                    label={<strong>INFO</strong>}
                    style={{ backgroundColor: green[200], color: green[900] }}
                  />
                </Grid>
                <Grid lg item>
                  <Typography variant="subtitle1">
                    Booking #{notify.bookingId} already for trip.
                  </Typography>
                  <Typography variant="caption" style={{ color: grey[500] }}>
                    <ReactTimeago
                      date={new Date(notify.createAt)}
                    ></ReactTimeago>
                  </Typography>
                </Grid>
                <Grid
                  lg={1}
                  item
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Badge
                    variant="dot"
                    color="primary"
                    invisible={notify.isSeen}
                  />
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        );
      case "DENYCAR":
        return (
          <Typography onClick={() => handleClick(true)}>
            {notify.message}
          </Typography>
        );
      case "ACCEPTCAR":
        return (
          <Typography onClick={() => handleClick(true)}>
            your car is accept!
          </Typography>
        );
      default:
        console.log(notify);
    }
  };

  const notficationClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  useEffect(() => {
    const fetchNotificationFromFirebase = () => {
      firebase
        .firestore()
        .collection("notification")
        .doc(`${userLogged.email}`)
        .collection("requests")
        // .orderBy("createAt", "desc")
        // .limitToLast(10)
        .onSnapshot((ns) => {
          setNotification(
            ns.docs.map((noti) => {
              // dispatch(
              //   showMessage({
              //     message: "Your have new notification",
              //   })
              // );
              const data = noti.data();
              data["id"] = noti.id;
              return data;
            })
          );
        });
    };
    // const fetchNotiCar = () => {
    //   firebase
    //     .firestore()
    //     .collection("notification")
    //     .doc(`${userLogged.email}`)
    //     .collection("Car")
    //     .orderBy("createAt", "desc")
    //     .limitToLast(10)
    //     .onSnapshot((ns) => {
    //       setNotification([
    //         ...notification,
    //         ns.docs.map((noti) => {
    //           dispatch(
    //             showMessage({
    //               message: "Your have new notification",
    //             })
    //           );
    //           return noti.data();
    //         }),
    //       ]);
    //     });
    // };
    // fetchNotiCar();
    fetchNotificationFromFirebase();
    // eslint-disable-next-line
  }, [userLogged.email]);
  return (
    <React.Fragment>
      <Button onClick={notificationClick}>
        <Badge
          badgeContent={notification.filter((item) => !item.isSeen).length}
          color="error"
        >
          <Icon>notifications_outlined</Icon>
        </Badge>
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
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.notificationHeader}
          >
            <Grid item lg={6}>
              <Typography variant="h6">Notifications</Typography>
            </Grid>
            <Grid item lg={6} container justify="flex-end">
              <Button
                variant="text"
                style={{
                  textTransform: "none",
                  color:
                    notification.filter((item) => !item.isSeen).length === 0
                      ? grey[500]
                      : blue[500],
                }}
                onClick={handleMarkAllRead}
                disabled={
                  notification.filter((item) => !item.isSeen).length === 0
                }
                startIcon={<Icon>done_all</Icon>}
              >
                Mark all as read
              </Button>
            </Grid>
            {notification.length === 0 ? (
              <React.Fragment>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <img
                      src="assets/images/notification.jpg"
                      alt="No notification"
                      width="300px"
                      height="300px"
                    ></img>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      You don't have any notifications right now.
                    </Typography>
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : (
                <></>
              )}
          </Grid>
          {notification.length !== 0 &&
            notification
              .sort((first, second) => second.createAt - first.createAt)
              .map((notify) => (
                <div className={classes.notification}>
                  {renderNotification(notify)}
                </div>
              ))}
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
};
export default Notification;
