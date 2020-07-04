import React from 'react'
import { Button, TextField, Card, Typography, Grid, makeStyles } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import ImageUploading from "react-images-uploading";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import Layout from '../../layout';

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
    },


}));

export default function CarEdits(props) {
    // const [brand, setBrand] = React.useState('');
    // const [model, setModel] = React.useState('');
    const maxNumber = 10;
    const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

    const classes = useStyles();
    return (
        <Layout name="Vinfast SA 2.0">
            <Grid container>
                <Grid item xs={12} sm={6} >
                    <Card className={classes.card}>
                        <Typography>Tell us a bit about car owner</Typography>
                        <TextField className={classes.textField} label="Full name" value="Tran Duc Thai" />
                        <TextField className={classes.textField} label="Mobile number" value="0348130639" />
                        <TextField className={classes.textField} label="Email" value="thaitdse62593@fpt.edu.vn" />
                        <TextField className={classes.textField} label="Identity Card" value="272752339" />
                        <div className="mt-20">
                            <ImageUploading
                                onChange={classes.onChange}
                                maxNumber={maxNumber}
                                multiple
                                maxFileSize={maxMbFileSize}
                                acceptType={["jpg", "gif", "png"]}
                            >
                                {
                                    ({ imageList, onImageUpload }) => (
                                        <div>
                                            <Button variant="contained" color="primary" onClick={onImageUpload} component="span" startIcon={<AccountBoxIcon />}>
                                                Upload Image
                                                </Button>
                                            {
                                                imageList.map((image) => (
                                                    <div key={image.key} className="mt-20">
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={9} sm={9} >
                                                                <img alt="" src={image.dataURL} className={classes.imageUploading} />
                                                            </Grid>
                                                            <Grid item xs={3} sm={3} >
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
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Card className={classes.card}>
                        <Typography>Tell us a bit about your car</Typography>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Brand"
                            className={classes.textField}
                            value="Vinfast"
                            disabled
                            InputProps={{
                                startAdornment: (
                                    <img alt="" className={classes.icon} src="https://static.carmudi.vn/wp-content/uploads/2016/04/Honda-Carmudi.jpg" />
                                ),
                            }}
                        />
                        <TextField
                            id="input-with-icon-textfield"
                            label="Model"
                            value="Lux SA 2.0"
                            className={classes.textField}
                            disabled
                        />

                        <TextField className={classes.textField} id="standard-required" value="60B2-02914" label="Car Registration number" />
                        <TextField className={classes.textField} id="standard-required" value="23456" label="Odometer" InputProps={{
                            startAdornment: <InputAdornment position="start">KM</InputAdornment>,
                        }} />
                        <div className="mt-20">
                            <ImageUploading
                                onChange={classes.onChange}
                                maxNumber={maxNumber}
                                multiple
                                maxFileSize={maxMbFileSize}
                                acceptType={["jpg", "gif", "png"]}
                            >
                                {
                                    ({ imageList, onImageUpload }) => (
                                        <div>
                                            <Button variant="contained" color="primary" onClick={onImageUpload} component="span" startIcon={<DriveEtaIcon />}>
                                                Upload Image
                                                </Button>
                                            {
                                                imageList.map((image) => (
                                                    <div key={image.key} className="mt-20">
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={9} sm={9} >
                                                                <img alt="" src={image.dataURL} className={classes.imageUploading} />
                                                            </Grid>
                                                            <Grid item xs={3} sm={3} >
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
                        </div>
                    </Card>
                </Grid>
                <Grid container justify="center" >
                    <Button variant="contained" color="primary" startIcon={<PublishIcon />}>
                        Finish
                    </Button>
                </Grid>
            </Grid>
        </Layout>
    )
}