import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CompareIcon from '@material-ui/icons/Compare';
import { Grid, Icon, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actions: {
    display: "flex",
  },
  avatar: {
    backgroundColor: red[500],
  },
  alignRight: {
    textAlign: "right",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
export default function CarItem(props = { isAction: true }) {
  const classes = useStyles();
  const [double, setDouble] = useState(false);
  const history = useHistory();
  const { info } = props;
  const carCompare = useSelector((state) => state.booking.carCompare);
  const clickToAddCompareCar = () => {
    carCompare.push({ info });
    if (carCompare.length > 1) {
      history.push(`${APP_PATH.CAR_COMPARE}`)
    }
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="Owner"
            className={classes.avatar}
            src={info.owner.imageUrl}
          >
            {info.owner.fullName[0]}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={info.name}
        subheader={info.model + " " + info.year}
      />
      <CardMedia
        className={classes.media}
        image="https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg"
        title="Car thumbnail"
      />
      <CardContent>
        <Grid
          spacing={1}
          container
          justify="space-between"
          alignItems="baseline"
        >
          <Grid
            xs={3}
            item
            container
            direction="row"
            alignItems="center"
            justify="space-around"
          >
            <Grid justify="center" container>
              <Icon fontSize={"default"}>
                airline_seat_recline_normal_outlined
              </Icon>
            </Grid>
            <Grid item container justify="center">
              <Typography variant="caption">{info.seat} people</Typography>
            </Grid>
          </Grid>
          <Grid
            xs={3}
            item
            container
            direction="row"
            alignItems="center"
            justify="space-around"
          >
            <Grid item container justify="center">
              <Icon fontSize={"default"}>gamepad</Icon>
            </Grid>
            <Grid item container justify="center">
              <Typography variant="caption">
                {info.autoDriver ? "Automatic" : "Manual"}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            xs={3}
            item
            container
            direction="row"
            alignItems="center"
            justify="space-around"
          >
            <Grid item container justify="center">
              <Icon fontSize={"default"}>directions_car</Icon>
            </Grid>
            <Grid item container justify="center">
              <Typography variant="caption">{info.model}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      {props.isAction ? (
        <CardActions className={classes.actions}>
          <Grid
            container
            alignContent="flex-end"
            spacing={1}
            alignItems="center"
          >
            <Grid item xs={5}>
              <Button
                component={Link}
                variant="contained"
                startIcon={<FavoriteIcon />}
                to={(location) => ({
                  ...location,
                  pathname: `${APP_PATH.CAR_ITEM}/${info.id}`,
                  state: { booking: props.booking },
                })}
              >
                View
              </Button>
            </Grid>
            <Grid item xs={7}>
              <Button
                disabled={double}
                variant="contained"
                startIcon={<CompareIcon />}
                onClick={() => {
                  clickToAddCompareCar();
                  setDouble(true);
                }}
              >
                Compare
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.alignRight}>
              <Typography variant="subtitle2">3.000.000 VND</Typography>
            </Grid>
          </Grid>
        </CardActions>
      ) : null}
    </Card>
  );
}
