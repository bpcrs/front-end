import React, { useEffect } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Badge,
  makeStyles,
  Paper,
  Box,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import ContactList from "./ContactList";
import { useSelector, useDispatch } from "react-redux";
import Chat from "./Chat";
import {
  fetchCriteriaList,
  fetchAgreementList,
  setIsRenterBooking,
} from "./chat.action";
import StepAgreement from "./StepAgreement";
import BookingStatus from "../user/BookingStatus";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { FuseScrollbars } from "../../../@fuse";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    float: "right",
    paddingRight: theme.spacing(1),
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  spacingCard: {
    marginTop: theme.spacing(1),
    marginLeft: 0,
    marginRight: 0,
  },
  paper: {
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  contactList: {
    // width: 1000,
    height: 750,
  },
  content: {
    flex: "1 1 auto",
    width: "100%",
    height: "100%",
    overflow: "auto",
    "-webkit-overflow-scrolling": "touch",
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

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
  root: {
    width: "100%",
  },
}))(ToggleButtonGroup);

export default function ToggleButtons() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [alignment, setAlignment] = React.useState("left");
  const isRenter = useSelector((state) => state.chat.isRenter);

  const handleAlignment = (event, role) => {
    // setAlignment(newAlignment);
    dispatch(setIsRenterBooking(role));
  };

  return (
    <div>
      <Paper elevation={1} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          value={isRenter}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            value={true}
            aria-label="left aligned"
            className="w-1/2"
          >
            <Typography variant="caption" color="error">
              Renter
            </Typography>
          </ToggleButton>
          <ToggleButton
            value={false}
            aria-label="right aligned"
            className="w-1/2"
          >
            <Typography variant="caption" color="secondary">
              Owner
            </Typography>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}

const User = ({ displayName, email, photoURL }) => {
  return (
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
        <Typography className="text-11" color="textSecondary" variant="caption">
          {email}
        </Typography>
      </Grid>
      <Grid lg={12} item>
        <ToggleButtons />
      </Grid>
    </Grid>
  );
};

const UserSelected = () => {
  const selectedBooking = useSelector((state) => state.chat.selectedBooking);
  return (
    <Box
    // onClick={() => setSelectedContact(booking)}
    // className={classes.contactButton}
    >
      {/* {console.log(booking)} */}
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
            <Avatar src={selectedBooking.car.owner.imageUrl} />
          </StyledBadge>
        </Grid>
        <Grid lg={10} item>
          {/* <Grid container lg={4}> */}
          <Typography variant="subtitle2">
            {selectedBooking.car.name} - {selectedBooking.car.owner.fullName}
          </Typography>
          <Typography
            className="text-11"
            color="textSecondary"
            variant="caption"
          >
            Booking Id : {selectedBooking.id} -{" "}
            <BookingStatus name={selectedBooking.status} />
          </Typography>

          {/* </Grid> */}
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export const ChatArea = (props) => {
  const userLogged = useSelector((state) => state.auth.user);
  const { carDetail, notification } = props.location.state || {};
  const chip = useSelector((state) => state.chat.chip);
  const selectedBooking = useSelector((state) => state.chat.selectedBooking);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    function initDataFromAPI() {
      dispatch(fetchCriteriaList());
      dispatch(fetchAgreementList(selectedBooking.id));
    }
    initDataFromAPI();
  }, [dispatch, selectedBooking]);
  return (
    <Grid container>
      <Paper elevation={5} style={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          style={{ height: "inherit" }}
        >
          <Grid
            item
            container
            lg={4}
            direction="column"
            className="px-16 py-16"
            justify="center"
            alignContent="flex-start"
          >
            <User {...userLogged} />
          </Grid>
          <Grid
            item
            container
            lg={4}
            direction="column"
            className="px-16 py-16"
            justify="center"
            alignContent="flex-start"
            style={{ backgroundColor: "#E6E6E6" }}
          >
            {selectedBooking.id && <UserSelected {...selectedBooking} />}
            {/* <ViewBookingDialog info={booking} /> */}
          </Grid>
          <Grid
            item
            container
            lg={4}
            direction="column"
            justify="center"
            alignContent="center"
            style={{ backgroundColor: "#E6E6E6" }}
          >
            {selectedBooking.id && <StepAgreement />}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          style={{ height: "inherit", backgroundColor: "#F6F6F6" }}
        >
          <Grid
            item
            container
            lg={4}
            direction="column"
            // className="px-8 py-8"
            justify="flex-start"
            alignContent="flex-start"
            className={classes.contactList}
          >
            <FuseScrollbars className={classes.content}>
              <ContactList
                info={carDetail}
                renter={notification}
                chipList={chip}
              />
            </FuseScrollbars>
          </Grid>
          <Grid
            item
            container
            lg={8}
            direction="column"
            className="px-8 py-8"
            justify="flex-start"
            alignContent="flex-start"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <Chat />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
