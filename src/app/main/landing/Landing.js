import React, { Component, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
import Formsy from 'formsy-react';
import { Typography, MenuItem, InputAdornment, Icon, TextField, Button, Grid, Paper, MobileStepper, Input, FormControl, Select, InputLabel, CardMedia } from '@material-ui/core';
import {
    CheckboxFormsy,
    RadioGroupFormsy,
    SelectFormsy,
    TextFieldFormsy
} from '../../../@fuse/components/formsy';
import { Hero, NavBar, EmailForm, LandingProvider, TestimonialsLogos, SectionTitle, Heading, Footer, HowItWorks } from 'landing-blocks/dist'
import { Link, useHistory } from 'react-router-dom';
// import Head from 'next/head'
// import background from "../../../../public/assets/images/backgrounds/header-bg.png"
import {
    isMobile
  } from "react-device-detect";
const listImage = [
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2989&q=80",
    "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3848&q=80"
]
const styles = theme => ({
    layoutRoot: {},
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingBottom: theme.spacing(1),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    imageBg: {
        borderRadius: theme.spacing(1)
    }
});
function Landing(props) {
    const history = useHistory();
    const { classes } = props;

    return (
        <>
            <LandingProvider primary='#5D21D2' background='#fff'>
                <NavBar
                    logo={<img width='80px' onClick={() => history.push("/landing")}  src="assets/images/logos/fuse.svg" />}
                    navs={[
                        <Button variant="contained">Features</Button>,
                        <Button variant="contained">Use Cases</Button>,
                        <Button variant="contained">Pricing</Button>,
                        <Button variant="contained">About Us</Button>,
                        <Button variant="contained" onClick={() => history.push("/login")}>Login</Button>,
                        <Button variant="contained" onClick={() => history.push("/car")}>Car</Button>,
                    ]}
                />
                <SectionTitle
                    heading={
                        isMobile ? <></> :
                            <Heading
                                fontFamily='tiempos-headline, Georgia'
                                fontSize='50px'
                                fontWeight='semibold'
                            >
                                Blockchain-based Personal Car Renting System
                    </Heading>
                    }
                // image={}
                // floatingElement={
                //     <GradientRect maxW='pageContainer' width='60%' distortion={-0.3} />
                // }
                />
                {/* <Grid container spacing={1} className={classes.root}  >
                    <Grid item xs={12} xl={3} className={classes.paper}>
                        <FormControl>
                            <Formsy>
                            <Grid item className={classes.paper}>
                                <TextField
                                    id="datetime-local"
                                    label="Pick-up appointment"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    className={"mb-16"}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    style={{ width: "100%" }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item className={classes.paper}>
                                <TextField
                                    id="datetime-local"
                                    label="Drop-off appointment"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: "100%" }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container className={classes.paper} justify="space-between" alignItems="stretch">
                                <Grid item xs={12}>
                                    <SelectFormsy
                                        // className="my-16"
                                        name="related-outlined"
                                        label="Pick-up location"
                                        value="sg"
                                        variant="outlined"
    
                                    >
                                        <MenuItem value="sg">Da Nang City          </MenuItem>
                                        <MenuItem value="olivier">Ho Chi Minh City</MenuItem>
                                        <MenuItem value="kevin">Kevin</MenuItem>
                                    </SelectFormsy>
                                </Grid>
                                <Grid item xs={6} className={classes.paper}>
                                
                                    <SelectFormsy
                                        // className="my-16"
                                        name="related-outlined"
                                        label="Seats"
                                        value="sg"
                                        variant="outlined"
                                    >
                                        <MenuItem value="sg">1-4 people</MenuItem>
                                        <MenuItem value="olivier">4-7 people</MenuItem>
                                        <MenuItem value="kevin">7-10 people</MenuItem>
                                    </SelectFormsy>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.paper}>
                                <Button variant="contained" style={{ width: "80%" }} color="primary" onClick={() => history.push("/booking")}>
                                    Book now
                                 </Button>
                            </Grid>
                            </Formsy>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} xl={3} className={classes.paper}>
                        <img style={{ borderRadius: "10px" }} width="100%" src={listImage[1]} />
                    </Grid>
                </Grid> */}
                <Hero
                    // floatingElement={<GradientCurtains mt='-600px' />}
                    heading={<Typography variant="h5" >Choose your plan</Typography>}
                    image={
                        <Grid item xs={12} xl={12} >
                          {isMobile ? <></> :  <img src={listImage[0]} width="100%" className={classes.imageBg} />} 
                        </Grid>
                    }
                    cta={
                        <Formsy className="flex flex-col justify-center">
                            <TextField
                                id="datetime-local"
                                label="Pick-up appointment"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                                className={classes.paper}
                            />
                            <TextField
                                id="datetime-local"
                                label="Drop-off appointment"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                className={classes.paper}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <SelectFormsy
                                name="related-outlined"
                                label="Pick-up location"
                                value="sg"
                                variant="outlined"
                                className={classes.paper}
                            >
                                <MenuItem value="sg">Ho Chi Minh</MenuItem>
                                <MenuItem value="olivier">Olivier</MenuItem>
                                <MenuItem value="kevin">Kevin</MenuItem>
                            </SelectFormsy>
                            <Button variant="contained" color="primary" onClick={() => history.push("/car")}>
                                Book now
                        </Button>
                        </Formsy>}
                // fingerprint='Already have account? Sign in'
                />
            </LandingProvider>
        </>
    )
}

export default withStyles(styles, { withTheme: true })(Landing);