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
  setSelectedUser,
  // getRequestFirebase,
  getBookingRequest,
  updateChip,
} from "./chat.action";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  contactButton: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 8,
    content: "''",
    width: 4,
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
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  // const carDetail = useSelector((state) => state.booking.carDetail);
  // const chip = useSelector((state) => state.chat.chip);
  const { info, renter, chipList } = props || {};
  // const [is]
  // const [chipData, setChipData] = useState([]);
  // console.log(
  //   "Chip list ",
  //   chipList.filter((item) => item.name !== "Insurance" && item.name !== "Indemnification")
  // );
  // console.log(renter);
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.user);
  // const [bookingReq, setBookingReq] = useState([]);

  const setSelectedContact = (id, isRental) => {
    console.log(id, userLogged.id);
    dispatch(setSelectedUser(users.find((u) => u.id === id)));
    const ref = firebase
      .firestore()
      .collection("notification")
      .doc(Boolean(isRental) ? `${id}` : `${userLogged.id}`)
      .collection("requests");
    // .orderBy("createAt", "desc")
    // .limitToLast(10);
    const query = ref
      .where("rent", "==", Boolean(isRental) ? userLogged.id : id)
      // .orderBy("createAt", "desc")
      // .limit(1)
      // .limitToLast(10)
      .get()
      .then(function (querySnapshot) {
        console.log(querySnapshot.docs[0].data().bookingId);
        dispatch(getBookingRequest(querySnapshot.docs[0].data().bookingId));
        // querySnapshot.forEach(function (doc) {
        //   console.log(doc.data().bookingId);

        //   dispatch(getBookingRequest(doc.data().bookingId));
        // });
      })
      // .onSnapshot((ns) => {
      //   console.log(ns.data().bookingId);
      //   dispatch(getBookingRequest(ns.data().bookingId));
      // })
      .catch(function (error) {
        console.log(error);
      });
    console.log(query);
    // async function getR
    if (isRental) {
      dispatch(
        updateChip(
          chipList.filter(
            (item) =>
              item.name !== "Insurance" && item.name !== "Indemnification"
          )
        )
      );
    } else {
      dispatch(
        updateChip(
          chipList.filter(
            (item) =>
              item.name !== "Mileage limit" &&
              item.name !== "Extra" &&
              item.name !== "Deposit"
          )
        )
      );
    }
  };

  useEffect(() => {
    const usersFirebase = firebase.firestore().collection("users");
    async function getImagesContact() {
      const usersInfo = await usersFirebase.get();
      usersInfo.docs.map((doc) => setUsers((users) => [...users, doc.data()]));
    }
    getImagesContact();
    // setChipData(chipList);
  }, [userLogged.id, info]);
  const ContactButton = ({
    displayName,
    email,
    photoURL,
    id,
    isActive,
    isRental,
  }) => (
    <Box
      onClick={() => setSelectedContact(id, isRental)}
      className={isActive ? classes.contactButton : ""}
    >
      <Grid container className="px-8 py-8">
        <Grid item lg>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar src={photoURL} />
          </StyledBadge>
        </Grid>
        <Grid lg={10} item>
          <Typography component="span" className="normal-case font-600 flex">
            {displayName}
          </Typography>
          <Typography
            className="text-11"
            color="textSecondary"
            variant="caption"
          >
            {email}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div style={{ width: "100%" }}>
      {info !== undefined ? (
        <Grid>
          {users
            .filter(
              (user) =>
                user.email !== userLogged.email && user.id === info.owner.id
            )
            .map((user, index) => (
              <Grid
                key={user.id}
                item
                lg={12}
                className="py-8"
                style={{
                  backgroundColor: index % 2 === 0 ? "#F6F6F6" : "#FFFFFF",
                }}
              >
                <ContactButton
                  {...user}
                  isActive={user.id === selectedUser.id}
                  isRental={true}
                />
              </Grid>
            ))}
          {/* {chipList.filter((item) => item.name !== "Extra")} */}
          {/* {console.log(chipList)} */}
        </Grid>
      ) : (
        <Grid>
          {users
            // .filter(
            //   (request) => {
            //     return renter.some((f) => {
            //       return f.email === request.email;
            //     });
            //   }
            // )
            .map((user, index) => (
              <Grid
                key={user.id}
                item
                lg={12}
                className="py-8"
                style={{
                  backgroundColor: index % 2 === 0 ? "#F6F6F6" : "#FFFFFF",
                }}
              >
                <ContactButton
                  {...user}
                  isActive={user.id === selectedUser.id}
                  isRental={false}
                />
                {/* {dispatch(initChip(chipList))} */}
              </Grid>
            ))}
          {/* {setChipData} */}
          {/* {chipList.filter((item) => item.name !== "Extra")} */}
          {/* {console.log(chipList)} */}
        </Grid>
      )}
    </div>
  );
};

export default ContactList;
