import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
// import GetDate from '../../../common/getDate';
import { useSelector } from 'react-redux';
import classNames from 'classnames'
const useStyles = makeStyles(theme => ({
    messageBody: {
        width: 'fit-content',
        // marginRight: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        borderRadius: 15,
        color: theme.palette.primary.contrastText,
        maxWidth: '100%',
        position: "relative",
        padding: theme.spacing(2),
        '&.send': {
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.getContrastText(theme.palette.grey[300]),
            marginRight : theme.spacing(2)
        }
    }
}));

const Message = ({ message, receive }) => {
    const classes = useStyles();
    const selectedUser = useSelector(state => state.chat.selectedUser);
    return (
        <Grid container justify={selectedUser.id === receive ? "flex-end" : "flex-start"} item lg={12}>
            <Grid item className={classNames(classes.messageBody, selectedUser.id === receive ? "send" : "")}
                style={{ textAlign: selectedUser.id === receive ? 'left' : 'right' }}>
                <Typography>{message}</Typography>
            </Grid>
        </Grid>
    )
}

export default Message