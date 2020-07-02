import React from "react";
import {
  Grid,
  Avatar,
  Typography,
  Badge,
  makeStyles,
  Paper,
  Tabs,
  Tab,
  Chip,
  Icon,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import ContactList from "./ContactList";
import { useSelector } from "react-redux";
import Chat from "./Chat";

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
export const ChatArea = () => {
  const classes = useStyles();
  const userLogged = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  console.log(selectedUser);
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
            <div className={classes.root}>
              <Chip
                icon={<Icon>done</Icon>}
                label="Scope"
                clickable
                color="secondary"
                // onClick={handleClick}
                // onDelete={handleDelete}
              />
              <Chip
                icon={<Icon>error</Icon>}
                label="Extra"
                clickable
                color="primary"
                // onClick={handleClick}
                // onDelete={handleDelete}
              />
              <Chip
                icon={<Icon>error</Icon>}
                label="Insurance"
                clickable
                color="primary"
                // onClick={handleClick}
                // onDelete={handleDelete}
              />
              <Chip
                icon={<Icon>error</Icon>}
                label="Warranties"
                clickable
                color="primary"
                // onClick={handleClick}
                // onDelete={handleDelete}
              />
            </div>
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
