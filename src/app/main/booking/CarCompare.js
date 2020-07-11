import React, { } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Layout from '../../layout';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewList, fetchCarDetail } from "./booking.action";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow)

function createData(name, property1, property2) {
    return { name, property1, property2 };
}

const rows = [
    createData('Name', '2020 Honda CR-V', '2020 GMC Terrain'),
    createData('Price', '$1,120', '$1,195'),
    createData('Seats', 5, 5),
    createData('Consumer Rating', 4.9, 4.6),
    createData('Model', '182.1 "', '182.3 "'),
    createData('Sound', '104.8 "', '107.3 "'),
    createData('Auto Drive', 'Yes', 'Yes'),
];

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',


    },
}));
export default function CarCompare(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const carDetail = useSelector((state) => state.booking.carDetail);
    console.log(carDetail);
    useEffect(() => {
        const carId = 1;
        dispatch(fetchReviewList(1, 10, carId));
        dispatch(fetchCarDetail(carId));
      }, [dispatch, props]);
    return (
        <Layout name="Compare your car">

            <TableContainer component={Paper}>

                <Table className={classes.table} aria-label="customized table" width="100%">

                    <TableHead>
                        <TableRow>

                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={2} lg={4}>
                                    {/* <StyledTableCell></StyledTableCell> */}
                                </Grid>

                                <Grid item xs={6} lg={4}>
                                    {/* <StyledTableCell align="right"> */}
                                    <img alt="" style={{ borderRadius: "10px", align: "right" }} width='150px' height='150px'
                                        src={'https://www.cstatic-images.com/car-pictures/xl/USD00HOS021A021001.jpg'} />
                                    {/* </StyledTableCell> */}
                                </Grid>

                                <Grid item xs={6} lg={4}>
                                    {/* <StyledTableCell align="right"> */}
                                    <img alt="" style={{ borderRadius: "10px", align: "right" }} width='150px' height='150px'
                                        src={'https://www.cstatic-images.com/car-pictures/xl/USC80GMS281B021001.jpg'} />
                                    {/* </StyledTableCell> */}
                                </Grid>
                            </Grid>


                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (

                            <StyledTableRow key={row.name}>

                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={3} lg={4}>
                                        {/* <StyledTableCell component="th" scope="row"> */}
                                        <p>
                                            {row.name}
                                        </p>

                                        {/* </StyledTableCell> */}
                                    </Grid>

                                    <Grid item xs={6} lg={4}>
                                        {/* <StyledTableCell align="right"> */}
                                        <p style={{ fontSize: "12" }}>
                                            {row.property1}
                                        </p>

                                        {/* </StyledTableCell> */}
                                    </Grid>

                                    <Grid item xs={6} lg={4}>
                                        {/* <StyledTableCell align="right"> */}
                                        <p style={{ fontSize: "12" }}>
                                            {row.property2}
                                        </p>

                                        {/* </StyledTableCell> */}
                                    </Grid>
                                </Grid>


                            </StyledTableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
}
