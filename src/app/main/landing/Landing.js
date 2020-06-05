import React, { Component } from 'react';
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

const styles = theme => ({
    layoutRoot: {}
});


const tutorialSteps = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
        imgPath:
            'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];
function Landing(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;
    const { classes } = props;

    return (
        <FusePageSimple
            classes={{
                root: classes.layoutRoot
            }}
            // header={
            //     <>
            //         <div>BPCRS</div>

            //     </>
            //     // <div className="p-24"><h4>Header</h4></div>
            // }
            contentToolbar={
                <>
                    <div className="px-24"><h4>Content Toolbar</h4></div>
                </>
            }
            content={
                <div className="p-24">
                    <Grid container className={classes.root} spacing={2}>
                        <Grid item xs={6} >
                            <Typography className="h2 mb-24">Schedule your plan</Typography>
                            <Grid item justify="center" spacing={3} xs={10}>
                                <Formsy className="flex flex-col justify-center">
                                    {/* <TextFieldFormsy
                                        className="mb-16"
                                        type="text"
                                        name="name"
                                        label="Name"
                                        validations={{
                                            minLength: 4,
                                        }}
                                        validationErrors={{
                                            minLength: 'Min character length is 4',
                                        }}
                                        required
                                        variant="outlined"
                                    /> */}
                                    <TextField

                                        id="datetime-local"
                                        label="Pick-up appointment"
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        className={"mb-16"}
                                        InputLabelProps={{
                                            shrink: true,
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
                                </Formsy>
                            </Grid>
                        </Grid>
                        <Grid item justify="center" xs={6}>
                            <Paper square elevation={0} className={classes.header}>
                                <Typography>{tutorialSteps[activeStep].label}</Typography>
                            </Paper>
                            <img
                                src={tutorialSteps[activeStep].imgPath}
                                alt={tutorialSteps[activeStep].label}
                            />
                            {/* <MobileStepper
                                steps={maxSteps}
                                position="static"
                                variant="text"
                                activeStep={activeStep}
                            // nextButton={
                            //     // <Button size="small" disabled={activeStep === maxSteps - 1}>
                            //     //     Next
                            //     // </Button>
                            // }
                            // backButton={
                            //     <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            //         Back
                            //     </Button>
                            // }
                            /> */}
                        </Grid>

                    </Grid>

                </div>
            }
        />
    )
}

export default withStyles(styles, { withTheme: true })(Landing);