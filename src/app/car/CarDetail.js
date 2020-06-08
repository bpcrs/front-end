import React, { Component } from 'react'
import { withStyles, Icon, CardHeader, Avatar, Grid, Card, CardContent, Typography, Button, CardActionArea, CardMedia, CardActions } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Formsy from 'formsy-react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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

class CarDetails extends Component {

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
                    <div className="flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0">
                        <Card className="flex flex-col flex-no-grow items-center text-white p-16 text-center  md:items-start md:flex-no-shrink md:flex-1 md:text-left">
                            <Typography gutterBottom variant="h4" component="h2">
                                Car Details
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2">
                                VINFAST LUX SA 2.0
                            </Typography>
                            <Grid container spacing={8}>
                                <Grid item xs={3}>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg"
                                        title="Contemplative Reptile"
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <CardContent>
                                        <Typography variant="body1" color="textPrimary" component="p">
                                            Manual, 7 Seats, Diesel
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary" component="p">
                                            FPT University - Ho Chi Minh City
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary" component="p">
                                            75A-145.19
                                        </Typography>
                                        <Button variant="contained" color="primary" >4.3</Button>
                                        <Button color="default">3 reviews</Button>
                                    </CardContent>
                                </Grid>
                            </Grid>

                            <Typography gutterBottom variant="h4" component="h2" className="mt-20">
                                Owner Details
                                </Typography>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        TT
                                    </Avatar>
                                }
                            />
                            <Typography variant="body2" color="textPrimary" component="p">
                                Fullname: Trần Đức Thái
                            </Typography>
                            <Typography variant="body2" color="textPrimary" component="p">
                                Email: thaitdse62593@fpt.edu.vn
                            </Typography>
                            <Typography variant="body2" color="textPrimary" component="p">
                                Mobile Number: 0348130639
                            </Typography>
                            <Typography gutterBottom variant="h4" component="h2" className="mt-20">
                                Reviews
                            </Typography>
                        </Card>
                        <div className="max-w-400 mx-auto p-128 md:p-48 ">                                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
                            <CardContent>
                                <Typography variant="h6" >Pick-up</Typography>
                                <Typography variant="body2" color="textPrimary" component="p">March 11, 2019</Typography>
                                <Typography variant="body2" color="textPrimary" component="p">141, 19 Street, An Phu Wards, Distric 2</Typography>
                                <Typography variant="h6" >Drop-off</Typography>
                                <Typography variant="body2" color="textPrimary" component="p">March 20, 2019</Typography>
                                <Typography variant="body2" color="textPrimary" component="p">141, 19 Street, An Phu Wards, Distric 2</Typography>
                            </CardContent>
                        </Card >
                            <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
                                <CardContent>
                                    <Typography variant="h6" >Price summary</Typography>
                                    <Grid container justify="space-between">
                                        <Typography variant="body2" align="left" color="textPrimary">Car rental fee</Typography>
                                        <Typography variant="body2" align="right" color="textPrimary">1,200,000 dong</Typography>
                                        <Button variant="contained" color="primary" className="w-full mt-20">Book Now</Button>
                                    </Grid>
                                </CardContent>
                            </Card >
                        </div >
                    </div>
                </LandingProvider>
            </div >
        )
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(CarDetails));