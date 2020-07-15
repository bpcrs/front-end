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
// import GetDate from '../../../common/getDate';
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { closeAgreement, changeChip } from "./chat.action";

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
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const userLogged = useSelector((state) => state.auth.user);
  const booking = useSelector((state) => state.chat.booking);
  const isRevice = userLogged.id !== receive;
  const handleChangeChip = (name) => {
    dispatch(changeChip(name, message, booking.id));
    dispatch(closeAgreement());
  };
  // const [mileageAgreement, setMileageAgreement] = useState({
  //   value: message,
  //   status: "CLOSE",
  //   bookingId: 3,
  //   criteriaId: 1,
  // });
  // const closeAgreementRequest = (type) => {
  //   closeAgreement(type);
  //   // dispatch(createAgreement(mileageAgreement));
  // };
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
                  Let't me think
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
                  onClick={() => handleChangeChip("Insurance")}
                >
                  Agree
                </Button>
                <Button size="small" color="primary">
                  Let't me think
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
                  Let't me think
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
