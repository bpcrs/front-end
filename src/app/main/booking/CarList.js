import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CarItem from './CarItem';

import Layout from '../../layout';
import { APP_PATH } from '../../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarList } from './booking.action';

const useStyles = makeStyles(theme => ({
    layoutRoot: {},
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

function CarList() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const cars = useSelector(state => state.booking.cars)
    useEffect(() => {
        let ignore = cars.length === 0;
        if (ignore) {
            dispatch(fetchCarList())
        }
    }, [cars.length, dispatch])
    return (
        <Layout name="Car Available">
            {/* <Container > */}
                <Grid container spacing={1} className={classes.root}  >
                    {cars.map((car, index) => (
                        <Grid item xs={12} xl={3} lg={4} className={classes.paper} key={index}>
                            <CarItem isAction={true} info={car} onBooking={() => history.push(`${APP_PATH.CAR_ITEM}/1`)} />
                        </Grid>)
                    )}
                </Grid>
            {/* </Container> */}
        </Layout>
    )
}

export default CarList;