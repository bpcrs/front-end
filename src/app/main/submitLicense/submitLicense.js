
import React from 'react'
import {
    Button,
    TextField,
    Grid,
    makeStyles
} from '@material-ui/core';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Layout from '../../layout';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgressBar from 'react-customizable-progressbar'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from './firebase';
import Slide from '@material-ui/core/Slide'
// import event from '';
const ITEM_HEIGHT = 48;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.contrastText
    },
    media: {
        height: 140,
        width: '100%'
    },
    imageUploading: {
        height: 100
    },
    icon: {
        height: '100%',
        width: 50,
        marginRight: 10
    },
    formControl: {
        width: '100%',
        maxHeight: ITEM_HEIGHT * 4.5,
    },
    textField: {
        width: '100%'
    },
    card: {
        margin: 20,
        padding: 20
    },
    progressBar: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    }

}));

export default function SubmitLicense(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    var fileArr = new Array();
    let uploadFile = () => {
        if (fileArr.length > 0) {
            handleClickOpen();
            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg',
            };

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var count = 0;
            var flag = false;
            var identityCard = document.getElementById("txtIdentityCard").value;

            for (let i = 0; i < fileArr.length; i++) {
                var uploadTask = firebase.storage().ref('License/' + date + "/" + identityCard).child("Picture " + (i + 1)).put(fileArr[i], metadata);

                uploadTask.on(
                    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) {
                        var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;

                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;

                        }
                        if (progress == 100) {
                            console.log("count: " + count);
                            count = count + 1;
                        }
                        if (count == fileArr.length) {
                            count = 0;
                            handleClose();
                            flag = true;
                        }
                    },
                    function (error) {
                        // Errors list: https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;

                            case 'storage/canceled':
                                // User canceled the upload
                                break;

                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    },
                    function () {
                        if (flag) {
                            flag = false;
                            if (count == 0) {
                                console.log("start get link download!!!")
                                downloadFile(date, identityCard);
                            } else {
                                console.log("check lai cho nay");
                            }
                        }
                    }
                );
            }
        } else {
            console.log("Khong co file")
            return;
        }
    }

    var downloadFile = (date, identityCard) => {
        var storage = firebase.storage();
        var storageRef = storage.ref('License');

        for (let i = 0; i < fileArr.length; i++) {

            // Create a reference to the file we want to download       
            var starsRef = storageRef.child(date + "/" + identityCard + "/" + "Picture " + (i + 1));

            // Get the download URL
            console.log("state download: " + starsRef.state);
            starsRef.getDownloadURL().then(function (url) {
                // Insert url into an <img> tag to "download"
                console.log("test vi tri: " + (i + 1) + "-" + url);
            }).catch(function (error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        console.log("File doesn't exist vi tri: " + (i + 1))
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log("User doesn't have permission to access the object")
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });
        }

    };
    var refreshPage = function () {
        // if (flag) {
        window.alert("UpLoad file succcess");
        window.location.reload();
        // flag = false;
        //}
    };
    var loadFile = function (event) {
        if (event.target.files[0]) {
            var image = document.getElementById('output');
            image.src = URL.createObjectURL(event.target.files[0]);
            if (fileArr.length > 0) {
                fileArr[0] = event.target.files[0];
            } else {
                fileArr.push(event.target.files[0]);
            }
        }
    };

    var loadFile2 = function (event) {
        if (event.target.files[0]) {
            var image = document.getElementById('output2');
            image.src = URL.createObjectURL(event.target.files[0]);
            //fileArr.push(event.target.files[0]);
            fileArr[1] = event.target.files[0];
        }
    };

    var loadFile3 = function (event) {
        if (event.target.files[0]) {
            var image = document.getElementById('output3');
            image.src = URL.createObjectURL(event.target.files[0]);
            // fileArr.push(event.target.files[0]);
            fileArr[2] = event.target.files[0];
        }
    };

    var loadFile4 = function (event) {
        if (event.target.files[0]) {
            var image = document.getElementById('output4');
            image.src = URL.createObjectURL(event.target.files[0]);
            // fileArr.push(event.target.files[0]);
            fileArr[3] = event.target.files[0];
        }
    };

    return (

        <Layout name="License form">
            <h1 className="text-center">Update your License</h1>

            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Progressing...."}</DialogTitle>
                    <DialogContent>
                        <div align="center" className={classes.progressBar}>
                            <CircularProgress color="secondary"/>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Grid container spacing={1} component={Paper}>

                <TextField className={classes.textField} label="Full name" id="txtFullName" />
                <TextField className={classes.textField} label="Mobile number" id="txtPhone" />
                <TextField className={classes.textField} label="Email" id="txtEmail" />
                <TextField className={classes.textField} label="Identity Card Number" id="txtIdentityCard" />

                <Grid item xs={12} lg={6}>

                    <p><label>
                        <Button variant="contained" color="primary" component="span" startIcon={<AccountBoxIcon />}>
                            Front citizen identification
                        </Button>
                    </label></p>
                    <p><input type="file" accept="image/*" name="image" id="file" onChange={loadFile} /></p>
                    <p><img id="output" width="200" height="200" /></p>

                </Grid>

                <Grid item xs={12} lg={6}>

                    <p><label>
                        <Button variant="contained" color="primary" component="span" startIcon={<AccountBoxIcon />}>
                            Backside citizen identification
                        </Button>
                    </label></p>
                    <p><input type="file" accept="image/*" name="image" id="file2" onChange={loadFile2} /></p>
                    <p><img id="output2" width="200" height="200" /></p>


                </Grid>

                <Grid item xs={12} lg={6}>

                    <p><label>
                        <Button variant="contained" color="primary" component="span" startIcon={<AccountBoxIcon />}>
                            Front citizen identification with your face
                        </Button>
                    </label></p>
                    <p><input type="file" accept="image/*" name="image" id="file3" onChange={loadFile3} /></p>
                    <p><img id="output3" width="200" height="200" /></p>

                </Grid>

                <Grid item xs={12} lg={6}>

                    <p><label>
                        <Button variant="contained" color="primary" component="span" startIcon={<AccountBoxIcon />}>
                            License
                        </Button>
                    </label></p>
                    <p><input type="file" accept="image/*" name="image" id="file4" onChange={loadFile4} /></p>
                    <p><img id="output4" width="200" height="200" /></p>
                </Grid>

                <Grid container justify="center">
                    <Button id="submitButton" variant="contained" color="secondary" onClick={uploadFile}>Submit</Button>
                </Grid>
            </Grid>

        </Layout>
    )
}
