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
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import HandleToast from '../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
import domainConfig from '../../Config/domainConfig';
// import structuredClone from '@ungap/structured-clone';

const axios = require("axios")
const Input = styled('input')({
    display: 'none'
});

function CompanyPlacementCard(props) {


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
        const res = await UsePostFile('/studentplacement/addStudentPlacement', updated_details, 'POST');
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
        const res = await UsePostFile('/studentplacement/updateStudentPlacement/' + updated_details.id, updated_details, 'POST');
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
            url: "/studentplacement/deleteStudentPlacement/" + studentPlacementStateDetails.id,
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
                        <TextField value={studentPlacementStateDetails.Company_details.Company_name} disabled fullWidth></TextField>


                    </>
                }


                <br />

                <br />

                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            value={studentPlacementStateDetails.Designation}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Designation: e.target.value });
                            }}
                            fullWidth label="Designation"></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            // onChange={(e) => handleKeyChange(e, "Salary")}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Salary: e.target.value });
                            }}
                            value={studentPlacementStateDetails.Salary}
                            fullWidth label="Salary"></TextField>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid style={{ "padding-top": "1%" }} container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={studentPlacementStateDetails.Company_details === undefined ? 5 : 3} xs={12}>
                        <label htmlFor="contained-button-file">
                            {/* <Input
                                onChange={changeHandler}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <Button variant="outlined" component="span">
                                Upload Job File
                            </Button> */}
                            <Button
                                variant="outlined"
                                size='large'
                                component="label"
                            >
                                Upload Offer Letter<input
                                    onChange={changeHandler}
                                    required
                                    type="file"
                                    hidden
                                />
                            </Button>
                            {/* <b><label id="fileUploadName1"> </label></b> */}
                            <label id={"fileUploadName" + parseInt(props.seed * 10000)}> </label>
                        </label>
                    </Grid>
                    {studentPlacementStateDetails.Company_details === undefined ? "" :
                        <Grid justifyContent={"flex-start"} md={2} style={{ "padding-top": "1%" }} >
                            <a target="_blank" href={

                                process.env.NODE_ENV == "production" ?
                                    // "http://csiddu.tech" + 
                                    domainConfig.domain + 
                                    studentPlacementStateDetails.Offer_Letter
                                    : "http://localhost:8000" + studentPlacementStateDetails.Offer_Letter


                            } style={{ "text-decoration": "none" }}>

                                <Button variant="contained">View File</Button>
                            </a>
                        </Grid>
                    }

                    <Grid item md={2} xs={12}>
                        <Checkbox checked={studentPlacementStateDetails.IsFinal == 1 ? true : false} value={studentPlacementStateDetails.IsFinal}
                            onChange={(e) => handleCheckBox(e)}
                        /> <label>Final</label>
                    </Grid>
                    <Grid container md={5} xs={12} justifyContent="flex-end">
                        {studentPlacementStateDetails.Company_details === undefined ? (
                            <Grid item>
                                <Button
                                    onClick={() => onButtonClick("add")}
                                    variant="contained" style={{ 'margin-top': '15%' }} size="medium" component="span">
                                    {/* Add Placement */}
                                    Add Placement
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
                                        Delele Placement
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
                                        Update Placement
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
                                    Are, you really sure want to delete this placement?
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

export default CompanyPlacementCard;
