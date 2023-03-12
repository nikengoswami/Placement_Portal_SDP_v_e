import { Typography, MenuItem, Button, Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import SubCard from '../../ui-component/cards/SubCard';
import { TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import UseFetch from '../../Utilities/UseFetch';
import { Select } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UsePostFile from '../../Utilities/UsePostFile';
import UsePost from "../../Utilities/UsePost"
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import HandleToast from '../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
// import structuredClone from '@ungap/structured-clone';

const axios = require("axios")
const Input = styled('input')({
    display: 'none'
});

function CompanyInternshipCard(props) {


    // let [studentPlacementDetails, setstudentPlacementDetails] = useState({
    //     // Designation: props.details.Designation,
    //     // Salary: props.details.Salary,
    //     // Offer_Letter: props.details.Offer_Letter,
    //     // Passed_out_year: props.details.Passed_out_year,
    //     // IsFinal: props.details.IsFinal,
    //     // Company_Name: props.details.Company_name,
    //     // Company_ID: 1,
    //     Designation: "",
    //     Salary: "",
    //     Offer_Letter: "",
    //     Passed_out_year: "",
    //     IsFinal: "",
    //     Company_Name: "",
    //     Company_ID: 1,
    // });

    let [studentPlacementStateDetails, setstudentPlacementStateDetails] = useState(
        props.details
    );
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);



    async function onAddPlacement() {
        let updated_details = studentPlacementStateDetails;
        const res = await UsePost('/studentinternship/addStudentInternship', updated_details, 'POST');
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false
            }
        };
        console.log(res);
        responsePipelineHandler(params1, 1);
        props.onAddFunc()
    }

    async function onUpdatePlacement() {
        let updated_details = studentPlacementStateDetails;
        // updated_details["Company_details"] = ""
        delete (updated_details.Company_details)
        console.log(updated_details)
        const res = await UsePost('/studentinternship/updateStudentInternship/' + updated_details.id, studentPlacementStateDetails, 'POST');
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false
            }
        };
        console.log(res);
        responsePipelineHandler(params1, 1);
        props.onAddFunc()
    }

    async function onDeletePlacement() {

        let Resp = await axios({
            method: 'post',
            url: "/studentinternship/deleteStudentInternship/" + studentPlacementStateDetails.id,
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
        props.onAddFunc()

    }

    function onButtonClick(event) {

        // Updations Here

        if (event == "add") {
            onAddPlacement()
        }
        else if (event == "update") {
            onUpdatePlacement()
        }
        else if (event == "delete") {
            onDeletePlacement()
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

    const changeHandler = (event) => {
        console.log(props)
        console.log(event.target.files[0]['name']);
        document.getElementById("fileUploadName" + parseInt(props.seed * 10000)).innerText = ' ' + event.target.files[0]['name'];
        console.log(document.getElementById("fileUploadName" + parseInt(props.seed * 10000)))
        const file_data = event.target.files[0];
        let temp = studentPlacementStateDetails;
        temp['Job_Description_File'] = file_data;
        setstudentPlacementStateDetails(temp);
        console.log(studentPlacementStateDetails)

    };



    let companies = [];
    for (let i = 0; i < props.allCompanies.length; i++) {
        var obj = {};
        obj['value'] = props.allCompanies[i]['Company_ID'];
        obj['label'] = props.allCompanies[i]['Company_name'];
        companies.push(obj);
    }

    useEffect(() => {

        console.log(props)
        setstudentPlacementStateDetails(props.details)
    }, [])


    function handleCheckBox(e) {
        const copy = JSON.parse(JSON.stringify(studentPlacementStateDetails))
        if (copy["IsFinal"] == 1) {
            copy["IsFinal"] = 0
        }
        else {
            copy["IsFinal"] = 1
        }
        console.log(e.target, studentPlacementStateDetails)
        setstudentPlacementStateDetails(copy)
    }
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    return (
        <>

            <SubCard>
                {/* <Button onClick={() => {
                    console.log(studentPlacementStateDetails)
                }} >View State</Button> */}

                {studentPlacementStateDetails.Company_details === undefined ? <TextField
                    fullWidth
                    id="companies"
                    onChange={(e) => { setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Company_ID: e.target.value }) }}
                    select
                    label="Select Company"
                >
                    {companies.map((option) => (
                        <MenuItem
                            onSelect={(e) => { console.log(e) }}
                            key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField> :
                    <>
                        <TextField label="company name" value={studentPlacementStateDetails.Company_details.Company_name} disabled fullWidth></TextField>


                    </>
                }


                <br />

                <br />

                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>

                    <Grid item md={12} xs={12}>

                        <TextField
                            fullWidth
                            label="Project Title"
                            id="project_title"
                            value={studentPlacementStateDetails.Project_Title}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Project_Title: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Stipend"
                            value={studentPlacementStateDetails.Stipend}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Stipend: e.target.value });
                            }}
                            fullWidth></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Internal Guide Name"
                            // onChange={(e) => handleKeyChange(e, "Salary")}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Internal_Guide_ID: e.target.value });
                            }}
                            value={studentPlacementStateDetails.Internal_Guide_ID}
                            fullWidth ></TextField>
                    </Grid>

                    <Grid item md={12} xs={12}>

                        <TextField
                            fullWidth
                            // required
                            label="External Guide Name"
                            id="external_guide_name"
                            // helperText="Enter the external guide name"
                            value={studentPlacementStateDetails.External_Guide_Name}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, External_Guide_Name: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="External Guide Mobile Name"
                            id="external_guide_mobile_number"
                            value={studentPlacementStateDetails.External_Guide_Mobile_Number}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, External_Guide_Mobile_Number: e.target.value });
                            }}
                            fullWidth></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="External Guide Email ID"
                            id="external_guide_email_id"
                            // onChange={(e) => handleKeyChange(e, "Salary")}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, External_Guide_Email_ID: e.target.value });
                            }}
                            value={studentPlacementStateDetails.External_Guide_Email_ID}
                            fullWidth ></TextField>
                    </Grid>
                    {/* <Grid md={6} xs={12}>
                        <TextField
                            fullWidth
                            // required
                            label="Stipend"
                            id="stipend"
                            helperText="Enter Stipend"
                            value={studentPlacementStateDetails.Stipend}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Stipend: e.target.value });
                            }}
                        />
                    </Grid> */}

                </Grid>
                <br />
                <br />
                <Grid style={{ "padding-top": "1%" }} container direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>


                    <Grid container md={5} xs={12} justifyContent="flex-end">
                        {studentPlacementStateDetails.Company_details === undefined ? (
                            <Grid item>
                                <Button
                                    onClick={() => onButtonClick("add")}
                                    variant="contained" style={{ 'margin-top': '15%' }} size="medium" component="span">
                                    {/* Add Placement */}
                                    Add Internship
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
                                        Delele Internship
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
                                        Update Internship
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
                                    Are, you really sure want to delete this Internship?
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

export default CompanyInternshipCard;
