// import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Icon, Card, Button, CardHeader, Avatar, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SettingIcon from "@material-ui/icons/Settings";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarInformationOwner } from "./profile.action";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";

function createData(name, property1, property2) {
    return { name, property1, property2 };
}

const useStyles = makeStyles((theme) => ({
    root: {
        // display: "flex",
        // flexWrap: "wrap",
    },
    card: {
        margin: theme.spacing(2),
    },
}));


export default function CarInformationProfile(props) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const cars = useSelector((state) => state.profile.cars);
    const currentUser = useSelector((state) => state.auth.user);
    const history = useHistory();

    const handleCickSetting = (carId) => {
        history.push({
            pathname: APP_PATH.CAR_EDIT + "/" + carId,
            state: {
            carId,
            }
        });
    };

    useEffect(() => {
        dispatch(fetchCarInformationOwner(currentUser.id));
    }, [dispatch]);

    const borderState = {
        border: "2px solid",
        borderColor: "#B0C4DE",
        borderRadius: "0px 50px 50px 50px",
        height: "50%",
        textAlign: "center",
        marginTop: "1%",
    };

    const replaceTextCarState = (carState) => {
        if (carState) {
            return "Available";
        } else {
            return "Not Available";
        }
    };
    const handleColorCarState = (carState) => {
        if (carState) {
            return "green";
        } else {
            return "red";
        }
    };
    return (

        <TableContainer>
            <Table
                className={classes.table}
                aria-label="customized table"
                width="100%"
            >
                <TableBody>
                    {
                        cars.map((car) => (
                            <Card className={classes.card}>
                                <Grid container spacing={0} style={{ wordWrap: "break-word", textAlign: "center" }}>
                                    <Grid item xs={3} lg={3}>
                                        <h2>{car.name}</h2>
                                    </Grid>

                                    <Grid item xs={2} lg={2}>
                                        <p>${car.price}</p>
                                    </Grid>

                                    <Grid item xs={4} lg={4}>
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    aria-label="recipe"
                                                    className={classes.avatar}
                                                    src="https://lh3.googleusercontent.com/a-/AOh14GhWcAjNF98iWQlx6syJZbHBqqJBh5RWr4m8lcpPgA=s96-c"
                                                ></Avatar>
                                            }
                                            title="Nguyen Duy Tien"
                                            subheader="on rent"
                                        />
                                    </Grid>

                                    <Grid item xs={2} lg={2}
                                        style={borderState}>
                                        <p style={{ color: handleColorCarState(car.available) }} >{replaceTextCarState(car.available)}</p>
                                    </Grid>

                                    <Grid item xs={1} lg={1}>
                                        <div >
                                            <SettingIcon style={{ marginTop: "50%" }} onClick={() => handleCickSetting(car.id)} />
                                        </div>

                                        {/* <div>
                                            <Button
                                                startIcon={<SettingIcon />}
                                                onClick={()=> handleCickSetting(car.id)}                                                
                                                style={{ marginTop: "40%" }} />
                                        </div> */}
                                    </Grid>
                                </Grid>
                            </Card>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>


    );
}