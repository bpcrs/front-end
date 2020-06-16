// import React, { Component, useEffect, useState } from 'react';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Layout from '../../layout';
// import { theme } from '@chakra-ui/core';

// export default function submitLicense() {

//     return (
//         <Layout name="Submit your License/Paper">
//             <div>this is submit submitLicense page</div>

//             <div>

//                 <span>choose image</span>
//                 <input
//                     type="file"
//                     id="upload-button"
//                     style={{ display: "none" }}
//                     // onChange={handleChange}
//                 />
//             </div>
//         </Layout>
//     );
// }

import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Layout from "../../layout";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export default function UploadLicense() {
    const [image, setImage] = useState({ preview: "", raw: "" });

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    const handleUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image.raw);

        await fetch("YOUR_URL", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData
        });
    };

    const StyledTableCell = withStyles((theme) => ({
        // head: {
        //     backgroundColor: theme.palette.common.white,
        //     color: theme.palette.common.white,
        // },
        // body: {
        //     fontSize: 14,

        // },

    }))(TableCell);

    return (
        <Layout>
            <div>
                <label htmlFor="upload-button">
                    {image.preview ? (
                        <img src={image.preview} alt="dummy" width="300" height="300" className="text-center"/>
                    ) : (
                         
                            <h5 className="text-center">Upload your photo</h5>

                        )}
                </label>
                <input
                    type="file"
                    id="upload-button"
                    style={{ display: "none" }}
                    onChange={handleChange}
                />
                <br />
                <button onClick={handleUpload}>Upload</button>
            </div>

            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={12} border={1} >                    
                            <h1 className="text-center">License</h1>                       
                    </Grid>
                   
                </Grid>
            </div>
        </Layout>

    );
}
