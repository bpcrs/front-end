import React, { Component, useEffect } from 'react';
// import { withStyles } from '@material-ui/core/styles';


// import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

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
    createData('MPG (Combined)', 30, 27),
    createData('Engine', '190-hp, 1.5-liter I-4 (regular gas)', '170-hp, 1.5-liter I-4 (regular gas)'),
    createData('Transmission', '2-speed CVT w/OD', '9-speed automatic w/OD and auto-manual'),
    createData('Drivetrain', 'FWD', 'FWD'),
    createData('Seats', 5, 5),
    createData('Consumer Rating', 4.9, 4.6),
    createData('Length', '182.1 "', '182.3 "'),
    createData('Wheelbase', '104.8 "', '107.3 "'),
    createData('Front Track' , '63.0 "', '62.3 "'),
    createData('Rear Track', '63.7 "', '62.5 "'),
    createData('Width', '73.0 "', '72.4 "'),
    createData('Turning Radius', '18.7 ', '18.7 '),
    createData('Height', '66.1 "', '65.4 "'),
    createData('Horsepower', '190 @ 5,600 rpm', '170 @ 5,600 rpm'),
    createData('Torque', '179 @ 2,000 rpm', '203 @ 2,000 rpm'),
    createData('Fuel Tank Capacity', '14.0 gal.', '14.9 gal.'),
    createData('Bore and Stroke', '2.87 / 3.52 "', '2.91 / 3.40 "'),
    createData('Drag Coefficient', 'Not available', 'Not available'),
    createData('Curb Weight', '3,337 lbs.', '3,449 lbs.'),
    createData('Gross Vehicle Weight Rating', 'Not available', '4,464 lbs.'),
    createData('Maximum Trailer Weight', 'Available: 1,500 lbs.', '1,500 lbs.'),
    createData('Passenger Volume', '106 cu.ft.','Not available'),
    createData('Front Legroom', '41.3 "', '40.9 "'),
    createData('Front Headroom', '40.1 "', '40.0 "'),
    createData('Front Hip Room', '55.1 "', '54.4 "'),
    createData('Front Shoulder Room', '57.9 "', '57.2 "'),
    createData('Rear Legroom', '40.4 "', '39.7 "'),
    createData('Rear Headroom', '39.2 "', '38.5 "'),
    createData('Rear Hip Room', '49.5 "', '51.8 "'),
    createData('Rear Shoulder Room', '55.6 "', '55.6 "'),
    createData('Maximum Luggage Volume','75.8 cu.ft.', '63.3 cu.ft.'),
    createData('Interior Cargo Volume', '39.2 cu.ft.', '29.6 cu.ft.'),
    createData('Interior Cargo Volume Seats Folded', '75.8 cu.ft.', '63.3 cu.ft.'),
    createData('Maximum Interior Cargo Volume','75.8 cu.ft.', '63.3 cu.ft.'),

];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

// class CompareCar extends Component {
export default function CompareCar() {
    // render() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="right">
                            <img style={{ borderRadius: "10px" }} width='250px' height='250px'
                                src={'https://www.cstatic-images.com/car-pictures/xl/USD00HOS021A021001.jpg'} />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <img style={{ borderRadius: "10px" }} width='250px' height='250px'
                                src={'https://www.cstatic-images.com/car-pictures/xl/USC80GMS281B021001.jpg'} />
                        </StyledTableCell>
                        {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.property1}</StyledTableCell>
                            <StyledTableCell align="right">{row.property2}</StyledTableCell>
                            {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// }

// export default withStyles(styles, { withTheme: true })(CompareCar);