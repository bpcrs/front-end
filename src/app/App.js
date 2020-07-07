import React from "react";
import { createGenerateClassName, jssPreset } from "@material-ui/core";
import { FuseAuthorization, FuseLayout, FuseTheme } from "@fuse";
import JssProvider from "react-jss/lib/JssProvider";
import Provider from "react-redux/es/components/Provider";
import { Router } from "react-router-dom";
import { create } from "jss";
import jssExtend from "jss-extend";
import { Auth } from "./auth";
import store from "./store";
import AppContext from "./AppContext";
import routes from "./fuse-configs/routesConfig";
import * as history from "history";
import { LocalizationProvider } from "@material-ui/pickers/LocalizationProvider";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
});

jss.options.insertionPoint = document.getElementById("jss-insertion-point");
const generateClassName = createGenerateClassName();
const historyObj = history.createBrowserHistory();

const App = () => {
  return (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <Provider store={store}>
            <Auth>
              <Router history={historyObj}>
                <FuseAuthorization>
                  <FuseTheme>
                    <FuseLayout />
                  </FuseTheme>
                </FuseAuthorization>
              </Router>
            </Auth>
          </Provider>
        </JssProvider>
      </LocalizationProvider>
    </AppContext.Provider>
  );
};

export default App;
