import React, { Component } from 'react';
import { withStyles, Card, CardContent, Typography, Tabs, Tab, CardHeader } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
});


class Car extends Component {
    state = {
        tabValue: 0
    };

    // handleTabChange = (event, value) => {
    //     this.setState({ tabValue: value });
    // };

    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <CardContent>
                    
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                   </CardContent> 

            </Card>
        )
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(Car));