import React from 'react'
import { AppBar, Toolbar, IconButton, makeStyles, Fab, Container, Icon } from '@material-ui/core'
import { isMobile } from 'react-device-detect';
import ToolbarLayout3 from '../fuse-layouts/layout3/components/ToolbarLayout3';


const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  spacingCard: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(12),
  },
}));
export default function Layout(props) {
    const classes = useStyles();
    return (
        <>
            <ToolbarLayout3 />
            <Container className={classes.spacingCard}>
                {props.children}
            </Container>
            {isMobile ? (<AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" title="Profile">
                        <Icon title="Profile">person</Icon>
                    </IconButton>
                    <IconButton color="inherit">
                        <Icon>location_searching</Icon>
                    </IconButton>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton} title="Book">
                        <Icon>time_to_leave</Icon>
                    </Fab>
                    <div className={classes.grow} />
                    <IconButton color="inherit">
                        <Icon>library_books</Icon>
                    </IconButton>
                    <IconButton edge="end" color="inherit">
                        <Icon>more_horiz</Icon>
                    </IconButton>
                </Toolbar>
            </AppBar>) : <></>}
        </>
    )
}
