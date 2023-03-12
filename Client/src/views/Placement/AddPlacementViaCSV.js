import React, { useState, useEffect } from 'react'

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

import { Button } from '@material-ui/core'

import { styled } from '@mui/material/styles';

import UsePostFile from '../../Utilities/UsePostFile'
import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
// import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import UseFetch from '../../Utilities/UseFetch';
import CircularProgress from '@mui/material/CircularProgress';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import Modal from '@mui/material/Modal';

const Input = styled('input')({
    display: 'none',
});



export default function AddPlacementViaCSV() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState({
    });
    useEffect(() => { }, [data]);

    const changeHandler = (event) => {
        // console.log(event.target.files[0])
        document.getElementById("fileUploadDetails").innerText = event.target.files[0].name
        const file_data = event.target.files[0]
        console.log(file_data);
        let temp = data
        temp["Student_Placement_Details_File"] = file_data
        setData(temp)
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        bgcolor: 'background.paper',
        // boxShadow: 24,
        p: 4,
        border: "0px solid white"
    };

    async function handleSubmit() {
        handleOpen()
        const res = await UsePostFile("/studentplacement/addStudentPlacementWithCSV", data, "POST")
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        // console.log(res);
        handleClose()
        responsePipelineHandler(params1, 1)
        // END OF POSTING DATA EXAMPLE
    }

    return (
        <MainCard title="Add Student Placement Via CSV">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CircularProgress style={style} color="primary" />
            </Modal>
            <form enctype="multipart/form-data">
                <label htmlFor="contained-button-file">
                    <Input
                        onChange={(e) => changeHandler(e)}
                        required
                        accept=".xlsx, .xls, .csv"
                        id="contained-button-file"
                        multiple type="file"
                    />
                    <Button variant="outlined" component="span">
                        Browse File
                    </Button> <label id="fileUploadDetails" />
                </label>
                <br />
                <br />
                <br />
                <br />
                <Button onClick={handleSubmit} variant="contained" size="large" color="primary">
                    Submit
                </Button>
            </form>
        </MainCard>
    )
}