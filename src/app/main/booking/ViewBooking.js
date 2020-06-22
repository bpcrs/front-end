import React from "react";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  TextField,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import CarItem from "./CarItem";
import { Link } from "react-router-dom";
import Layout from "../../layout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  spacingCard: {
    marginTop: theme.spacing(1),
    marginLeft: 0,
    marginRight: 0,
  },
}));

export default function ViewBooking() {
  const classes = useStyles();
  return (
    <Layout name="Review Plan">
      <div>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={12} xl={6}>
                <Typography variant="subtitle1">
                  PICK UP & DESTINAION
                </Typography>
              </Grid>
              <Grid item xs={12} xl={6} justify="flex-end" container>
                <FormControl fullWidth className={classes.spacingCard}>
                  <TextField
                    id="pickup-basic"
                    label="Pickup"
                    variant="outlined"
                    fullWidth
                    value="FPT University, District 9, Ho Chi Minh City"
                  />
                </FormControl>
                <FormControl fullWidth className={classes.spacingCard}>
                  <TextField
                    id="destinaion-basic"
                    label="Destinaion"
                    variant="outlined"
                    fullWidth
                    value="Vung Tau City"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <div className={classes.spacingCard}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle1">TRIP DURATION</Typography>
              </Grid>

              <Grid item xl={5} lg={5} container direction="row" spacing={1}>
                <Grid item xs={6} xl={6} lg={6} style={{ textAlign: "right" }}>
                  <Typography variant="h4">09</Typography>
                </Grid>
                <Grid item xs={6} xl={6} lg={6}>
                  <Grid>
                    <Typography variant="caption">Jun-2020</Typography>
                    <Typography variant="caption" component="p">
                      09:30 PM
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                xl={2}
                lg={2}
                container
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <Typography variant="overline">To</Typography>
                </Grid>
              </Grid>
              <Grid item xl={5} lg={5} container direction="row" spacing={1}>
                <Grid item xs={6} xl={6} lg={6} style={{ textAlign: "right" }}>
                  <Typography variant="h4">10</Typography>
                  {/* <p className="text-base sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">09</p> */}
                </Grid>
                <Grid item xs={6} xl={6} lg={6}>
                  <Grid>
                    <Typography variant="caption">Jun-2020</Typography>
                    <Typography variant="caption" component="p">
                      09:30 PM
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <div className={classes.spacingCard}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} lg={4} xl={4} className={classes.paper}>
            <CarItem isAction={false} info={{ name: "A" }} />
          </Grid>
          <Grid item xs={12} lg={8} xl={8} className={classes.paper}>
            <Card>
              <CardContent>
                <Grid container alignItems="flex-start">
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      GUILINES & POLICIES
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div className={classes.spacingCard}>
        <Grid container className={classes.root} spacing={2} justify="center">
          <Grid item xs={12} lg={12} xl={12} className={classes.paper}>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={state.checkedB}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label={
                <div>
                  <span>I am over 21 years old, I agree to all </span>
                  <Link href="#" to="/" variant="body2">
                    Terms & Conditions
                  </Link>
                </div>
              }
            />
          </Grid>
          <Grid item xs={12} lg={6} xl={6} className={classes.paper}>
            <Button color="primary" variant="contained" fullWidth>
              Book
            </Button>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}
