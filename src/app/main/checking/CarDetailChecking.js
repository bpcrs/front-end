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
import CancelIcon from "@material-ui/icons/Cancel";
import Layout from "../../layout";
import { fetchCarDetailCheck, putCarUpdate } from "./checking.action";

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
                                        value={currentCar.brand ? currentCar.brand.name : ""}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={12} lg={12}>
                                    <TextField
                                        className={classes.textField}
                                        label="Model"
                                        variant="outlined"
                                        value={currentCar.model ? currentCar.model.name : ""}
                                        disabled
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} lg={12}>
                                <TextField
                                    className={classes.textField}
                                    id="year"
                                    name="year"
                                    value={currentCar.year ? currentCar.year : ""}
                                    disabled
                                    label="Years"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} lg={12}>
                                <TextField
                                    className={classes.textField}
                                    id="name"
                                    value={currentCar.name ? currentCar.name : ""}
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
                                    value={handleValueAutoDrive(currentCar.autoDrive)}
                                    disabled
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
                                    value={currentCar.vin ? currentCar.vin : ""}
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
                                    value={currentCar.seat ? currentCar.seat : ""}
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
                                    value={currentCar.sound ? currentCar.sound : ""}
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
                                    value={currentCar.screen ? currentCar.screen : ""}
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
                                    value={currentCar.price ? currentCar.price : ""}
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
                                    value={currentCar.plateNum ? currentCar.plateNum : ""}
                                    disabled
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
                                {
                                    currentCar.images &&
                                    currentCar.images.map((image, index) => (
                                        <Grid item xs={12} lg={6} key={index}>
                                            <div style={{ textAlign: "center" }}>
                                                <p>Picture {index + 1}</p>
                                                <p>
                                                    <img src={image.link} id="output" width="200" height="200" />
                                                </p>
                                            </div>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </div>
                    </Card>
                </Grid>
            </Grid>

            <Grid container justify="center">
                <Grid item xs={6} lg={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAcceptCar()}
                        startIcon={<PublishIcon />}
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
        </Button></Grid>
            </Grid>
        </Layout>
    );
}