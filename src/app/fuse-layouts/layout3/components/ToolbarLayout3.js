import React from 'react';
import { AppBar, Hidden, MuiThemeProvider, Toolbar, withStyles, Grid } from '@material-ui/core';
import { FuseSearch } from '@fuse';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import ChatPanel from 'app/main/chat/ChatPanel';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu'

const styles = theme => ({
    separator: {
        width: 1,
        height: 64,
        backgroundColor: theme.palette.divider
    }
});

const ToolbarLayout3 = ({ toolbarTheme , classes}) => {
    return (
        <MuiThemeProvider theme={toolbarTheme} >
            <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
                <Toolbar className="container p-0 lg:px-24">
                    <div className={classNames("flex flex-no-shrink items-center")}>
                        <Logo />
                    </div>
                    {/* </Hidden> */}

                    <div className="flex flex-1">
                        
                    </div>

                    <div className="flex">
                        {/* <Hidden smUp>
                            <FuseSearch/>
                            <div className={classes.separator}/>
                        </Hidden> */}
                        <div className={classes.separator} />
                        <UserMenu />
                        <Hidden mdDown>
                            <ChatPanel />
                              <div className={classes.separator} />
                            <FuseSearch variant="full" />
                        </Hidden>
                    </div>
                </Toolbar>
            </AppBar>
        </MuiThemeProvider>
    );
};

function mapStateToProps({ fuse }) {
    return {
        settings: fuse.settings.current,
        toolbarTheme: fuse.settings.toolbarTheme
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps)(ToolbarLayout3)));
