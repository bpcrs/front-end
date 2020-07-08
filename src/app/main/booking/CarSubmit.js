// import React, { useState } from 'react'
// import { FormControl, Button, InputLabel, MenuItem, TextField, Card, Select, Typography, Grid, makeStyles } from '@material-ui/core';
// import PublishIcon from '@material-ui/icons/Publish';
// import ImageUploading from "react-images-uploading";
// import DriveEtaIcon from '@material-ui/icons/DriveEta';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState, useEffect } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
    Card,
    Grid,
    makeStyles,
    Typography,
    IconButton,
    Icon,
    CardMedia,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import ImageUploading from "react-images-uploading";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Layout from '../../layout';
import firebase from '../submitLicense/firebase';
import { postCarSubmit } from "./booking.action";
import { useDispatch } from "react-redux";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.contrastText,
    },
    media: {
        height: 240,
        width: "50%",
    },
    imageUploading: {
        height: 100,
    },
    icon: {
        height: "100%",
        width: 50,
        marginRight: 10,
    },
    formControl: {
        width: "100%",
        maxHeight: ITEM_HEIGHT * 4.5,
    },
    textField: {
        width: "100%",
        margin: theme.spacing(1),
    },
    card: {
        margin: 20,
        padding: 20,
    },
    button: {

        margin: theme.spacing(1),

    },
}));

