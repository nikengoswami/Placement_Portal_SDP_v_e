import React, { useState, useEffect } from 'react';
import SubCard from '../../../ui-component/cards/SubCard';
import { TextField, Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { withStyles } from '@material-ui/styles';

const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);


function S_InternshipCard(props) {
    let [studentInternshipStateDetails, setStudentInternshipStateDetails] = useState(props.details);

    useEffect(() => {
        // console.log(props);
        setStudentInternshipStateDetails(props.details);
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={4}>
                            <WhiteTextTypography variant="h4">Company: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <WhiteTextTypography variant="h5">
                            {studentInternshipStateDetails.Company_details.Company_name}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={4}>
                            <WhiteTextTypography variant="h4">Project Title: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <WhiteTextTypography variant="h5">
                            {studentInternshipStateDetails.Project_Title}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={4}>
                            <WhiteTextTypography variant="h4">Stipend: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <WhiteTextTypography variant="h5">
                            {studentInternshipStateDetails.Stipend}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={4}>
                            <WhiteTextTypography variant="h4">Internal Guide Name: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <WhiteTextTypography variant="h5">
                            {studentInternshipStateDetails.Internal_Guide_ID}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={4}>
                            <WhiteTextTypography variant="h4">External Guide Name: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <WhiteTextTypography variant="h5">
                            {studentInternshipStateDetails.External_Guide_Name}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={4}>
                            <WhiteTextTypography variant="h4">External Guide Mobile Number: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <WhiteTextTypography variant="h5">
                            {studentInternshipStateDetails.External_Guide_Mobile_Number}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={4}>
                            <WhiteTextTypography variant="h4">External Guide Email ID: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <WhiteTextTypography variant="h5">
                            {studentInternshipStateDetails.External_Guide_Email_ID}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


            {/* <SubCard>
                <TextField value={studentInternshipStateDetails.Company_details.Company_name} disabled fullWidth></TextField>
                <br />
                <br />
                <TextField
                    fullWidth
                    required
                    label="Project Title"
                    id="project_title"
                    helperText="Enter the project title"
                    value={studentInternshipStateDetails.Project_Title}
                    onChange={(e) => {
                        setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Project_Title: e.target.value });
                    }}
                />
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Stipend"
                            id="stipend"
                            helperText="Enter Stipend"
                            value={studentInternshipStateDetails.Stipend}
                            onChange={(e) => {
                                setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Stipend: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Internal Guide Name"
                            id="internal_guide_id"
                            helperText="Enter the internal guide id"
                            value={studentInternshipStateDetails.Internal_Guide_ID}
                            onChange={(e) => {
                                setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Internal_Guide_ID: e.target.value });
                            }}
                        />
                    </Grid>
                </Grid>
                <br />
                <TextField
                    fullWidth
                    required
                    label="External Guide Name"
                    id="external_guide_name"
                    helperText="Enter the external guide name"
                    value={studentInternshipStateDetails.External_Guide_Name}
                    onChange={(e) => {
                        setStudentInternshipStateDetails({ ...studentInternshipStateDetails, External_Guide_Name: e.target.value });
                    }}
                />
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="External Guide Mobile Name"
                            id="external_guide_mobile_number"
                            helperText="Enter the external guide mobile name"
                            value={studentInternshipStateDetails.External_Guide_Mobile_Number}
                            onChange={(e) => {
                                setStudentInternshipStateDetails({
                                    ...studentInternshipStateDetails,
                                    External_Guide_Mobile_Number: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="External Guide Email ID"
                            id="external_guide_email_id"
                            helperText="Enter the external guide email-id"
                            value={studentInternshipStateDetails.External_Guide_Email_ID}
                            onChange={(e) => {
                                setStudentInternshipStateDetails({
                                    ...studentInternshipStateDetails,
                                    External_Guide_Email_ID: e.target.value
                                });
                            }}
                        />
                    </Grid>
                </Grid>
            </SubCard>
            <br /> */}
        </>
    );
}

export default S_InternshipCard;
