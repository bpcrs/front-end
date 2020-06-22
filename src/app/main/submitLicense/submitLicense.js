
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

            for (let i = 0; i < fileArr.length; i++) {
                var uploadTask = firebase.storage().ref('img/' + date).child(fileArr[i].name).put(fileArr[i], metadata);

                uploadTask.on(
                    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) {

                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
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
                <Typography>Tell us a bit about yourself</Typography>
                <TextField className={classes.textField} label="Full name" />
                <TextField className={classes.textField} label="Mobile number" />
                <TextField className={classes.textField} label="Email" />
                <TextField className={classes.textField} label="Identity Card Number" />

                <Grid item xs={12} lg={6}>


                    <p><label htmlFor="file" >
                        <Button variant="contained" color="primary" component="span" startIcon={<AccountBoxIcon />}>
                            Click here to Upload your front citizen identification
                        </Button>
                    </label></p>
                    <p><input type="file" accept="image/*" name="image" id="file" onChange={loadFile} style={{ display: "none" }} /></p>
                    <p><img id="output" width="200" height="200" /></p>

                </Grid>

                <Grid item xs={12} lg={6}>

                    <p><label htmlFor="file2" >
                        <Button variant="contained" color="primary" component="span" startIcon={<AccountBoxIcon />}>
                            Click here to Upload your backside citizen identification
                        </Button>
                    </label></p>
                    <p><input type="file" accept="image/*" name="image" id="file2" onChange={loadFile2} style={{ display: "none" }} /></p>
                    <p><img id="output2" width="200" height="200" /></p>


                </Grid>

                <Grid item xs={12} lg={6}>

                    <p><label htmlFor="file3" >
                        <Button variant="contained" color="primary" component="span" startIcon={<AccountBoxIcon />}>
                            Click here to Upload your front citizen identification with your face
                        </Button>
                    </label></p>
                    <p><input type="file" accept="image/*" name="image" id="file3" onChange={loadFile3} style={{ display: "none" }} /></p>
                    <p><img id="output3" width="200" height="200" /></p>

                </Grid>

                <Grid item xs={12} lg={6}>

                    <p><label htmlFor="file4" >
                        <Button variant="contained" color="primary" component="span" startIcon={<AccountBoxIcon />}>
                            Click here to Upload your License
                        </Button>
                    </label></p>
                    <p><input type="file" accept="image/*" name="image" id="file4" onChange={loadFile4} style={{ display: "none" }} /></p>
                    <p><img id="output4" width="200" height="200" /></p>


                </Grid>

                <Grid item xs={12} lg={12}>
                    <Button id="submitButton" variant="contained" color="secondary" onClick={uploadFile}>Submit</Button>
                </Grid>
            </Grid>

        </Layout>
    )
}
