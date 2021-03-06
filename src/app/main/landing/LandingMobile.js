import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import { Typography, MenuItem, TextField, Button } from '@material-ui/core';
import {
    SelectFormsy
} from '../../../@fuse/components/formsy';
import { Hero, LandingProvider, FeaturesList } from 'landing-blocks/dist'
import { GradientCurtains } from 'landing-blocks/dist/decorations'
import { useHistory } from 'react-router-dom';
import { APP_PATH } from '../../../constant';
import { withTheme } from '@material-ui/styles';
import Layout from '../../layout';

const useStyles = makeStyles(theme => ({
    layoutRoot: {},
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingBottom: theme.spacing(2),
        color: theme.palette.text.secondary,
        width: "100%"
    },
    imageBg: {
        borderRadius: theme.spacing(1)
    }
}));
function LandingMobile(props) {
    const history = useHistory();
    const classes = useStyles();

    return (
        <>
            <Layout name="Landing">
                <LandingProvider primary='#5D21D2'>
                   
                    <Hero
                        heading={<div><Typography variant="h5" >Hello, Nguyen !</Typography>
                        <Typography variant="h6" >It's amazing to have you onboard</Typography></div>}
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
                                <SelectFormsy
                                    name="related-outlined"
                                    label="Drop-off location"
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
                        </Formsy>}
                        // image={<img width='400px' alt="" src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/hero.png' />}
                        // cta={<Button>Book a demo</Button>}
                        floatingElement={<GradientCurtains mt='-600px' />}
                    />
                    <FeaturesList
                        heading='Take control of company spending'
                        centerText
                        features={[
                            {
                                heading: 'Control',
                                icon: <img width='200px' alt="" src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step1.svg' />,
                                subheading:
                                    'Multi-level approvals and custom spending limits.',
                            },
                            {
                                heading: 'Pay',
                                icon: <img width='200px' alt="" src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step2.svg' />,
                                subheading:
                                    'Smart company cards, virtual cards, and invoice tracking.',
                            },
                            {
                                heading: 'Track',
                                icon: <img width='200px' alt="" src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step3.svg' />,
                                subheading: 'Real-time spending overview and receipt capture.',
                            },
                            {
                                heading: 'Report',
                                icon: <img width='200px' alt="" src='https://raw.githubusercontent.com/remorses/landing-blocks/master/website/public/spendesk/step4.svg' />,
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

                </LandingProvider>
            </Layout>

        </>
    )
}

export default withTheme(LandingMobile);