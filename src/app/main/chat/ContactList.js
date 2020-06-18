import React, { Component, useState, useEffect } from 'react';
import { withStyles, Button, Avatar, Divider, Tooltip, Grid, makeStyles } from '@material-ui/core';
import { FuseScrollbars, FuseAnimateGroup } from '@fuse';
import { compose } from 'redux';
import { firestoreConnect } from "react-redux-firebase";
import GetDate from "../../../common/getDate";
import { ChangeSelectedUser } from "../../store/actions/chat";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import firebase from '../../firebase/firebase';
import classNames from 'classnames';


const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default
  },
  contactButton: {
    width: 70,
    minWidth: 70,
    flex: '0 0 auto',
    '&.active:after': {
      position: 'absolute',
      top: 8,
      right: 0,
      bottom: 8,
      content: "''",
      width: 4,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main
    }
  },
  unreadBadge: {
    position: 'absolute',
    minWidth: 18,
    height: 18,
    top: 4,
    left: 10,
    borderRadius: 9,
    padding: '0 5px',
    fontSize: 11,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
    zIndex: 10
  },
  status: {
    position: 'absolute',
    width: 12,
    height: 12,
    bottom: 4,
    left: 44,
    border: '2px solid ' + theme.palette.background.default,
    borderRadius: '50%',
    zIndex: 10,

    '&.online': {
      backgroundColor: '#4CAF50'
    },

    '&.do-not-disturb': {
      backgroundColor: '#F44336'
    },

    '&.away': {
      backgroundColor: '#FFC107'
    },

    '&.offline': {
      backgroundColor: '#646464'
    }
  },
  avatar: {
    padding: theme.spacing(2)
  }
}));

const ContactList = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const handelChangeChat = () => {
    const { user, changeSelectedUser } = this.props;
    changeSelectedUser(user.uid, null);
  };
  
  const selectedUser = {}
  const status = false;
  const user = useSelector(state => state);

  const handleContactList = () => {
    const contactId = '3'
  }

  useEffect(() => {
    const users = firebase.firestore().collection('users');
    let allUser = users.get().then(res => {
      res.forEach(user => setImages([...images, user.data().image]))
      res.forEach(doc => {
        console.log(doc.id, '=> ', doc.data());
      });
      
    })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }, [])

  console.log("AAA",images[1]);

  const ContactButton = () => (
    <Tooltip title={"AA"} placement="left">
      <Button className={classNames(classes.contactButton, { 'active': true })} onClick={() => handleContactList}>
        <Avatar src={images[0]}></Avatar>
      </Button>
    </Tooltip>
  )

  return (
    <Grid container spacing={1} justify="center" alignItems="center" alignContent="center">
      <Grid item lg={12}>
        <ContactButton />
      </Grid>
      <Grid item lg={12}>
        <ContactButton />
      </Grid>
      <Grid item lg={12}>
        <ContactButton />
      </Grid>

    </Grid>
    // </FuseScrollbars>
  )
};

export default ContactList