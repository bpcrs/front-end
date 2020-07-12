import React, { useEffect } from "react";
import {
  makeStyles,
  Backdrop,
  Paper,
  Chip,
  Typography,
  Slider,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import CarItem from "./CarItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchModelList,
  fetchBrandList,
  fetchCarFilter,
} from "./booking.action";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import { FilterButton } from "./FilterButton";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  rootChip: {
    display: "flex",
    // justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    alignItems: "center",
    "& li": {
      margin: theme.spacing(0.5),
    },
  },
  root: {
    flexGrow: 1,
  },
  slider: {
    width: 300,
    paddingLeft: theme.spacing(8),
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
const seatData = [
  { title: "4 seat", value: 4 },
  { title: "7 seat", value: 7 },
];
function valuetext(value) {
  return `${value}`;
}
function CarList(props) {
  const size = 8;
  const minPrice = 100000;
  const maxPrice = 5000000;

  const [currentPage, setCurrentPage] = useState(1);
  const [valueSlider, setValueSlider] = useState([minPrice, maxPrice]);
  const classes = useStyles();
  const dispatch = useDispatch();
  // const cars = useSelector((state) => state.booking.cars);
  const loading = useSelector((state) => state.booking.loading);
  const brands = useSelector((state) => state.booking.brands);
  const filterCars = useSelector((state) => state.booking.filterCars);
  const models = useSelector((state) => state.booking.models);

  const [filter, setFilter] = useState({
    brand: [],
    model: [],
    seat: [],
  });
  const showPriceRange = () => {
    return (
      <Grid>
        <NumberFormat
          value={valueSlider[0]}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" VNĐ"}
        />{" "}
        -{" "}
        <NumberFormat
          value={valueSlider[1]}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" VNĐ"}
        />
      </Grid>
    );
  };
  const [chipData, setChipData] = useState([]);

  const handleChangeSlider = (event, newValue) => {
    setValueSlider(newValue);
  };

  useEffect(() => {
    dispatch(fetchBrandList());
    dispatch(fetchModelList());
    dispatch(
      fetchCarFilter(
        currentPage,
        size,
        filter.brand,
        filter.model,
        filter.seat,
        valueSlider[0],
        valueSlider[1]
      )
    );

    const filterToChip = () => {
      const tags = Object.keys(filter).map((key) =>
        filter[key].map((item, index) => ({ item, key: index, type: key }))
      );
      setChipData(tags.flat());
    };
    filterToChip();
  }, [currentPage, dispatch, filter, valueSlider]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter(
        (chip) =>
          chip.key !== chipToDelete.key && chip.type === chipToDelete.type
      )
    );
    setFilter({
      ...filter,
      [chipToDelete.type]: filter[chipToDelete.type].filter(
        (item) => item.value !== chipToDelete.item.value
      ),
    });
  };

  return (
    <Grid container className={classes.root}>
      <Grid lg={12} item container alignItems="center" justify="flex-start">
        <Grid item lg={12} container>
          <Grid item lg={12}>
            <FilterButton
              name="Brand"
              data={brands.map((brand) => ({
                title: brand.name,
                value: brand.id,
              }))}
              onFilter={(value) => {
                setFilter({ ...filter, brand: value });
              }}
              filterInChip={filter.brand}
            />
            <FilterButton
              name="Model"
              data={models.map((model) => ({
                title: model.name,
                value: model.id,
              }))}
              onFilter={(value) => {
                setFilter({ ...filter, model: value });
              }}
              filterInChip={filter.model}
            />

            <FilterButton
              name="Seat"
              data={seatData.map((seat) => ({
                title: seat.title,
                value: seat.value,
              }))}
              onFilter={(value) => {
                setFilter({ ...filter, seat: value });
              }}
              filterInChip={filter.seat}
            />
            <div className={classes.slider}>
              <Typography id="range-slider" gutterBottom>
                Price range : {showPriceRange()}
              </Typography>
              <Slider
                value={valueSlider}
                onChange={handleChangeSlider}
                valueLabelDisplay="off"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                min={minPrice}
                max={maxPrice}
                marks={[
                  {
                    value: minPrice,
                    label: (
                      <NumberFormat
                        value={minPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" VNĐ"}
                      />
                    ),
                  },
                  {
                    value: maxPrice,
                    label: (
                      <NumberFormat
                        value={maxPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" VNĐ"}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item lg={12}>
          {chipData.length !== 0 ? (
            <Paper component="ul" className={classes.rootChip}>
              <li>
                <Typography variant="subtitle2">Filter:</Typography>
              </li>
              {chipData.map((data) => {
                return (
                  <li key={data.key}>
                    <Chip
                      label={data.item.title}
                      onDelete={handleDelete(data)}
                      className={classes.chip}
                    />
                  </li>
                );
              })}
            </Paper>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {filterCars.data &&
        filterCars.data.map((car, index) => (
          <Grid
            item
            xs={12}
            xl={3}
            lg={3}
            className={classes.paper}
            key={index}
          >
            <CarItem
              isAction={true}
              info={car}
              model={models}
              booking={props.location.state}
            />
          </Grid>
        ))}
      <Grid xs={12} lg={12} item container justify="flex-end">
        <Pagination
          count={
            filterCars.count !== 0 && filterCars.count % size === 0
              ? Math.floor(filterCars.count / size)
              : Math.floor(filterCars.count / size) + 1
          }
          color="primary"
          onChange={(e, page) => setCurrentPage(page)}
        />
      </Grid>
    </Grid>
  );
}

export default CarList;
