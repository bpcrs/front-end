import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CardHeader,
  Avatar,
  TableCell,
  Typography,
  Icon,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserListChecking } from "./checking.action";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import UserDetailChecking from "./UserDetailChecking";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
  },
  card: {
    margin: theme.spacing(2),
    borderRadius: "80px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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

function Row({ user }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <UserDetailChecking user={user} callback={handleClose} />
        </DialogContent>
      </Dialog>
      <TableRow>
        <TableCell>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={user.imageUrl && user.imageUrl}
              ></Avatar>
            }
            // title={user.fullName}
          />
        </TableCell>

        <TableCell>{user.fullName}</TableCell>

        <TableCell>
          <p>{new Date(user.createdDate).toLocaleDateString()}</p>
        </TableCell>

        <TableCell>{user && user.email}</TableCell>

        <TableCell>
          <Button
            variant="outlined"
            style={{ textTransform: "none" }}
            className={classes.button}
            startIcon={<Icon style={{ color: "green" }}>search</Icon>}
            onClick={() => setOpen(true)}
          >
            Check
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CheckUser() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.checking.users);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const handleClickRefresh = () => {
    setOpen(true);
    setRefresh((refresh) => refresh + 1);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };
  useEffect(() => {
    dispatch(fetchUserListChecking());
  }, [dispatch, refresh]);

  return (
    <Grid>
      <Backdrop
        className={classes.backdrop}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item container justify="flex-start">
        <Button
          variant="text"
          style={{ textTransform: "none", color: "blue" }}
          onClick={() => handleClickRefresh()}
          startIcon={<Icon>refresh</Icon>}
        >
          Refresh
        </Button>
      </Grid>
      {users.length > 0 ? (
        <TableContainer key={refresh}>
          <Table
            className={classes.table}
            aria-label="customized table"
            width="100%"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Avatar</StyledTableCell>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell>Date Join</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user, index) => <Row user={user} key={index} />)}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container justify="center" alignItems="center">
          <Grid item lg={6}>
            <img
              src="assets/images/approve.jpg"
              alt="No resourse"
              height="300px"
            />
          </Grid>
          <Grid item lg={6} justify="flex-start" container>
            <Typography variant="subtitle1" color="error">
              Don't have any new user!
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
