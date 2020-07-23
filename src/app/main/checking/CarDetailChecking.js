import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
    Grid, Card, CardHeader, Avatar, Button,
    TextField,
} from "@material-ui/core";
import SettingIcon from "@material-ui/icons/Settings";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import PublishIcon from "@material-ui/icons/Publish";
import Layout from "../../layout";
import { fetchCarDetailCheck, fetchBrandList, fetchModelList } from "./checking.action";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.contrastText,
    },
    media: {
        height: 240,
        width: "50%",
    },
    imageUploading: {
        height: 100,
    },
    icon: {
        height: "100%",
        width: 50,
        marginRight: 10,
    },
    formControl: {
        width: "100%",
        maxHeight: ITEM_HEIGHT * 4.5,
    },
    textField: {
        width: "100%",
        margin: theme.spacing(1),
    },
    card: {
        margin: 20,
        padding: 20,
    },
    button: {
        margin: theme.spacing(1),
    },

}));

export default function CarDetailChecking(props) {
    const { carId } = props.location.state;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const carDetail = useSelector((state) => state.checking.carDetail);
    const brands = useSelector((state) => state.checking.brands);
    const models = useSelector((state) => state.checking.models);
   
    useEffect(() => {
        dispatch(fetchCarDetailCheck(carId));
        dispatch(fetchBrandList());
        dispatch(fetchModelList());
    }, [dispatch])

    return (
        <Layout name="Car checking form">
            <Grid spacing={1} container justify="center" alignItems="center">
                <h1>Information Car</h1>
            </Grid>

            <Grid container justify="center">
                <Grid item lg={5} xs={12}>
                    <Grid item xs={12} sm={6} lg={10}>
                        <Card className={classes.card}>
                            <Grid spacing={2} container justify="center" alignItems="center">
                                <Grid item xs={12} lg={12}>
                                    <TextField
                                        className={classes.textField}
                                        label="Brand"
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} lg={12}>
                                    <TextField
                                        className={classes.textField}
                                        label="Model"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} lg={12}>
                                <TextField
                                    className={classes.textField}
                                    id="year"
                                    name="year"
                                    value={carDetail.year}
                                    disabled
                                    label="Years"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} lg={12}>
                                <TextField
                                    className={classes.textField}
                                    id="name"
                                    value={carDetail.name}
                                    disabled
                                    label="Name"
                                    name="name"
                                    variant="outlined"

                                />
                            </Grid>

                            <Grid item xs={12} lg={12}>
                                <TextField
                                    className={classes.textField}
                                    label="Auto Drive"
                                    variant="outlined"
                                />
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={10}>
                        <Card className={classes.card}>
                            <Grid
                                spacing={1}
                                container
                                justify="space-between"
                                alignItems="baseline"
                            >
                                <TextField
                                    className={classes.textField}
                                    id="vin"
                                    name="vin"
                                    value={carDetail.vin}
                                    disabled
                                    label="Vin number"
                                    variant="outlined"

                                />
                            </Grid>

                            <Grid
                                spacing={1}
                                container
                                justify="space-between"
                                alignItems="baseline"
                            >
                                <TextField
                                    className={classes.textField}
                                    id="seat"
                                    name="seat"
                                    value={carDetail.seat}
                                    disabled
                                    label="Seat"
                                    variant="outlined"

                                />
                            </Grid>

                            <Grid
                                spacing={1}
                                container
                                justify="space-between"
                                alignItems="baseline"
                            >
                                <TextField
                                    className={classes.textField}
                                    id="sound"
                                    name="sound"
                                    value={carDetail.sound}
                                    disabled
                                    label="Sound"
                                    variant="outlined"

                                />
                            </Grid>

                            <Grid
                                spacing={1}
                                container
                                justify="space-between"
                                alignItems="baseline"
                            >
                                <TextField
                                    className={classes.textField}
                                    id="screen"
                                    name="screen"
                                    value={carDetail.screen}
                                    disabled
                                    label="Screen"
                                    variant="outlined"

                                />
                            </Grid>
                            <Grid
                                spacing={1}
                                container
                                justify="space-between"
                                alignItems="baseline"
                            >
                                <TextField
                                    className={classes.textField}
                                    id="price"
                                    name="price"
                                    value={carDetail.price}
                                    disabled
                                    label="Price (per day)"
                                    variant="outlined"

                                />
                            </Grid>

                            <Grid
                                spacing={1}
                                container
                                justify="space-between"
                                alignItems="baseline"
                            >
                                <TextField
                                    className={classes.textField}
                                    id="plateNum"
                                    name="plateNum"
                                    value={carDetail.plateNum}
                                    // disabled
                                    label="Plate number"
                                    variant="outlined"

                                />
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={7}>
                    <Card className={classes.card}>
                        <div className="mt-20">
                            <Grid container>
                                <Grid item xs={12} lg={6}>
                                    <div style={{ textAlign: "center" }}>
                                        <p>Picture 1</p>
                                        <p>
                                            <img id="output" width="200" height="200" />
                                        </p>
                                    </div>
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <div style={{ textAlign: "center" }}>
                                        <p>Picture 2</p>
                                        <p>
                                            <img
                                                id="output2"
                                                width="200"
                                                height="200"
                                            />
                                        </p>
                                    </div>
                                </Grid>

                                <Grid item xs={12} lg={6} sm={6}>
                                    <div style={{ textAlign: "center" }}>
                                        <p>Picture 3</p>
                                        <p>
                                            <img id="output3" width="200" height="200" />
                                        </p>
                                    </div>
                                </Grid>

                                <Grid item xs={12} lg={6} sm={6}>
                                    <div style={{ textAlign: "center" }}>
                                        <p>Picture 4</p>
                                        <p>
                                            <img id="output4" width="200" height="200" />
                                        </p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                </Grid>
            </Grid>

            <Grid container justify="center">
                <Button
                    variant="contained"
                    color="primary"

                    startIcon={<PublishIcon />}
                >
                    Submit
        </Button>
            </Grid>
        </Layout>
    );
}