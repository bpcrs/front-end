import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Icon,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CompareIcon from "@material-ui/icons/Compare";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { APP_PATH } from "../../../constant";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import CarCompare from "./CarCompare";
const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 20,
  },
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
  paper: {
    maxWidth: "75%",
  },
}));

export default function CarItem(props = { isAction: true }) {
  const classes = useStyles();
  const { info } = props;
  const [open, setOpen] = React.useState(false);
  const carCompare = useSelector((state) => state.booking.carCompare);
  const handleClose = () => {
    carCompare.length = 0;
    setOpen(false);
  };
  const clickToAddCompareCar = () => {
    carCompare.push({ info });
    if (carCompare.length === 2) {
      setOpen(true);
    }
  };
  const [hoving, setHoving] = useState(0);
  return (
    <Card
      elevation={hoving === info.id ? 4 : 0}
      className={classes.card}
      onMouseOver={() => setHoving(info.id)}
      onMouseOut={() => setHoving(0)}
    >
      <CardHeader
        avatar={
          <Grid>
            {info ? (
              <Grid>
                <Icon>location_on</Icon>
                <Typography variant="subtitle2">
                  {info.distance ? info.distance : ""}
                </Typography>
              </Grid>
            ) : (
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            )}
          </Grid>
        }
        title={
          info ? (
            info.name
          ) : (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          )
        }
        // subheader={info.model.name + " " + info.year}
        subheader={
          info ? (
            info.model.name + " " + info.year
          ) : (
            <Skeleton animation="wave" height={10} width="40%" />
          )
        }
      />
      {info.images.length > 0 ? (
        <CardMedia
          className={classes.media}
          image={info.images[0].link}
          title="Car thumbnail"
        />
      ) : (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      )}

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
              {info ? (
                <Typography variant="caption">{info.seat} people</Typography>
              ) : (
                <Skeleton animation="wave" height={10} width="80%" />
              )}
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
              {info ? (
                <Typography variant="caption">
                  {info.autoDriver ? "Automatic" : "Manual"}
                </Typography>
              ) : (
                <Skeleton animation="wave" height={10} width="80%" />
              )}
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
              {info ? (
                <Typography variant="caption">{info.model.name}</Typography>
              ) : (
                <Skeleton animation="wave" height={10} width="80%" />
              )}
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
            {info ? (
              <Grid item xs={5}>
                <Button
                  component={Link}
                  variant="contained"
                  startIcon={<FavoriteIcon />}
                  to={(location) => ({
                    ...location,
                    pathname: `${APP_PATH.CAR_ITEM}/${info.id}`,
                    state: { booking: props.booking ? props.booking : "" },
                  })}
                >
                  View
                </Button>
              </Grid>
            ) : (
              <Skeleton animation="wave" height={10} width="80%" />
            )}

            <Grid item xs={7}>
              <Button
                variant="contained"
                startIcon={<CompareIcon />}
                onClick={() => {
                  clickToAddCompareCar();
                }}
              >
                Compare
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.alignRight}>
              {info ? (
                // <Typography variant="subtitle1" color="primary">
                <Chip
                  label={
                    <NumberFormat
                      value={info.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      suffix={" đ/ day"}
                    />
                  }
                  variant="default"
                  size="medium"
                  color="primary"
                />
              ) : (
                <Skeleton animation="wave" height={10} width="80%" />
              )}
            </Grid>
          </Grid>
        </CardActions>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        classes={{ paper: classes.paper }}
      >
        <DialogContent>
          <CarCompare />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
