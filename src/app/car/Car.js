import React, { Component } from 'react'
import { withStyles, MenuItem, TextField, Grid, Card, CardContent, Typography, Button, CardActionArea, CardMedia, CardActions } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Formsy from 'formsy-react';
import {
    SelectFormsy
} from '@fuse/components/formsy';
import { NavBar, LandingProvider } from 'landing-blocks/dist'

const styles = theme => ({
    root: {
        color: theme.palette.primary.contrastText
    }, media: {
        height: 140,
        width: '100%'
    },

});

class Car extends Component {

    state = {
        tabValue: 0
    };

    handleChange = (event) => {
        this.setLocation(event.target.value);
    };

    render() {
        const { classes } = this.props;
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
                    <div className="flex flex-col flex-1 flex-no-shrink p-12 md:flex-row">
                        <div className="max-w-400 mx-auto m-16 md:m-0">
                            <div className="flex flex-col items-center justify-center p-32 md:p-48 ">
                                <Typography variant="h3" className="text-center md:w-full mb-20">Filter</Typography>
                                <Typography variant="h6" className="text-center md:w-full mt-20">Car type</Typography>
                                <Grid container spacing={8}>
                                    <Grid item xs={12} sm={6} >
                                        <Button className="w-full mb-20" variant="outlined" color="primary">Hatchback</Button>
                                        <Button className="w-full" variant="outlined" color="primary">Sedan</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button className="w-full mb-20" variant="outlined" color="primary">SUV</Button>
                                        <Button className="w-full" variant="outlined" color="primary">Mini SUV</Button>
                                    </Grid>
                                </Grid>
                                <Typography variant="h6" className="text-center md:w-full mt-20">Tranminssion Type</Typography>
                                <Grid container spacing={8}>
                                    <Grid item xs={12} sm={6}>
                                        <Button className="w-full" variant="outlined" color="primary">Manual</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button className="w-full" variant="outlined" color="primary">Automatic</Button>
                                    </Grid>
                                </Grid>
                                <Typography variant="h6" className="text-center md:w-full mt-20">Fuel Type</Typography>
                                <Grid container spacing={8}>
                                    <Grid item xs={12} sm={6}>
                                        <Button className="w-full" variant="outlined" color="primary">Diesel</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button className="w-full" variant="outlined" color="primary">Petrol</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div >
                        <div className="flex flex-col flex-no-grow items-center text-white p-16 md:items-start md:flex-no-shrink md:flex-1 md:text-left">
                            <Formsy className="flex flex-col justify-center">
                                <Grid container spacing={8}>
                                    <Grid item xs={12} sm={6} >
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
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
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
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <SelectFormsy
                                            name="related-outlined"
                                            label="Pick-up location"
                                            value="sg"
                                            variant="outlined"
                                        >
                                            <MenuItem value="sg">Tan Son Nhat Airport</MenuItem>
                                            <MenuItem value="olivier">Ben Thanh Market</MenuItem>
                                            <MenuItem value="kevin">Cho Lon Market</MenuItem>
                                        </SelectFormsy>
                                    </Grid>
                                    <Grid item xs >
                                        <Button variant="contained" color="primary">
                                            Search
                                </Button>
                                    </Grid>
                                </Grid>
                            </Formsy>

                            <Grid container spacing={8}>
                                <Grid item xs={6} >
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image="https://vinfastphumyhung.vn/wp-content/uploads/2019/04/danh-gia-xe-vinfast-043f.jpg"
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    VINFAST LUX SA 2.0
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Manual, 7 Seats, Diesel
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    FPT University - Ho Chi Minh City
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    7 km away
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Details
                                            </Button>
                                            <Button size="small" color="primary">
                                                Compare
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image="https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg"
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Honda Civic 1.5RS
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Manual, 7 Seats, Petrol
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    FPT Software - Ho Chi Minh City
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    8.6 km away
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Details
                                            </Button>
                                            <Button size="small" color="primary">
                                                Compare
                                    </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image="https://www.toyota.com.vn/data/news/4676/_color/B%E1%BA%A1c-(1D4)-G-2.png?width=600"
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    TOYOTA CAMRY 2.0G
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Manual, 7 Seats, Petrol
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    FPT Software 3 - Ho Chi Minh City
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    6.5 km away
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Details
                                            </Button>
                                            <Button size="small" color="primary">
                                                Compare
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </LandingProvider>
            </div >
        )
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(Car));