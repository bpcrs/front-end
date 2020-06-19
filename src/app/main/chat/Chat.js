import React, { useState, useEffect } from 'react';
import { Paper, TextField, IconButton, Icon, Grid, Box } from '@material-ui/core';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import firebase from '../../firebase/firebase';
import Message from './Message';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';

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
    const [sendMessage, setSendMessage] = useState();
    const classes = useStyles();
    const selectedUser = useSelector(state => state.chat.selectedUser);
    const userLogged = useSelector(state => state.auth.user.data);
    const [msg, setMsg] = useState([]);
    const [sizeMsg, setSizeMsg] = useState(10);

    // const scrollToBottom = (ref) => {
    //     console.dir(ref.scrollHeight);
    //     ref.scrollIntoView({behavior: 'smooth', block : 'end'});
    //     console.log(ref.scrollIntoView);

    // };

    // useEffect(scrollToBottom, [sendMessage]);

    useEffect(() => {
        async function getMsgFromFirebase() {
            const arr = [userLogged.id, selectedUser.id].sort();
            await firebase.firestore().collection('chatRooms').doc(`${arr[0]}v${arr[1]}`).collection('messages').orderBy('createAt', 'asc').limitToLast(20).onSnapshot(ns => {
                setMsg([]);
                ns.docs.map(message => setMsg(msg => [...msg, message.data()]));
                console.log('Size', ns.docs.length);
            });


        }
        getMsgFromFirebase();
    }, [selectedUser.id, userLogged.id])

    const onMessageSubmit = () => {
        const arr = [userLogged.id, selectedUser.id].sort();
        firebase.firestore()
            .collection('chatRooms')
            .doc(`${arr[0]}v${arr[1]}`)
            .collection('messages')
            .add({
                send: userLogged.id,
                createAt: new Date().getTime(),
                message: sendMessage,
                receive: selectedUser.id
            })
        setSendMessage("")
        setSizeMsg(sizeMsg + 1)
    }

    return (
        <Paper>
            <ScrollToBottom >
                {/* <FuseScrollbars> */}
                {/* <Grid
                    container alignItems="stretch" direction="column"
                > */}
                    {/* <Grid item > */}
                        {/* <Box height='80%' maxHeight='80%'> */}
                            {/* <div> */}
                            {/* <Icon className="text-128" color="disabled">chat</Icon> */}
                            <Grid container spacing={1}>
                                <Grid lg={12}></Grid>
                                {msg.sort((first, second) => first.createAt - second.createAt).map(message =>
                                    <Message  {...message} />
                                )}
                                {/* <div ref = {messagesEndRef} /> */}
                            </Grid>
                            {/* </div> */}
                        {/* </Box> */}
                    {/* </Grid> */}
                {/* </Grid> */}
                {/* </FuseScrollbars> */}
            </ScrollToBottom>


            <Grid item >
                <div className={classNames(classes.bottom, "py-16 px-8")} onKeyDown={(e) => e.key === 'Enter' ? onMessageSubmit() : ""}>
                    <Paper className={classNames(classes.inputWrapper, "flex items-center relative")}>
                        <TextField
                            value={sendMessage}
                            autoFocus={false}
                            // id={message}
                            onChange={(e) => setSendMessage(e.currentTarget.value)}
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
                        <IconButton className="absolute pin-r pin-t">
                            <Icon className="text-24">attach_file</Icon>
                        </IconButton>
                        <IconButton className="absolute pin-r pin-t" onClick={() => onMessageSubmit()} >
                            <Icon className="text-24">send</Icon>
                        </IconButton>
                    </Paper>
                </div>
            </Grid>
        </Paper >
    );
}
export default Chat;
