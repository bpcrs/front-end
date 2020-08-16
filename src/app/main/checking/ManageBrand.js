import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, DialogActions, Icon, Avatar, TableCell, Typography, TextField, Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchBrandByAdminList, updateBrand } from "./checking.action";
import Pagination from "@material-ui/lab/Pagination";
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import firebase from "../../firebase/firebase";
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

export default function ManageBrand() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const brands = useSelector((state) => state.checking.brands);
  // const [brands, setBrands] = useState([]);
  const [currentBrand, setCurrentBrand] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (brand) => {
    setCurrentBrand(brand);
    setOpen(true);
  };

  const handleInputChange = (event) => {
    setCurrentBrand({
      ...currentBrand,
      [event.target.name]: event.target.value,
    });
  };
  const uploadImage = (event) => {
    postImg(event.target.files[0]);
  };
  
  const postImg = (image) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadTask = firebase
      .storage()
      .ref("Brand/")
      .child(image.name);

    uploadTask.put(image, metadata).then(function (result) {
      uploadTask.getDownloadURL().then(function (url) {
        setCurrentBrand({
          ...currentBrand,
          logoLink: url
        });
      });
    });
  };
  const handleUpdateBrand = () => {
    dispatch(updateBrand(currentBrand.id, currentBrand.name, currentBrand.logoLink));
    setCurrentBrand([]);
    setOpen(false);
  }
  // const handleUpdateBrand = () => {
  //   dispatch(updateBrand(currentBrand.id, currentBrand.name, currentBrand.logoLink));
  //   setCurrentBrand([]);
  //   setOpen(false);
  // }
  const handleClose = () => {
    setOpen(false);
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
            <Button
              variant="text"
              style={{ textTransform: "none", color: "blue" }}
              onClick={handleClickOpen}
              startIcon={<Icon>playlist_add</Icon>}
            >
              Create brand
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
                              onClick={() => handleClickOpen(brand)}
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
              <DialogTitle id="form-dialog-title">Manage car brand</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="name"
                  name="name"
                  label="Brand"
                  onChange={handleInputChange}
                  value={currentBrand.name ? currentBrand.name : ""}
                  fullWidth />
                <img width="200" src={currentBrand.logoLink} />
                <label
                  variant="outlined"
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    name="logoLink"
                    id="file"
                    onChange={uploadImage}
                  />
                  <span aria-hidden="true">
                    <Icon style={{ color: "blue" }}>cloud_upload</Icon>
                  </span>
                </label>
              </DialogContent>
              <DialogActions>
                <Grid container justify="center">
                  <Grid item xs={6} lg={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateBrand()}
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
