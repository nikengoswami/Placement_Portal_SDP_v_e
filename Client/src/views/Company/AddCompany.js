import React from 'react';
import { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import {
    Card,
    Box,
    TextField,
    MenuItem,
    FormControl,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    Switch,
    FormGroup,
    Stack,
    Button,
    Checkbox,
    Typography
} from '@material-ui/core';
import SecondaryAction from './../../ui-component/cards/CardSecondaryAction';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UsePost from '../../Utilities/UsePost'
import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';

import CircularProgress from '@mui/material/CircularProgress';

import { Modal } from '@material-ui/core';


function AddCompany() {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [data, setData] = useState({
        Company_name: '',
        Company_address: '',
        Contact_person_1_name: '',
        Contact_person_1_email_ID: '',
        Contact_person_1_designation: '',
        Contact_person_1_Mobile: '',
        Contact_person_2_name: '',
        Contact_person_2_email_ID: '',
        Contact_person_2_designation: '',
        Contact_person_2_Mobile: '',
        Contact_person_3_name: '',
        Contact_person_3_email_ID: '',
        Contact_person_3_designation: '',
        Contact_person_3_Mobile: '',
        Company_web_site: '',
        Remarks: '',
        Company_offer_type: '',
        City: '',
        State: '',
    });
    useEffect(() => { }, [data]);



    const changeHandler = (event) => {
        console.log(event.target.files[0])
        const file_data = event.target.files[0]
        let temp = data
        temp["Job_Description_File"] = file_data
        setData(temp)
    };

    async function handleSubmit() {

        handleOpen()
        const res = await UsePost("/company/addCompany", data, "POST")
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        console.log(res);
        handleClose()
        responsePipelineHandler(params1, 1)
        // END OF POSTING DATA EXAMPLE
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <MainCard title="Add Company" >
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
            <form enctype="multipart/form-data">
                <TextField
                    // required
                    fullWidth
                    label="Company Name"
                    id="fullWidth"
                    value={data['Company_name']}
                    onChange={(e) => {
                        setData({ ...data, Company_name: e.target.value });
                    }}
                />
                <br />
                <br />

                <hr style={{ 'border-top': "2px solid #b8b8b8" }} />
                <br />
                <Typography variant="h5">Person 1 Contact Details</Typography>
                <br />
                <Grid container spacing={2}>
                    <Grid item md={2} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Designation"
                            value={data['Contact_person_1_designation']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_1_designation: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Name"
                            value={data['Contact_person_1_name']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_1_name: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Email ID"
                            value={data['Contact_person_1_email_ID']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_1_email_ID: e.target.value });
                            }}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Phone Number"
                            value={data['Contact_person_1_Mobile']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            }}
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <Typography variant="h5">Person 2 Contact Details</Typography>
                <br />
                <Grid container spacing={2}>
                    <Grid item md={2} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Designation"
                            value={data['Contact_person_2_designation']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_2_designation: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Name"
                            value={data['Contact_person_2_name']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_2_name: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Email ID"
                            value={data['Contact_person_2_email_ID']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_2_email_ID: e.target.value });
                            }}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Phone Number"
                            value={data['Contact_person_2_Mobile']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_2_Mobile: e.target.value });
                            }}
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <Typography variant="h5">Person 3 Contact Details</Typography>
                <br />
                <Grid container spacing={2}>
                    <Grid item md={2} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Designation"
                            value={data['Contact_person_3_designation']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_3_designation: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Name"
                            value={data['Contact_person_3_name']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_3_name: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Email ID"
                            value={data['Contact_person_3_email_ID']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_3_email_ID: e.target.value });
                            }}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Phone Number"
                            value={data['Contact_person_3_Mobile']}
                            onChange={(e) => {
                                setData({ ...data, Contact_person_3_Mobile: e.target.value });
                            }}
                        />
                    </Grid>
                </Grid>

                <br />
                <hr style={{ 'border-top': "2px solid #b8b8b8" }} />
                <br />
                <TextField
                    // required
                    fullWidth
                    label="Company Website"
                    id="fullWidth"
                    value={data['Company_web_site']}
                    onChange={(e) => {
                        setData({ ...data, Company_web_site: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    // required
                    fullWidth
                    label="Roles Offered"
                    id="fullWidth"
                    value={data['Company_offer_type']}
                    onChange={(e) => {
                        setData({ ...data, Company_offer_type: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    // required
                    fullWidth
                    label="Remarks"
                    id="fullWidth"
                    value={data['Remarks']}
                    onChange={(e) => {
                        setData({ ...data, Remarks: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    // required
                    fullWidth
                    label="City"
                    id="fullWidth"
                    value={data['City']}
                    onChange={(e) => {
                        setData({ ...data, City: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    // required
                    fullWidth
                    label="State"
                    id="fullWidth"
                    value={data['State']}
                    onChange={(e) => {
                        setData({ ...data, State: e.target.value });
                    }}
                />

                <br />
                <br />
                <TextField
                    // required
                    fullWidth
                    label="Company Address"
                    id="fullWidth"
                    multiline
                    rows={5}
                    maxRows={4}
                    helperText="Enter Company's Address"
                    value={data['Company_address']}
                    onChange={(e) => {
                        setData({ ...data, Company_address: e.target.value });
                    }}
                />
                <br />
                <br />

                <br />
                <Button onClick={handleSubmit} variant="contained" size="large" color="primary">
                    Add Company
                </Button>

            </form>

        </MainCard>
    );
}

export default AddCompany;
