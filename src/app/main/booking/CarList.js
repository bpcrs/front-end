import React, { useEffect } from "react";
import {
  makeStyles,
  Backdrop,
  Paper,
  Chip,
  Typography,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import CarItem from "./CarItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarList } from "./booking.action";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import { FilterButton } from "./FilterButton";

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
const data = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
];
function CarList() {
  const size = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [chipData, setChipData] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.booking.cars);
  const loading = useSelector((state) => state.booking.loading);
  const [filter, setFilter] = useState({ model: [] });

  useEffect(() => {
    dispatch(fetchCarList(currentPage, size));
    const filterToChip = () => {
      const tags = Object.keys(filter).map((key) =>
        filter[key].map((item, index) => ({ label: item.title, key: index }))
      );
      console.log(tags[0]);
      setChipData(tags[0]);
    };
    filterToChip();
  }, [currentPage, dispatch, filter]);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Grid container className={classes.root}>
      <Grid lg={12} item container alignItems="center" justify="flex-start">
        <Grid item lg={12} container>
          <Grid item lg={12}>
            <FilterButton
              name="Brand"
              data={data}
              onFilter={(value) => setFilter(value)}
            />
            {/* <FilterButton name="Model" data={data} /> */}
            {/* <FilterButton name="Seat" data={data} /> */}
            {/* <FilterButton name="Location" data={data} /> */}
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
                      label={data.label}
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
            <CarItem isAction={true} info={car} />
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
