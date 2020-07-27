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

export default function UserDetailChecking(props) {
    const classes = useStyles();
    
    return (
        <Layout name="User checking form">
            <Grid spacing={1} container justify="center" alignItems="center">
                <h1>Information User</h1>
            </Grid>

            <Grid container justify="center">
                <Grid item lg={5} xs={12}>
                    <Grid item xs={12} sm={6} lg={10}>
                        <Card className={classes.card}>
                            <Grid spacing={2} container justify="center" alignItems="center">
                                <Grid item xs={12} lg={12}>
                                    <TextField
                                        className={classes.textField}
                                        label="Full Name"
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={12} lg={12}>
                                    <TextField
                                        className={classes.textField}
                                        label="Email"
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                            </Grid>


                            <Grid item xs={12} lg={12}>
                                <TextField
                                    className={classes.textField}
                                    disabled
                                    label="Phone"
                                    variant="outlined"
                                />
                            </Grid>


                            <Grid item xs={12} lg={12}>
                                <TextField
                                    className={classes.textField}
                                    disabled
                                    label="Identification"
                                    variant="outlined"
                                />
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={7}>
                    <Card className={classes.card}>
                        <div className="mt-20">
                            this is image
                            {/* <Grid container>
                                {
                                    currentCar.images &&
                                    currentCar.images.map((image, index) => (
                                        <Grid item xs={12} lg={6} key={index}>
                                            <div style={{ textAlign: "center" }}>
                                                <p>Picture {index + 1}</p>
                                                <p>
                                                    <img src="" id="output" width="200" height="200" />
                                                </p>
                                            </div>
                                        </Grid>
                                    ))
                                }
                            </Grid> */}
                        </div>
                    </Card>
                </Grid>
            </Grid>

            <Grid container justify="center">
                <Grid item xs={6} lg={6}>
                    <Button
                        variant="contained"
                        color="primary"
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