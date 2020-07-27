import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SubmitLicense from "./submitLicense";
import {
    Icon,
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {},
    card: {
        margin: theme.spacing(2),
    },
    status: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.info,
    },
}));

const MyLicense = (props) => {
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
                        Save changes
          </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default MyLicense;