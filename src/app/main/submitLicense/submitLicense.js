
import React from 'react'
import {
    //FormControl,
    Button,
    // InputLabel,
    // MenuItem,
    TextField,
    // Card, Select,
    Typography,
    Grid,
    makeStyles
} from '@material-ui/core';

// import ImageUploading from "react-images-uploading";

import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import Layout from '../../layout';
import Paper from '@material-ui/core/Paper';
import ProgressBar from 'react-customizable-progressbar'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from './firebase';
// import event from '';
const ITEM_HEIGHT = 48;
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
    }

}));




export default function SubmitLicense(props) {

    // const maxNumber = 10;
    // const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

    const classes = useStyles();

    // const onChange = imageList => {
    //     // data for submit
    //     console.log(imageList);
    // };

    var fileArr = new Array();
   
    let uploadFile = () => {
        if (fileArr.length > 0) {
            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg',
            };

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var count = 0;
            var nameUser = document.getElementById("txtFullName").value;
            var identityCard = document.getElementById("txtIdentityCard").value;

            for (let i = 0; i < fileArr.length; i++) {
                var uploadTask = firebase.storage().ref('License/' + date + "/" + identityCard).child(fileArr[i].name).put(fileArr[i], metadata);

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
                            refreshPage();

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
                    }
                );
            }

        } else {
            console.log("Khong co file")
            return;
        }
    }

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

                <Grid item xs={12} lg={12}>                  
                    <Button id="submitButton" variant="contained" color="secondary" onClick={uploadFile}>Submit</Button>
                </Grid>
            </Grid>

        </Layout>
    )
}
