import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Avatar, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  root: {
    maxWidth: 400,
  },
}));
export default function PopoverUser({ user }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="overline"
      >
        Hover to view
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        elevation={2}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <Avatar alt={user.fullName} src={user.imageUrl} />
              </Grid>
              <Grid item container justify="center" alignItems="center">
                <Typography variant="subtitle1">{user.fullName}</Typography>

                <Grid lg={12} item>
                  <Typography variant="subtitle2" color="textSecondary">
                    Phone: {user.phone}
                  </Typography>
                </Grid>
                <Grid lg={12} item>
                  <Typography variant="subtitle2" color="textSecondary">
                    Email: {user.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
}
