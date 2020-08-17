import React from "react";
import { withStyles } from "@material-ui/core/styles";
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
import PopoverPricing from "./PopoverPricing";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPreReturnPriceBooking } from "./profile.action";

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
  const userLogged = useSelector((state) => state.auth.user);
  const preReturnPrice = useSelector((state) => state.profile.preReturnPrice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPreReturnPriceBooking(booking.id, -1));
  }, [booking.id, dispatch]);
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
            <StyledTableCell align="right">
              {new Date(booking.fromDate).toLocaleDateString()}{" "}
              {new Date(booking.fromDate).toLocaleTimeString()}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Return date
            </StyledTableCell>
            <StyledTableCell align="right">
              {new Date(booking.toDate).toLocaleDateString()}{" "}
              {new Date(booking.toDate).toLocaleTimeString()}
            </StyledTableCell>
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
              {userLogged.id === booking.renter.id
                ? "Owner infomation"
                : "Renter infomation"}
            </StyledTableCell>
            <StyledTableCell align="right">
              <PopoverUser
                user={
                  userLogged.id !== booking.renter.id
                    ? booking.renter
                    : booking.car.owner
                }
              />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Estimate price & Agreements
            </StyledTableCell>
            <StyledTableCell align="right">
              <PopoverPricing pricing={preReturnPrice} booking={booking}>
                <NumberFormat
                  value={preReturnPrice.totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" đ"}
                />
              </PopoverPricing>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Total price
            </StyledTableCell>
            <StyledTableCell align="right">
              {booking.totalPrice === 0 ? "N/A" : booking.totalPrice}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
