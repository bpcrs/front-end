import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  Box,
  FormGroup,
  Icon,
  Tooltip,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import {
  acceptAgreement,
  deleteAllMsgByTypeFromFirebase,
  submitMessage,
} from "./chat.action";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { CRITERIA_NAME } from "../../../constant";

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
  header: {
    height: 600,
    background:
      "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    color: theme.palette.primary.contrastText,
  },
  cardHeader: {
    backgroundColor: theme.palette.primary[800],
    color: theme.palette.getContrastText(theme.palette.primary[800]),
  },
}));

const Message = ({ message, receive, type, createAt }) => {
  // console.log("Create At ", createAt);
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedBooking = useSelector((state) => state.chat.selectedBooking);
  const userLogged = useSelector((state) => state.auth.user);
  const [openImg, setOpenImg] = useState(false);
  const criteria = useSelector((state) => state.chat.criteria);

  const handleClickOpen = () => {
    setOpenImg(true);
  };

  const handleClose = () => {
    setOpenImg(false);
  };
  const isRevice = userLogged.id !== receive;

  const handAgreementAccepted = async (type) => {
    dispatch(
      acceptAgreement(
        criteria && criteria.find((item) => item.name === type).id,
        selectedBooking.id
      )
    );
    await deleteAllMsgByTypeFromFirebase(type, selectedBooking.id);
    submitMessage(type, selectedBooking, "DONE", true);
  };

  const MessageByType = () => {
    switch (type) {
      case CRITERIA_NAME.MILEAGE_LIMIT:
        return (
          <Card className="w-1/2">
            <CardActionArea>
              <div className={classNames(classes.cardHeader, "px-24 py-16")}>
                <Typography variant="subtitle1" color="inherit">
                  Mileage limit
                </Typography>
              </div>
              <CardContent>
                <Card raised square>
                  <CardContent className="p-32">
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {isRevice
                            ? `You offer ${selectedBooking.car.owner.fullName} in mileage limit with ${message} km not exceeded for car ${selectedBooking.car.name} in booking ${selectedBooking.id}`
                            : `${selectedBooking.renter.fullName} offers you mileage limit with ${message} km not exceeded for car ${selectedBooking.car.name} in booking ${selectedBooking.id}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {!isRevice ? (
                      <div className="flex justify-center pb-32">
                        <Button
                          size="small"
                          color="default"
                          style={{ backgroundColor: "green", color: "white" }}
                          variant="outlined"
                          onClick={() => {
                            handAgreementAccepted(type);
                          }}
                        >
                          Agree
                        </Button>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      case CRITERIA_NAME.EXTRA:
        return (
          <Card className="w-1/2">
            <CardActionArea>
              <div className={classNames(classes.cardHeader, "px-24 py-16")}>
                <Typography gutterBottom variant="subtitle1">
                  Extra
                </Typography>
              </div>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {isRevice
                    ? `You offer ${selectedBooking.car.owner.fullName} in extra fees with ${message} đ/km`
                    : `${selectedBooking.renter.fullName} offers you in extra fees with ${message} đ/km`}
                </Typography>
              </CardContent>
            </CardActionArea>
            {!isRevice ? (
              <div className="flex justify-center pb-32">
                <Button
                  size="small"
                  color="default"
                  style={{ backgroundColor: "green", color: "white" }}
                  variant="outlined"
                  onClick={() => {
                    handAgreementAccepted(type);
                  }}
                >
                  Agree
                </Button>
              </div>
            ) : null}
          </Card>
        );
      case CRITERIA_NAME.INSURANCE:
        return (
          <Card className="w-1/2">
            <CardActionArea>
              <div className={classNames(classes.cardHeader, "px-24 py-16")}>
                <Typography variant="subtitle1" color="inherit">
                  Insurance Offer
                </Typography>
                {/* <Typography variant="caption" color="inherit">
                  Save 15%
                </Typography> */}
              </div>
              <CardContent>
                <Typography gutterBottom variant="overline">
                  Package infomation
                </Typography>
                <Card raised square>
                  <CardContent className="p-32">
                    <div className="flex justify-center">
                      <Typography variant="h6" color="textSecondary">
                        {message.type}
                      </Typography>
                    </div>

                    <Divider className="my-32" />

                    <div className="flex flex-col">
                      <Typography variant="subtitle1" className="">
                        <span className="font-bold mr-4">10</span>
                        Projects
                      </Typography>
                      <Typography variant="subtitle1" className="">
                        <span className="font-bold mr-4">10</span>
                        Pages
                      </Typography>
                      <Typography variant="subtitle1" className="">
                        <span className="font-bold mr-4">100</span>
                        Mb Disk Space
                      </Typography>
                    </div>
                    <Divider className="my-32" />
                    <div className="flex justify-center">
                      <Typography variant="h6" color="textPrimary">
                        <NumberFormat
                          value={message.value}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" đ"}
                        />
                      </Typography>
                    </div>
                  </CardContent>
                  {!isRevice ? (
                    <div className="flex justify-center pb-32">
                      <Button
                        size="small"
                        color="default"
                        style={{ backgroundColor: "green", color: "white" }}
                        variant="outlined"
                        onClick={() => {
                          handAgreementAccepted(type);
                        }}
                      >
                        Agree
                      </Button>
                    </div>
                  ) : null}
                </Card>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      case CRITERIA_NAME.DEPOSIT:
        return (
          <Card className="w-1/2">
            <CardActionArea>
              <div className={classNames(classes.cardHeader, "px-24 py-16")}>
                <Typography gutterBottom variant="subtitle1">
                  Deposit
                </Typography>
              </div>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {isRevice
                    ? `You offer ${selectedBooking.car.owner.fullName} in deposit with ${message} days rent`
                    : `${selectedBooking.renter.fullName} offers you in deposit with ${message} days rent`}
                </Typography>
              </CardContent>
            </CardActionArea>
            {!isRevice ? (
              <div className="flex justify-center pb-32">
                <Button
                  size="small"
                  color="default"
                  style={{ backgroundColor: "green", color: "white" }}
                  variant="outlined"
                  onClick={() => {
                    handAgreementAccepted(type);
                  }}
                >
                  Agree
                </Button>
              </div>
            ) : null}
          </Card>
        );
      // case CRITERIA_NAME.INDEMNTIFICATION:
      //   return (
      //     <Card className="w-1/2">
      //       <CardActionArea>
      //         <div className={classNames(classes.cardHeader, "px-24 py-16")}>
      //           <Typography variant="subtitle1" color="inherit">
      //             Indemnification Offer
      //           </Typography>
      //         </div>
      //         <CardContent>
      //           <Typography gutterBottom variant="overline">
      //             Checked list
      //           </Typography>
      //           <Card raised square>
      //             <Box className="px-24 py-24">
      //               <FormGroup>
      //                 <FormControlLabel
      //                   control={
      //                     <Checkbox
      //                       checked={message.carDamage}
      //                       name="carDamage"
      //                     />
      //                   }
      //                   label="Car damage"
      //                 />
      //                 <FormControlLabel
      //                   control={
      //                     <Checkbox checked={message.overdue} name="overdue" />
      //                   }
      //                   label="Overdue return time"
      //                 />
      //                 <FormControlLabel
      //                   control={
      //                     <Checkbox checked={message.violate} name="violate" />
      //                   }
      //                   label="Violate transport"
      //                 />
      //               </FormGroup>
      //             </Box>
      //           </Card>
      //         </CardContent>
      //         {!isRevice ? (
      //           <div className="flex justify-center pb-8 w-100">
      //             <Button
      //               size="small"
      //               color="default"
      //               style={{ backgroundColor: "green", color: "white" }}
      //               variant="outlined"
      //               onClick={() => {
      //                 handAgreementAccepted(type);
      //               }}
      //             >
      //               Agree
      //             </Button>
      //           </div>
      //         ) : null}
      //       </CardActionArea>
      //     </Card>
      //   );
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
          <Card className="w-1/2" style={{ color: "green" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  Agree Success <Icon>done</Icon>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Agreement {message} has completed
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
    <Tooltip
      title={
        new Date(createAt).toDateString() +
        " " +
        new Date(createAt).toLocaleTimeString()
      }
      placement={isRevice ? "right-end" : "left-start"}
    >
      <Grid
        container
        justify={isRevice ? "flex-end" : "flex-start"}
        className="py-4"
        item
        lg={12}
      >
        <MessageByType />
      </Grid>
    </Tooltip>
  );
};

export default Message;
