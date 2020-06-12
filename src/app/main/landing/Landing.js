import React, { Component, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
import Formsy from 'formsy-react';
import { Typography, MenuItem, InputAdornment, Icon, TextField, Button, Grid, Paper, MobileStepper, Input, FormControl, Select, InputLabel, CardMedia, CardContent, Card } from '@material-ui/core';
import {
    CheckboxFormsy,
    RadioGroupFormsy,
    SelectFormsy,
    TextFieldFormsy
} from '../../../@fuse/components/formsy';
import { Hero, NavBar, EmailForm, LandingProvider, TestimonialsLogos, SectionTitle, Heading, Footer, HowItWorks, Faqs, FeaturesList } from 'landing-blocks/dist'
import { GradientCurtains } from 'landing-blocks/dist/decorations'

import { Box } from '@chakra-ui/core'
import { Link, useHistory } from 'react-router-dom';
// import Head from 'next/head'
// import background from "../../../../public/assets/images/backgrounds/header-bg.png"
import {
    isMobile
} from "react-device-detect";
import { APP_PATH } from '../../../constant';
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
        width : "100%"
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
            <LandingProvider primary='#5D21D2'>
                <NavBar
                    logo={<img width='200px' src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/logo.svg' />}
                    navs={[
                        <a>Features</a>,
                        <a>Use Cases</a>,
                        <a>Pricing</a>,
                        <a>About Us</a>,
                        <a>Login</a>,
                        <Button px='10px'>Try 1 month free</Button>,
                    ]}
                />
                <Hero
                    heading={<Typography variant="h5">Blockchain-based Personal Car Renting System</Typography>}
                    subheading={<Formsy className="flex flex-col justify-center">
                        <div>
                            <TextField
                                id="datetime-local"
                                label="Pick-up appointment"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                fullWidth
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
                                fullWidth
                                variant="outlined"
                            />
                            <SelectFormsy
                                name="related-outlined"
                                label="Pick-up location"
                                value="sg"
                                variant="outlined"
                                className={classes.paper}

                            >
                                <MenuItem value="sg">Ho Chi Minh City</MenuItem>
                                <MenuItem value="olivier">Olivier</MenuItem>
                                <MenuItem value="kevin">Kevin</MenuItem>
                            </SelectFormsy>
                            <br></br>
                            <Button variant="contained" color="primary" fullWidth onClick={() => history.push(APP_PATH.CAR_LIST)}>
                                Book now
                            </Button>
                        </div>
                        {/* <TextField
                            id="datetime-local"
                            label="Pick-up appointment"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                            variant="outlined"
                            className={classes.paper}
                        /> */}

                    </Formsy>}
                    image={<img width='400px' src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/hero.png' />}
                    // cta={<Button>Book a demo</Button>}
                    floatingElement={<GradientCurtains mt='-600px' />}
                />
                <FeaturesList
                    heading='Take control of company spending'
                    centerText
                    features={[
                        {
                            heading: 'Control',
                            icon: <img width='200px' src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step1.svg' />,
                            subheading:
                                'Multi-level approvals and custom spending limits.',
                        },
                        {
                            heading: 'Pay',
                            icon: <img width='200px' src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step2.svg' />,
                            subheading:
                                'Smart company cards, virtual cards, and invoice tracking.',
                        },
                        {
                            heading: 'Track',
                            icon: <img width='200px' src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step3.svg' />,
                            subheading: 'Real-time spending overview and receipt capture.',
                        },
                        {
                            heading: 'Report',
                            icon: <img width='200px' src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step4.svg' />,
                            subheading: 'Simplified bookkeeping and budget analysis.',
                        },
                    ]}
                />
                {/* <Feature
            heading='Prismic is a Content Management System, a tool for editing online content'
            subheading="Also known as a headless CMS, an API CMS, a content platform, a disruptive content-as-a-service digital experience...basically we've built a tool that lets you choose your technology, framework, and language and then easily manage your content."
            image={<img src='/spendesk/feature1.png' width='500px' />}
            flip
        /> */}
                <Faqs
                    faqs={[
                        {
                            question: 'What is Spendesk',
                            answer: (
                                <Box>
                                    Spendesk is the first spend management platform
                                    built for both finance teams and employees. It gives
                                    finance leaders visibility across all company
                                    spending.
                                </Box>
                            ),
                        },
                        {
                            question: 'Should i care?',
                            answer: (
                                <Box>
                                    Spendesk is the first spend management platform
                                    built for both finance teams and employees. It gives
                                    finance leaders visibility across all company
                                    spending.
                                </Box>
                            ),
                        },
                        {
                            question: 'Why is this useful',
                            answer: (
                                <Box>
                                    Spendesk is the first spend management platform
                                    built for both finance teams and employees. It gives
                                    finance leaders visibility across all company
                                    spending.
                                </Box>
                            ),
                        },
                    ]}
                />

                <Footer
                    businessName='Prismic'
                    columns={{
                        Developers: [
                            <a>Quickstart</a>,
                            <a>Documentation</a>,
                            <a>Samples</a>,
                        ],
                        Company: [
                            <a>Quickstart</a>,
                            <a>Documentation</a>,
                            <a>Samples</a>,
                        ],
                        Product: [
                            <a>Quickstart</a>,
                            <a>Documentation</a>,
                            <a>Samples</a>,
                        ],
                    }}
                />
            </LandingProvider>
            {/* <LandingProvider primary='#5D21D2' background='#fff'>
                <NavBar
                    logo={<img width='80px' onClick={() => history.push("/landing")} src="assets/images/logos/fuse.svg" />}
                    navs={[
                        <Button variant="contained">Features</Button>,
                        <Button variant="contained">Use Cases</Button>,
                        <Button variant="contained">Pricing</Button>,
                        <Button variant="contained">About Us</Button>,
                        <Button variant="contained" onClick={() => history.push(APP_PATH.LOGIN)}>Login</Button>,
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
                <Hero
                    // floatingElement={<GradientCurtains mt='-600px' />}
                    heading={<Typography variant="h5" >Choose your plan</Typography>}
                    image={
                        <Grid item xs={12} xl={12} >
                            {isMobile ? <></> : <img src={listImage[0]} width="100%" className={classes.imageBg} />}
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
                            <Button variant="contained" color="primary" onClick={() => history.push(APP_PATH.CAR_LIST)}>
                                Book now
                        </Button>
                        </Formsy>}
                // fingerprint='Already have account? Sign in'
                />
            </LandingProvider> */}
        </>
    )
}

export default withStyles(styles, { withTheme: true })(Landing);