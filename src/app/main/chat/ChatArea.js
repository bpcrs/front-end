import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Chat from './Chat';

const useStyles = makeStyles(theme => ({
    contact: {
        backgroundColor: theme.palette.background.default
    }
}));

export const ChatArea = () => {
    return (
        <Grid container style={{backgroundColor : 'red'}}>
            <Grid item lg={12}>
                <Chat />
            </Grid>
        </Grid>
    )
}
