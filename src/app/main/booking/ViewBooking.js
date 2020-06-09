import React from 'react'
import { Container, Grid, Breadcrumbs, Chip, withStyles, Typography, AppBar, Toolbar, Button, IconButton, makeStyles, TextField, Icon, Card, CardContent, Box, CardHeader, CardActionArea, CardActions } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/';
import CarItem from './CarItem';
import Formsy from 'formsy-react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    root: {
        flexGrow: 1,
    },
    spacingCard: {
        marginTop: theme.spacing(1),
        marginLeft: 0,
        marginRight: 0,
    }
}));



export default function ViewBooking() {
    const classes = useStyles();
    return (
        <>
            <Grid>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <HomeIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Review Plan
                                </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Container>
                <Container className={classes.spacingCard}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} xl={6}>
                                    <Typography variant="subtitle1">PICK UP & DROP</Typography>
                                </Grid>
                                <Grid item xs={12} xl={6} justify="flex-end" container>
                                    <Typography> <Icon>location_on</Icon>FPT University, District 9, Ho Chi Minh City</Typography>

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
                <Container className={classes.spacingCard}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">TRIP DURATION</Typography>
                                </Grid>

                                <Grid item xl={5} lg={5} container direction="row" spacing={1}>
                                    <Grid item xs={6} xl={6} lg={6} style={{ textAlign: "right" }}>
                                        <Typography variant="h4">09</Typography>
                                    </Grid>
                                    <Grid item xs={6} xl={6} lg={6}><Grid><Typography variant="caption">Jun-2020</Typography>
                                        <Typography variant="caption" component="p">09:30 PM</Typography>
                                    </Grid></Grid>
                                </Grid>

                                <Grid item xs={12} xl={2} lg={2} container justify="center" alignItems="center" spacing={1}>
                                    <Grid item>
                                        <Typography variant="overline">To</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xl={5} lg={5} container direction="row" spacing={1}>
                                    <Grid item xs={6} xl={6} lg={6} style={{ textAlign: "right" }}>
                                        <Typography variant="h4">10</Typography>
                                        {/* <p className="text-base sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">09</p> */}
                                    </Grid>
                                    <Grid item xs={6} xl={6} lg={6}><Grid><Typography variant="caption">Jun-2020</Typography>
                                        <Typography variant="caption" component="p">09:30 PM</Typography>
                                    </Grid></Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
                <Container className={classes.spacingCard}>
                    <Grid container justify="space-evenly" className={classes.root} alignItems="center" spacing={2}>
                        <Grid item xs={12} lg={12} xl={12} className={classes.paper}>
                            <CarItem isAction={false} />
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        </>
    )
}
