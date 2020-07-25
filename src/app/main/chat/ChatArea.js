import React, { useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Badge,
  makeStyles,
  Paper,
  Chip,
  Icon,
  Button,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  FormControl,
  TextField,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/styles";
import ContactList from "./ContactList";
import { useSelector, useDispatch } from "react-redux";
import Chat from "./Chat";
// import CarItem from ".././booking/CarItem";
import {
  openAgreement,
  fetchCriteriaList,
  createAgreement,
} from "./chat.action";
import StepAgreement from "./StepAgreement";
// import ViewBooking from "../booking/ViewBooking";
// import { fetchBookingRequest } from "../booking/booking.action";
// import { data } from "autoprefixer";

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
    </Grid>
  );
};

const UserSelected = ({ displayName, email, photoURL }) => {
  const booking = useSelector((state) => state.chat.booking);
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
        {/* {id === userLogged.id} */}
        <ViewBookingDialog info={booking} />
      </Grid>
    </Grid>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ViewBookingDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const booking = useSelector((state) => state.chat.booking);
  const { info } = props;
  // console.log(info);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        View booking info
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <div>
          <Card>
            <CardContent>
              {/* <ViewBooking info = { booking } /> */}
              <Grid container>
                <Grid item xs={12} xl={6}>
                  <Typography variant="subtitle1">
                    PICK UP & DESTINAION
                  </Typography>
                </Grid>
                <Grid item xs={12} xl={6} justify="flex-end" container>
                  <FormControl fullWidth className={classes.spacingCard}>
                    <TextField
                      id="pickup-basic"
                      label="Pickup"
                      variant="outlined"
                      fullWidth
                      disabled
                      // value="61 Hang Tre"
                      value={
                        info.description ? info.description : "61 Hang Tre"
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth className={classes.spacingCard}>
                    <TextField
                      id="destinaion-basic"
                      label="Destinaion"
                      variant="outlined"
                      fullWidth
                      disabled
                      // value="TP HCM"
                      value={info.destination ? info.destination : "TP HCM"}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
        <div className={classes.spacingCard}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    TRIP DURATION{" ("}
                    {Math.round(
                      (new Date(info.toDate) - new Date(info.fromDate)) /
                        (1000 * 60 * 60 * 24)
                    ) + 1}{" "}
                    days)
                  </Typography>
                </Grid>

                <Grid item xl={5} lg={5} container direction="row" spacing={1}>
                  <Grid
                    item
                    xs={6}
                    xl={6}
                    lg={6}
                    style={{ textAlign: "right" }}
                  >
                    <Typography variant="h4">
                      {new Date(info.fromDate).getDate()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} xl={6} lg={6}>
                    <Grid>
                      <Typography variant="caption">
                        {`${new Date(info.fromDate).toLocaleString("default", {
                          month: "short",
                        })}-${new Date(info.fromDate).getFullYear()}`}
                      </Typography>
                      <Typography variant="caption" component="p">
                        7:00 AM
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  xl={2}
                  lg={2}
                  container
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Typography variant="overline">To</Typography>
                  </Grid>
                </Grid>
                <Grid item xl={5} lg={5} container direction="row" spacing={1}>
                  <Grid
                    item
                    xs={6}
                    xl={6}
                    lg={6}
                    style={{ textAlign: "right" }}
                  >
                    <Typography variant="h4">
                      {new Date(info.toDate).getDate()}
                    </Typography>
                    {/* <p className="text-base sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">09</p> */}
                  </Grid>
                  <Grid item xs={6} xl={6} lg={6}>
                    <Grid>
                      <Typography variant="caption">{`${new Date(
                        info.toDate
                      ).toLocaleString("default", {
                        month: "short",
                      })}-${new Date(info.toDate).getFullYear()}`}</Typography>
                      <Typography variant="caption" component="p">
                        7:00 PM
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
        <div className={classes.spacingCard}>
          {/* <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} lg={4} xl={4} className={classes.paper}>
              <CarItem isAction={false} info={carDetail} />
            </Grid>
          </Grid> */}
        </div>
      </Dialog>
    </div>
  );
}

export function CloseAgreementDialog(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { agreement } = props;
  // console.log(agreement);
  // const agreeAgreements =  props

  const handleUpdateAgreement = () => {
    // console.log("Agreements will be created", chip);
    dispatch(createAgreement(agreement));
    handleClose();
    // dispatch(updateAgreement(11, updateAgreements));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Chip
        icon={<Icon>done</Icon>}
        label="Done"
        clickable
        color="primary"
        size="medium"
        // onChange={() => handleChip(chip.type)}
        style={{
          backgroundColor: "green",
        }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Agree all agreement ? This booking will start after you click agree
            button. Please check carefully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleUpdateAgreement} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export const ChatArea = (props) => {
  const classes = useStyles();
  const userLogged = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const { carDetail, notification } = props.location.state || {};
  const chip = useSelector((state) => state.chat.chip);
  const dispatch = useDispatch();
  const handleOpenAgreement = (type) => {
    dispatch(openAgreement(type));
  };

  useEffect(() => {
    dispatch(fetchCriteriaList());
    // dispatch(fetchBookingRequest(26));
    // dispatch(fetchAgreementList(11));
  }, [dispatch]);
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
            {selectedUser.id && <UserSelected {...selectedUser} />}
            {/* <ViewBookingDialog info={booking} /> */}
          </Grid>
          <Grid
            item
            container
            lg={4}
            // direction="column"
            style={{ backgroundColor: "#E6E6E6" }}
          >
            {selectedUser.id && (
              <>
                <StepAgreement />

                <Grid>
                  {chip && chip.length !== 0 ? (
                    <div className={classes.root}>
                      {chip.map((data) => {
                        // console.log(data);
                        // console.log(chip);
                        return (
                          <Chip
                            icon={
                              <Icon>{data.approved ? "done" : "error"}</Icon>
                            }
                            label={data.name}
                            clickable
                            color="primary"
                            // onChange={() => handleChip(chip.type)}
                            style={{
                              backgroundColor: data.approved
                                ? "green"
                                : "primary",
                            }}
                            onClick={() => handleOpenAgreement(data.name)}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </Grid>
              </>
            )}
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
          >
            <ContactList
              info={carDetail}
              renter={notification}
              chipList={chip}
            />
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
