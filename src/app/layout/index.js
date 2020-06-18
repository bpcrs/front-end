import React from 'react'
import { AppBar, Toolbar, IconButton, makeStyles, Fab, Container } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/More';
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
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    spacingCard: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(12)
    }
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
                    <IconButton edge="start" color="inherit" aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                        <AddIcon />
                    </Fab>
                    <div className={classes.grow} />
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit">
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>) : <></>}

        </>
    )
}
