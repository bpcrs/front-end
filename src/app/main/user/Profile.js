import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Card, CardHeader, Avatar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import HistoryIcon from '@material-ui/icons/History';
import UpdateIcon from '@material-ui/icons/Update';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

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
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.contrastText
    },
    media: {
        height: 140,
        width: '100%'
    },
    imageUploading: {
        height: 100
    },
    icon: {
        height: '100%',
        width: 50,
        marginRight: 10
    },
    typography: {
        width: '100%'
    },
    textField: {
        width: '80%'
    },
    card: {
        padding: 20
    }

}));

export default function Profile(props) {
    const classes = useStyles();
    const history = useHistory();
    const userLogged = useSelector((state) => state.auth.user);
    console.log(userLogged);
    const [tab, setTab] = React.useState(0);

    const handleSetTab = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Grid container >
                    <Grid item xs={3} sm={3}>
                        <h2>Profile</h2>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={tab}
                            onChange={handleSetTab}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab icon={<AccountCircleIcon />} label="Personal Information" {...a11yProps(0)} />
                            <Tab icon={<DriveEtaIcon />} label="Car Information" {...a11yProps(1)} />
                            <Tab icon={<PaymentIcon />} label="Payment Method" {...a11yProps(2)} />
                            <Tab icon={<HistoryIcon />} label="Rental History" {...a11yProps(3)} />
                            <Tab icon={<UpdateIcon />} label="Lease History" {...a11yProps(4)} />
                        </Tabs>
                    </Grid>
                    <Grid item xs={9} sm={9}>
                        <TabPanel value={tab} index={0}>
                            <h2>Account Information</h2>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar} src={userLogged.photoURL} />

                                }
                            />
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Full Name"
                                        className={classes.textField}
                                        defaultValue={userLogged.displayName}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Email"
                                        defaultValue={userLogged.email}
                                        className={classes.textField}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <h2>Physical Address</h2>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Country"
                                        className={classes.textField}
                                        defaultValue=""
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="standard-read-only-input"
                                        label="City"
                                        defaultValue=""
                                        className={classes.textField}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="standard-read-only-input"
                                        label="District"
                                        className={classes.textField}
                                        defaultValue=""
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Ward"
                                        defaultValue=""
                                        className={classes.textField}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="standard-read-only-input"
                                        label="Address"
                                        defaultValue=""
                                        className={classes.textField}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>

                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <h2>Car Information</h2>
                        </TabPanel>
                        <TabPanel value={tab} index={2}>
                            <h2>Payment Method</h2>
                        </TabPanel>
                        <TabPanel value={tab} index={3}>
                            <h2>Rental History</h2>
                        </TabPanel>
                        <TabPanel value={tab} index={4}>
                            <h2>Lease History</h2>
                        </TabPanel>
                    </Grid>
                </Grid>
            </Card>
        </div >
    )
}