export default function CarSubmit(props) {
    const classes = useStyles();

    const maxNumber = 4;
    const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

    const dispatch = useDispatch();
    const [currentCar, setCurrentCar] = useState({});
    var linkImageArr = new Array();
    var [imageCarArr, setImageCarArr] = useState([]);

    const handleInputChange = (event) => {
        setCurrentCar({
            ...currentCar,
            [event.target.name]: event.target.value,
        });

    };

    const [brand, setBrand] = React.useState('');
    const [model, setModel] = React.useState('');

    const handleChangeBrand = (event) => {
        setBrand(event.target.value);
    };
    const handleChangeModel = (event) => {
        setModel(event.target.value)
    };
    // const maxNumber = 10;
    // const maxMbFileSize = 5 * 1024 * 1024; // 5Mb




    var count = 0;

    var storeImageToFireBase = () => {
        if (imageCarArr.length > 0) {
            var metadata = {
                contentType: 'image/jpeg',
            };

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var flag = false;
            var vinCarNumber = document.getElementById("vin").value;

            for (let i = 0; i < imageCarArr.length; i++) {
                var uploadTask = firebase.storage().ref('Car/' + date + "/" + vinCarNumber).child(imageCarArr[i].name).put(imageCarArr[i], metadata);
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

                        if (count == imageCarArr.length) {
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
                    async function () {
                        if (flag) {
                            flag = false;
                            if (count == 0) {
                                console.log("start get link download");
                                await new Promise((resolve, reject) => setTimeout(resolve, 3000));
                                downloadFile(date, vinCarNumber);
                            }
                        }
                    }
                );
            }
        } else {
            console.log("khong co file");
            console.log("length file image: " + imageCarArr.length);
            return;
        }
    };

    var flag2 = false;
    let submitCarInfor = () => {
        console.log("length file image: " + imageCarArr.length);
        //storeImageToFireBase();
        // console.log("lenth link image: " + linkImageArr.length);
        // if (linkImageArr.length > 0) {
        //     submitCar();
        // } else {
        //     console.log("khong co link")
        // }
    };

    const submitCar = () => {
        console.log("Name car : ", currentCar.name);
        // var data = {
        //     autoDriver: true,
        //     available: true,
        //     brandId: 1,

        //     model: "string",
        //     name: "string",

        //     plateNum: "string",
        //     price: 10,
        //     screen: "string",
        //     seat: 10,
        //     sound: "string",
        //     vin: "string"

        // }
        dispatch(postCarSubmit(currentCar, linkImageArr));
    };

    var downloadFile = (date, vinCarNumber) => {
        var storage = firebase.storage();
        var storageRef = storage.ref('Car');
        var count = 0;

        for (let i = 0; i < imageCarArr.length; i++) {

            // Create a reference to the file we want to download       
            var starsRef = storageRef.child(date + "/" + vinCarNumber + "/" + imageCarArr[i].name);

            // Get the download URL
            starsRef.getDownloadURL().then(function (url) {
                // Insert url into an <img> tag to "download"
                console.log("test vi tri: " + (i + 1) + "-" + url);
                linkImageArr.push(url);
                count = count + 1;
                if (count == imageCarArr.length) {
                    count = 0;
                    flag2 = true;
                    if (flag2) {
                        flag2 = false;
                        console.log("length link image: " + linkImageArr.length);
                        submitCar();
                    }
                }
                //setImageList(...imageList, url);
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

    var loadFile = function (event) {
        if (event.target.files[0]) {
            var image = document.getElementById('output');
            image.src = URL.createObjectURL(event.target.files[0]);
            if (imageCarArr.length > 0) {
                imageCarArr[0] = event.target.files[0];
            } else {
                setImageCarArr([...imageCarArr, event.target.files[0]])
            }
        }
    };

    var loadFile2 = function (event) {
        if (event.target.files[0]) {
            var image = document.getElementById('output2');
            image.src = URL.createObjectURL(event.target.files[0]);
            //fileArr.push(event.target.files[0]);
            imageCarArr[1] = event.target.files[0];
            console.log("test file image: " + event.target.files[0].name);
        }
    };

    var loadFile3 = function (event) {
        if (event.target.files[0]) {
            var image = document.getElementById('output3');
            image.src = URL.createObjectURL(event.target.files[0]);
            // fileArr.push(event.target.files[0]);
            imageCarArr[2] = event.target.files[0];
        }
    };

    var loadFile4 = function (event) {
        if (event.target.files[0]) {
            var image = document.getElementById('output4');
            image.src = URL.createObjectURL(event.target.files[0]);
            // fileArr.push(event.target.files[0]);
            imageCarArr[3] = event.target.files[0];
        }
    };
    return (
        <Layout name="Car renting form">
            <Grid container justify="center">
                <Grid item xs={12} sm={6} lg={10}>
                    <Grid spacing={1} container justify="center" alignItems="center">
                        {/* <CardMedia
                            className={classes.media}
                            image="https://blog.mycar.vn/wp-content/uploads/2019/11/Tham-khao-mau-Honda-Civic-mau-trang.jpeg"
                        /> */}
                        <h1>Tell us about your car</h1>
                    </Grid>

                    <Card className={classes.card}>
                    <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-required-label" variant="outlined">Brand</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={brand}
                                    onChange={handleChangeBrand}
                                >
                                    
                                </Select>
                            </FormControl>
                        </div>
                        {/* <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                id="input-with-icon-textfield"
                                label="Brand"
                                name="brandId"
                                className={classes.textField}
                                value={currentCar.brandId}
                                onChange={handleInputChange}
                                variant="outlined"
                            // InputProps={{
                            //     startAdornment: (
                            //         <img
                            //             alt=""
                            //             className={classes.icon}
                            //             src="https://static.carmudi.vn/wp-content/uploads/2016/04/Honda-Carmudi.jpg"
                            //         />
                            //     ),
                            // }}
                            />
                        </Grid> */}

                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-required-label" variant="outlined">Model</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={model}
                                    name="model"
                                    onChange={handleChangeModel}
                                    className={classes.selectEmpty}>
                                    <MenuItem>
                                        <em>None</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                id="input-with-icon-textfield"
                                label="Model"
                                name="model"
                                variant="outlined"
                                value={currentCar.model}
                                onChange={handleInputChange}
                                className={classes.textField}
                            />
                        </Grid> */}

                        <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                className={classes.textField}
                                id="year"
                                name="year"
                                value={currentCar.year}
                                label="Years"
                                variant="outlined"
                                // disabled={editState}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                className={classes.textField}
                                id="name"
                                value={currentCar.name}
                                label="Name"
                                name="name"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                className={classes.textField}
                                id="autoDriver"
                                value={currentCar.autoDriver}
                                label="Auto Drive"
                                name="autoDriver"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                        </Grid>

                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} lg={10}>
                    <Card className={classes.card}>
                        <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                className={classes.textField}
                                id="vin"
                                name="vin"
                                value={currentCar.vin}
                                label="Vin number"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                className={classes.textField}
                                id="seat"
                                name="seat"
                                value={currentCar.seat}
                                label="Seat"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                className={classes.textField}
                                id="sound"
                                name="sound"
                                value={currentCar.sound}
                                label="Sound"
                                variant="outlined"
                                // disabled={editState}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                className={classes.textField}
                                id="screen"
                                name="screen"
                                value={currentCar.screen}
                                label="Screen"
                                variant="outlined"
                                // disabled={editState}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                className={classes.textField}
                                id="price"
                                name="price"
                                value={currentCar.price}
                                label="Price (per day)"
                                variant="outlined"
                                // disabled={editState}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid
                            spacing={1}
                            container
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <TextField
                                className={classes.textField}
                                id="plateNum"
                                name="plateNum"
                                value={currentCar.plateNum}
                                label="Plate number"
                                variant="outlined"
                                // disabled={editState}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <div className="mt-20">
                            <Grid container>
                                <Grid item xs={12} lg={6}>
                                    <div style={{ textAlign: "center" }}>
                                        <p>Picture 1</p>
                                        <p><input type="file" style={{ display: "none" }} accept="image/*" name="image" id="file" onChange={loadFile} /></p>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            <label htmlFor="file">Choose File</label></Button>
                                        <p><img id="output" width="200" height="200" /></p>
                                    </div>

                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <div style={{ textAlign: "center" }}>
                                        <p style={{ textAlign: "center" }}>Picture 2</p>
                                        <p><input type="file" style={{ display: "none" }} accept="image/*" name="image" id="file2" onChange={loadFile2} /></p>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            <label htmlFor="file2">Choose File</label></Button>
                                        <p><img id="output2" width="200" height="200" onChange={handleInputChange} /></p>
                                    </div>
                                </Grid>

                                <Grid item xs={12} lg={6} sm={6}>
                                    <div style={{ textAlign: "center" }}>
                                        <p>Picture 3</p>
                                        <p><input type="file" style={{ display: "none" }} accept="image/*" name="image" id="file3" onChange={loadFile3} /></p>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            <label htmlFor="file3">Choose File</label></Button>
                                        <p><img id="output3" width="200" height="200" /></p>
                                    </div>
                                </Grid>

                                <Grid item xs={12} lg={6} sm={6}>
                                    <div style={{ textAlign: "center" }}>
                                        <p>Picture 4</p>
                                        <p><input type="file" style={{ display: "none" }} accept="image/*" name="image" id="file4" onChange={loadFile4} /></p>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            <label htmlFor="file4">Choose File</label></Button>
                                        <p><img id="output4" width="200" height="200" /></p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                </Grid>
                <Grid container justify="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitCarInfor}
                        startIcon={<PublishIcon />}
                    >
                        Submit
          </Button>
                </Grid>
            </Grid>
            {/* <Grid container>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <Typography>Tell us a bit about car owner</Typography>
                        <TextField className={classes.textField}
                            label="Full name"
                            id="txtFullName"
                            // value={currentCar.price}
                            onChange={handleInputChange} />

                        <TextField className={classes.textField}
                            label="Mobile number"
                            // value={currentCar.seat}
                            onChange={handleInputChange} />

                        <TextField className={classes.textField}
                            label="Email"
                            name="sound"
                            value={currentCar.sound}
                            onChange={handleInputChange} />

                        <TextField className={classes.textField}
                            label="Identity Card"
                            id="txtIdentityCard"
                            value={currentCar.screen}
                            onChange={handleInputChange} />

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
                                <InputLabel id="demo-simple-select-required-label" variant="outlined">Brand</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={brand}
                                    onChange={handleChangeBrand}
                                >
                                    <MenuItem>
                                        <img className={classes.icon} src="https://static.carmudi.vn/wp-content/uploads/2016/04/Honda-Carmudi.jpg" alt="" />
                                        <Typography>Honda</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <img className={classes.icon} src="https://static.carmudi.vn/wp-content/uploads/2016/04/Toyota-Carmudi.jpg" alt="" />
                                        <Typography>Toyota</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <img className={classes.icon} src="https://static.carmudi.vn/wp-content/uploads/2016/04/Lexus-Carmudi.jpg" alt="" />
                                        <Typography>Lexus</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <img className={classes.icon} src="https://static.carmudi.vn/wp-content/uploads/2016/04/Mazda-Carmudi.jpg" alt="" />
                                        <Typography>Mazda</Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-required-label" variant="outlined">Model</InputLabel>
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
                    <Button variant="contained" color="primary" startIcon={<PublishIcon />} onClick={submitCar}>
                        Finish
                    </Button>
                </Grid>
            </Grid> */}
        </Layout>
    )
}