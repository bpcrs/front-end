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
              </div>

              <CardContent>
                <Typography gutterBottom variant="overline">
                  Package infomation
                </Typography>

                <Card raised square>
                  {message.type === "basic" ? (
                    <CardContent className="p-32">
                      <div className="flex justify-center">
                        <Typography variant="h6" color="textSecondary">
                          +200.000VND
                        </Typography>
                      </div>

                      <Divider className="my-32" />

                      <div className="flex flex-col">
                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Collision Damage (CDW)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                During the rental period, CDW covers physical
                                damage that the car might suffer in the event of
                                an accident. However, it usually comes with some
                                exclusion – for example, it might not cover
                                damage to windscreens, tires, undercarriage,
                                replacement locks, replacement keys, and towing
                                charges.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>
                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Loss Damage Waiver (LDW)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                Coverage for both CDW and LDW are similar – both
                                waive your financial responsibility for any
                                damage that the rental car might incur.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>
                        <Grid item container justify="space-between">
                          <Typography
                            variant="subtitle1"
                            style={{ color: "white" }}
                          >
                            .
                          </Typography>
                        </Grid>
                        <Grid item container justify="space-between">
                          <Typography
                            variant="subtitle1"
                            style={{ color: "white" }}
                          >
                            .
                          </Typography>
                        </Grid>
                      </div>
                    </CardContent>
                  ) : (
                    <CardContent className="p-32">
                      <div className="flex justify-center">
                        <Typography variant="h6" color="textSecondary">
                          +400.000VND
                        </Typography>
                      </div>

                      <Divider className="my-32" />

                      <div className="flex flex-col">
                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Collision Damage (CDW)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                During the rental period, CDW covers physical
                                damage that the car might suffer in the event of
                                an accident. However, it usually comes with some
                                exclusion – for example, it might not cover
                                damage to windscreens, tires, undercarriage,
                                replacement locks, replacement keys, and towing
                                charges.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>
                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Loss Damage Waiver (LDW)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                Coverage for both CDW and LDW are similar – both
                                waive your financial responsibility for any
                                damage that the rental car might incur.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>

                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Theft Protection (TP)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                TP covers part of the cost for replacing the
                                hire car if it’s stolen or damaged as a result
                                of attempted theft, while you have it. However,
                                TP coverage excludes items inside the car, such
                                as your luggage, phone or GPS.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>
                        <Grid item container justify="space-between">
                          <Typography variant="subtitle1" className="">
                            <li>Third–Party Liability (TPL)</li>
                          </Typography>
                          <Tooltip
                            title={
                              <Typography variant="caption">
                                TPL covers the third party’s bodily injuries,
                                death, and damage to property. In most
                                countries, either you, the driver, or your
                                rental company are legally required to purchase
                                Third-Party liability coverage before renting a
                                car, thus TPL is most likely already included in
                                your rental package.
                              </Typography>
                            }
                            placement="top"
                          >
                            <Icon style={{ cursor: "pointer" }}>
                              error_outline
                            </Icon>
                          </Tooltip>
                        </Grid>
                      </div>
                    </CardContent>
                  )}
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
