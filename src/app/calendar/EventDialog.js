import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import _ from "@lodash";
import BookingTimeline from "../main/user/BookingTimeline";

const EventDialog = ({ booking, isOpen, closeAction }) => {
  return booking ? (
    <Dialog onClose={closeAction} fullWidth maxWidth="lg" open={isOpen}>
      {/* <AppBar position="static">
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            New Event
          </Typography>
        </Toolbar>
      </AppBar> */}

      <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
        <BookingTimeline booking={booking} />
      </DialogContent>
    </Dialog>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default EventDialog;
