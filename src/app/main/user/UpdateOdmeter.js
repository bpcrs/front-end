import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { blue } from "@material-ui/core/colors";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  Grid,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { putCarUpdate } from "../booking/booking.action";
import { updateOdometer } from "./profile.action";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "12%",
    marginTop: -12,
    marginLeft: -12,
  },
  loadingProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "-10%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function UpdateOdmeter({ children, carId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [odemeter, setOdemeter] = useState(0);

  const handleUpdateOdmeter = () => {
    dispatch(updateOdometer(carId, odemeter));
    // callBack(false);
    handleClose();
  };
  const handleUpdate = (event) => {
    setOdemeter(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onClick: handleClickOpen,
      })}
      <Dialog open={open} scroll="body" onClose={handleClose}>
        <DialogTitle id="max-width-dialog-title">
          <Grid>Update Odometer</Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update your car odometer before sign contract
          </DialogContentText>
          <FormControl
            fullWidth
            // className={classes.margin}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-amount">Number</InputLabel>
            <OutlinedInput
              id="odemeter"
              name="odemeter"
              type="number"
              value={odemeter}
              onChange={handleUpdate}
              startAdornment={
                <InputAdornment position="start">Km</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={() => setOpen(false)}
            color="default"
            variant="contained"
          >
            Close
          </Button>
          <Button
            autoFocus
            onClick={handleUpdateOdmeter}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
