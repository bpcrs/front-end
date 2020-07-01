import React from 'react'
import { FormControl, Button, InputLabel, MenuItem, TextField, Card, Select, Typography, Grid, makeStyles } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import ImageUploading from "react-images-uploading";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Layout from '../../layout';
import firebase from '../submitLicense/firebase';

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

export default function CarSubmit(props) {
    const [brand, setBrand] = React.useState('');
    const [model, setModel] = React.useState('');
    const maxNumber = 10;
    const maxMbFileSize = 5 * 1024 * 1024; // 5Mb
    const handleChangeBrand = (event) => {
        setBrand(event.target.value);
    };
    const handleChangeModel = (event) => {
        setModel(event.target.value);
    };
    const classes = useStyles();

    const onChange = imageList => {
        // data for submit
        console.log(imageList);

    };

    var fileArr = new Array();
    var fileArr2 = new Array();
    var count = 0;

    let storeImageToFireBase = (imageArr, identityCard, sizeOfImageArr) => {
        if (imageArr.length > 0) {
            var metadata = {
                contentType: 'image/jpeg',
            };

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var flag = false;

            for (let i = 0; i < imageArr.length; i++) {
                var uploadTask = firebase.storage().ref('Car/' + date + "/" + identityCard).child(imageArr[i].name).put(imageArr[i], metadata);
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

                        if (count == sizeOfImageArr) {
                            count = 0;
                            flag = true;
                            //refreshPage();
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
                                console.log("start get link download");
                                downloadFile(date, identityCard, imageArr);
                            }
                        }
                    }
                );
            }
        } else {
            console.log("khong co file");
            return;
        }
    };


    let upLoadFile = () => {
        var identityCard = document.getElementById("txtIdentityCard").value;
        // var sizeOfImageArr = fileArr.length + fileArr2.length;
        // storeImageToFireBase(fileArr, identityCard, sizeOfImageArr);
        // storeImageToFireBase(fileArr2, identityCard, sizeOfImageArr);
       ;
        storeImageToFireBase(fileArr, identityCard, fileArr.length);
        storeImageToFireBase(fileArr2, identityCard, fileArr2.length);
    };

    
    var downloadFile = (date, identityCard, file) => {
        var storage = firebase.storage();
        var storageRef = storage.ref('Car');

        for (let i = 0; i < file.length; i++) {

            // Create a reference to the file we want to download       
            var starsRef = storageRef.child(date + "/" + identityCard + "/" + file[i].name);

            // Get the download URL
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

            fileArr[1] = event.target.files[0];
        }
    };

    var loadFile3 = function (event) {
        if (event.target.files[0]) {
            var image = document.getElementById('output3');
            image.src = URL.createObjectURL(event.target.files[0]);
            if (fileArr2.length > 0) {
                fileArr2[0] = event.target.files[0];
            } else {
                fileArr2.push(event.target.files[0]);
            }

        }
    };

    var loadFile4 = function (event) {
        if (event.target.files[0]) {
            var image = document.getElementById('output4');
            image.src = URL.createObjectURL(event.target.files[0]);

            fileArr2[1] = event.target.files[0];
        }
    };

    return (
        <Layout name="Car renting form">
            <Grid container>
                <Grid item xs={12} sm={6} >
                    <Card className={classes.card}>
                        <Typography>Tell us a bit about car owner</Typography>
                        <TextField className={classes.textField} label="Full name" id="txtFullName" />
                        <TextField className={classes.textField} label="Mobile number" />
                        <TextField className={classes.textField} label="Email" />
                        <TextField className={classes.textField} label="Identity Card" id="txtIdentityCard" />
                        <div className="mt-20">
                            <p><label>
                                <Button variant="contained" color="primary" component="span" startIcon={<AccountBoxIcon />}>
                                    Upload Image
                        </Button>
                            </label></p>

                            <p>Picture 1</p>
                            <p><input type="file" accept="image/*" name="image" id="file" onChange={loadFile} /></p>
                            <p><img id="output" width="200" height="200" /></p>

                            <p>Picture 2</p>
                            <p><input type="file" accept="image/*" name="image" id="file2" onChange={loadFile2} /></p>
                            <p><img id="output2" width="200" height="200" /></p>


                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Card className={classes.card}>
                        <Typography>Tell us a bit about your car</Typography>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-required-label">Brand</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={brand}
                                    onChange={handleChangeBrand}
                                >
                                    <MenuItem>
                                        <img className={classes.icon} src="https://static.carmudi.vn/wp-content/uploads/2016/04/Honda-Carmudi.jpg" />
                                        <Typography>Honda</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <img className={classes.icon} src="https://static.carmudi.vn/wp-content/uploads/2016/04/Toyota-Carmudi.jpg" />
                                        <Typography>Toyota</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <img className={classes.icon} src="https://static.carmudi.vn/wp-content/uploads/2016/04/Lexus-Carmudi.jpg" />
                                        <Typography>Lexus</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <img className={classes.icon} src="https://static.carmudi.vn/wp-content/uploads/2016/04/Mazda-Carmudi.jpg" />
                                        <Typography>Mazda</Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-required-label">Model</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={model}
                                    onChange={handleChangeModel}
                                    className={classes.selectEmpty}>
                                    <MenuItem>
                                        <em>None</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <TextField className={classes.textField} id="standard-required" label="Car Registration number" />
                        <TextField className={classes.textField} id="standard-required" label="Odometer" />
                        <div className="mt-20">
                            <p><label>
                                <Button variant="contained" color="primary" component="span" startIcon={<DriveEtaIcon />}>
                                    Upload Image
                        </Button>
                            </label></p>
                            <p>Picture 1</p>
                            <p><input type="file" accept="image/*" name="image" id="file3" onChange={loadFile3} /></p>
                            <p><img id="output3" width="200" height="200" /></p>

                            <p>Picture 2</p>
                            <p><input type="file" accept="image/*" name="image" id="file4" onChange={loadFile4} /></p>
                            <p><img id="output4" width="200" height="200" /></p>

                        </div>
                    </Card>
                </Grid>
                <Grid container justify="center" >
                    <Button variant="contained" color="primary" startIcon={<PublishIcon />} onClick={upLoadFile}>
                        Finish
                    </Button>
                </Grid>
            </Grid>
        </Layout>
    )
}