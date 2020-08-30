import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, DialogActions, Switch, FormControlLabel, Avatar, TableCell, Typography, TextField, Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAccountByAdminList, updateAccountStatus } from "./checking.action";
import Pagination from "@material-ui/lab/Pagination";
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import firebase from "../../firebase/firebase";
import { showMessageError } from '../../store/actions/fuse';
const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        borderRadius: "80px",
    },
}));
const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        "&$checked": {
            transform: "translateX(16px)",
            color: theme.palette.common.white,
            "& + $track": {
                backgroundColor: "#52d869",
                opacity: 1,
                border: "none",
            },
        },
        "&$focusVisible $thumb": {
            color: "#52d869",
            border: "6px solid #fff",
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function ManageAccount() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.checking.accounts);
    const [currentAccount, setCurrentAccount] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);

    const handleClickOpen = (account) => {
        if (account != null) {
            setCurrentAccount(account);
        }
        // console.log(accounts.data.length);
        setOpen(true);
    };

    const handleAccount = () => {
        console.log(currentAccount);
        // dispatch(updateAccountStatus(currentAccount.id));
    }
    const handleClose = () => {
        setOpen(false);
    };
    const size = 10;
    useEffect(() => {
        dispatch(fetchAccountByAdminList(currentPage, size));

    }, [currentPage, dispatch]);
    return (
        <Grid>
            {
                accounts.count > 0 ? (
                    <Grid container>
                        <Grid xs={12} lg={12} item>
                            <TableContainer>
                                <Table
                                    className={classes.table}
                                    aria-label="customized table"
                                    width="100%"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>ID</StyledTableCell>
                                            <StyledTableCell>Email</StyledTableCell>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell style={{ marginLeft: "30%" }}>Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {accounts.data &&
                                            accounts.data.map((account, index) => (
                                                <StyledTableRow
                                                    style={{ wordWrap: "break-word", textAlign: "center" }}
                                                    key={index}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {account.id}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {account.email}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {account.fullName}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        <FormControlLabel
                                                            classes={classes.switchButton}
                                                            control={
                                                                <IOSSwitch
                                                                    id="status"
                                                                    checked={account.status = true}
                                                                    onChange={() => setOpen(true)}
                                                                    name="status"
                                                                />
                                                            }
                                                        />
                                                    </TableCell>
                                                </StyledTableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Manage account status</DialogTitle>
                            <DialogActions>
                                <Grid container justify="center">
                                    <Typography>Are your sure to change status of this account?</Typography>
                                    <Grid item xs={6} lg={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAccount()}
                                            startIcon={<CheckCircleIcon />}
                                            style={{ marginLeft: "30%" }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} lg={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<CancelIcon />}
                                            style={{ marginLeft: "30%" }}
                                            onClick={handleClose}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogActions>
                        </Dialog>
                        <Grid xs={12} lg={12} item container justify="flex-end">
                            <Pagination
                                count={
                                    accounts.count !== 0 && accounts.count % size === 0
                                        ? Math.floor(accounts.count / size)
                                        : Math.floor(accounts.count / size) + 1
                                }
                                color="primary"
                                onChange={(e, page) => setCurrentPage(page)}
                            />
                        </Grid>
                    </Grid>
                ) : (
                        <Grid container justify="center" alignItems="center">
                            <Typography variant="subtitle2" color="error">
                                List Accounts is empty!
          </Typography>
                        </Grid >
                    )
            }
        </Grid >
    );
}
