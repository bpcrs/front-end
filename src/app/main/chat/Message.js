import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import {
  closeAgreement,
  changeChip,
  createAgreement,
  submitMessage,
} from "./chat.action";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  messageBody: {
    width: "fit-content",
    // marginRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    borderRadius: 15,
    color: theme.palette.primary.contrastText,
    maxWidth: "100%",
    position: "relative",
    padding: theme.spacing(2),
    "&.send": {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.getContrastText(theme.palette.grey[300]),
    },
  },
}));

const Message = ({ message, receive, type }) => {
  // console.log("Create At ", createAt);
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const userLogged = useSelector((state) => state.auth.user);
  const booking = useSelector((state) => state.chat.booking);
  const newAgreement = useSelector((state) => state.chat.newAgreement);
  const [openImg, setOpenImg] = useState(false);
  // const [insurance, setInsurance] = useState(false);
  // console.log(insurance);

  // const handleInsurance = () => {
  //   setInsurance(true);
  // };

  const handleClickOpen = () => {
    setOpenImg(true);
  };

  const handleClose = () => {
    setOpenImg(false);
  };
  const isRevice = userLogged.id !== receive;
  console.log(newAgreement);

  async function handleChangeChip(name) {
    dispatch(changeChip(name, message, booking.id));
    const send = `agree agreement ${type} with ${message}`;

    dispatch(closeAgreement());
  }

  const MessageByType = () => {
    switch (type) {
      case "Mileage limit":
        return (
          <Card className="w-1/2">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  Mileage limit
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {isRevice
                    ? `You offer ${selectedUser.displayName} with scope: ${message} km not exceeded`
                    : `${selectedUser.displayName} offer you scope: ${message} not exceeded`}
                </Typography>
              </CardContent>
            </CardActionArea>
            {!isRevice ? (
              <CardActions>
                <Button
                  size="small"
                  color="default"
                  variant="outlined"
                  onClick={() => handleChangeChip("Mileage limit")}
                >
                  Agree
                </Button>
                <Button size="small" color="primary">
                  Let me think
                </Button>
              </CardActions>
            ) : null}
          </Card>
        );
      case "Extra":
        return (
          <Card className="w-1/2">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  Extra
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {isRevice
                    ? `You offer ${selectedUser.displayName} with scope: ${message} km not exceeded`
                    : `${selectedUser.displayName} offer you scope: ${message} not exceeded`}
                </Typography>
              </CardContent>
            </CardActionArea>
            {!isRevice ? (
              <CardActions>
                <Button
                  size="small"
                  color="default"
                  variant="outlined"
                  onClick={() => handleChangeChip("Extra")}
                >
                  Agree
                </Button>
                <Button size="small" color="primary">
                  Let me think
                </Button>
              </CardActions>
            ) : null}
          </Card>
        );
      case "Insurance":
        return (
          <Card className="w-1/2">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  Insurance
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {isRevice
                    ? `You offer ${selectedUser.displayName} with scope: ${message} km not exceeded`
                    : `${selectedUser.displayName} offer you scope: ${message} not exceeded`}
                </Typography>
              </CardContent>
            </CardActionArea>

            {!isRevice ? (
              <CardActions>
                <Button
                  size="small"
                  color="default"
                  variant="outlined"
                  onClick={() => {
                    handleChangeChip("Insurance");
                  }}
                >
                  Agree
                </Button>
                <Button size="small" color="primary">
                  Let me think
                </Button>
              </CardActions>
            ) : null}
          </Card>
        );
      case "Deposit":
        return (
          <Card className="w-1/2">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  Deposit
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {isRevice
                    ? `You offer ${selectedUser.displayName} with scope: ${message} km not exceeded`
                    : `${selectedUser.displayName} offer you scope: ${message} not exceeded`}
                </Typography>
              </CardContent>
            </CardActionArea>
            {!isRevice ? (
              <CardActions>
                <Button
                  size="small"
                  color="default"
                  variant="outlined"
                  onClick={() => handleChangeChip("Deposit")}
                >
                  Agree
                </Button>
                <Button size="small" color="primary">
                  Let me think
                </Button>
              </CardActions>
            ) : null}
          </Card>
        );
      case "Indemnification":
        return (
          <Card className="w-1/2">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  Indemnification
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {isRevice
                    ? `You offer ${selectedUser.displayName} with scope: ${message} km not exceeded`
                    : `${selectedUser.displayName} offer you scope: ${message} not exceeded`}
                </Typography>
              </CardContent>
            </CardActionArea>
            {!isRevice ? (
              <CardActions>
                <Button
                  size="small"
                  color="default"
                  variant="outlined"
                  onClick={() => handleChangeChip("Indemnification")}
                >
                  Agree
                </Button>
                <Button size="small" color="primary">
                  Let me think
                </Button>
              </CardActions>
            ) : null}
          </Card>
        );
      case "IMG":
        return (
          <Grid
            className={classNames(isRevice ? "send" : "")}
            style={{
              textAlign: isRevice ? "left" : "right",
            }}
            item
            lg={6}
          >
            <img
              style={{ width: "100%" }}
              src={message}
              alt="img"
              onClick={handleClickOpen}
            />

            <Dialog
              open={openImg}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <img style={{ width: "100%" }} src={message} alt="img" />
            </Dialog>
          </Grid>
        );
      case "DONE":
        return (
          <Card className="w-1/2">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  Agree Success
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {!isRevice
                    ? `${selectedUser.displayName} ${message} `
                    : `You ${message} `}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      default:
        return (
          <Grid
            item
            className={classNames(classes.messageBody, isRevice ? "send" : "")}
            style={{
              textAlign: isRevice ? "left" : "right",
            }}
          >
            <Typography>{message}</Typography>
          </Grid>
        );
    }
  };
  return (
    <Grid
      container
      justify={isRevice ? "flex-end" : "flex-start"}
      className="py-4"
      item
      lg={12}
    >
      <MessageByType />
    </Grid>
  );
};

export default Message;
