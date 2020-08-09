import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import NumberFormat from "react-number-format";
import PopoverCar from "./PopoverCar";
import PopoverUser from "./PopoverUser";

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

export default function ContractTable({ booking }) {
  return (
    <TableContainer component={Paper}>
      <Table width="100%" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width="30%">Name</StyledTableCell>
            <StyledTableCell width="70%" align="right">
              Value
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              ID
            </StyledTableCell>
            <StyledTableCell align="right">#{booking.id}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Pickup date
            </StyledTableCell>
            <StyledTableCell align="right">{booking.fromDate}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Return date
            </StyledTableCell>
            <StyledTableCell align="right">{booking.toDate}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Pickup point
            </StyledTableCell>
            <StyledTableCell align="right">{booking.location}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Detination point
            </StyledTableCell>
            <StyledTableCell align="right">
              {booking.destination}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Car infomation
            </StyledTableCell>
            <StyledTableCell align="right">
              <PopoverCar car={booking.car} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Owner infomation
            </StyledTableCell>
            <StyledTableCell align="right">
              <PopoverUser user={booking.car.owner} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Total price
            </StyledTableCell>
            <StyledTableCell align="right">
              <NumberFormat
                value={booking.totalPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" đ"}
              />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
