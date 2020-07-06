import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
// import GetDate from '../../../common/getDate';
import { useSelector } from "react-redux";
import classNames from "classnames";
import { getUser } from "./chat.action";
import { useState } from "react";
import { useEffect } from "react";
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

const Message = ({ message, receive, type = "SCOPE" }) => {
  const classes = useStyles();
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const userLogged = useSelector((state) => state.auth.user);
  const isRevice = userLogged.id !== receive;
  const MessageByType = () => {
    switch (type) {
      case "SCOPE":
        return (
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  Scope offering
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
                <Button size="small" color="default" variant="outlined">
                  Agree
                </Button>
                <Button size="small" color="primary">
                  Let't me think
                </Button>
              </CardActions>
            ) : null}
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
