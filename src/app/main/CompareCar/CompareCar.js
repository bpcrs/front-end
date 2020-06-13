import React, { Component, useEffect } from 'react';
// import { withStyles } from '@material-ui/core/styles';


// import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import Layout from '../../layout';

// const styles = theme => ({
//     layoutRoot: {}
// });

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
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

    // createData('Horsepower', '190 @ 5,600 rpm', '170 @ 5,600 rpm'),
    // createData('Torque', '179 @ 2,000 rpm', '203 @ 2,000 rpm'),
    // createData('Fuel Tank Capacity', '14.0 gal.', '14.9 gal.'),
    // createData('Bore and Stroke', '2.87 / 3.52 "', '2.91 / 3.40 "'),
    // createData('Drag Coefficient', 'Not available', 'Not available'),
    // createData('Curb Weight', '3,337 lbs.', '3,449 lbs.'),
    // createData('Gross Vehicle Weight Rating', 'Not available', '4,464 lbs.'),
    // createData('Maximum Trailer Weight', 'Available: 1,500 lbs.', '1,500 lbs.'),
    // createData('Passenger Volume', '106 cu.ft.', 'Not available'),
    // createData('Front Legroom', '41.3 "', '40.9 "'),
    // createData('Front Headroom', '40.1 "', '40.0 "'),
    // createData('Front Hip Room', '55.1 "', '54.4 "'),
    // createData('Front Shoulder Room', '57.9 "', '57.2 "'),
    // createData('Rear Legroom', '40.4 "', '39.7 "'),
    // createData('Rear Headroom', '39.2 "', '38.5 "'),
    // createData('Rear Hip Room', '49.5 "', '51.8 "'),
    // createData('Rear Shoulder Room', '55.6 "', '55.6 "'),
    // createData('Maximum Luggage Volume', '75.8 cu.ft.', '63.3 cu.ft.'),
    // createData('Interior Cargo Volume', '39.2 cu.ft.', '29.6 cu.ft.'),
    // createData('Interior Cargo Volume Seats Folded', '75.8 cu.ft.', '63.3 cu.ft.'),
    // createData('Maximum Interior Cargo Volume', '75.8 cu.ft.', '63.3 cu.ft.'),

];

const useStyles = makeStyles((theme) => ({
    // table: {
    //     minWidth: 650,


    // },
    // root: {
    //     flexGrow: 1,
    // },
    // paper: {
    //     padding: theme.spacing(2),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // },
}));

// class CompareCar extends Component {
export default function CompareCar() {
    // render() {
    const classes = useStyles();

    return (
        <Layout name="Compare your car">

            <TableContainer component={Paper}>

                <Table className={classes.table} aria-label="customized table" width="100%">

                    <TableHead>
                        <TableRow>

                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={2} lg={4}>
                                    <StyledTableCell></StyledTableCell>
                                </Grid>

                                <Grid item xs={6} lg={4}>
                                    <StyledTableCell align="right">
                                        <img style={{ borderRadius: "10px" }} width='150px' height='150px'
                                            src={'https://www.cstatic-images.com/car-pictures/xl/USD00HOS021A021001.jpg'} />
                                    </StyledTableCell>
                                </Grid>

                                <Grid item xs={6} lg={4}>
                                    <StyledTableCell align="right">
                                        <img style={{ borderRadius: "10px" }} width='150px' height='150px'
                                            src={'https://www.cstatic-images.com/car-pictures/xl/USC80GMS281B021001.jpg'} />
                                    </StyledTableCell>
                                </Grid>
                            </Grid>


                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (

                            <StyledTableRow key={row.name}>

                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={3} lg={4}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                    </Grid>

                                    <Grid item xs={6} lg={4}>
                                        <StyledTableCell align="center">{row.property1}</StyledTableCell>
                                    </Grid>

                                    <Grid item xs={6} lg={4}>
                                        <StyledTableCell align="center">{row.property2}</StyledTableCell>
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

// }

// export default withStyles(styles, {withTheme: true })(CompareCar);