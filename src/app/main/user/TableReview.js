import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Backdrop,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  Icon,
  Box,
  DialogContent,
  Dialog,
  DialogActions,
  Button,
  Tooltip,
  DialogTitle,
  CardHeader,
  Avatar,
  Popover,
  Paper,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import ContractTable from "./ContractTable";
import { fetchReviewList } from "../booking/booking.action";
import Rating from "@material-ui/lab/Rating";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      width: "100%",
    },
  },
  card: {
    margin: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 0,
    color: "#fff",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  popover: {
    pointerEvents: "none",
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

function PopoverContract({ booking, children }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    // console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  console.log(open);

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
        <Grid component={Paper}>
          <ContractTable booking={booking} />
        </Grid>
      </Popover>
    </div>
  );
}

function Row({ review }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hoving, setHoving] = useState();

  return (
    <React.Fragment>
      <Backdrop
        className={classes.backdrop}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <TableRow
        className="h-64 cursor-pointer"
        hover
        tabIndex={-1}
        // onClick={() => handleSelected(booking)}
      >
        <TableCell component="th" scope="row">
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={review.renter.imageUrl}
              ></Avatar>
            }
            title={review.renter.fullName}
            subheader={new Date(review.createdDate).toLocaleDateString()}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          <Rating
            name="read-only"
            value={review.rating}
            readOnly
            size="small"
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {review.comment}
        </TableCell>
        <TableCell component="th" scope="row">
          {/* <PopoverContract booking={review.booking}> */}#{review.booking.id}
          {/* </PopoverContract> */}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const TableReview = ({ carId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const reviews = useSelector((state) => state.booking.reviews);
  const size = 5;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchReviewList(currentPage, size, carId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  return (
    <Grid>
      <Box hidden={reviews.data && reviews.data.length !== 0}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <img
              src="assets/images/empty.jpg"
              alt="No resourse"
              height="300px"
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              We did't find any review right now.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box hidden={!reviews.data || reviews.data.length === 0}>
        <TableContainer>
          <Table aria-label="customized table" width="100%">
            <TableHead>
              <TableRow>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell>Rating</StyledTableCell>
                <StyledTableCell>Comment</StyledTableCell>
                <StyledTableCell>Booking ID</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
              </Backdrop>
              {reviews.data &&
                reviews.data.map((review, index) => (
                  <Row key={index} review={review} />
                ))}
            </TableBody>
          </Table>
          <Grid item container justify="flex-end">
            <Pagination
              size="small"
              count={
                reviews.count !== 0 && reviews.count % size === 0
                  ? Math.floor(reviews.count / size)
                  : Math.floor(reviews.count / size) + 1
              }
              color="primary"
              onChange={(e, page) => setCurrentPage(page)}
            />
          </Grid>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default TableReview;
