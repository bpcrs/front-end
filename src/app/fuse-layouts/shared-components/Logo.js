import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import classNames from "classnames";
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";

const styles = (theme) => ({
  root: {
    "& .logo-icon": {
      width: 48,
      height: 48,
      transition: theme.transitions.create(["width", "height"], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
  },
  reactBadge: {
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#61dafb",
  },
});

function Logo({ classes }) {
  const history = useHistory();
  return (
    <div
      className={classNames(classes.root, "flex items-center")}
      onClick={() => history.push(APP_PATH.HOME)}
      style={{ cursor: "pointer" }}
    >
      <img
        className="logo-icon"
        src="assets/images/logos/fuse.svg"
        alt="logo"
      />
      {isMobile ? (
        ""
      ) : (
        <Typography className="text-16 ml-8 font-light logo-text">
          Blockchain-based Personal Car Renting System
        </Typography>
      )}
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Logo);
