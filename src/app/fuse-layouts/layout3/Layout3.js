import React from "react";
import { makeStyles } from "@material-ui/core";
import { FuseMessage, FuseDialog } from "@fuse";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import AppContext from "app/AppContext";
// import LeftSideLayout3 from "./components/LeftSideLayout3";
import ToolbarLayout3 from "./components/ToolbarLayout3";
// import NavbarWrapperLayout3 from "./components/NavbarWrapperLayout3";
import FooterLayout3 from "./components/FooterLayout3";
// import RightSideLayout3 from "./components/RightSideLayout3";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    "&.boxed": {
      maxWidth: 1120,
      margin: "0 auto",
      boxShadow: theme.shadows[3],
    },
    "&.container": {
      "& .container": {
        maxWidth: 1120,
        width: "100%",
        margin: "0 auto",
      },
      "& .navigation": {},
    },
  },
  content: {
    display: "flex",
    overflow: "hidden",
    flex: "1 1 auto",
    padding: theme.spacing(1),
    flexDirection: "column",
    width: "100%",
    "-webkit-overflow-scrolling": "touch",
    zIndex: 4,
    paddingTop: theme.spacing(8),
  },
  toolbarWrapper: {
    display: "flex",
    position: "relative",
    zIndex: 5,
  },
  toolbar: {
    display: "flex",
    flex: "1 0 auto",
  },
  footerWrapper: {
    position: "relative",
    zIndex: 5,
  },
  footer: {
    display: "flex",
    flex: "1 0 auto",
  },
}));

const Layout3 = ({ settings, children }) => {
  const classes = useStyles();
  const layoutConfig = settings.layout.config;
  console.log("layout cofig", layoutConfig);
  return (
    <AppContext.Consumer>
      {({ routes }) => (
        <div
          id="fuse-layout"
          className={classNames(classes.root, layoutConfig.mode)}
        >
          <div className={classNames(classes.content, "container")}>
            {layoutConfig.toolbar.display &&
              layoutConfig.toolbar.position === "above" && <ToolbarLayout3 />}

            {/* {layoutConfig.navbar.display && <NavbarWrapperLayout3 />} */}

            {layoutConfig.toolbar.display &&
              layoutConfig.toolbar.position === "below" && <ToolbarLayout3 />}

            <FuseDialog />

            {/* <div className="flex flex-auto flex-col relative"> */}
            {renderRoutes(routes)}
            {console.log(routes)}
            {children}

            {/* </div> */}
            {layoutConfig.toolbar.footer && <FooterLayout3 />}
          </div>

          {/* {layoutConfig.rightSidePanel.display && <RightSideLayout3 />} */}
          <FuseMessage />
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default Layout3;
