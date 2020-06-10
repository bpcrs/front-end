import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
    width: '100%'
  },
  actions: {
    display: 'flex',
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
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Honda Civic 1.5RS
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Manual, 7 Seats, Petrol
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            FPT Software - Ho Chi Minh City
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            8.6 km away
          </Typography>
        </CardContent>
      </CardActionArea>
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

