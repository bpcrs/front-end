import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardHeader, Avatar } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SettingIcon from "@material-ui/icons/Settings";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import { fetchCarCheckingAdmin } from "./checking.action";



const useStyles = makeStyles((theme) => ({
    root: {
        // display: "flex",
        // flexWrap: "wrap",
    },
    card: {
        margin: theme.spacing(2),
        borderRadius: "80px",
    },
}));

export default function CheckCar() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.checking.cars);

    useEffect(() => {
        dispatch(fetchCarCheckingAdmin());
    }, [dispatch]);


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

    const handleCickSetting = (carId) => {
        history.push({
            pathname: APP_PATH.CAR_EDIT + "/" + carId,
            state: {
                carId,
            }
        });
    };

    return (
        <TableContainer>
            <Table
                className={classes.table}
                aria-label="customized table"
                width="100%"
            >
                <TableBody>
                    {   cars.data &&
                        cars.data.map((car, index) => (
                            <TableRow>
                                <Card className={classes.card} key={index}>
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
                                            style={{
                                                border: "2px solid",
                                                borderColor: "#B0C4DE",
                                                borderRadius: "0px 50px 50px 50px",
                                                height: "50%",
                                                textAlign: "center",
                                                marginTop: "1%",
                                            }}>
                                            <p style={{ color: handleColorCarState(car.available) }} >{replaceTextCarState(car.available)}</p>
                                        </Grid>

                                        <Grid item xs={1} lg={1}>
                                            <div >
                                                <SettingIcon style={{ marginTop: "50%" }} onClick={() => handleCickSetting(car.id)} />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </TableRow>
                        ))



                        // cars.map((car) => (
                        //     <TableRow>
                        //         <Card className={classes.card}>
                        //             <Grid container spacing={0} style={{ wordWrap: "break-word", textAlign: "center" }}>
                        //                 <Grid item xs={3} lg={3}>
                        //                     <h2>{car.name}</h2>
                        //                 </Grid>

                        //                 <Grid item xs={2} lg={2}>
                        //                     <p>${car.price}</p>
                        //                 </Grid>

                        //                 <Grid item xs={4} lg={4}>
                        //                     <CardHeader
                        //                         avatar={
                        //                             <Avatar
                        //                                 aria-label="recipe"
                        //                                 src="https://lh3.googleusercontent.com/a-/AOh14GhWcAjNF98iWQlx6syJZbHBqqJBh5RWr4m8lcpPgA=s96-c"
                        //                             ></Avatar>
                        //                         }
                        //                         title="Nguyen Duy Tien"
                        //                         subheader="Owner"
                        //                     />
                        //                 </Grid>

                        //                 <Grid item xs={2} lg={2}
                        //                     style={{
                        //                         border: "2px solid",
                        //                         borderColor: "#B0C4DE",
                        //                         borderRadius: "0px 50px 50px 50px",
                        //                         height: "50%",
                        //                         textAlign: "center",
                        //                         marginTop: "1%",
                        //                     }}>
                        //                     <p style={{ color: handleColorCarState(car.available) }} >{replaceTextCarState(car.available)}</p>
                        //                 </Grid>

                        //                 <Grid item xs={1} lg={1}>
                        //                     <div >
                        //                         <SettingIcon style={{ marginTop: "50%" }} onClick={() => handleCickSetting(car.id)} />
                        //                     </div>
                        //                 </Grid>


                        //             </Grid>
                        //         </Card>
                        //     </TableRow>
                        // ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}