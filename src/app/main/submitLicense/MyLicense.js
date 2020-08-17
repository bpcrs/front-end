import React from "react";
import { useState } from "react";
import SubmitLicense from "./submitLicense";
import {
  Icon,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

const MyLicense = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        style={{ textTransform: "none", color: "blue" }}
        onClick={handleClickOpen}
        startIcon={<Icon>edit</Icon>}
      >
        Update Profile
      </Button>

      <Dialog onClose={handleClose} open={open} scroll="body">
        <DialogContent>
          <SubmitLicense />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyLicense;
