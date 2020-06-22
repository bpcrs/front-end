import React from "react";
import {
  AppBar,
  MuiThemeProvider,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
const useStyles = makeStyles((theme) => ({
  footer: {
    top: "auto",
    bottom: 0,
    zIndex: 10,
    position: "fixed",
  },
}));
const FooterLayout3 = ({ footerTheme }) => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={footerTheme}>
      <AppBar
        id="fuse-footer"
        // className="relative z-10"
        color="default"
        className={classes.footer}
      >
        <Toolbar className="px-16 py-0 flex items-center">
          <Typography>Footer</Typography>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
};

function mapStateToProps({ fuse }) {
  return {
    footerTheme: fuse.settings.footerTheme,
  };
}

export default connect(mapStateToProps)(FooterLayout3);
