import React, {Component, useEffect} from 'react';
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
import { Hero, NavBar, EmailForm } from 'landing-blocks/src'
// import Head from 'next/head'
import {LandingProvider} from "landing-blocks/src/LandingProvider";

const styles = theme => ({
    layoutRoot: {}
});
function Landing(props) {
    const { classes } = props;

    return (
        <>
            <LandingProvider primary='#2D7FF9'>
                <NavBar
                    logo={<img width='120px' src='/logo.svg' />}
                    navs={[
                        <a>Features</a>,
                        <a>Use Cases</a>,
                        <a>Pricing</a>,
                        <a>About Us</a>,
                        <a>Login</a>,
                    ]}
                />
                <Hero
                    heading='Create, your way'
                    subheading='Super cool subheading'
                    image={<img width='500px' src='/hero.png' />}
                    cta={<EmailForm />}
                    fingerprint='Already using xxx? Sign in'
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
        {/*        //                 <Formsy className="flex flex-col justify-center">*/}
        {/*        //                     /!* <TextFieldFormsy*/}
        {/*        //                         className="mb-16"*/}
        {/*        //                         type="text"*/}
        {/*        //                         name="name"*/}
        {/*        //                         label="Name"*/}
        {/*        //                         validations={{*/}
        {/*        //                             minLength: 4,*/}
        {/*        //                         }}*/}
        {/*        //                         validationErrors={{*/}
        {/*        //                             minLength: 'Min character length is 4',*/}
        {/*        //                         }}*/}
        {/*        //                         required*/}
        {/*        //                         variant="outlined"*/}
        {/*        //                     /> *!/*/}
        {/*        //                     <TextField*/}
        {/*        //                         id="datetime-local"*/}
        {/*        //                         label="Pick-up appointment"*/}
        {/*        //                         type="datetime-local"*/}
        {/*        //                         defaultValue="2017-05-24T10:30"*/}
        {/*        //                         className={"mb-16"}*/}
        {/*        //                         InputLabelProps={{*/}
        {/*        //                             shrink: true*/}
        {/*        //                         }}*/}
        {/*        //                         variant="outlined"*/}
        {/*        //                     />*/}
        {/*        //                     <TextField*/}
        {/*        //                         id="datetime-local"*/}
        {/*        //                         label="Drop-off appointment"*/}
        {/*        //                         type="datetime-local"*/}
        {/*        //                         defaultValue="2017-05-24T10:30"*/}
        {/*        //                         className={classes.textField}*/}
        {/*        //                         InputLabelProps={{*/}
        {/*        //                             shrink: true,*/}
        {/*        //                         }}*/}
        {/*        //                         variant="outlined"*/}
        {/*        //                     />*/}
        {/*        //                     <SelectFormsy*/}
        {/*        //                         className="my-16"*/}
        {/*        //                         name="related-outlined"*/}
        {/*        //                         label="Pick-up location"*/}
        {/*        //                         value="sg"*/}
        {/*        //                         variant="outlined"*/}
        {/*        //*/}
        {/*        //                     >*/}
        {/*        //                         <MenuItem value="sg">Ho Chi Minh</MenuItem>*/}
        {/*        //                         <MenuItem value="olivier">Olivier</MenuItem>*/}
        {/*        //                         <MenuItem value="kevin">Kevin</MenuItem>*/}
        {/*        //                     </SelectFormsy>*/}
        {/*        //                     <Button variant="contained" color="primary">*/}
        {/*        //                         Book now*/}
        {/*        //             </Button>*/}
        {/*        //                 </Formsy>*/}
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