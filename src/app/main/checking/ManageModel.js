import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, DialogActions, Icon, TableCell, Typography, TextField, Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModelByAdminList, updateModel, addModel } from "./checking.action";
import Pagination from "@material-ui/lab/Pagination";
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { showMessageError } from '../../store/actions/fuse';
const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
  },
  card: {
    margin: theme.spacing(2),
    borderRadius: "80px",
  },
}));



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ManageModel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const models = useSelector((state) => state.checking.models);
  // const [Models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (model) => {
    if (model != null) {
      setCurrentModel(model);
    }
    // console.log(models.data.length);
    setOpen(true);
  };

  const handleInputChange = (event) => {
    setCurrentModel({
      ...currentModel,
      [event.target.name]: event.target.value,
    });
  };

  const handleModel = () => {
    let flag = 1;
    if (currentModel.name.trim() != "") {
      for (var i = 0; i < models.data.length; i++) {
        if (currentModel.name === models.data[i].name) {
          flag = 2;
          break;
        }
      }
      if (flag == 1) {
        if (currentModel.id == null) {
          dispatch(addModel(currentModel.name));
        } else {
          dispatch(updateModel(currentModel.id, currentModel.name));
        }
        setCurrentModel({});
        setOpen(false);
      } else {
        dispatch(showMessageError("Model name existed in list!"));
      }
    } else {
      dispatch(showMessageError("Model name field cannot be blank!"));
    }
  }
  const handleClose = () => {
    setOpen(false);
  };

  const size = 10;
  useEffect(() => {
    dispatch(fetchModelByAdminList(currentPage, size));
  }, [currentPage, dispatch]);
  return (
    <Grid>
      {
        models.count > 0 ? (
          <Grid container>
            <Button
              variant="text"
              style={{ textTransform: "none", color: "blue" }}
              onClick={handleClickOpen}
              startIcon={<Icon>playlist_add</Icon>}
            >
              Create model
            </Button>
            <Grid xs={12} lg={12} item>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-label="customized table"
                  width="100%"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell style={{ marginLeft: "30%" }}>Update</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {models.data &&
                      models.data.map((model, index) => (
                        <StyledTableRow
                          style={{ wordWrap: "break-word", textAlign: "center" }}
                          key={index}
                        >
                          <TableCell component="th" scope="row">
                            {model.name}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              startIcon={<EditIcon />}
                              style={{ marginLeft: "30%" }}
                              onClick={() => handleClickOpen(model)}
                            >
                              Update
                            </Button>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Manage car model</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="name"
                  name="name"
                  label="Model"
                  onChange={handleInputChange}
                  value={currentModel.name ? currentModel.name : ""}
                  fullWidth />
              </DialogContent>
              <DialogActions>
                <Grid container justify="center">
                  <Grid item xs={6} lg={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleModel()}
                      startIcon={<CheckCircleIcon />}
                      style={{ marginLeft: "30%" }}
                    />
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CancelIcon />}
                      style={{ marginLeft: "30%" }}
                      onClick={handleClose}
                    />
                  </Grid>
                </Grid>
              </DialogActions>
            </Dialog>
            <Grid xs={12} lg={12} item container justify="flex-end">
              <Pagination
                count={
                  models.count !== 0 && models.count % size === 0
                    ? Math.floor(models.count / size)
                    : Math.floor(models.count / size) + 1
                }
                color="primary"
                onChange={(e, page) => setCurrentPage(page)}
              />
            </Grid>
          </Grid>
        ) : (
            <Grid container justify="center" alignItems="center">
              <Typography variant="subtitle2" color="error">
                List Models is empty!
          </Typography>
            </Grid >
          )
      }
    </Grid >

  );
}
