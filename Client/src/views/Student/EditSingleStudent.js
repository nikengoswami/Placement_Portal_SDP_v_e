import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField, Button } from '@mui/material';
import { Grid } from '@material-ui/core';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { makeStyles } from '@material-ui/styles';
import { useHistory, useLocation } from 'react-router';
import UsePost from '../../Utilities/UsePost'
import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import ViewConfig from '../../Config/ViewConfig';
import MenuItem from '@mui/material/MenuItem';
const useStyles = makeStyles({
    helperTextColor: {
        color: 'red'
    }
});

function EditSingleStudent() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();

    const student_id = useLocation().pathname.split('/')[3];
    // console.log(student_id)

    const [studentDetails, setStudentDetails] = useState(undefined);

    useEffect(async () => {
        const response = await fetch('/student/getOneStudentInAdmin/' + student_id, { method: 'GET' });
        let data1 = await response.json();
        setStudentDetails(data1['data']);
        console.log(studentDetails);
    }, []);

    const history = useHistory();

    async function handleSubmit() {
        handleOpen()
        const response = await UsePost("/student/updateOneStudent/" + student_id, studentDetails, "POST")
        console.log(response)
        const params1 = {
            data: response,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        // console.log(res);
        handleClose()
        responsePipelineHandler(params1, 1)
        // if(response.)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <MainCard title={ViewConfig.admin.student.edit_student.header}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <CircularProgress style={style} color="primary" />
                </Modal>
                {studentDetails == undefined ? (
                    ''
                ) : (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="First Name"
                                    helperText="Enter the first name"
                                    value={studentDetails['FirstName']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, FirstName: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Middle Name"
                                    helperText="Enter the middle name"
                                    value={studentDetails['MiddleName']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, MiddleName: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Last Name"
                                    helperText="Enter the last name"
                                    value={studentDetails['LastName']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, LastName: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    // inputProps={{ className: classes.helperTextColor }}
                                    fullWidth
                                    label="Student ID"
                                    helperText="Enter the Student ID"
                                    value={studentDetails['Student_ID']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Student_ID: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Admission Type"
                                    helperText="Enter the admission type"
                                    value={studentDetails['Admission_type']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Admission_type: e.target.value });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Date of Birth"
                                        // required
                                        value={studentDetails['DOB']}
                                        onChange={(e) => {
                                            setStudentDetails({ ...studentDetails, DOB: e });
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={'Enter the date of birth'} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    // required
                                    id="select"
                                    fullWidth
                                    label="Gender"
                                    helperText="Enter the gender"
                                    value={studentDetails['Gender']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Gender: e.target.value });
                                    }}
                                    select
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Cast Category"
                                    helperText="Enter the cast category"
                                    value={studentDetails['Cast_category']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Cast_category: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <hr style={{ 'border-top': '2px solid #b8b8b8' }} />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="SSC Percentage"
                                    helperText="Enter the SSC percentage"
                                    type="number"
                                    value={studentDetails['SSC_Percentage']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, SSC_Percentage: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="SSC Percentile"
                                    helperText="Enter the SSC percentile"
                                    type="number"
                                    value={studentDetails['SSC_Percentile']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, SSC_Percentile: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="SSC Board"
                                    helperText="Enter the SSC board"
                                    value={studentDetails['SSC_Board']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, SSC_Board: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <TextField
                            // required
                            fullWidth
                            label="SSC School"
                            helperText="Enter the SSC school"
                            value={studentDetails['SSC_School']}
                            onChange={(e) => {
                                setStudentDetails({ ...studentDetails, SSC_School: e.target.value });
                            }}
                        />
                        <br />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="HSC Percentage"
                                    helperText="Enter the HSC percentage"
                                    type="number"
                                    value={studentDetails['HSC_Percentage']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, HSC_Percentage: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="HSC percentile"
                                    helperText="Enter the HSC percentile"
                                    type="number"
                                    value={studentDetails['HSC_Percentile']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, HSC_Percentile: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="HSC_Board"
                                    helperText="Enter the HSC board"
                                    value={studentDetails['HSC_Board']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, HSC_Board: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <TextField
                            // required
                            fullWidth
                            label="HSC School"
                            helperText="Enter the HSC school"
                            value={studentDetails['HSC_School']}
                            onChange={(e) => {
                                setStudentDetails({ ...studentDetails, HSC_School: e.target.value });
                            }}
                        />
                        <br />
                        <br />
                        <hr style={{ 'border-top': '2px solid #b8b8b8' }} />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item md={3} xs={6}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Sem - 1 SPI"
                                    helperText="Enter the Semester 1 SPI"
                                    type="number"
                                    value={studentDetails['Sem_1_SPI']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Sem_1_SPI: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Sem - 2 SPI"
                                    helperText="Enter the Semester 2 SPI"
                                    type="number"
                                    value={studentDetails['Sem_2_SPI']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Sem_2_SPI: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Sem - 3 SPI"
                                    helperText="Enter the Semester 3 SPI"
                                    type="number"
                                    value={studentDetails['Sem_3_SPI']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Sem_3_SPI: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Sem - 4 SPI"
                                    helperText="Enter the Semester 4 SPI"
                                    type="number"
                                    value={studentDetails['Sem_4_SPI']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Sem_4_SPI: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item md={3} xs={6}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Sem - 5 SPI"
                                    helperText="Enter the Semester 5 SPI"
                                    type="number"
                                    value={studentDetails['Sem_5_SPI']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Sem_5_SPI: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Sem - 6 SPI"
                                    helperText="Enter the Semester 6 SPI"
                                    type="number"
                                    value={studentDetails['Sem_6_SPI']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Sem_6_SPI: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Sem - 7 SPI"
                                    helperText="Enter the Semester 7 SPI"
                                    type="number"
                                    value={studentDetails['Sem_7_SPI']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Sem_7_SPI: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Sem - 8 SPI"
                                    helperText="Enter the Semester 8 SPI"
                                    type="number"
                                    value={studentDetails['Sem_8_SPI']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Sem_8_SPI: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Current CPI"
                                    helperText="Enter the current CPI"
                                    type="number"
                                    value={studentDetails['Current_CPI']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Current_CPI: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['year']}
                                        label="Enrollment Year"
                                        // required
                                        value={studentDetails['Enrollment_year']}
                                        onChange={(e) => {
                                            setStudentDetails({ ...studentDetails, Enrollment_year: e });
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={'Enter the enrollment year'} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['year']}
                                        label="Passed Out Year"
                                        fullwidth
                                        // required
                                        value={studentDetails['Passed_out_year']}
                                        onChange={(e) => {
                                            setStudentDetails({ ...studentDetails, Passed_out_year: e });
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={'Enter the passed out year'} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <hr style={{ 'border-top': '2px solid #b8b8b8' }} />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Email ID"
                                    helperText="Enter the email-id"
                                    value={studentDetails['Email_ID']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Email_ID: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Contact Number - 1"
                                    helperText="Enter the contact number - 1"
                                    value={studentDetails['Contact_No_1']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Contact_No_1: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Contact Number - 1"
                                    helperText="Enter the contact number - 2"
                                    value={studentDetails['Contact_No_2']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Contact_No_2: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <TextField
                            fullWidth
                            // required
                            label="Address"
                            id="fullWidth"
                            multiline
                            rows={5}
                            maxRows={4}
                            helperText="Enter the address"
                            value={studentDetails['Address']}
                            onChange={(e) => {
                                setStudentDetails({ ...studentDetails, Address: e.target.value });
                            }}
                        />
                        <br />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="City"
                                    helperText="Enter the city"
                                    value={studentDetails['City']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, City: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Pincode"
                                    helperText="Enter the pincode"
                                    type="number"
                                    value={studentDetails['Pin_Code']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Pin_Code: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Current Semester"
                                    helperText="Enter the current semester"
                                    type="number"
                                    value={studentDetails['Current_semester']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Current_semester: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    // required
                                    id="select"
                                    fullWidth
                                    label="Career Preference"
                                    helperText="Enter the career preference"
                                    value={studentDetails['Career_Preference']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Career_Preference: e.target.value });
                                    }}
                                    select
                                >
                                    <MenuItem value="Placement">Placement</MenuItem>
                                    <MenuItem value="Higher Study">Higher Study</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Branch"
                                    helperText="Enter the branch"
                                    value={studentDetails['Branch_Id']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Branch_Id: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <hr style={{ 'border-top': '2px solid #b8b8b8' }} />
                        <br />
                        <Grid container spacing={2}>
                            <Grid item md={4} xs={12}>
                                <TextField
                                    // required
                                    id="select"
                                    fullWidth
                                    label="Is D2D Student"
                                    helperText="Enter the 'TRUE' if D2D student otherwise 'FALSE'"
                                    value={studentDetails['IsD2D']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, IsD2D: e.target.value });
                                    }}
                                    select
                                >
                                    <MenuItem value="TRUE">TRUE</MenuItem>
                                    <MenuItem value="FALSE">FALSE</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Diploma Result CPI"
                                    helperText="Enter the diploma result CPI"
                                    type="number"
                                    value={studentDetails['Diploma_Result_CPI']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Diploma_Result_CPI: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <TextField
                                    // required
                                    fullWidth
                                    label="Diploma Result Percentage"
                                    helperText="Enter the diploma result percentage"
                                    type="number"
                                    value={studentDetails['Diploma_Result_Percentage']}
                                    onChange={(e) => {
                                        setStudentDetails({ ...studentDetails, Diploma_Result_Percentage: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <TextField
                            // required
                            fullWidth
                            label="Diploma College Name"
                            helperText="Enter the diploma college name"
                            value={studentDetails['Diploma_College_Name']}
                            onChange={(e) => {
                                setStudentDetails({ ...studentDetails, Diploma_College_Name: e.target.value });
                            }}
                        />
                        <br />
                        <br />
                        <TextField
                            // required
                            fullWidth
                            label="Diploma University"
                            helperText="Enter the diploma university"
                            value={studentDetails['Diploma_University']}
                            onChange={(e) => {
                                setStudentDetails({ ...studentDetails, Diploma_University: e.target.value });
                            }}
                        />
                        <br />
                        <br />
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={2}>
                                <Button
                                    fullwidth
                                    onClick={handleSubmit}
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                >
                                    {ViewConfig.admin.student.edit_student.update}
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button
                                    fullwidth
                                    onClick={() => {
                                        history.push('/placement/add_placement/' + studentDetails["Student_ID"]);
                                    }}
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                >
                                    {ViewConfig.admin.student.edit_student.update_placement}
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button
                                    onClick={() => {


                                        history.push('/internship/add_internship/' + studentDetails["Student_ID"]);

                                    }}
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                >
                                    {ViewConfig.admin.student.edit_student.update_internship}
                                </Button>
                            </Grid>
                        </Grid>

                    </>
                )}
            </MainCard>
        </>
    );
}

export default EditSingleStudent;
