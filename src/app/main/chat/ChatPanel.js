import React from 'react';
import {
    AppBar, Toolbar, Button,
    Typography, Dialog, Icon, IconButton,
    Slide, withStyles, makeStyles,
    Paper, Grid
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { useState } from 'react';
import Chat from './Chat';
import ContactList from './ContactList';

function Transition(props) {
    return <Slide direction="left" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: 70,
        maxWidth: 70,
        minWidth: 70,
        [theme.breakpoints.down('md')]: {
            width: 0,
            maxWidth: 0,
            minWidth: 0
        }
    },
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
    },
    panel: {
        position: 'absolute',
        width: 360,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        top: 0,
        height: '100%',
        minHeight: '100%',
        bottom: 0,
        right: 0,
        margin: 0,
        zIndex: 1000,
        transform: 'translate3d(290px,0,0)',
        overflow: 'hidden',
        [theme.breakpoints.down('md')]: {
            transform: 'translate3d(360px,0,0)',
            boxShadow: 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.opened': {
            transform: 'translateX(0)'
        }
    },
    contact: {
        backgroundColor: theme.palette.background.default
    }
}));

function ChatPanel(props) {
    {
        const [open, setOpen] = useState(true);

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
                    <Grid container>
                        <Grid item lg={12}>
                            <AppBar position="static" elevation={1}>
                                <Toolbar>
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
                        </Grid>
                        <Grid container spacing={1} item lg={12} style={{minHeight : "80vh"}}>
                            <Grid item lg={2}>
                                <ContactList style={classes.contact}/>
                            </Grid>
                            <Grid item lg={10}>
                                <Chat />
                            </Grid>
                        </Grid>                    
                    </Grid>
                </Dialog>
            </React.Fragment>
        );

    }
}

export default ChatPanel;
