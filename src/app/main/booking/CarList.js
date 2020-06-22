import React, { useEffect } from "react";
import { makeStyles, Backdrop } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CarItem from "./CarItem";
import CircularProgress from "@material-ui/core/CircularProgress";

// import Layout from "../../layout";
import { APP_PATH } from "../../../constant";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarList } from "./booking.action";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function CarList() {
  const size = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.booking.cars);
  const loading = useSelector((state) => state.booking.loading);
  useEffect(() => {
    // setOpen(true);
    dispatch(fetchCarList(currentPage, size));
    // let ignore = cars.length ||=== 0;
    // if (ignore) {
    // }
  }, [currentPage, dispatch]);

  return (
    <Grid container className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {cars.data &&
        cars.data.map((car, index) => (
          <Grid
            item
            xs={12}
            xl={3}
            lg={4}
            className={classes.paper}
            key={index}
          >
            {console.log(cars)}
            <CarItem
              isAction={true}
              info={car}
              onBooking={() => history.push(`${APP_PATH.CAR_ITEM}/1`)}
            />
          </Grid>
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
    </Grid>
  );
}

export default CarList;
