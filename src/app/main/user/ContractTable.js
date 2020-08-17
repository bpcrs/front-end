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
import { postReturnBooking, postEstimateBooking } from "./profile.action";
import { Typography } from "@material-ui/core";

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
    dispatch(postEstimateBooking(booking.id));
  }, [booking, booking.id, dispatch]);
  return (
    <TableContainer component={Paper}>
      <Table width="100%" aria-label="customized table">
        <caption>
          <Typography variant="subtitle2">
            <sup>(1)</sup> Estimate price with deposit include Agreements
          </Typography>
          <Typography variant="subtitle2">
            <sup>(2)</sup> Deposit price = Deposit days * Price Per Day
          </Typography>
          <Typography variant="subtitle2">
            <sup>(3)</sup> (If have): Extra Free = Extra Price * Number 'km' of
            over Mileage Limit
          </Typography>
        </caption>
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
              Distance
            </StyledTableCell>
            <StyledTableCell align="right">
              {booking.distance === 0 ? "N/A" : `${booking.distance} km`}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Estimate price & Agreements <sup>(1)</sup>
            </StyledTableCell>
            <StyledTableCell align="right">
              <PopoverPricing pricing={preReturnPrice} booking={booking}>
                {preReturnPrice.estimatePrice === 0 ? (
                  <u>N/A</u>
                ) : (
                  <NumberFormat
                    value={preReturnPrice.estimatePrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    style={{ textDecoration: "underline" }}
                    suffix={" đ"}
                  />
                )}
              </PopoverPricing>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Total price <sup>(1) - (2) + (3)</sup>
            </StyledTableCell>
            <StyledTableCell align="right">
              {preReturnPrice.totalPrice === 0 ? (
                <Typography variant="overline">N/A</Typography>
              ) : (
                <NumberFormat
                  value={preReturnPrice.totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" đ"}
                  style={{ fontWeight: "bold" }}
                />
              )}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
