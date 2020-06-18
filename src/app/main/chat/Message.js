import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import firebase from '../../firebase/firebase';
import { theme } from '@chakra-ui/core';
import { Grid, Typography } from '@material-ui/core';
import GetDate from '../../../common/getDate';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    messageBody: {
        marginRight: theme.spacing(1),
        background: theme.palette.background.default
    }
}));

const Message = ({ message, receive }) => {
    const classes = useStyles();
    const selectedUser = useSelector(state => state.chat.selectedUser);
    return (
        <Grid item lg={12} className={classes.messageBody} style={{ textAlign: selectedUser.id == receive ? 'right' : 'left' }}>
            <Typography>{message}</Typography>
        </Grid>
    )
}

export default Message