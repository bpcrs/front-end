
import React from 'react'
import { FormControl, Button, InputLabel, MenuItem, TextField, Card, Select, Typography, Grid, makeStyles } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import ImageUploading from "react-images-uploading";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Layout from '../../layout';
import Paper from '@material-ui/core/Paper';
import AiOutlineSolution from 'react-icons/ai';
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

// const handleUpload = async e => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", image.raw);

//     await fetch("YOUR_URL", {
//         method: "POST",
//         headers: {
//             "Content-Type": "multipart/form-data"
//         },
//         body: formData
//     });
// };

export default function SubmitLicense(props) {
    // const [brand, setBrand] = React.useState('');
    // const [model, setModel] = React.useState('');
    const maxNumber = 10;
    const maxMbFileSize = 5 * 1024 * 1024; // 5Mb
    // const handleChangeBrand = (event) => {
    //     setBrand(event.target.value);
    // };
    // const handleChangeModel = (event) => {
    //     setModel(event.target.value);
    // };
    const classes = useStyles();
    const onChange = imageList => {
        // data for submit
        console.log(imageList);
    };

    // const disableEvents = true;
    // const disableAfterUploadImage = { 
    //     "onClick-events": disableEvents ? "disable" : "disable" 
    // };
    return (

        <Layout name="License form">
            {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
            <script src="/__/firebase/7.15.1/firebase-app.js"></script>

            {/* <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries --> */}
            <script src="/__/firebase/7.15.1/firebase-analytics.js"></script>

            {/* <!-- Initialize Firebase --> */}
            <script src="/__/firebase/init.js"></script>
            
            <h1 className="text-center">Update your License</h1>
            <Grid container spacing={1} component={Paper}>
                <Typography>Tell us a bit about yourself</Typography>
                <TextField className={classes.textField} label="Full name" />
                <TextField className={classes.textField} label="Mobile number" />
                <TextField className={classes.textField} label="Email" />
                <TextField className={classes.textField} label="Identity Card Number" />

                <Grid item xs={12} lg={6}>
                    <ImageUploading
                        onChange={classes.onChange}
                        maxNumber={maxNumber}
                        multiple
                        maxFileSize={maxMbFileSize}
                        acceptType={["jpg", "gif", "png"]}
                    >
                        {
                            ({ imageList, onImageUpload, onImageRemoveAll }) => (
                                <div>
                                    <Button variant="contained" color="primary"
                                        onClick={onImageUpload} component="span"
                                        startIcon={<AccountBoxIcon />}>
                                        Click here to Upload your front citizen identification
                                                </Button>
                                    {
                                        imageList.map((image) => (
                                            <div key={image.key} className="mt-20" border="1">
                                                <Grid container spacing={1}>
                                                    <Grid item xs={4} sm={4} lg={4}>
                                                        <img src={image.dataURL} className={classes.imageUploading} />
                                                    </Grid>
                                                    <Grid item xs={8} sm={8} lg={8}>
                                                        <Button startIcon={<EditIcon />} onClick={image.onUpdate}>Update</Button>
                                                        <Button startIcon={<DeleteIcon />} onClick={image.onRemove}>Delete</Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                    </ImageUploading>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <ImageUploading
                        onChange={classes.onChange}
                        maxNumber={maxNumber}
                        multiple
                        maxFileSize={maxMbFileSize}
                        acceptType={["jpg", "gif", "png"]}
                    >
                        {
                            ({ imageList, onImageUpload, onImageRemoveAll }) => (
                                <div>
                                    <Button variant="contained" color="primary" onClick={onImageUpload} component="span" startIcon={<AccountBoxIcon />}>
                                        Click here to Upload your backside citizen identification
                                                </Button>
                                    {
                                        imageList.map((image) => (
                                            <div key={image.key} className="mt-20">
                                                <Grid container spacing={1}>
                                                    <Grid item xs={4} sm={4} lg={4}>
                                                        <img src={image.dataURL} className={classes.imageUploading} />
                                                    </Grid>
                                                    <Grid item xs={8} sm={8} lg={8}>
                                                        <Button startIcon={<EditIcon />} onClick={image.onUpdate}>Update</Button>
                                                        <Button startIcon={<DeleteIcon />} onClick={image.onRemove}>Delete</Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                    </ImageUploading>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <ImageUploading
                        onChange={classes.onChange}
                        maxNumber={maxNumber}
                        multiple
                        maxFileSize={maxMbFileSize}
                        acceptType={["jpg", "gif", "png"]}
                    >
                        {
                            ({ imageList, onImageUpload, onImageRemoveAll }) => (
                                <div>
                                    <Button variant="contained" color="primary"
                                        onClick={onImageUpload} component="span"
                                        startIcon={<AccountBoxIcon />}>
                                        Click here to Upload your front citizen identification with your face
                                                </Button>
                                    {
                                        imageList.map((image) => (
                                            <div key={image.key} className="mt-20" border="1">
                                                <Grid container spacing={1}>
                                                    <Grid item xs={4} sm={4} lg={4}>
                                                        <img src={image.dataURL} className={classes.imageUploading} />
                                                    </Grid>
                                                    <Grid item xs={8} sm={8} lg={8}>
                                                        <Button startIcon={<EditIcon />} onClick={image.onUpdate}>Update</Button>
                                                        <Button startIcon={<DeleteIcon />} onClick={image.onRemove}>Delete</Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                    </ImageUploading>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <ImageUploading
                        onChange={classes.onChange}
                        maxNumber={maxNumber}
                        multiple
                        maxFileSize={maxMbFileSize}
                        acceptType={["jpg", "gif", "png"]}
                    >
                        {
                            ({ imageList, onImageUpload, onImageRemoveAll }) => (
                                <div>
                                    <Button variant="contained" color="primary" onClick={onImageUpload} component="span" startIcon={<AccountBoxIcon />}>
                                        Click here to Upload your License
                                                </Button>
                                    {
                                        imageList.map((image) => (
                                            <div key={image.key} className="mt-20">
                                                <Grid container spacing={1}>
                                                    <Grid item xs={4} sm={4} lg={4}>
                                                        <img src={image.dataURL} className={classes.imageUploading} />
                                                    </Grid>
                                                    <Grid item xs={8} sm={8} lg={8}>
                                                        <Button startIcon={<EditIcon />} onClick={image.onUpdate}>Update</Button>
                                                        <Button startIcon={<DeleteIcon />} onClick={image.onRemove}>Delete</Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                    </ImageUploading>
                </Grid>

                <Grid item xs={12} lg={12}>
                    <Button variant="contained" color="secondary">
                        Submit
                </Button>
                </Grid>
            </Grid>

        </Layout>
    )
}
// import React, { useState } from "react";
// import Grid from '@material-ui/core/Grid';
// import Layout from "../../layout";
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import TableCell from '@material-ui/core/TableCell';

// export default function UploadLicense() {
//     const [image, setImage] = useState({ preview: "", raw: "" });

//     const handleChange = e => {
//         if (e.target.files.length) {
//             setImage({
//                 preview: URL.createObjectURL(e.target.files[0]),
//                 raw: e.target.files[0]
//             });
//         }
//     };

//     const handleUpload = async e => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("image", image.raw);

//         await fetch("YOUR_URL", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "multipart/form-data"
//             },
//             body: formData
//         });
//     };

//     const StyledTableCell = withStyles((theme) => ({
//         // head: {
//         //     backgroundColor: theme.palette.common.white,
//         //     color: theme.palette.common.white,
//         // },
//         // body: {
//         //     fontSize: 14,

//         // },

//     }))(TableCell);

//     return (
//         <Layout>
//             <div>
//                 <label htmlFor="upload-button">
//                     {image.preview ? (
//                         <img src={image.preview} alt="dummy" width="300" height="300" className="text-center"/>
//                     ) : (

//                             <h5 className="text-center">Upload your photo</h5>

//                         )}
//                 </label>
//                 <input
//                     type="file"
//                     id="upload-button"
//                     style={{ display: "none" }}
//                     onChange={handleChange}
//                 />
//                 <br />
//                 <button onClick={handleUpload}>Upload</button>
//             </div>

//             <div>
//                 <Grid container spacing={1}>
//                     <Grid item xs={12} lg={12} border={1} >                    
//                             <h1 className="text-center">License</h1>                       
//                     </Grid>

//                 </Grid>
//             </div>
//         </Layout>

//     );
// }
