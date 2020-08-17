import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CardHeader,
  Avatar,
  TableCell,
  Typography,
  Icon,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import { fetchCarCheckingAdmin } from "./checking.action";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import CarDetailChecking from "./CarDetailChecking";
const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
  },
  card: {
    margin: theme.spacing(2),
    borderRadius: "80px",
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Row({ car }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <CarDetailChecking car={car} callback={handleClose} />
        </DialogContent>
      </Dialog>
      <StyledTableRow
        style={{
          wordWrap: "break-word",
          textAlign: "center",
        }}
        // key={index}
      >
        <TableCell component="th" scope="row">
          {car.name ? car.name : ""}
        </TableCell>

        <TableCell component="th" scope="row">
          {new Date(car.createdDate).toLocaleDateString()}
        </TableCell>

        <TableCell component="th" scope="row">
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={car && car.owner.imageUrl}
              ></Avatar>
            }
            title={car.owner.fullName}
          />
        </TableCell>

        <TableCell component="th" scope="row">
          {car.plateNum}
        </TableCell>

        <TableCell component="th" scope="row">
          <Button
            variant="outlined"
            style={{ textTransform: "none" }}
            className={classes.button}
            startIcon={<Icon style={{ color: "green" }}>search</Icon>}
            onClick={() => setOpen(true)}
          >
            Check
          </Button>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default function CheckCar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.checking.cars);
  const [currentPage, setCurrentPage] = useState(1);
  const size = 5;
  useEffect(() => {
    dispatch(fetchCarCheckingAdmin(currentPage, size));
  }, [currentPage, dispatch]);

  const handleCickSetting = (carId) => {
    history.push({
      pathname: APP_PATH.CAR_CHECKING + "/" + carId,
      state: {
        carId,
      },
    });
  };

  return (
    <Grid>
      {cars.count > 0 ? (
        <Grid container>
          <Grid xs={12} lg={12}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-label="customized table"
                width="100%"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Date Create</StyledTableCell>
                    <StyledTableCell>Owner</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cars.data &&
                    cars.data.map((car, index) => (
                      <Row car={car} key={index} />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

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
        </Grid>
      ) : (
        <Grid container justify="center" alignItems="center">
          <Grid item lg={6}>
            <img
              src="assets/images/approve.jpg"
              alt="No resourse"
              height="300px"
            />
          </Grid>
          <Typography variant="subtitle2" color="error">
            List registered cars is empty! Please wait the owner register car.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
