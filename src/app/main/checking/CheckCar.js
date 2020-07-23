import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardHeader, Avatar, TableCell } from "@material-ui/core";
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
import TablePagination from '@material-ui/core/TablePagination';


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
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function CheckCar() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.checking.cars);

    useEffect(() => {
        dispatch(fetchCarCheckingAdmin());
    }, [dispatch]);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCickSetting = (carId) => {
        history.push({
            pathname: APP_PATH.CAR_CHECKING + "/" + carId,
            state: {
                carId,
            }
        });
    };

    return (
        <div>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-label="customized table"
                    width="100%"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Date Create</StyledTableCell>
                            <StyledTableCell>Owner</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cars.data &&
                            cars.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((car, index) => (
                                <StyledTableRow style={{ wordWrap: "break-word", textAlign: "center" }} key={index}>

                                    <TableCell component="th" scope="row">
                                        {car.name}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {new Date(car.createdDate).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    aria-label="recipe"
                                                    className={classes.avatar}
                                                    src={car.owner.imageUrl}
                                                ></Avatar>
                                            }
                                            title={car.owner.fullName}
                                        // subheader="on rent"
                                        />
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {car.status}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        <SettingIcon onClick={() => handleCickSetting(car.id)}/>
                                    </TableCell>

                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2, 3, 4]}
                component="div"
                count={cars.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}