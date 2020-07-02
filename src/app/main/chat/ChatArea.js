import React from "react";
import {
  Grid,
  Avatar,
  Typography,
  Badge,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
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

export const ChatArea = () => {
  const classes = useStyles();
  return (
    <Grid container className="rounded-8">
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
            style={{ backgroundColor: "#EFF1F6" }}
          >
            <Grid item lg>
              <div className={classes.root}>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar src="" />
                </StyledBadge>
              </div>
            </Grid>
            <Grid lg={10} item>
              <Typography
                component="span"
                className="normal-case font-600 flex"
              >
                Thanh Hung
              </Typography>
              <Typography
                className="text-11"
                color="textSecondary"
                variant="caption"
              >
                hungpt.se@gmail.com
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            lg={8}
            direction="column"
            className="px-16 py-16"
            justify="center"
            alignContent="flex-start"
            style={{ backgroundColor: "#A4AFC2" }}
          >
            <Grid item lg>
              <div className={classes.root}>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar src="" />
                </StyledBadge>
              </div>
            </Grid>
            <Grid lg={10} item>
              <Typography
                component="span"
                className="normal-case font-600 flex"
              >
                Thanh Hung
              </Typography>
              <Typography
                className="text-11"
                color="textSecondary"
                variant="caption"
              >
                hungpt.se@gmail.com
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
