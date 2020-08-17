import React from "react";
import { AppBar, MuiThemeProvider, Toolbar } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import Logo from "app/fuse-layouts/shared-components/Logo";
import UserMenu from "app/fuse-layouts/shared-components/UserMenu";
import Notification from "app/fuse-layouts/shared-components/Notification";
import { useSelector } from "react-redux";

const ToolbarLayout3 = () => {
  const { success } = useSelector((state) => state.auth.login);
  const toolbarTheme = useSelector((state) => state.fuse.settings.toolbarTheme);
  return (
    <MuiThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className="flex relative z-10"
        color="default"
        elevation={10}
      >
        <Toolbar className="container p-0 lg:px-24">
          <div className={classNames("flex flex-no-shrink items-center")}>
            <Logo />
          </div>
          {/* </Hidden> */}

          <div className="flex flex-1"></div>

          <div className="flex">
            {/* <Hidden smUp>
                            <FuseSearch/>
                            <div className={classes.separator}/>
                        </Hidden> */}
            {/* <div className={classes.separator} /> */}
            {success && <Notification />}
            <UserMenu />
            {/* <Grid className={classes.notification}>
              <Icon>notifications_none</Icon>
            </Grid>
            <Grid className={classes.notification}>
            </Grid> */}
            {/* <Hidden mdDown>
                            <ChatPanel />
                              <div className={classes.separator} />
                            <FuseSearch variant="full" />
                        </Hidden> */}
          </div>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
};

export default withRouter(ToolbarLayout3);
