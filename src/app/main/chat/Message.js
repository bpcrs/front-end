import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import firebase from '../../firebase/firebase';
import { theme } from '@chakra-ui/core';
import { Grid } from '@material-ui/core';
import GetDate from '../../../common/getDate';

const useStyles = makeStyles(theme => ({
    messageBody: {
        marginRight: theme.spacing(1),

        background: theme.palette.background.default
    }
}));

const Message = () => {
    const testMgs = 'hello';
    const classes = useStyles();
    const chat = '';
    const [msg, setMsg] = useState([]);
    // const { createdBy, createAt, message } = msg;

    const getMsgFromFirebase = () => {
        const mess = firebase.firestore().collection('chatRooms').doc('3v4').collection('messages');
        let allMsg = mess.get().then(snapShot => {
            snapShot.forEach(doc => {
                let newMsgs = msg;
                newMsgs.push(doc.data().message);
                setMsg(newMsgs);
            })
            console.log("Mess", msg[3]);
        })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    useEffect(() => {
        getMsgFromFirebase();
        // console.log(msg)
    }, [])

    // const listAllMsg = () => {
    //     msg.forEach(mess => {
    //         <Grid>
    //             <p>
    //                 {String(mess)
    //                     .slice(0, 1)
    //                     .toUpperCase()
    //                     .concat(String(mess).slice(1))}
    //             </p>
    //             <p>
    //                 {/* {GetDate(createAt)} ago */}
    //             </p>
    //         </Grid>

    //     })
    // }

    return (
        <Grid container spacing={1}>
            <Grid item lg={8} className={classes.messageBody}>

                <Grid>
                    <p>
                        {String(msg[0])
                            .slice(0, 1)
                            .toUpperCase()
                            .concat(String(msg[0]).slice(1))}
                    </p>
                    <p>
                        {/* {GetDate(createAt)} ago */}
                    </p>
                </Grid>

                <Grid>
                    <p>
                        {String(msg[1])
                            .slice(0, 1)
                            .toUpperCase()
                            .concat(String(msg[1]).slice(1))}
                    </p>
                    <p>
                        {/* {GetDate(createAt)} ago */}
                    </p>
                </Grid>

                <Grid>
                    <p>
                        {String(msg[2])
                            .slice(0, 1)
                            .toUpperCase()
                            .concat(String(msg[2]).slice(1))}
                    </p>
                    <p>
                        {/* {GetDate(createAt)} ago */}
                    </p>
                </Grid>

                <Grid>
                    <p>
                        {String(msg[3])
                            .slice(0, 1)
                            .toUpperCase()
                            .concat(String(msg[3]).slice(1))}
                    </p>
                    <p>
                        {/* {GetDate(createAt)} ago */}
                    </p>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Message