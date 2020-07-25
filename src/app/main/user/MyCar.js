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
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCarInformationOwner,
  changeOpen,
  registerSuccess,
} from "./profile.action";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import CarStatus from "./CarStatus";
import Booking from "./Booking";
import { useState } from "react";
import CarSubmit from "../booking/CarSubmit";
import { showMessageSuccess } from "../../store/actions/fuse";

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

function RegisterCar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isOpen = useSelector((state) => state.profile.open);
  const loading = useSelector((state) => state.profile.loading);
  const isSuccess = useSelector((state) => state.profile.registerSuccess);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    dispatch(changeOpen(true));
  };

  const handleClose = () => {
    dispatch(changeOpen(false));
  };

  const handleRegisterClose = () => {
    registerSuccess(false);
  };

  const handleTestOpen = () => {
    setOpen(true);
    dispatch(
      showMessageSuccess(
        "Register successfully ! Your car will be checked and available soon"
      )
    );
  };

  const handleTestClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid item lg={2}>
        <Button
          variant="text"
          style={{ textTransform: "none", color: "blue" }}
          onClick={handleClickOpen}
          startIcon={<Icon>playlist_add</Icon>}
        >
          Register Car
        </Button>
        {/* <Button
          variant="text"
          style={{ textTransform: "none", color: "blue" }}
          onClick={handleTestOpen}
          startIcon={<Icon>playlist_add</Icon>}
        >
          test
        </Button> */}
      </Grid>
      <Dialog onClose={handleClose} open={isOpen} scroll="body">
        <DialogContent>
          <CarSubmit />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={loading} scroll="body">
        <DialogContent>
          <Grid container justify="center">
            <Grid item className={classes.progress}>
              <CircularProgress color="secondary" size="25px" />
            </Grid>
          </Grid>
          <Typography variant="h6" color="initial">
            Checking information...
          </Typography>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleRegisterClose} color="primary">
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

const MyCar = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const cars = useSelector((state) => state.profile.cars);
  const currentUser = useSelector((state) => state.auth.user);
  const history = useHistory();
  const [isDetail, setIsDetail] = useState(false);
  const [detail, setDetail] = useState();
  const [name, setName] = useState();

  const handleCickSetting = (carId) => {
    history.push({
      pathname: APP_PATH.CAR_EDIT + "/" + carId,
      state: {
        carId,
      },
    });
    // window.open
  };

  const handleAddCar = () => {
    history.push({
      pathname: APP_PATH.CAR_SUBMIT,
    });
  };

  const handleClickBooked = (carId, carName) => {
    setIsDetail(true);
    setDetail(carId);
    setName(carName);
  };

  useEffect(() => {
    dispatch(fetchCarInformationOwner(currentUser.id));
  }, [currentUser.id, dispatch]);

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
      {cars.length > 0 ? (
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
              {cars.map((car, index) => (
                // <Grid item xs={12} xl={12} lg={12}>
                <TableRow
                  className="h-64 cursor-pointer"
                  hover
                  // role="checkbox"
                  // aria-checked={isSelected}
                  tabIndex={-1}
                  key={index}
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
                    <IconButton onClick={() => handleCickSetting(car.id)}>
                      {/* <Link to={APP_PATH.CAR_EDIT + "/" + car.id}>Detail</Link> */}
                      <Icon>settings</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton
                      onClick={() => handleClickBooked(car.id, car.name)}
                    >
                      <Icon style={{ color: "purple" }}>details</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
                // </Grid>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="subtitle2" color="error">
          You haven't registered any cars yet! Please register car.
        </Typography>
      )}
    </Grid>
  ) : (
    <Grid>
      <IconButton onClick={() => setIsDetail(false)}>
        <Icon>arrow_back</Icon>
        <Typography>Back</Typography>
      </IconButton>
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
          {name}
        </Typography>
      </Grid>
      {/* <RentalCarRequest carId={detail} /> */}
      <Booking carId={detail} />
    </Grid>
  );
};

export default MyCar;
