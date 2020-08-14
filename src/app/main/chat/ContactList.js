import React, { useState, useEffect } from "react";
import {
  Avatar,
  Grid,
  makeStyles,
  Badge,
  Typography,
  Box,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../firebase/firebase";
import {
  // getRequestFirebase,
  setSelectedBooking,
  fetchPendingBooking,
} from "./chat.action";
import { withStyles } from "@material-ui/styles";
import BookingStatus from "../user/BookingStatus";
import { BOOKING_STATUS } from "../../../constant";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
  },

  unreadBadge: {
    position: "absolute",
    minWidth: 18,
    height: 18,
    top: 4,
    left: 10,
    borderRadius: 9,
    padding: "0 5px",
    fontSize: 11,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.35)",
    zIndex: 10,
  },
  status: {
    position: "absolute",
    width: 12,
    height: 12,
    bottom: 4,
    left: 44,
    border: "2px solid " + theme.palette.background.default,
    borderRadius: "50%",
    zIndex: 10,

    "&.online": {
      backgroundColor: "#4CAF50",
    },

    "&.do-not-disturb": {
      backgroundColor: "#F44336",
    },

    "&.away": {
      backgroundColor: "#FFC107",
    },

    "&.offline": {
      backgroundColor: "#646464",
    },
  },
  avatar: {
    padding: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  rootAvt: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    float: "right",
    paddingRight: theme.spacing(1),
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);
const ContactList = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const { info } = props || {};
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.user);
  const pendingBookings = useSelector((state) => state.chat.pendingBookings);
  const isRenter = useSelector((state) => state.chat.isRenter);

  const setSelectedContact = (booking) => {
    dispatch(setSelectedBooking(booking));
  };

  useEffect(() => {
    const usersFirebase = firebase.firestore().collection("users");
    async function getImagesContact() {
      const usersInfo = await usersFirebase.get();
      usersInfo.docs.map((doc) => setUsers((users) => [...users, doc.data()]));
    }
    getImagesContact();
    dispatch(
      fetchPendingBooking(
        userLogged.id,
        1,
        100,
        [
          BOOKING_STATUS.PENDING,
          BOOKING_STATUS.CONFIRM,
          BOOKING_STATUS.OWNER_ACCEPTED,
          BOOKING_STATUS.PROCESSING,
        ],
        isRenter
      )
    );
  }, [userLogged.id, info, dispatch, isRenter]);

  const ContactButton = ({
    booking,
    // isActive,
  }) => (
    <Box
      onClick={() => setSelectedContact(booking)}
      className={classes.contactButton}
    >
      <Grid container className="px-8 py-8">
        <Grid item lg></Grid>
        <Grid item container justify="space-between">
          <Grid lg={6} item container justify="flex-start">
            <Grid item>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  src={
                    isRenter
                      ? booking.car.owner.imageUrl
                      : booking.renter.imageUrl
                  }
                />
              </StyledBadge>
            </Grid>
            <Grid item className={classes.button}>
              <Typography variant="subtitle2">
                {isRenter
                  ? booking.car.owner.fullName
                  : booking.renter.fullName}
              </Typography>
              <Typography
                className="text-11"
                color="textSecondary"
                variant="caption"
              >
                Booking Id : {booking.id}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <BookingStatus name={booking.status} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div style={{ width: "100%" }}>
      <Grid>
        {pendingBookings &&
          pendingBookings.map((booking, index) => (
            <Grid
              key={index}
              item
              lg={12}
              className="py-8"
              style={{
                backgroundColor: index % 2 === 0 ? "#F6F6F6" : "#FFFFFF",
              }}
            >
              <ContactButton booking={booking} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ContactList;
