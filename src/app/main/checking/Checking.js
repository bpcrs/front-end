import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    TextField,
    Avatar,
    Tabs,
    Tab,
    Typography,
    Box,
    Button,
} from "@material-ui/core";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types";
import Layout from "../../layout";
import CheckCar from "./CheckCar";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    tab: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 140,
        width: "100%",
    },
    imageUploading: {
        height: 100,
    },
    icon: {
        height: "100%",
        width: 50,
        marginRight: 10,
    },
    typography: {
        width: "100%",
    },
    textField: {
        width: "90%",
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    button: {
        marginTop: theme.spacing(3),
    },
}));

export default function Cheking() {
    const classes = useStyles();

    const [tab, setTab] = React.useState(0);

    const handleSetTab = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Layout name="Profile">
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={3} sm={3}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={tab}
                            onChange={handleSetTab}
                            aria-label="Vertical tabs example"
                        >
                            <Tab
                                icon={<AccountCircleIcon />}
                                label="Personal Information"
                                {...a11yProps(0)}
                            />
                            <Tab
                                icon={<DriveEtaIcon />}
                                label="Car Information"
                                {...a11yProps(1)}
                            />

                        </Tabs>
                    </Grid>
                    <Grid item xs={9} sm={9}>

                        <TabPanel value={tab} index={0}>
                            <h2>Personal Information</h2>
                        </TabPanel>

                        <TabPanel value={tab} index={1}>
                            <div style={{ backgroundColor: "#E0E0E0", height: "100%" }}>
                                <h2>Car Information</h2>
                                <CheckCar />
                            </div>
                        </TabPanel>

                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
}