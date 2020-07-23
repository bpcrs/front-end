import React, { Component } from "react";
import {
  Avatar,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import * as authActions from "app/auth/store/actions";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { APP_PATH } from "../../../constant";

class UserMenu extends Component {
  state = {
    userMenu: null,
  };

  userMenuClick = (event) => {
    this.setState({ userMenu: event.currentTarget });
  };

  userMenuClose = () => {
    this.setState({ userMenu: null });
  };

  render() {
    const { user, logout } = this.props;
    const { userMenu } = this.state;

    return (
      <React.Fragment>
        <Button className="h-64" component={Link} to={APP_PATH.PROFILE}>
          {user.photoURL ? (
            <Avatar className="" alt="user photo" src={user.photoURL} />
          ) : (
            <Avatar className="">{user.displayName[0]}</Avatar>
          )}

          <div className="hidden md:flex flex-col ml-12 items-start">
            <Typography component="span" className="normal-case font-600 flex">
              {user.displayName}
            </Typography>
            <Typography
              className="text-11 capitalize"
              color="textSecondary"
              variant="overline"
            >
              {user.role}
            </Typography>
          </div>
        </Button>
        {/* <Popover
          open={Boolean(userMenu)}
          anchorEl={userMenu}
          onClose={this.userMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          classes={{
            paper: "py-8",
          }}
        >
          {user.role === APP_ROLE.GUEST ? (
            <React.Fragment>
              <MenuItem component={Link} to="/login">
                <ListItemIcon>
                  <Icon>lock</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Login" />
              </MenuItem>
              <MenuItem component={Link} to="/register">
                <ListItemIcon>
                  <Icon>person_add</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Register" />
              </MenuItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <MenuItem
                component={Link}
                to="/profile"
                onClick={this.userMenuClose}
              >
                <ListItemIcon>
                  <Icon>account_circle</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="My Profile" />
              </MenuItem>
              <MenuItem
                component={Link}
                to="/chat"
                onClick={this.userMenuClose}
              >
                <ListItemIcon>
                  <Icon>mail</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Inbox" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  this.userMenuClose();
                }}
              >
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Logout" />
              </MenuItem>
            </React.Fragment>
          )}
        </Popover> */}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: authActions.logoutUser,
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
