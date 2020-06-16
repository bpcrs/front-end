import React, { useState } from 'react';
import { Avatar, Paper, Typography, withStyles, TextField, IconButton, Icon, Grid } from '@material-ui/core';
import classNames from 'classnames';
import _ from '@lodash';
import { makeStyles } from '@material-ui/styles';
import { CreateChatRoom, CreateMessage, createRoomChat } from "../../store/actions/chat";
import firebase from '../../firebase/firebase';


const useStyles = makeStyles(theme => ({
    messageRow: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '0 16px 4px 16px',
        flex: '0 0 auto',
        '&.contact': {
            '& $bubble': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                '& $time': {
                    marginLeft: 12
                }
            },
            '&.first-of-group': {
                '& $bubble': {
                    borderTopLeftRadius: 20
                }
            },
            '&.last-of-group': {
                '& $bubble': {
                    borderBottomLeftRadius: 20
                }
            }
        },
        '&.me': {
            paddingLeft: 40,

            '& $avatar': {
                order: 2,
                margin: '0 0 0 16px'
            },

            '& $bubble': {
                marginLeft: 'auto',
                backgroundColor: theme.palette.grey[300],
                color: theme.palette.getContrastText(theme.palette.grey[300]),
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                '& $time': {
                    justifyContent: 'flex-end',
                    right: 0,
                    marginRight: 12
                }
            },
            '&.first-of-group': {
                '& $bubble': {
                    borderTopRightRadius: 20
                }
            },

            '&.last-of-group': {
                '& $bubble': {
                    borderBottomRightRadius: 20
                }
            }
        },
        '&.contact + .me, &.me + .contact': {
            paddingTop: 20,
            marginTop: 20
        },
        '&.first-of-group': {
            '& $bubble': {
                borderTopLeftRadius: 20,
                paddingTop: 13
            }
        },
        '&.last-of-group': {
            '& $bubble': {
                borderBottomLeftRadius: 20,
                paddingBottom: 13,
                '& $time': {
                    display: 'flex'
                }
            }
        }
    },
    avatar: {
        position: 'absolute',
        left: -32,
        margin: 0
    },
    bubble: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        maxWidth: '100%'
    },
    message: {
        whiteSpace: 'pre-wrap',
        lineHeight: 1.2
    },
    time: {
        position: 'absolute',
        display: 'none',
        width: '100%',
        fontSize: 11,
        marginTop: 8,
        top: '100%',
        left: 0,
        whiteSpace: 'nowrap'
    },
    bottom: {
        background: theme.palette.background.default,
        borderTop: '1px solid rgba(0, 0, 0, 0.13)'
    },
    inputWrapper: {
        borderRadius: 24
    }
}));

const Chat = () => {
    const [message, setMessage] = useState();
    // firebase.firestore().collection('chatRooms').doc('das').set({
    //     firstUser: '3',
    //     secondUser: '4'
    // });

    const onMessageSubmit = () => (
        //const message = this.state;
        
        firebase.firestore()
        .collection('chatRooms')
        .doc('3v4')
        .collection('messages')
        .add({
            createBy: '4',
            createAt: new Date().getTime(),
            message: message
        })
        // CreateChatRoom(firebase.firestore, '3', '4').then(id => {
        //     CreateMessage(id, '3', 'hello');
        // })
        //CreateMessage('das', '4', 'hello')
    )
const handelChangeMessage = ({ currentTarget }) => {
    // setMessage(per => ({ ...per, message: currentTarget.value }));
    setMessage(currentTarget.value);
    console.log(message);
    
};

const classes = useStyles();
const { chat, contacts, user, className } = {};
const { messageText } = {};
return (
    <Grid
        container alignItems="stretch" direction="column"
    >
        <Grid item style={{ minHeight: "80vh" }}>
            <div className="flex flex-col flex-1 items-center justify-center p-24">
                <Icon className="text-128" color="disabled">chat</Icon>
                <Typography className="px-16 pb-24 mt-24 text-center" color="textSecondary">
                    Select a contact to start a conversation.
                                </Typography>
            </div>
        </Grid>

        <Grid item style={{ minHeight: "10vh" }}>
            <form className={classNames(classes.bottom, "py-16 px-8")}>
                <Paper className={classNames(classes.inputWrapper, "flex items-center relative")}>
                    <TextField
                        autoFocus={false}
                        // id={message}
                        onChange={handelChangeMessage}
                        className="flex-1"
                        InputProps={{
                            disableUnderline: true,
                            classes: {
                                root: "flex flex-grow flex-no-shrink ml-16 mr-48 my-8",
                                input: ""
                            },
                            placeholder: "Type your message"
                        }}
                        InputLabelProps={{
                            shrink: false,
                            className: classes.bootstrapFormLabel
                        }}
                    />
                    <IconButton className="absolute pin-r pin-t" onClick={() => onMessageSubmit()} >
                        <Icon className="text-24">send</Icon>
                    </IconButton>
                </Paper>
            </form>
        </Grid>
    </Grid>
    // </Paper>
);
}



export default Chat;
