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
import { fetchUserListChecking } from "./checking.action";



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

export default function CheckUser() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.checking.users);

    useEffect(() => {
        dispatch(fetchUserListChecking())
    }, [dispatch]);

    const handleStateUser = (state) => {
        if(state){
            return "ACTIVED";
        }else{
            return "NOT ACTIVED";
        }
    };

    const handleColorStateUser = (state) => {
        if(state){
            return "green";
        }else{
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
                        users.map((user) => (
                            <TableRow>
                                <Card className={classes.card}>
                                    <Grid container spacing={0} style={{ wordWrap: "break-word", textAlign: "center" }}>

                                        <Grid item xs={5} lg={5}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar
                                                        aria-label="recipe"
                                                        className={classes.avatar}
                                                        src={user.imageUrl}
                                                    ></Avatar>
                                                }
                                                title={user.fullName}
                                            // subheader={"Email: " + user.email}
                                            />
                                        </Grid>

                                        <Grid item xs={3} lg={3}>
                                            <p>{new Date(user.createdDate).toLocaleDateString()}</p>
                                        </Grid>

                                        <Grid item xs={3} lg={3}
                                            style={{
                                                border: "2px solid",
                                                borderColor: "#B0C4DE",
                                                borderRadius: "0px 50px 50px 50px",
                                                height: "50%",
                                                textAlign: "center",
                                                marginTop: "1%",
                                            }}>
                                            <p style={{color:handleColorStateUser(user.active)}} >{handleStateUser(user.active)}</p>
                                        </Grid>

                                        <Grid item xs={1} lg={1}>
                                            <div >
                                                <SettingIcon style={{ marginTop: "50%" }} />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </TableContainer>
    );
}