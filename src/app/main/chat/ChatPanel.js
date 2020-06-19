import React from 'react';
import {
    AppBar, Toolbar, Button,
    Typography, Dialog, Icon, IconButton,
    Slide, makeStyles,
    Grid,
    Paper, Avatar
} from '@material-ui/core';
import { useState } from 'react';
import Chat from './Chat';
import ContactList from './ContactList';
import { useSelector } from 'react-redux';


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
        width: 600,
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
        borderRadius: 0,
        overflowY: 'hidden'
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
        borderRadius: 0,
        // transform: 'translate3d(360px,0,0)',
        // easing: theme.transitions.easing.easeInOut,
        // duration: theme.transitions.duration.standard
    }

}));

function ChatPanel() {
    const [open, setOpen] = useState(false);
    const selectedUser = useSelector(state => state.chat.selectedUser);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false)
    };

    const classes = useStyles();
    return (
        <React.Fragment>
            <Button id="fuse-settings" className={classes.button} variant="text" onClick={handleOpen}>
                <Icon className={classes.buttonIcon}>chat</Icon>
            </Button>
            <Grid className={classes.root} >
                <Dialog
                    TransitionComponent={Transition}
                    aria-labelledby="settings-panel"
                    aria-describedby="settings"
                    open={open}
                    keepMounted
                    scroll="paper"
                    onClose={handleClose}
                    BackdropProps={{ invisible: true }}
                    classes={{
                        paper: classes.dialogPaper
                    }}
                >
                    <Grid item lg={12} style={{ backgroundColor: 'red' }}>
                        <AppBar position="static" elevation={1}>
                            <Toolbar>
                                <div className="flex flex-1 items-center">
                                    {(!selectedUser.id) && (
                                        <React.Fragment>
                                            <Typography className="ml-16 text-16" color="inherit">Chat</Typography>
                                        </React.Fragment>
                                    )}
                                    {selectedUser.id && (
                                        <React.Fragment>
                                            <Avatar src={selectedUser.image}></Avatar>
                                            <Typography className="ml-16 text-16" color="inherit">{selectedUser.id ? selectedUser.fullName : ""}</Typography>
                                        </React.Fragment>
                                    )}


                                </div>
                                <IconButton className="fixed pin-t pin-r z-10" onClick={handleClose}>
                                    <Icon>close</Icon>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Paper style={{maxHeight: '100%', minHeight: '100%', height: '100%'}}>
                            <Grid container spacing={1} item lg={12} >
                                <Grid item lg={2}>
                                    <ContactList style={classes.contact} />
                                </Grid>
                                <Grid item lg={10}>
                                    <Chat />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                </Dialog>
            </Grid>

        </React.Fragment>
    );
}

export default ChatPanel;
