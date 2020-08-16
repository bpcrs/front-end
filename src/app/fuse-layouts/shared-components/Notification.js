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
  Divider,
  IconButton,
} from "@material-ui/core";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../firebase/firebase";
import { makeStyles } from "@material-ui/styles";
import {
  APP_PATH,
  BOOKING_STATUS,
  MY_NOTIFICATION_STATUS,
} from "../../../constant";
import { blue, grey, green, red, yellow } from "@material-ui/core/colors";
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
const NotificationUI = ({ header, createAt, isSeen, type, content }) => {
  const color = {
    info: blue[700],
    warn: yellow[700],
    success: green[700],
    error: red[700],
  };
  const icon = {
    info: "format_quote",
    warn: "info_sharp",
    success: "check_circle_outline",
    error: "highlight_off",
  };
  const classes = useStyles();
  return (
    <CardActionArea>
      <Divider orientation="vertical" flexItem />
      <Grid container className={classes.notification} alignItems="center">
        <Grid lg={2} item container justify="center" alignItems="center">
          <Divider
            orientation="vertical"
            flexItem
            style={{
              width: "5px",
              backgroundColor: color[type],
              fill: color[type],
              borderRadius: "5px",
            }}
          />
          <IconButton style={{ color: color[type] }}>
            <Icon>{icon[type]}</Icon>
          </IconButton>
        </Grid>
        <Grid lg item style={{ marginLeft: "8px" }}>
          <span>
            <Typography variant="subtitle1">{header}</Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              style={{ wordBreak: "break-word", maxWidth: "280px" }}
            >
              {content}
            </Typography>
          </span>
          <Typography variant="caption" style={{ color: grey[500] }}>
            <ReactTimeago date={new Date(createAt)}></ReactTimeago>
          </Typography>
        </Grid>
        <Badge variant="dot" color="primary" invisible={!isSeen} />
      </Grid>
    </CardActionArea>
  );
};
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
      case BOOKING_STATUS.PROCESSING:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case MY_NOTIFICATION_STATUS.YOU_SIGNED:
      case BOOKING_STATUS.RENTER_SIGNED:
        return (
          <NotificationUI
            text="A"
            createAt={notify.status}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case BOOKING_STATUS.BOOKED:
        return (
          <NotificationUI
            content="BOOKED"
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case BOOKING_STATUS.CONFIRM:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case BOOKING_STATUS.DENY:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case BOOKING_STATUS.REQUEST:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case BOOKING_STATUS.OWNER_ACCEPTED:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case BOOKING_STATUS.DENYLICENSE:
        return (
          <NotificationUI
            content={
              <div>
                <div style={{ color: "red" }}>Note:</div>
                <div>
                  <p>{notify.message.checkedA}</p>
                  <p>{notify.message.checkedB}</p>
                  <p>{notify.message.checkedC}</p>
                  <p>{notify.message.checkedD}</p>
                  <p>{notify.message.checkedE}</p>
                </div>
              </div>
            }
            header={notify.status}
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="error"
          />
        );
      case BOOKING_STATUS.ACCEPTLICENSE:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case BOOKING_STATUS.DENYCAR:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case BOOKING_STATUS.ACCEPTCAR:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case MY_NOTIFICATION_STATUS.ACCEPT:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case MY_NOTIFICATION_STATUS.REFUSE:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
        );
      case MY_NOTIFICATION_STATUS.REVOKE:
        return (
          <NotificationUI
            content={notify.status}
            header="OK"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="warn"
          />
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
          setNotification([
            ...notification,
            ...ns.docs.map((noti) => {
              // dispatch(
              //   showMessage({
              //     message: "Your have new notification",
              //   })
              // );
              const data = noti.data();
              data["id"] = noti.id;
              return data;
            }),
          ]);
        });
    };

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
          horizontal: "left",
        }}
        classes={
          {
            // paper: "py-16",
          }
        }
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
                    {renderNotification(notify)}
                  </Card>
                </div>
              ))}
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
};
export default Notification;
