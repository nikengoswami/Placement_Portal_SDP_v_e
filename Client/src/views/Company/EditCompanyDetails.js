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
import UseFetch from '../../Utilities/UseFetch';
import { useHistory, useLocation } from 'react-router';






function EditCompany() {

    const [data, setData] = useState(undefined)
    const id = useLocation().pathname.split("/")[3]
    useEffect(async () => {
        const response = await fetch("/company/getCompany/" + id, { method: "GET" });
        let data1 = await response.json();
        setData(data1["data"])
        console.log(data)

    }, [])

    // const id = useLocation().pathname.split("/")[3]
    // const { required_data, loading } = UseFetch("/company/getCompany/" + id, "GET")
    // // const { data1, setData1 } = useState()



    // const [data, setData] = useState(required_data)

    // if (!loading) {
    //     console.log(data)
    // }


    async function handleSubmit() {
        const response = await UsePost("/company/updateCompany/" + id, data, "POST")
        console.log(response)
        const params1 = {
            data: response,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        // console.log(res);
        responsePipelineHandler(params1, 1)
        // if(response.)
    }

    return (
        <MainCard title="Edit Company" >
            {data === undefined ? "" :
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
                        Update
                    </Button>

                </form>

            }
        </MainCard>
    );
}

export default EditCompany;
