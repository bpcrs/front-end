import React, { Component, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
// import Head from 'next/head'
// import background from "../../../../public/assets/images/backgrounds/header-bg.png"

const listImage = [
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2989&q=80",
    "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3848&q=80"
]
const styles = theme => ({
    layoutRoot: {}
});

function Landing(props) {
    const { classes } = props;


    return (
        <>
            <LandingProvider primary='#5D21D2' background='#fff'>
                <NavBar
                    logo={<img width='80px' src={"https://filebin.net/uc9pu0ezk4m2phyp/favicon.ico?t=y2wui74v"} />}
                    navs={[
                        <Button variant="outlined">Features</Button>,
                        <Button variant="outlined">Use Cases</Button>,
                        <Button variant="outlined">Pricing</Button>,
                        <Button variant="outlined">About Us</Button>,
                    ]}
                />
                <SectionTitle
                    heading={
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
                    image={<img style={{ borderRadius: "10px" }} width='1000px' src={listImage[1]} />}
                    cta={<Formsy className="flex flex-col justify-center">
                        <TextField
                            id="datetime-local"
                            label="Pick-up appointment"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            className={"mb-16"}
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="outlined"
                        />
                        <TextField
                            id="datetime-local"
                            label="Drop-off appointment"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <SelectFormsy
                            className="my-16"
                            name="related-outlined"
                            label="Pick-up location"
                            value="sg"
                            variant="outlined"
                        >
                            <MenuItem value="sg">Ho Chi Minh</MenuItem>
                            <MenuItem value="olivier">Olivier</MenuItem>
                            <MenuItem value="kevin">Kevin</MenuItem>
                        </SelectFormsy>
                        <Button variant="contained" color="primary">
                            Book now
                        </Button>
                    </Formsy>}
                // fingerprint='Already using xxx? Sign in'
                />
                <HowItWorks
                    heading='How Prismic works'
                    subheading='A tool built to allow your content, design, and development teams to produce a finished product that they can all be proud of.'
                    steps={[
                        {
                            heading: 'Model your editor',
                            image: <img width='500px' src='/prismic/step1.jpg' />,
                            subheading:
                                "Model custom types to match your desired design. Create reusable fields and custom components (we call them Slices...you'll hear us talk about them a lot) to enable dynamic layouts and build the editor experience that you want",
                        },
                        {
                            heading:
                                'Hand over to your content team to start creating content',
                            image: <img width='500px' src='/prismic/step2.jpg' />,
                            subheading:
                                "Once you've managed the initial setup, you can hand the management over to your content team so that editors can start filling content while you're choosing the framework. With Prismic, creating beautiful content becomes simple enough that even non-technical employees can handle it. ",
                        },
                        {
                            heading:
                                'Deploy on Zeit Now, Netlify, Heroku or your favorite hosting platform',
                            image: <img width='500px' src='/prismic/step3.png' />,
                            subheading:
                                'We take care of hosting and scaling the publishing tools. All you have to do is host the website, but you can choose whichever hosting platform you prefer.',
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
                        Company: [<a>Quickstart</a>, <a>Documentation</a>, <a>Samples</a>],
                        Product: [<a>Quickstart</a>, <a>Documentation</a>, <a>Samples</a>],
                    }}
                />
            </LandingProvider>
            {/*<FusePageSimple*/}
            {/*    classes={{*/}
            {/*        root: classes.layoutRoot*/}
            {/*    }}*/}
            {/*    // header={*/}
            {/*    //     <>*/}
            {/*    //         <div>BPCRS</div>*/}

            {/*    //     </>*/}
            {/*    //     // <div className="p-24"><h4>Header</h4></div>*/}
            {/*    // }*/}
            {/*    contentToolbar={*/}
            {/*        <>*/}
            {/*            <div className="px-24"><h4>Content Toolbar</h4></div>*/}
            {/*        </>*/}
            {/*    }*/}
            {/*    // content={*/}
            {/*        // <div className="p-24">*/}
            {/*        //     <Grid container className={classes.root} spacing={2}>*/}
            {/*        //         <Grid item xs={6} >*/}
            {/*        //             <Typography className="h2 mb-24">Schedule your plan</Typography>*/}
            {/*        //             <Grid item xs={10}>*/}

            {/*        //             </Grid>*/}
            {/*        //         </Grid>*/}
            {/*        //         <Grid item justify="center" xs={6}>*/}
            {/*        //             <Paper square elevation={0} className={classes.header}>*/}
            {/*        //                 <Typography>{tutorialSteps[activeStep].label}</Typography>*/}
            {/*        //             </Paper>*/}
            {/*        //             <img*/}
            {/*        //                 src={tutorialSteps[activeStep].imgPath}*/}
            {/*        //                 alt={tutorialSteps[activeStep].label}*/}
            {/*        //             />*/}
            {/*        //         </Grid>*/}
            {/*        //*/}
            {/*        //     </Grid>*/}
            {/*        //*/}
            {/*        // </div>*/}
            {/*    // }*/}
            {/*/>*/}
        </>
    )
}

export default withStyles(styles, { withTheme: true })(Landing);