import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  IconButton,
  Icon,
  Grid,
  Fab,
} from "@material-ui/core";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import firebase from "../../firebase/firebase";
import Message from "./Message";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  messageRow: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "0 16px 4px 16px",
    flex: "0 0 auto",
    "&.contact": {
      "& $bubble": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        "& $time": {
          marginLeft: 12,
        },
      },
      "&.first-of-group": {
        "& $bubble": {
          borderTopLeftRadius: 20,
        },
      },
      "&.last-of-group": {
        "& $bubble": {
          borderBottomLeftRadius: 20,
        },
      },
    },
    "&.me": {
      paddingLeft: 40,

      "& $avatar": {
        order: 2,
        margin: "0 0 0 16px",
      },

      "& $bubble": {
        marginLeft: "auto",
        backgroundColor: theme.palette.grey[300],
        color: theme.palette.getContrastText(theme.palette.grey[300]),
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        "& $time": {
          justifyContent: "flex-end",
          right: 0,
          marginRight: 12,
        },
      },
      "&.first-of-group": {
        "& $bubble": {
          borderTopRightRadius: 20,
        },
      },

      "&.last-of-group": {
        "& $bubble": {
          borderBottomRightRadius: 20,
        },
      },
    },
    "&.contact + .me, &.me + .contact": {
      paddingTop: 20,
      marginTop: 20,
    },
    "&.first-of-group": {
      "& $bubble": {
        borderTopLeftRadius: 20,
        paddingTop: 13,
      },
    },
    "&.last-of-group": {
      "& $bubble": {
        borderBottomLeftRadius: 20,
        paddingBottom: 13,
        "& $time": {
          display: "flex",
        },
      },
    },
  },
  avatar: {
    position: "absolute",
    left: -32,
    margin: 0,
  },
  bubble: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    maxWidth: "100%",
  },
  message: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.2,
  },
  time: {
    position: "absolute",
    display: "none",
    width: "100%",
    fontSize: 11,
    marginTop: 8,
    top: "100%",
    left: 0,
    whiteSpace: "nowrap",
  },
  bottom: {
    background: theme.palette.background.default,
    borderTop: "1px solid rgba(0, 0, 0, 0.13)",
    position: "relative",
    bottom: 0,
  },
  inputWrapper: {
    borderRadius: 24,
  },
  fullHeight: {
    height: "100%",
    minHeight: "100vh",
    maxHeight: "100vh",
  },
  fullWidth: {
    maxWidth: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  chat: {
    paddingBottom: theme.spacing(16),
  },
}));

const Chat = () => {
  const [sendMessage, setSendMessage] = useState("");
  const classes = useStyles();
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const userLogged = useSelector((state) => state.auth.user);
  const [msg, setMsg] = useState([]);
  const [sizeMsg, setSizeMsg] = useState(20);

  useEffect(() => {
    setMsg([]);
    async function getMsgFromFirebase() {
      const arr = [userLogged.id, selectedUser.id].sort();
      await firebase
        .firestore()
        .collection("chatRooms")
        .doc(`${arr[0]}v${arr[1]}`)
        .collection("messages")
        .orderBy("createAt", "asc")
        .limitToLast(20)
        .onSnapshot((ns) => {
          setMsg([]);
          ns.docs.map((message) => setMsg((msg) => [...msg, message.data()]));
        });
    }
    getMsgFromFirebase();
  }, [selectedUser.id, userLogged.id]);

  const onMessageSubmit = () => {
    if (sendMessage.length === 0) {
      return;
    }
    const arr = [userLogged.id, selectedUser.id].sort();
    firebase
      .firestore()
      .collection("chatRooms")
      .doc(`${arr[0]}v${arr[1]}`)
      .collection("messages")
      .add({
        send: userLogged.id,
        createAt: new Date().getTime(),
        message: sendMessage,
        receive: selectedUser.id,
      });
    setSendMessage("");
    setSizeMsg(sizeMsg + 1);
  };

  return (
    <Paper className={classes.fullHeight}>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        className={classes.fullHeight}
      >
        <Grid item lg className={classes.fullWidth}>
          <Grid>
            <Fab variant="extended" size="medium">
              <Icon>attach_money_sharp</Icon>
              Pricing
            </Fab>
            <Fab variant="extended" size="medium">
              <Icon>attach_money_sharp</Icon>
              Pricing
            </Fab>
          </Grid>
          <ScrollToBottom>
            <Grid>
              <Grid item className={classes.fullHeight}>
                <div className="flex flex-col flex-1 items-center justify-center pl-12">
                  {/* <Icon className="text-128" color="disabled">chat</Icon> */}
                  <Grid container spacing={1} className={classes.chat}>
                    {msg
                      .sort((first, second) => first.createAt - second.createAt)
                      .map((message) => (
                        <Message {...message} />
                      ))}
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </ScrollToBottom>
        </Grid>
        <Grid item lg={12}>
          <div
            className={classNames(
              classes.bottom,
              "py-4 px-8",
              classes.overlay,
              classes.fullWidth
            )}
            onKeyDown={(e) => (e.key === "Enter" ? onMessageSubmit() : "")}
          >
            <Paper
              className={classNames(
                classes.inputWrapper,
                "flex items-center relative"
              )}
            >
              <TextField
                value={sendMessage}
                autoFocus={false}
                // id={message}
                onChange={(e) => setSendMessage(e.currentTarget.value)}
                className="flex-1"
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: "ml-16 mr-48 my-8",
                    input: "",
                  },
                  placeholder: "Type your message",
                }}
                InputLabelProps={{
                  shrink: false,
                  className: classes.bootstrapFormLabel,
                }}
              />
              <IconButton className="absolute pin-r pin-t">
                <Icon className="text-24">attach_file</Icon>
              </IconButton>
              <IconButton
                className="absolute pin-r pin-t"
                onClick={() => onMessageSubmit()}
              >
                <Icon className="text-24">send</Icon>
              </IconButton>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Chat;
