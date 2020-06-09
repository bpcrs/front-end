import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid, Icon, ListItemIcon, ListItemText, Button, Badge, Fab } from '@material-ui/core';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
  alignRight: {
    textAlign: "right"
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CarItem(props = { isAction: true }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Honda CR-V"
        subheader="2020"
      />
      <CardMedia
        className={classes.media}
        image="https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg"
        title="Paella dish"
      />
      <CardContent>
        <Grid spacing={1} container justify="space-between" alignItems="baseline">
          <Grid xs={3} item container direction="row" alignItems="center" justify="space-around">
            <Grid justify="center" container>
              <Icon fontSize={"default"}>airline_seat_recline_normal_outlined</Icon>
            </Grid>
            <Grid item container justify="center">
              <Typography variant="caption">4 people</Typography>
            </Grid>
          </Grid>
          <Grid xs={3} item container direction="row" alignItems="center" justify="space-around">
            <Grid item container justify="center">
              <Icon fontSize={"default"}>gamepad</Icon>
            </Grid>
            <Grid item container justify="center">
              <Typography variant="caption">Automatic</Typography>
            </Grid>
          </Grid>

          <Grid xs={3} item container direction="row" alignItems="center" justify="space-around">
            <Grid item container justify="center">
              <Icon fontSize={"default"}>directions_car</Icon>
            </Grid>
            <Grid item container justify="center">
              <Typography variant="caption">SUV Car</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      {props.isAction ? (
        <CardActions className={classes.actions} >
          <Grid container alignContent="flex-end" spacing={1} alignItems="center">
            <Grid item xs={6}>
              <Fab size="small" color="inherit" aria-label="add" className={classes.margin} variant="extended" onClick={props.onBooking}>
                <FavoriteIcon /> 
                <span className={classes.margin}>View</span>
              </Fab>
            </Grid>
            <Grid item xs={6} className={classes.alignRight}>
              <Typography>3.000.000 VND</Typography>
            </Grid>
          </Grid>
        </CardActions>
      ) : null}
    </Card>
  );
}