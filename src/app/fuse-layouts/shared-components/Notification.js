import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Popover,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Badge,
  Divider,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../firebase/firebase";
import { makeStyles } from "@material-ui/styles";
import { APP_PATH, BOOKING_STATUS } from "../../../constant";
import { blue, grey, green, red, yellow } from "@material-ui/core/colors";
import moment from "moment";

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
            {moment.utc(createAt).local().fromNow()}
          </Typography>
        </Grid>
        <Badge variant="dot" color="primary" invisible={isSeen} />
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
    const isOwner = notify.renter.id !== userLogged.id;
    switch (notify.status) {
      case BOOKING_STATUS.PROCESSING:
        return (
          <NotificationUI
            content={
              isOwner
                ? `Your car rental period begin of booking #${notify.bookingId} now.`
                : "The car already for trip"
            }
            header={isOwner ? "Rental started" : "Trip already"}
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="info"
          />
        );
      case BOOKING_STATUS.RENTER_SIGNED:
        return (
          <NotificationUI
            content={
              isOwner
                ? `Contract of booking #${notify.bookingId} has been signed by ${notify.renter.fullName}.`
                : `You have sign the contract of booking #${notify.bookingId}.`
            }
            header={isOwner ? "Your turn" : "Signing success"}
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="success"
          />
        );
      case BOOKING_STATUS.CONFIRM:
        return (
          <NotificationUI
            content={
              isOwner
                ? `Agreements of booking #${notify.bookingId} successfully, contract is ready.`
                : `Agreements of booking #${notify.bookingId} successfully, waiting to sign.`
            }
            header="Agreements successfully"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="success"
          />
        );
      case BOOKING_STATUS.DONE:
        return (
          <NotificationUI
            content={
              isOwner
                ? `Rental of booking #${notify.bookingId} is completed. Please enable status "AVAILABLE" for countinutes rental.`
                : `Thanks for choose ${notify.owner.fullName}'s car for booking #${notify.bookingId}. Please review the trip now.`
            }
            header="Success"
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="success"
          />
        );
      case BOOKING_STATUS.DENY:
        return (
          <NotificationUI
            content={
              isOwner
                ? `You had denied booking #${notify.bookingId}.`
                : `Your booking #${notify.bookingId} has been denied.`
            }
            header="Opps :( "
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="error"
          />
        );
      case BOOKING_STATUS.REQUEST:
        return (
          <NotificationUI
            content={
              isOwner
                ? `You receive new request rental for car "${notify.car.name}".`
                : `You has requested for rental car "${notify.car.name}".`
            }
            header={isOwner ? "New Request" : "Requested"}
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="info"
          />
        );
      case BOOKING_STATUS.PENDING:
        return (
          <NotificationUI
            content={
              isOwner
                ? `You accepted request booking ${notify.bookingId} from ${notify.renter.fullName}. Please join chat for agreeemnts.`
                : `${notify.car.owner.fullName} accepted you request. Please join chat for agreeemnts.`
            }
            header={isOwner ? "Accepted" : "Chat now"}
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="info"
          />
        );
      case BOOKING_STATUS.OWNER_ACCEPTED:
        return (
          <NotificationUI
            content={
              isOwner
                ? `You accepted all agreements of booking #${notify.bookingId}.`
                : `${notify.car.owner.fullName} accepted all agreements of booking #${notify.bookingId}. Please confirm to completed agreements.`
            }
            header={isOwner ? "Accepted" : "Owner accepted"}
            createAt={notify.createAt}
            isSeen={notify.isSeen}
            type="success"
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
            content={isOwner ? "1" : "2"}
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
      default:
        console.log(notify);
    }
  };

  const notficationClose = () => {
    setAnchorEl(null);
  };
  const [total, setTotal] = useState(10);
  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;
  const [loading, setLoading] = useState(false);

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
        style={{
          maxHeight: "80vh",
        }}
        onScroll={(e) => {
          if (
            e.target.scrollHeight - e.target.scrollTop ===
            e.target.clientHeight
          ) {
            if (total <= notification.length) {
              setLoading(true);
              setTimeout(() => {
                setTotal((total) => total + 3);
                setLoading(false);
              }, 2000);
            }
          }
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
            {notification.length === 0 && !loading ? (
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
              .slice(0, total)
              .map((notify) => (
                <div className={classes.notification}>
                  <Card
                    onMouseOver={() => {
                      setHoving(notify.id);
                    }}
                    onMouseOut={() => {
                      setHoving(0);
                    }}
                    elevation={notify.id === hoving ? 4 : 0}
                    onClick={() => handleClick(true, notify.id)}
                  >
                    {renderNotification(notify)}
                  </Card>
                </div>
              ))}
        </React.Fragment>
        {loading && <LinearProgress style={{ height: "8px", width: "100%" }} />}
      </Popover>
    </React.Fragment>
  );
};
export default Notification;
