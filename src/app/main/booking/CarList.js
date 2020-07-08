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
// import { SliderFilterButton } from "./SliderFilterButton";

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
  { title: "4", value: 4 },
  { title: "7", value: 7 },
];
function valuetext(value) {
  return `${value}°C`;
}
// const data = [
//   { title: "The Shawshank Redemption", value: 1994 },
//   { title: "The Godfather", value: 1972 },
//   { title: "The Godfather: Part II", value: 1974 },
//   { title: "The Dark Knight", value: 2008 },
//   { title: "12 Angry Men", value: 1957 },
//   { title: "Schindler's List", value: 1993 },
//   { title: "Pulp Fiction", value: 1994 },
//   { title: "The Lord of the Rings: The Return of the King", value: 2003 },
//   { title: "The Good, the Bad and the Ugly", value: 1966 },
//   { title: "Fight Club", value: 1999 },
//   { title: "The Lord of the Rings: The Fellowship of the Ring", value: 2001 },
//   { title: "Star Wars: Episode V - The Empire Strikes Back", value: 1980 },
//   { title: "Forrest Gump", value: 1994 },
//   { title: "Inception", value: 2010 },
//   { title: "The Lord of the Rings: The Two Towers", value: 2002 },
//   { title: "One Flew Over the Cuckoo's Nest", value: 1975 },
//   { title: "Goodfellas", value: 1990 },
//   { title: "The Matrix", value: 1999 },
//   { title: "Seven Samurai", value: 1954 },
//   { title: "Star Wars: Episode IV - A New Hope", value: 1977 },
//   { title: "City of God", value: 2002 },
//   { title: "Se7en", value: 1995 },
//   { title: "The Silence of the Lambs", value: 1991 },
//   { title: "It's a Wonderful Life", value: 1946 },
//   { title: "Life Is Beautiful", value: 1997 },
//   { title: "The Usual Suspects", value: 1995 },
//   { title: "Léon: The Professional", value: 1994 },
//   { title: "Spirited Away", value: 2001 },
//   { title: "Saving Private Ryan", value: 1998 },
//   { title: "Once Upon a Time in the West", value: 1968 },
//   { title: "American History X", value: 1998 },
//   { title: "Interstellar", value: 2014 },
// ];
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
  console.log("Filter Cars", filterCars);
  // console.log("Models ", models);

  const [filter, setFilter] = useState({
    brand: [],
    model: [],
    seat: [],
  });
  const [chipData, setChipData] = useState([]);

  const handleChangeSlider = (event, newValue) => {
    setValueSlider(newValue);
  };

  useEffect(() => {
    // dispatch(fetchCarList(currentPage, size));
    dispatch(fetchBrandList());
    dispatch(fetchModelList());
    dispatch(
      fetchCarFilter(currentPage, size, filter.brand, filter.model, filter.seat)
    );

    const filterToChip = () => {
      const tags = Object.keys(filter).map((key) =>
        filter[key].map((item, index) => ({ item, key: index, type: key }))
      );
      setChipData(tags.flat());
    };
    filterToChip();
  }, [currentPage, dispatch, filter]);

  const handleDelete = (chipToDelete) => () => {
    // console.log(chipToDelete);
    // console.log(chipData);

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
                Price range
              </Typography>
              <Slider
                value={valueSlider}
                onChange={handleChangeSlider}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
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
                // if (data.label === "React") {
                //   icon = <TagFacesIcon />;
                // }
                return (
                  <li key={data.key}>
                    <Chip
                      // icon={icon}
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
