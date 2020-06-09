import React, { Component, useEffect } from 'react';
import { withStyles, Container, Box, AppBar, Toolbar, IconButton, Fab, makeStyles } from '@material-ui/core';
import { FusePageSimple, DemoContent } from '@fuse';
import Formsy from 'formsy-react';
import { Typography, MenuItem, InputAdornment, Icon, TextField, Button, Grid, Paper, MobileStepper } from '@material-ui/core';
import {
    CheckboxFormsy,
    RadioGroupFormsy,
    SelectFormsy,
    TextFieldFormsy
} from '../../../@fuse/components/formsy';
import { Hero, NavBar, EmailForm, LandingProvider, TestimonialsLogos, SectionTitle, Heading, Footer, HowItWorks } from 'landing-blocks/dist'
import { Link, useHistory } from 'react-router-dom';
import CarItem from './CarItem';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/More';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles(theme => ({
    layoutRoot: {},
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    appBar: {
        top: 'auto',
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
}));

function CarList(props) {
    const history = useHistory();
    const classes = useStyles();
    return (
        <>
            {/* <LandingProvider primary='#5D21D2' background='#fff'>
                <NavBar
                    logo={<img width='80px' src="assets/images/logos/fuse.svg" />}
                    navs={[
                        <Button variant="contained">Features</Button>,
                        <Button variant="contained">Use Cases</Button>,
                        <Button variant="contained">Pricing</Button>,
                        <Button variant="contained">About Us</Button>,
                        <Button variant="contained" onClick={() => history.push("/login")}>Login</Button>,
                    ]}
                /> */}
                <Container >
                    <Grid container spacing={2} className={classes.root}  >
                        <Grid item xs={12} xl={3} lg={4} className={classes.paper}>
                            <CarItem onBooking={() => history.push("/view-booking")} />
                        </Grid>
                        <Grid item xs={12} xl={3} lg={4} className={classes.paper}>
                            <CarItem />
                        </Grid>
                        <Grid item xs={12} xl={3} lg={4} className={classes.paper}>
                            <CarItem />
                        </Grid>
                    </Grid>
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
                
            {/* </LandingProvider> */}
        </>
    )
}

export default CarList;