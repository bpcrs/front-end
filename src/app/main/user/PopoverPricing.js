import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import { withStyles } from "@material-ui/styles";
import {
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";

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
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
}));

export default function PopoverPricing({ pricing }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="overline"
      >
        {pricing}
      </Typography>
      <Popover
        elevation={2}
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
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
                  Mileage limit
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumberFormat
                    value={10000}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Extra Price
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumberFormat
                    value={10000}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ/km"}
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Insurance
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumberFormat
                    value={10000}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Deposit
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumberFormat
                    value={10000}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Indemnification
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumberFormat
                    value={10000}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Price per day
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumberFormat
                    value={10000}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  VAT
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumberFormat
                    value={10000}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Estimate price
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumberFormat
                    value={10000}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </div>
  );
}
