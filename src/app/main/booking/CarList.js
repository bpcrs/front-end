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

import Layout from '../../layout';
import { APP_PATH } from '../../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarList } from './booking.action';

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
    const dispatch = useDispatch();
    const cars = useSelector(state => state.booking.cars)
    useEffect(() => {
        dispatch(fetchCarList())
    }, [])
    return (
        <Layout name="Car Available">
            <Container >
                <Grid container spacing={2} className={classes.root}  >
                    {cars.map((car, index) => (
                        <Grid item xs={12} xl={3} lg={4} className={classes.paper} key={index}>
                            <CarItem isAction={true} info={car}  onBooking={() => history.push(`${APP_PATH.CAR_ITEM}/1`)} />
                        </Grid>)
                    )}
                </Grid>
            </Container>

        </Layout>
    )
}

export default CarList;