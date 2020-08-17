import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CardHeader,
  Avatar,
  TableCell,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { APP_PATH } from "../../../constant";
import { fetchUserListChecking } from "./checking.action";
import DetailsIcon from "@material-ui/icons/Details";
import Button from "@material-ui/core/Button";

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

export default function CheckUser() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.checking.users);

  useEffect(() => {
    dispatch(fetchUserListChecking());
  }, [dispatch]);

  const handleStateUser = (state) => {
    if (state) {
      return "ACTIVED";
    } else {
      return "NOT ACTIVED";
    }
  };

  const handleColorStateUser = (state) => {
    if (state) {
      return "green";
    } else {
      return "red";
    }
  };

  const handleCickSetting = (userId) => {
    history.push({
      pathname: APP_PATH.USER_CHECK_LICENSE + "/" + userId,
      state: {
        userId,
      },
    });
  };

  return (
    <Grid>
      {users.count > 0 ? (
        <TableContainer>
          <Table
            className={classes.table}
            aria-label="customized table"
            width="100%"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell>Date Join</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                // <Card className={classes.card}>
                <TableRow>
                  <TableCell>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          className={classes.avatar}
                          src={user.imageUrl}
                        ></Avatar>
                      }
                      // title={user.fullName}
                    />
                  </TableCell>

                  <TableCell>{user.fullName}</TableCell>

                  <TableCell>
                    <p>{new Date(user.createdDate).toLocaleDateString()}</p>
                  </TableCell>

                  <TableCell>
                    <Grid
                      style={{
                        border: "2px solid",
                        borderColor: "#B0C4DE",
                        borderRadius: "0px 50px 50px 50px",
                        height: "50%",
                        textAlign: "center",
                        marginTop: "1%",
                      }}
                    >
                      <p
                        style={{
                          color: handleColorStateUser(user.licenseCheck),
                        }}
                      >
                        {handleStateUser(user.licenseCheck)}
                      </p>
                    </Grid>
                  </TableCell>

                  <TableCell>
                    {/* <SettingIcon onClick={() => handleCickSetting(user.id)} /> */}
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<DetailsIcon />}
                      onClick={() => handleCickSetting(user.id)}
                    >
                      Check
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
