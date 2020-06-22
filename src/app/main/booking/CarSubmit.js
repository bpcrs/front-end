import React from 'react'
import { FormControl, Button, InputLabel, MenuItem, TextField, Card, Select, Typography, Grid, makeStyles } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import ImageUploading from "react-images-uploading";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Layout from '../../layout';

const ITEM_HEIGHT = 48;
const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.contrastText
    },
    container: {
        padding: theme.spacing(1)
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
        maxHeight: ITEM_HEIGHT * 5.5,
        marginTop: theme.spacing(3)
    },
    textField: {
        width: '100%',
        marginTop: theme.spacing(2)
    },
    card: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    button: {
        marginLeft: theme.spacing(7),
        padding: theme.spacing(2)
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
    return (
        <Layout name="Car renting form">
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <Typography>Tell us a bit about you</Typography>
                        <TextField className={classes.textField} label="Full name" variant="outlined" />
                        <TextField className={classes.textField} label="Mobile number" variant="outlined" />
                        <TextField className={classes.textField} label="Email" variant="outlined" />
                        <TextField className={classes.textField} label="Identity Card" variant="outlined" />
                        <Grid container justify="center" className={classes.textField}>
                            <ImageUploading
                                onChange={onChange}
                                maxNumber={maxNumber}
                                multiple
                                maxFileSize={maxMbFileSize}
                                acceptType={["jpg", "gif", "png"]}
                            >
                                {
                                    ({ imageList, onImageUpload, onImageRemoveAll }) => (
                                        <div>
                                            <Button variant="contained" color="primary" onClick={onImageUpload} component="span" startIcon={<AccountBoxIcon />}>
                                                Upload Image
                                                </Button>
                                            {
                                                imageList.map((image) => (
                                                    <div key={image.key} className="mt-20">
                                                        <Grid container spacing={1}>
                                                            <Grid item lg={10} xs={9} sm={9}>
                                                                <img src={image.dataURL} className={classes.imageUploading} alt="" />
                                                            </Grid>
                                                            <Grid item lg={2} xs={3} sm={3}>
                                                                <Button startIcon={<EditIcon />} onClick={image.onUpdate}></Button>
                                                                <Button startIcon={<DeleteIcon />} onClick={image.onRemove}></Button>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )}
                            </ImageUploading>
                        </Grid>
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
                        <TextField className={classes.textField} id="standard-required" label="Car Registration number" variant="outlined" />
                        <TextField className={classes.textField} id="standard-required" label="Odometer" variant="outlined" />
                        <Grid container justify="center" className={classes.textField}>
                            <ImageUploading
                                onChange={onChange}
                                maxNumber={maxNumber}
                                multiple
                                maxFileSize={maxMbFileSize}
                                acceptType={["jpg", "gif", "png"]}
                            >
                                {
                                    ({ imageList, onImageUpload, onImageRemoveAll }) => (
                                        <div>
                                            <Button variant="contained" color="primary" onClick={onImageUpload} component="span" startIcon={<DriveEtaIcon />}>
                                                Upload Image
                                            </Button>
                                            {
                                                imageList.map((image) => (
                                                    <div key={image.key} className="mt-20">
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={9} sm={9} >
                                                                <img src={image.dataURL} className={classes.imageUploading} alt="" />
                                                            </Grid>
                                                            <Grid item xs={3} sm={3} >
                                                                <Button startIcon={<EditIcon />} onClick={image.onUpdate}></Button>
                                                                <Button startIcon={<DeleteIcon />} onClick={image.onRemove}></Button>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )}
                            </ImageUploading>
                        </Grid>
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