import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import { Grid, Icon, ListItemIcon, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CarItem() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Grid xs={12} spacing={1} container justify="space-between" alignItems="baseline">
          <Grid xs={3} container direction="row" alignItems="center" justify="space-around">
            <Grid xs={12} justify="center" container>
              <Icon fontSize={"default"}>airline_seat_recline_normal_outlined</Icon>
            </Grid>
            <Grid xs={12} item container justify="center">
              <Typography variant="caption">4 people</Typography>
            </Grid>
          </Grid>
          <Grid xs={3} container direction="row" alignItems="center" justify="space-around">
            <Grid xs={12} item container justify="center">
              <Icon fontSize={"default"}>gamepad</Icon>
            </Grid>
            <Grid xs={12} item container justify="center">
              <Typography variant="caption">Automatic</Typography>
            </Grid>
          </Grid>

          <Grid xs={3} container direction="row" alignItems="center" justify="space-around">
            <Grid xs={12} item container justify="center">
              <Icon fontSize={"default"}>directions_car</Icon>
            </Grid>
            <Grid xs={12} item container justify="center">
              <Typography variant="caption">SUV Car</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Details
        </Button>
        <Button size="small" color="primary">
          Compare
        </Button>
      </CardActions>
    </Card>
  );
}

