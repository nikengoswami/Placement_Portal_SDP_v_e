import { Typography, MenuItem, Button, Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import SubCard from '../../../ui-component/cards/SubCard';
import { TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import UseFetch from '../../../Utilities/UseFetch';
import { Select } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UsePostFile from '../../../Utilities/UsePostFile';
import UsePost from '../../../Utilities/UsePost';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import HandleToast from '../../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
const axios = require("axios")
const Input = styled('input')({
    display: 'none'
});

function S_ProjectCard(props) {


    let [studentProjectDetails, setstudentProjectDetails] = useState({
        Project_Title: null,
        Brief_Description: null,
        Project_Link: null,
        Technologies: null
    });

    let [studentProjectStateDetails, setstudentProjectStateDetails] = useState(
        props.details
    );



    async function onAddProject() {
        let updated_details = studentProjectStateDetails;
        console.log(updated_details)
        const res = await UsePost('/studentproject/createStudentProject', updated_details, 'POST');
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false
            }
        };
        console.log(res);
        responsePipelineHandler(params1, 1);
        props.onChangeFunc()
    }

    async function onUpdateProject() {
        let updated_details = studentProjectStateDetails;
        console.log(updated_details.Project_ID)
        console.log(updated_details)
        const res = await UsePost('/studentproject/updateStudentProject/' + updated_details.Project_ID, updated_details, 'POST');
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false
            }
        };
        console.log(res);
        responsePipelineHandler(params1, 1);
        props.onChangeFunc()
    }

    async function onDeleteProject() {

        let Resp = await axios({
            method: 'post',
            url: "/studentproject/deleteStudentProject/" + studentProjectStateDetails.Project_ID,
        });

        console.log(Resp)
        const params1 = {
            data: Resp.data,
            HandleToast: {
                toast: toast,
                flag: false
            }
        };
        responsePipelineHandler(params1, 1);
        handleClose()
        console.log(props)
        // props.callerFunc(props.seed, "delete")
        props.onChangeFunc()

    }

    function onButtonClick(event) {
        // required fields validations
        const keys = Object.keys(studentProjectStateDetails);
        // console.log(keys)
        let count = 0;
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            console.log(studentProjectStateDetails[key]);
            if (studentProjectStateDetails[key] == null) {
                // alert("Please fill all fields.")
                count++;
            }
        }
        // console.log("Count: ", count)
        if (count != 0) {
            toast.error("To add project all fields are required")
        }

        // Updations Here

        if (event == "add") {
            onAddProject()
        }
        else if (event == "update") {
            onUpdateProject()
        }
        else if (event == "delete") {
            onDeleteProject()
        }
    }





    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {

        console.log(props)
        setstudentProjectStateDetails(props.details)
    }, [])

    return (
        <>

            <SubCard>
                {/* <Button onClick={() => {
                    console.log(studentProjectStateDetails)
                }} >View State</Button> */}

                <TextField
                    fullWidth
                    value={(studentProjectStateDetails.Project_Title)}
                    id="title"
                    onChange={(e) => { setstudentProjectStateDetails({ ...studentProjectStateDetails, Project_Title: e.target.value }) }}
                    label="Enter Project Title"
                >
                </TextField>


                <br />
                <br />

                <TextField
                    value={studentProjectStateDetails.Brief_Description}
                    onChange={(e) => {
                        setstudentProjectStateDetails({ ...studentProjectStateDetails, Brief_Description: e.target.value });
                    }}
                    fullWidth
                    multiline
                    rows={5}
                    maxRows={4}
                    label="Enter Project Description"
                >

                </TextField>
                <br /><br />
                <TextField
                    onChange={(e) => {
                        setstudentProjectStateDetails({ ...studentProjectStateDetails, Project_Link: e.target.value });
                    }}
                    value={studentProjectStateDetails.Project_Link}
                    fullWidth
                    label="Enter Project Link"></TextField>
                <br /><br />
                <TextField
                    onChange={(e) => {
                        setstudentProjectStateDetails({ ...studentProjectStateDetails, Technologies: e.target.value });
                    }}
                    value={studentProjectStateDetails.Technologies}
                    fullWidth
                    label="Enter Technologies used in Project (comma separated)"></TextField>
                <br />
                <br />
                <Grid style={{ "padding-top": "1%" }} container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>

                    <Grid container md={12} xs={12} justifyContent="flex-end">
                        { props.source != "server" ? (
                            <Grid item>
                                <Button
                                    onClick={() => onButtonClick("add")}
                                    variant="contained" style={{ 'margin-top': '15%' }} size="medium" component="span">
                                    Add Project
                                    {/* Submit */}
                                </Button>
                            </Grid>
                        ) : (
                            <Grid container justifyContent="flex-end" spacing={2}>

                                <Grid item>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        style={{ 'margin-top': '15%' }}
                                        size="medium"
                                        component="span"
                                        onClick={handleOpen}
                                    >
                                        Delele Project
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="warning"
                                        variant="contained"
                                        style={{ 'margin-top': '15%', "color": "white", "background": "#FFC107" }}
                                        size="medium"
                                        component="span"
                                        onClick={() => onButtonClick("update")}
                                    // onClick={handleOpen}
                                    >
                                        Update Project
                                    </Button>

                                </Grid>
                            </Grid>
                        )}

                        {/* <Button onClick={handleOpen}>Open modal</Button> */}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography style={{ "color": "#616161" }} id="modal-modal-title" variant="h3" component="h1">
                                    Are, you really sure want to delete this project?
                                </Typography><br />
                                <Grid container spacing={2} justifyContent={""}>
                                    <Grid md={6} item>
                                        <Button fullWidth style={{ color: "white", backgroundColor: "#00C853" }} variant="contained"
                                            onClick={() => onButtonClick("delete")}
                                        >
                                            Confirm
                                        </Button>
                                    </Grid>
                                    <Grid md={6} item>
                                        <Button fullWidth color='error' variant="contained" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Modal>

                    </Grid>
                </Grid>
            </SubCard>
            <br />
        </>
    );
}

export default S_ProjectCard;
