import React, { useState, useEffect } from 'react'

// material-ui
import { Grid, Typography } from '@material-ui/core';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';

import { Button, Chip } from '@material-ui/core'

import { styled } from '@mui/material/styles';

import UsePostFile from '../../../Utilities/UsePostFile'
import HandleToast from '../../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import UseFetch from '../../../Utilities/UseFetch';

import { gridSpacing } from '../../../store/constant';
import CircularProgress from '@mui/material/CircularProgress';
import { Modal } from '@material-ui/core';
import domainConfig from '../../../Config/domainConfig';

const Input = styled('input')({
    display: 'none',
});



export default function UploadPhotoCard({ Student_Photo }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [uploadingData, setuploadingData] = useState(undefined)
    const [data, setData] = useState({
    });
    useEffect(() => { }, [data]);

    const changeHandler1 = (event) => {
        console.log(event.target.files[0])
        const file_data = event.target.files[0]
        const file_name = event.target.files[0]["name"]
        document.getElementById("fileUploadName1").innerText = " " + file_name
        let temp = data
        console.log(document.getElementById('fileUploadName1'));
        temp["Student_Photo_File"] = file_data
        console.log(temp)
        setData(temp)
    };

    async function handleSubmit() {
        handleOpen()
        setuploadingData(true)
        const res = await UsePostFile("/student/uploadPhoto", data, "POST")
        setuploadingData(false)
        // console.log(res);
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        handleClose()
        // console.log(res);
        responsePipelineHandler(params1, 1)
        // END OF POSTING DATA EXAMPLE
    }

    return (

        <MainCard title="Add Your Photo">

            <Modal
                open={open}
                onClose={handleClose}
                style={{ "border": "0px solid white" }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CircularProgress style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    bgcolor: 'background.paper',
                    // boxShadow: 24,
                    border: "0px solid white",
                    p: 4,
                    borderWidth: "0"
                }} color="primary" />
            </Modal>

            <Grid container spacing={gridSpacing}>
                <Grid item>
                    <form enctype="multipart/form-data" id="PhotoForm">
                        <Button
                            variant="outlined"
                            size='large'
                            component="label"
                        >
                            Browse File
                            <input
                                onChange={(e) => changeHandler1(e)}
                                required
                                type="file"
                                accept=".JPG"
                                hidden
                            />
                        </Button>
                        <b><label id="fileUploadName1"> </label></b>
                        <br />
                        <br />
                    </form>
                </Grid>

                <Grid item>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        size="large"
                        color="primary"
                    >
                        Submit
                    </Button>
                </Grid>

                <Grid item>

                    {/* <Chip label={"View Student Photo"} /> */}

                    {Student_Photo === undefined ? "Wait Loading...." : <>
                        {/* {console.log(Student_Photo)} */}
                        {Student_Photo != "image1.png" || Student_Photo != "" ?
                            <a target='blank'
                                style={{ "text-decoration": "none", "cursor": "pointer" }}
                                href={
                                    process.env.NODE_ENV == "production" ?
                                        domainConfig.domain + 
                                        // "http://placement.csiddu.tech" + 
                                        Student_Photo : "http://localhost:8000" + Student_Photo
                                }
                            >
                                <Button variant="contained" size="large" color="primary">
                                    View Photo
                                </Button>
                            </a> :
                            <>
                                <Chip label="No Photo Uploaded!" />
                            </>
                        }

                    </>
                    }

                </Grid>
                {/* {uploadingData === undefined ? "" : uploadingData == true ? <Grid item>
                    <CircularProgress />
                </Grid> : ""} */}


            </Grid>
        </MainCard>
    )
}