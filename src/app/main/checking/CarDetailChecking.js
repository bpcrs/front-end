import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Card,
    Button,
    Typography,
    TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import CancelIcon from "@material-ui/icons/Cancel";
import Layout from "../../layout";
import { fetchCarDetailCheck, putCarUpdate } from "./checking.action";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SwipeableTextMobileStepper from "../booking/SlideShow";
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
    slide: {
        width: "100%",
        margin: theme.spacing(1),
    }
}));


const fakeImg =
    "https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg";

export default function CarDetailChecking(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const carDetail = useSelector((state) => state.checking.carDetail);
    const [currentCar, setCurrentCar] = useState({});
    const changePage = useSelector((state) => state.checking.changePage);

    useEffect(() => {
        const { carId } = props.location.state;
        const fetchCar = () => {
            dispatch(fetchCarDetailCheck(carId));
            setCurrentCar(carDetail);
        };
        fetchCar();

        if (changePage) {
            history.push({
                pathname: APP_PATH.CHECKING,
            });
        }
    }, [carDetail.id, changePage])


    const handleValueAutoDrive = (state) => {
        if (state) {
            return "TRUE";
        }
        else {
            return "FALSE";
        }
    };

    const handleAcceptCar = () => {
        dispatch(putCarUpdate(currentCar.id, {
            available: true,
            status: "AVAILABLE",
        }));
    };

    return (
        <Layout name="Car checking form">
            <Grid container>
                <Grid item xs={12} lg={6} sm={6}>
                    <Card className={classes.card}>
                        <TextField
                            className={classes.textField}
                            label="Brand"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={currentCar.brand ? currentCar.brand.name : ""}
                        />
                        <TextField
                            className={classes.textField}
                            label="Model"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={currentCar.model ? currentCar.model.name : ""}
                        />
                        <TextField
                            className={classes.textField}
                            id="year"
                            name="year"
                            value={currentCar.year ? currentCar.year : ""}
                            label="Years"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            id="name"
                            value={currentCar.name ? currentCar.name : ""}
                            label="Name"
                            name="name"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            label="Auto Drive"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={handleValueAutoDrive(currentCar.autoDrive)}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} lg={6} sm={6}>
                    <Card className={classes.card}>
                        <TextField
                            className={classes.textField}
                            id="vin"
                            InputProps={{
                                readOnly: true,
                            }}
                            name="vin"
                            value={currentCar.vin ? currentCar.vin : ""}
                            label="Vin number"
                            variant="outlined"

                        />
                        <TextField
                            className={classes.textField}
                            id="seat"
                            name="seat"
                            value={currentCar.seat ? currentCar.seat : ""}
                            label="Seat"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            id="sound"
                            name="sound"
                            value={currentCar.sound ? currentCar.sound : ""}
                            label="Sound"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            id="screen"
                            name="screen"
                            value={currentCar.screen ? currentCar.screen : ""}
                            label="Screen"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            id="price"
                            name="price"
                            value={currentCar.price ? currentCar.price : ""}
                            label="Price (per day)"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            id="plateNum"
                            name="plateNum"
                            value={currentCar.plateNum ? currentCar.plateNum : ""}
                            label="Plate number"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid item xs={12} lg={8} sm={12} >
                    <Card className={classes.card}>
                        <SwipeableTextMobileStepper
                            images={currentCar.images ? currentCar.images : [fakeImg]}
                        />
                    </Card>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid item xs={6} lg={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAcceptCar()}
                        startIcon={<CheckCircleIcon />}
                        style={{ marginLeft: "30%" }}
                    >
                        Accept
                    </Button>
                </Grid>
                <Grid item xs={6} lg={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CancelIcon />}
                        style={{ marginLeft: "30%" }}
                    >
                        Deny
                    </Button>
                </Grid>
            </Grid>
        </Layout >
    );
}