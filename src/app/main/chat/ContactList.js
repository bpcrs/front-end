import React, { useState, useEffect } from 'react';
import { Button, Avatar, Tooltip, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import firebase from '../../firebase/firebase';
import classNames from 'classnames';
import { setSelectedUser } from './chat.action';


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
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const userLogged = useSelector(state => state.auth.user.data);

  const setSelectedContact = (id) => {
    dispatch(setSelectedUser(users.filter(u => u.id === id).length !== 0 ? users.filter(u => u.id === id)[0] : {}))
  }

  useEffect(() => {
    const usersFirebase = firebase.firestore().collection('users');
    async function getImagesContact() {
      const usersInfo = await usersFirebase.get();
      usersInfo.docs.map(doc => setUsers(users => [...users, doc.data()]))
    }
    getImagesContact();
  }, [])
  const ContactButton = ({ image, fullName, id }) => (
    <Tooltip title={fullName} placement="left">
      <Button className={classNames(classes.contactButton, { 'active': true })} onClick={() => setSelectedContact(id)}>
        <Avatar src={image}></Avatar>
      </Button>
    </Tooltip>
  )

  return (
      <Grid container spacing={1} justify="center" alignItems="center" alignContent="center">
        {users.filter(user => user.id !== userLogged.id).map(user => (<Grid item lg={12}>
          <ContactButton {...user} />
        </Grid>))}
      </Grid>

  )
};

export default ContactList