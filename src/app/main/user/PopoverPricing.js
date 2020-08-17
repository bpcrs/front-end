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
  FormControlLabel,
  Checkbox,
  FormControl,
  Grid,
  FormGroup,
} from "@material-ui/core";
import { CRITERIA_NAME } from "../../../constant";

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

export default function PopoverPricing({ pricing, children, booking }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { agreements } = pricing;
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const getCriteriaValueByName = (name) => {
    if (
      agreements &&
      agreements.filter((item) => item.criteria.name === name)[0]
    ) {
      const agreement = agreements.filter(
        (item) => item.criteria.name === name
      )[0];
      return {
        unit: agreement.criteria.unit,
        value: JSON.parse(agreement.value),
        approved: agreement.approved,
      };
    }
    return {
      unit: "",
      value: "N/A",
      approved: false,
    };
  };
  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="overline"
      >
        {children}
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
                <StyledTableCell width="25%">Name</StyledTableCell>
                <StyledTableCell width="75%" align="right">
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
                  {`${
                    agreements &&
                    getCriteriaValueByName(CRITERIA_NAME.MILEAGE_LIMIT).value
                  } ${
                    getCriteriaValueByName(CRITERIA_NAME.MILEAGE_LIMIT).unit
                  }`}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Extra Price
                </StyledTableCell>
                <StyledTableCell align="right">
                  {`${
                    agreements &&
                    getCriteriaValueByName(CRITERIA_NAME.EXTRA).value
                  } ${getCriteriaValueByName(CRITERIA_NAME.EXTRA).unit}`}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Insurance
                </StyledTableCell>
                <StyledTableCell align="right">
                  {`${getCriteriaValueByName(
                    CRITERIA_NAME.INSURANCE
                  ).unit.toUpperCase()} ${
                    agreements &&
                    getCriteriaValueByName(
                      CRITERIA_NAME.INSURANCE
                    ).value.type.toUpperCase()
                  } - `}
                  <NumberFormat
                    value={
                      agreements &&
                      getCriteriaValueByName(CRITERIA_NAME.INSURANCE).value
                        .value
                    }
                    displayType="text"
                    thousandSeparator
                    suffix={" đ"}
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Deposit
                </StyledTableCell>
                <StyledTableCell align="right">
                  {`${
                    agreements &&
                    getCriteriaValueByName(CRITERIA_NAME.DEPOSIT).value
                  } ${
                    agreements &&
                    getCriteriaValueByName(CRITERIA_NAME.DEPOSIT).unit
                  }`}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Indemnification
                </StyledTableCell>
                <StyledTableCell align="right">
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        size="small"
                        checked={
                          agreements &&
                          getCriteriaValueByName(CRITERIA_NAME.INDEMNTIFICATION)
                            .value.carDamage
                        }
                      />
                    }
                    label={
                      <Typography variant="overline">Car Damage</Typography>
                    }
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        size="small"
                        disabled
                        checked={
                          agreements &&
                          getCriteriaValueByName(CRITERIA_NAME.INDEMNTIFICATION)
                            .value.overdue
                        }
                      />
                    }
                    label={<Typography variant="overline">Overdue</Typography>}
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        color="primary"
                        disabled
                        checked={
                          agreements &&
                          getCriteriaValueByName(CRITERIA_NAME.INDEMNTIFICATION)
                            .value.violate
                        }
                      />
                    }
                    label={<Typography variant="overline">Violate</Typography>}
                    labelPlacement="bottom"
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Price per day
                </StyledTableCell>
                <StyledTableCell align="right">
                  <NumberFormat
                    value={booking.car.price}
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
