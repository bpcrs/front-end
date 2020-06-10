import React, { Component } from 'react'
import { withStyles, MenuItem, TextField, Grid, Card, CardContent, Typography, Button, CardActionArea, CardMedia, CardActions } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import Formsy from 'formsy-react';
import {
    SelectFormsy
} from '@fuse/components/formsy';
import { NavBar, LandingProvider } from 'landing-blocks/dist'
import CarItem from './CarItem';

const styles = theme => ({
    root: {
        color: theme.palette.primary.contrastText
    }, media: {
        height: 200,
        width: '100%'
    },
});
function Car(props) {
    const history = useHistory();
    const classes = { props };

    return (
        <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink")}>
            <LandingProvider primary='#5D21D2' background='#fff'>
                <NavBar
                    logo={<img width='80px' src="assets/images/logos/fuse.svg" />}
                    navs={[
                        <Button variant="contained">Features</Button>,
                        <Button variant="contained">Use Cases</Button>,
                        <Button variant="contained">Pricing</Button>,
                        <Button variant="contained">About Us</Button>,
                        <Button variant="contained">Login</Button>,
                    ]}
                />
                <Formsy className="flex flex-col justify-center">
                    <Grid container spacing={3} justify="center" alignItems="center" className="p-20">
                        <Grid item xs={12} sm={4} className="m-auto" >
                            <TextField
                                id="datetime-local"
                                label="Pick-up appointment"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                className="w-full"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <TextField
                                id="datetime-local"
                                label="Drop-off appointment"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                className="w-full"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <SelectFormsy
                                name="related-outlined"
                                label="Pick-up location"
                                variant="outlined"
                                className="w-full"
                            >
                                <MenuItem value="sg">Tan Son Nhat Airport</MenuItem>
                                <MenuItem value="olivier">Ben Thanh Market</MenuItem>
                                <MenuItem value="kevin">Cho Lon Market</MenuItem>
                            </SelectFormsy>
                        </Grid>
                        <Grid item xs={12} sm={1} >
                            <Button variant="contained" color="primary" className="w-full">
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Formsy>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={3} >
                        <div className="flex flex-col items-center justify-center p-20">
                            <Typography variant="h3" className="text-center md:w-full mb-20">Filter</Typography>
                            <Typography variant="h6" className="text-center md:w-full mt-20">Car type</Typography>
                            <Grid container>
                                <Grid item xs={12} sm={6} >
                                    <Button className="w-full" variant="outlined" color="primary">Hatchback</Button>
                                    <Button className="w-full" variant="outlined" color="primary">Sedan</Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button className="w-full" variant="outlined" color="primary">SUV</Button>
                                    <Button className="w-full" variant="outlined" color="primary">Mini SUV</Button>
                                </Grid>
                            </Grid>
                            <Typography variant="h6" className="text-center md:w-full mt-20">Tranminssion Type</Typography>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Button className="w-full" variant="outlined" color="primary">Manual</Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button className="w-full" variant="outlined" color="primary">Automatic</Button>
                                </Grid>
                            </Grid>
                            <Typography variant="h6" className="text-center md:w-full mt-20">Fuel Type</Typography>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Button className="w-full" variant="outlined" color="primary">Diesel</Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button className="w-full" variant="outlined" color="primary">Petrol</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid >
                    <Grid item xs={12} sm={9} >
                        <Typography variant="h3" className="text-center md:w-full m-20">
                            Car list
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} >
                                <Card>
                                    <CarItem />
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CarItem />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CarItem />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </LandingProvider>
        </div >
    )

}

export default withStyles(styles, { withTheme: true })(withRouter(Car));