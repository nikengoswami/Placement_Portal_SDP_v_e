import { TextField, Button, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SubCard from '../../../ui-component/cards/SubCard';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import UsePost from '../../../Utilities/UsePost'
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import HandleToast from '../../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
const axios = require("axios");

function S_AddInternshipsCard(props) {
    let [studentInternshipStateDetails, setStudentInternshipStateDetails] = useState(props.details);

    // console.log(props.details);

    async function onAddInternship() {
    //   console.log("hello from the add internship")

      let updated_details = studentInternshipStateDetails;
        const res = await UsePost('/StudentAchievementsInternships/createStudentAchievementsInternships', updated_details, 'POST');
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

    async function onUpdateInternship() {

        let updated_details = studentInternshipStateDetails;
        console.log(updated_details)
        // console.log(updated_details)
        const res = await UsePost('/StudentAchievementsInternships/updateStudentAchievementsInternships/' + updated_details.id, updated_details, 'POST');
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

    async function onDeleteInternship() 
    {
        let Resp = await axios({
            method: 'post',
            url: "/StudentAchievementsInternships/deleteStudentAchievementsInternships/" + studentInternshipStateDetails.id,
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
        // console.log(props)
        // props.callerFunc(props.seed, "delete")
        props.onChangeFunc()
    }

    function onButtonClick(event) {
        // required fields validations
        const keys = Object.keys(studentInternshipStateDetails);
        // console.log(keys)
        let count = 0;
        let flag = false;
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            // console.log(studentInternshipStateDetails[key]);
            if (studentInternshipStateDetails[key] == '' || studentInternshipStateDetails[key] == null) {
                // alert("Please fill all fields.")
                // count++;
                flag = true;
                break;
            }
        }
        console.log("Count: ", count)
        // if (count != 0 ) {
        //     toast.error("All fields are required in internships!")
        // } 
        if(flag)
        {
            toast.error("All fields are required in internships!") 
        }
        else {
            if (event == 'add') {
                onAddInternship();
            } else if (event == 'update') {
                onUpdateInternship();
            } else if (event == 'delete') {
                onDeleteInternship();
            }
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

    return (
        <>
            <SubCard>
                <TextField
                    fullWidth
                    // required
                    label="Company Name"
                    id="company_name"
                    helperText="Enter the company name"
                    value={studentInternshipStateDetails.Company_Name}
                    onChange={(e) => {
                        setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Company_Name: e.target.value });
                    }}
                />
                <br />
                <br />

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                // required
                                value={studentInternshipStateDetails.Start_Date}
                                onChange={(e) => {
                                    setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Start_Date: e });
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                // required
                                value={studentInternshipStateDetails.End_Date}
                                onChange={(e) => {
                                    setStudentInternshipStateDetails({ ...studentInternshipStateDetails, End_Date: e });
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Description"
                    id="Description"
                    helperText="Enter the brief decription of internship"
                    multiline
                    rows={5}
                    maxRows={3}
                    value={studentInternshipStateDetails.Description}
                    onChange={(e) => {
                        setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Description: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Company Address"
                    id="company_address"
                    helperText="Enter the company address"
                    multiline
                    rows={5}
                    maxRows={3}
                    value={studentInternshipStateDetails.Company_Address}
                    onChange={(e) => {
                        setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Company_Address: e.target.value });
                    }}
                />
                <br />
                <br/>
                <Grid container xs={12} justifyContent="flex-end">
                    {props.source != 'server'
                    ? 
                    <>
                        <Grid item>
                            <Button
                                onClick={() => onButtonClick('add')}
                                variant="contained"
                                size="medium"
                                component="span"
                            >
                                Add Internship
                                {/* Submit */}
                            </Button>
                        </Grid>
                    </>
                    : 
                    <>
                        <Grid container justifyContent="flex-end" spacing={2}>

                        <Grid item>
                            <Button
                                color="error"
                                variant="contained"
                                // style={{ 'margin-top': '15%' }}
                                size="medium"
                                component="span"
                                onClick={handleOpen}
                            >
                                Delele Internship
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                color="warning"
                                variant="contained"
                                style={{ "color": "white", "background": "#FFC107" }}
                                size="medium"
                                component="span"
                                onClick={() => onButtonClick("update")}
                            // onClick={handleOpen}
                            >
                                Update Internship
                            </Button>

                        </Grid>
                        </Grid>
                    </>
                    }
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography style={{ "color": "#616161" }} id="modal-modal-title" variant="h3" component="h1">
                                Are, you really sure want to delete this internship?
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
            </SubCard>
            <br />
            <ToastContainer/>
        </>
    );
}

export default S_AddInternshipsCard;
