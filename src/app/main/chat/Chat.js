import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  IconButton,
  Icon,
  Grid,
  Collapse,
  Button,
  Tooltip,
} from "@material-ui/core";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import firebase from "../../firebase/firebase";
import Message from "./Message";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import Agreement from "./Agreement";
import { submitMessage, storeImage } from "./chat.action";

const useStyles = makeStyles((theme) => ({
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
  fullHeight: {
    height: "100%",
    minHeight: "80vh",
    maxHeight: "80vh",
    position: "relative",
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
    paddingBottom: theme.spacing(8),
  },
}));

const Chat = () => {
  const [sendMessage, setSendMessage] = useState("");
  const classes = useStyles();
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const userLogged = useSelector((state) => state.auth.user);
  const [msg, setMsg] = useState([]);
  const [sizeMsg, setSizeMsg] = useState(20);
  const agreement = useSelector((state) => state.chat.agreement);
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
    submitMessage(sendMessage, userLogged.id, selectedUser.id, "MSG");
    setSendMessage("");
    setSizeMsg(sizeMsg + 1);
  };

  const onImgSubmit = (event) => {
    //  const image = document.getElementById("output");
    //  image.src = URL.createObjectURL(event.target.files[0]);
    storeImage(event.target.files[0], userLogged.id, selectedUser.id);
    setSendMessage("");
    setSizeMsg(sizeMsg + 1);
  };

  // const storeImgToFirebase = () => {

  // }

  return (
    <Grid
      container
      direction="row"
      alignItems="stretch"
      className={classes.fullHeight}
    >
      <Grid item lg className={classes.fullWidth}>
        <ScrollToBottom>
          <Grid item className={classes.fullHeight}>
            <Grid container className={classes.chat}>
              {msg
                .sort((first, second) => first.createAt - second.createAt)
                .map((message) => (
                  <Message key={message.createAt} {...message} />
                ))}
            </Grid>
          </Grid>
        </ScrollToBottom>
      </Grid>
      <Grid item lg={12}>
        <div className={classNames("py-4 px-8", classes.overlay)}>
          <Agreement />
        </div>
      </Grid>
      <Grid item lg={12}>
        <Collapse in={!agreement.isOpen}>
          <div
            className={classNames(classes.bottom, "py-4 px-8", classes.overlay)}
            onKeyDown={(e) => (e.key === "Enter" ? onMessageSubmit() : "")}
          >
            <Paper className={classNames("flex items-center relative")}>
              <TextField
                value={sendMessage}
                autoFocus={false}
                // id={message}
                onChange={(e) => setSendMessage(e.currentTarget.value)}
                disabled={!selectedUser}
                style={{ width: "100%" }}
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: "ml-16 mr-8 my-8",
                    input: "",
                  },
                  placeholder: `${
                    selectedUser.displayName
                      ? "Type your message to " + selectedUser.displayName
                      : "Select person to get started"
                  }`,
                }}
                InputLabelProps={{
                  shrink: false,
                  className: classes.bootstrapFormLabel,
                }}
              />
              <p></p>
              <Tooltip title="Send an attachment">
                <label htmlFor="file">
                  <Button component="label">
                    <Icon>attach_file</Icon>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      name="image"
                      id="file"
                      onChange={onImgSubmit}
                    />
                  </Button>
                </label>
              </Tooltip>
              <Tooltip title="Send a message">
                <Button
                  onClick={() => onMessageSubmit()}
                  disabled={!sendMessage}
                >
                  <Icon className="text-24">send</Icon>
                </Button>
              </Tooltip>
            </Paper>
          </div>
        </Collapse>
      </Grid>
    </Grid>
  );
};
export default Chat;
