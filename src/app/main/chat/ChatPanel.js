import React, { Component } from 'react';
import {
    AppBar, Toolbar, Button,
    Typography, Dialog, Icon, IconButton,
    Slide, withStyles, makeStyles,
    Paper
} from '@material-ui/core';
import { FuseScrollbars, FuseSettings } from '@fuse';
import { red } from '@material-ui/core/colors';
import { useState } from 'react';
import Chat from './Chat';
import ContactList from './ContactList';

function Transition(props) {
    return <Slide direction="left" {...props} />;
}

const useStyles = makeStyles(theme => ({
    // button: {
    //     position: 'absolute',
    //     right: 0,
    //     top: 160,
    //     minWidth: 48,
    //     width: 48,
    //     height: 48,
    //     opacity: .9,
    //     padding: 0,
    //     borderBottomRightRadius: 0,
    //     borderTopRightRadius: 0,
    //     zIndex: 999,
    //     color: theme.palette.getContrastText(red[500]),
    //     backgroundColor: red[500],
    //     '&:hover': {
    //         backgroundColor: red[500],
    //         opacity: 1
    //     }
    // },
    '@keyframes rotating': {
        from: {
            transform: 'rotate(0deg)'
        },
        to: {
            transform: 'rotate(360deg)'
        }
    },
    buttonIcon: {
        animation: 'rotating 3s linear infinite'
    },
    dialogPaper: {
        position: 'fixed',
        width: 380,
        maxWidth: '90vw',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        top: 0,
        height: '100%',
        minHeight: '100%',
        bottom: 0,
        right: 0,
        margin: 0,
        zIndex: 1000,
        borderRadius: 0
    }
}));

function ChatPanel(params) {
    {
        const [open, setOpen] = useState(false);

        const handleOpen = () => {
            setOpen(true)
        };

        const handleClose = () => {
            setOpen(false)
        };

        const classes = useStyles();
        return (
            <React.Fragment>
                <Button id="fuse-settings" className={classes.button} variant="contained" onClick={handleOpen}>
                    <Icon className={classes.buttonIcon}>chat</Icon>
                </Button>

                <Dialog
                    TransitionComponent={Transition}
                    aria-labelledby="settings-panel"
                    aria-describedby="settings"
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    BackdropProps={{ invisible: true }}
                    classes={{
                        paper: classes.dialogPaper
                    }}
                >
                    <FuseScrollbars className="p-24 sm:p-32">



                        <AppBar position="static" elevation={1}>
                            <Toolbar className="pl-12 pr-8">
                                <div className="flex flex-1 items-center">
                                    <React.Fragment>

                                        <Typography className="ml-16 text-16" color="inherit">Chat</Typography>

                                    </React.Fragment>

                                </div>
                                <IconButton className="fixed pin-t pin-r z-10" onClick={handleClose}>
                                    <Icon>close</Icon>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Paper className="flex flex-1 flex-row min-h-px">
                            <ContactList className="flex flex-no-shrink" />
                            <Chat className="flex flex-1 z-10" />
                        </Paper>

                    </FuseScrollbars>
                </Dialog>
            </React.Fragment>
        );

    }
}

export default ChatPanel;
