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
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import ContactList from "./ContactList";
import { useSelector, useDispatch } from "react-redux";
import Chat from "./Chat";
import {
  openAgreement,
  fetchCriteriaList,
  fetchAgreementList,
  updateAgreementSuccess,
} from "./chat.action";
// import { data } from "autoprefixer";

const useStyles = makeStyles((theme) => ({
  root: {
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
export const ChatArea = (props) => {
  const classes = useStyles();
  const userLogged = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const criterias = useSelector((state) => state.chat.criteria);
  const chip = useSelector((state) => state.chat.chip);
  const agreements = useSelector((state) => state.chat.agreements);
  const [updateAgreements, SetUpdateAgreements] = useState();
  // console.log(updateAgreements);
  // const booking = useSelector((state) => state.booking.booking);
  // const bookingInStore = props.location.state;
  // console.log(bookingInStore);

  const dispatch = useDispatch();
  const handleOpenAgreement = (type) => {
    dispatch(openAgreement(type));
  };

  const handleUpdateAgreement = () => {
    // dispatch(updateAgreementSuccess(chip));
    SetUpdateAgreements(updateAgreements, ...agreements);
    console.log(updateAgreements);
  };

  useEffect(() => {
    dispatch(fetchCriteriaList());
    dispatch(fetchAgreementList(11));
    // dispatch()
    // addChip("Scope");
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
            {selectedUser.id && <User {...selectedUser} />}
            Status: Dealing
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
            {criterias.length !== 0 ? (
              <div className={classes.root}>
                {chip.map((data) => {
                  // console.log(data);
                  // console.log(chip);
                  return (
                    <Chip
                      icon={<Icon>{data.approved ? "done" : "error"}</Icon>}
                      label={data.type}
                      clickable
                      color="primary"
                      // onChange={() => handleChip(chip.type)}
                      style={{
                        backgroundColor: data.approved ? "green" : "primary",
                      }}
                      onClick={() => handleOpenAgreement(data.type)}
                    />
                  );
                })}
                {console.log(chip)}
              </div>
            ) : (
              <></>
            )}

            <Chip
              icon={<Icon>done</Icon>}
              label="Done"
              clickable
              color="primary"
              // onChange={() => handleChip(chip.type)}
              style={{
                backgroundColor: "green",
              }}
              onClick={() => handleUpdateAgreement(chip)}
            />
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
            <ContactList />
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
