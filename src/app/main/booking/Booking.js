import React, { Component, useEffect } from 'react';
import { withStyles, Container, Box } from '@material-ui/core';
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

const styles = (theme) => ({
    layoutRoot: {},
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

function Booking(props) {
    const history = useHistory();
    const classes = { props };
    return (
        <>
            <LandingProvider primary='#5D21D2' background='#fff'>
                <NavBar
                    logo={<img width='80px' src="assets/images/logos/fuse.svg" />}
                    navs={[
                        <Button variant="contained">Features</Button>,
                        <Button variant="contained">Use Cases</Button>,
                        <Button variant="contained">Pricing</Button>,
                        <Button variant="contained">About Us</Button>,
                        <Button variant="contained" onClick={() => history.push("/login")}>Login</Button>,
                    ]}
                />
                <Container >
                    <Grid container spacing={2} justify="space-between" className={classes.root}  >
                        <Grid item xs={12} xl={3} className={classes.paper}>
                            <CarItem />
                        </Grid>
                        <Grid item xs={12} xl={3} className={classes.paper}>
                            <CarItem />
                        </Grid>
                        <Grid item xs={12} xl={3} className={classes.paper}>
                            <CarItem />
                        </Grid>
                        <Grid item xs={12} xl={3} className={classes.paper}>
                            <CarItem />
                        </Grid>
                    </Grid>
                </Container>
            </LandingProvider>
        </>
    )
}

export default withStyles(styles, { withTheme: true })(Booking);