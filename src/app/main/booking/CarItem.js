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
import { Grid, Icon, ListItemIcon, ListItemText } from '@material-ui/core';

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
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Grid xs={12} spacing={1} container justify="space-between" alignItems="baseline">
          <Grid xs={3} container direction="row" alignItems="center" justify="space-around">
            <Grid item>
              <Icon fontSize={"default"}>airline_seat_recline_normal_outlined</Icon>
            </Grid>
            <Grid item>
              <Typography variant="caption">4 people</Typography>
            </Grid>
          </Grid>
          <Grid xs={3} container direction="row" alignItems="center" justify="space-around">
            <Grid item>
              <Icon fontSize={"default"}>gamepad</Icon>
            </Grid>
            <Grid item>
              <Typography variant="caption">Automatic</Typography>
            </Grid>
          </Grid>

          <Grid xs={3} container direction="row" alignItems="center" justify="space-around">
            <Grid item>
              <Icon fontSize={"default"}>directions_car</Icon>
            </Grid>
            <Grid item>
              <Typography variant="caption">SUV Car</Typography>
            </Grid>
          </Grid>

          {/* <Grid xs={4}>2</Grid>
          <Grid xs={4}>3</Grid> */}
        </Grid>
        {/* <Typography component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography> */}
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

