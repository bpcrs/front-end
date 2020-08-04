// import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  TableRow,
  TableCell,
  TableHead,
  IconButton,
  Icon,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  CircularProgress,
  Badge,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCarInformationOwner,
  changeOpen,
  openDetail,
  chooseCar,
} from "./profile.action";
import { useHistory } from "react-router-dom";
import { APP_PATH, CAR_STATUS } from "../../../constant";
import CarStatus from "./CarStatus";
import Booking from "./Booking";
import { useState } from "react";
import CarSubmit from "../booking/CarSubmit";
import CarEdit from "../booking/CarEdit";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    margin: theme.spacing(2),
  },
  status: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.info,
  },
  progress: {
    maxHeight: 50,
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

function Row(props) {
  const dispatch = useDispatch();
  const { car } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickBooked = (carId, carName) => {
    dispatch(openDetail(true));
    dispatch(chooseCar(carId, carName));
  };

  return (
    <React.Fragment>
      <TableRow
        className="h-64 cursor-pointer"
        hover
        // role="checkbox"
        // aria-checked={isSelected}
        tabIndex={-1}
        // key={index}
        // selected={isSelected}
      >
        <TableCell component="th" scope="row">
          {car.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {car.plateNum}
        </TableCell>
        <TableCell component="th" scope="row">
          <CarStatus name={car.status} />
        </TableCell>
        <TableCell component="th" scope="row">
          <IconButton onClick={() => setOpen(true)}>
            <Icon>settings</Icon>
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <IconButton onClick={() => handleClickBooked(car.id, car.name)}>
            {car.status === CAR_STATUS.REQUEST ? (
              <Badge color="secondary" badgeContent="?">
                <Icon style={{ color: "purple" }}>calendar_view_day</Icon>
              </Badge>
            ) : (
              <Icon style={{ color: "purple" }}>calendar_view_day</Icon>
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog onClose={handleClose} open={open} scroll="body">
        <DialogContent>
          <CarEdit carId={car.id} />
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}

function RegisterCar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isOpen = useSelector((state) => state.profile.open);
  const loading = useSelector((state) => state.profile.loading);

  const handleClickOpen = () => {
    dispatch(changeOpen(true));
  };

  const handleClose = () => {
    dispatch(changeOpen(false));
  };

  return (
    <React.Fragment>
      <Grid item lg={2}>
        <Button
          variant="text"
          style={{ textTransform: "none", color: "blue" }}
          onClick={handleClickOpen}
          startIcon={<Icon>playlist_add</Icon>}
        >
          Register Car
        </Button>
      </Grid>
      <Dialog onClose={handleClose} open={isOpen} scroll="body">
        <DialogContent>
          <CarSubmit />
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={() =>} color="primary">
            Save changes
          </Button>
        </DialogActions> */}
      </Dialog>
      <Dialog open={loading} scroll="body">
        <DialogContent>
          <Grid container justify="center" alignItems="center">
            <Grid item lg={12} container justify="center" alignItems="center">
              <img
                src="assets/images/car-loading.jpg"
                alt="CarSubmiLoading"
                // width="300px"
                height="300px"
              ></img>
            </Grid>
            <Grid
              lg={12}
              item
              className={classes.progress}
              style={{ textAlign: "center" }}
            >
              <CircularProgress color="secondary" size="25px" />
            </Grid>
            <Grid item style={{ textAlign: "center" }}>
              <Typography variant="subtitle1" color="initial">
                Checking information
              </Typography>
              <Typography variant="caption">
                We uploading your car, please wait a minutes...
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

const MyCar = (props) => {
  const classes = useStyles();
  const size = 5;
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.profile.cars);
  const currentUser = useSelector((state) => state.auth.user);
  const isDetail = useSelector((state) => state.profile.isDetail);
  const [currentPage, setCurrentPage] = useState(1);
  const request = useSelector((state) => state.profile.request);
  const change = useSelector((state) => state.profile.change);
  useEffect(() => {
    dispatch(fetchCarInformationOwner(currentUser.id, currentPage, size));
  }, [currentUser.id, dispatch, currentPage, change]);

  return !isDetail ? (
    <Grid>
      {/* <Grid item lg={2}>
        <Button
          variant="text"
          style={{ textTransform: "none", color: "blue" }}
          onClick={handleAddCar}
          startIcon={<Icon>playlist_add</Icon>}
        >
          Register Car
        </Button>
      </Grid> */}
      <RegisterCar />
      {cars.count > 0 ? (
        <TableContainer>
          <Table
            className={classes.table}
            aria-label="customized table"
            width="100%"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Plate number</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Detail</StyledTableCell>
                <StyledTableCell>Book request</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.data &&
                cars.data.map((car, index) => (
                  <Row key={index} car={car} />
                  // </Grid>
                ))}
              <Grid xs={12} lg={12} item container justify="flex-end">
                <Pagination
                  count={
                    cars.count !== 0 && cars.count % size === 0
                      ? Math.floor(cars.count / size)
                      : Math.floor(cars.count / size) + 1
                  }
                  color="primary"
                  onChange={(e, page) => setCurrentPage(page)}
                />
              </Grid>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <img
              src="assets/images/empty.jpg"
              alt="No resourse"
              height="300px"
            />
          </Grid>
          <Typography variant="subtitle2" color="error">
            You haven't registered any cars yet! Please register car.
          </Typography>
        </Grid>
      )}
    </Grid>
  ) : (
    <Grid>
      {/* <IconButton onClick={() => setIsDetail(false)}>
        <Icon>arrow_back</Icon>
        <Typography>Back</Typography>
      </IconButton> */}
      <Button
        variant="text"
        style={{ textTransform: "none", color: "blue" }}
        onClick={() => dispatch(openDetail(false))}
        startIcon={<Icon>arrow_back</Icon>}
      >
        Back
      </Button>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justify="flex-start"
      >
        <Typography variant="body2" color="secondary">
          Car:
        </Typography>
        <Typography
          variant="subtitle2"
          color="initial"
          className={classes.card}
        >
          {request.name}
        </Typography>
      </Grid>
      <Booking carId={request.carId} />
    </Grid>
  );
};

export default MyCar;
