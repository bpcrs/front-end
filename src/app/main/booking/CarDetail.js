import React, { Component } from 'react'
import { withStyles, CardHeader, Avatar, Grid, Card, CardContent, Typography, Button, CardMedia, CardActions, Icon, makeStyles } from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';
import Layout from '../../layout';
import { APP_PATH } from '../../../constant';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.contrastText
    },
    media: {
        height: 140,
        width: '100%'
    },

}));

export default function CarDetails(props) {
    const history = useHistory();

    const handleChange = (event) => {
        this.setLocation(event.target.value);
    };

    const classes = useStyles();
    return (
        <Layout name="Vinfast 2.0">
            <Grid container spacing={3}>
                <Grid item xl={8}>
                    <Grid container spacing={3}>
                        <Grid item xl={12} xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        Car Details
                            </Typography>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        VINFAST LUX SA 2.0
                            </Typography>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <CardMedia
                                                className={classes.media}
                                                image="https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg"
                                                title="Contemplative Reptile"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Grid spacing={1} container justify="space-between" alignItems="baseline">
                                                    <Grid xs={3} item container direction="row" alignItems="center" justify="space-around">
                                                        <Grid justify="center" container>
                                                            <Icon fontSize={"default"}>airline_seat_recline_normal_outlined</Icon>
                                                        </Grid>
                                                        <Grid item container justify="center">
                                                            <Typography variant="caption">4 people</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid xs={3} item container direction="row" alignItems="center" justify="space-around">
                                                        <Grid item container justify="center">
                                                            <Icon fontSize={"default"}>gamepad</Icon>
                                                        </Grid>
                                                        <Grid item container justify="center">
                                                            <Typography variant="caption">Automatic</Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid xs={3} item container direction="row" alignItems="center" justify="space-around">
                                                        <Grid item container justify="center">
                                                            <Icon fontSize={"default"}>directions_car</Icon>
                                                        </Grid>
                                                        <Grid item container justify="center">
                                                            <Typography variant="caption">SUV Car</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                            <CardContent>
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
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xl={12}>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Typography gutterBottom variant="h4">Reviews</Typography>
                                    </Grid>
                                    <Grid container spacing={1} >
                                        <Grid item xs={12} xl={4}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                        R
                                            </Avatar>
                                                }
                                                title="Trần Đức Thái"
                                                subheader="May 14, 2020"
                                            />
                                        </Grid>
                                        <Grid item xs={12} xl={8}>
                                            <Typography>
                                                Excellent price
                                    </Typography>
                                            <Typography>
                                                Excellent price, will definitely return to this application for car rentals
                                    </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={4}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} xl={12}>
                            <Card square>
                                <CardContent>
                                    <Typography variant="h6" >Pick-up</Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">March 11, 2019</Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">141, 19 Street, An Phu Wards, Distric 2</Typography>
                                    <Typography variant="h6" >Drop-off</Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">March 20, 2019</Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">141, 19 Street, An Phu Wards, Distric 2</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} xl={12}>
                            <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
                                <CardContent>
                                    <Typography variant="h6" >Price summary</Typography>
                                    <Grid container justify="space-between">
                                        <Typography variant="body2" align="left" color="textPrimary">Car rental fee</Typography>
                                        <Typography variant="body2" align="right" color="textPrimary">1,200,000 dong</Typography>
                                        <Button variant="contained" color="primary" className="w-full mt-20" onClick={() => history.push(APP_PATH.VIEW_BOOKING)}>Book Now</Button>
                                    </Grid>
                                </CardContent>
                            </Card >
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    )
}