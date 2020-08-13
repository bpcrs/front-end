import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardHeader, Avatar, TableCell, Typography, TextField, Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchBrandByAdminList } from "./checking.action";
import Pagination from "@material-ui/lab/Pagination";
import EditIcon from '@material-ui/icons/Edit';
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

export default function ManageBrand(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.checking.brands);

  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeInput = (event) => {
    setName(event.target.value);
  };
  const size = 10;
  useEffect(() => {
    dispatch(fetchBrandByAdminList(currentPage, size));
  }, [currentPage, dispatch]);
  return (
    <Grid>
      {
        brands.count > 0 ? (
          <Grid container>
            <Grid xs={12} lg={12}>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-label="customized table"
                  width="100%"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Image</StyledTableCell>
                      <StyledTableCell>Update</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brands.data &&
                      brands.data.map((brand, index) => (
                        <StyledTableRow
                          style={{ wordWrap: "break-word", textAlign: "center" }}
                          key={index}
                        >
                          <TableCell component="th" scope="row">
                            {brand.name}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <img width="200" src={brand.logoLink} alt="img" />
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              startIcon={<EditIcon />}
                              style={{ marginLeft: "30%" }}
                              onClick={handleClickOpen()}
                            >
                              Check
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
              <DialogTitle id="form-dialog-title">Update brand name</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  onChange={handleChangeInput}
                  id="name"
                  name="name"
                  label="Brand"
                  fullWidth
                />
              </DialogContent>
            </Dialog>
            <Grid xs={12} lg={12} item container justify="flex-end">
              <Pagination
                count={
                  brands.count !== 0 && brands.count % size === 0
                    ? Math.floor(brands.count / size)
                    : Math.floor(brands.count / size) + 1
                }
                color="primary"
                onChange={(e, page) => setCurrentPage(page)}
              />
            </Grid>
          </Grid>
        ) : (
            <Grid container justify="center" alignItems="center">
              <Typography variant="subtitle2" color="error">
                List brands is empty!
          </Typography>
            </Grid >
          )
      }
    </Grid >

  );
}
