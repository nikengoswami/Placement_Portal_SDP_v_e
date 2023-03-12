import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import UseFetch from '../../Utilities/UseFetch';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { getYear, ParseDate } from '../../Utilities/ParseDate'
import {
    Avatar,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack
} from '@material-ui/core';
import SubCard from '../../ui-component/cards/SubCard';
import { IconInfoCircle, IconX, IconPlus } from '@tabler/icons';
import ChipCard from '../../ui-component/cards/GenericCards/ChipCard';
import EmptyStudent from './JSX/EmptyStudent';
import EmptySkills from './JSX/EmptySkills';
import EmptyInternships from './JSX/EmptyInternships';
import EmptyProjects from './JSX/EmptyProjects';
import StudentInternshipCard from './JSX/StudentInternshipCard';
import StudentProjectCard from './JSX/StudentProjectCard';
import ViewConfig from '../../Config/ViewConfig';
import domainConfig from '../../Config/domainConfig';

function ViewStudentProfile() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '2%',
        p: 4
    };

    function createData(key, value) {
        if (value == undefined) {
            value = 'Not Defined!';
        }
        return { key, value };
    }

    const student_id = useLocation().pathname.split('/')[3];

    const { required_data, loading } = UseFetch('/student/getOneStudentInAdmin/' + student_id, 'GET');

    let student_details, rows;

    if (!loading) {
        student_details = required_data['data'];
        student_details["DOB"] = ParseDate(student_details["DOB"])
        student_details["Enrollment_year"] = getYear(student_details["Enrollment_year"])
        student_details['Passed_out_year'] = getYear(student_details['Passed_out_year'])
        // console.log(required_data["data"])
        rows = [
            createData('Student ID', student_details['Student_ID']),
            createData('First Name', student_details['FirstName']),
            createData('Middle Name', student_details['MiddleName']),
            createData('Last Name', student_details['LastName']),
            createData('Admission Type', student_details['Admission_type']),
            createData('Cast Category', student_details['Cast_category']),
            createData('Gender', student_details['Gender']),
            createData('DOB', student_details['DOB']),
            createData('SSC Percentage', student_details['SSC_Percentage']),
            createData('SSC Percentile', student_details['SSC_Percentile']),
            createData('SSC Board', student_details['SSC_Board']),
            createData('SSC School', student_details['SSC_School']),
            createData('HSC Percentage', student_details['HSC_Percentage']),
            createData('HSC Percentile', student_details['HSC_Percentile']),
            createData('HSC Board', student_details['HSC_Board']),
            createData('HSC School', student_details['HSC_School']),
            createData('IsD2D', student_details['IsD2D']),
            createData('Diploma Result CPI', student_details['Diploma_Result_CPI']),
            createData('Diploma Result Percentage', student_details['Diploma_Result_Percentage']),
            createData('Diploma College Name', student_details['Diploma_College_Name']),
            createData('Diploma University', student_details['Diploma_University']),
            createData('Sem 1 SPI', student_details['Sem_1_SPI']),
            createData('Sem 2 SPI', student_details['Sem_2_SPI']),
            createData('Sem 3 SPI', student_details['Sem_3_SPI']),
            createData('Sem 4 SPI', student_details['Sem_4_SPI']),
            createData('Sem 5 SPI', student_details['Sem_5_SPI']),
            createData('Sem 6 SPI', student_details['Sem_6_SPI']),
            createData('Sem 7 SPI', student_details['Sem_7_SPI']),
            createData('Sem 8 SPI', student_details['Sem_8_SPI']),
            createData('Current CPI', student_details['Current_CPI']),
            createData('Enrollment Year', student_details['Enrollment_year']),
            createData('Passed Out Year', student_details['Passed_out_year']),
            createData('Email ID', student_details['Email_ID']),
            createData('Contact No 1', student_details['Contact_No_1']),
            createData('Contact No 2', student_details['Contact_No_2']),
            createData('Address', student_details['Address']),
            createData('City', student_details['City']),
            createData('Pin Code', student_details['Pin_Code']),
            createData('Current Semester', student_details['Current_semester']),
            createData('Career Preference', student_details['Career_Preference']),
            // createData("CV Upload", student_details["CV_Upload"]),
            // createData("Student Photo", student_details["Student_Photo"]),
            createData('Branch Id', student_details['Branch_Id'])
        ];
    }

    const [skillDetails, setSkillDetails] = useState(undefined);
    const [studentInternships, setStudentInternships] = useState(undefined);
    const [studentProjects, setStudentProjects] = useState(undefined);
    // fetch skills details
    useEffect(async () => {
        let response = undefined;
        response = await fetch('/skillsandachievements/getSkillsAndAchievementsInAdmin/' + student_id);
        if (response != undefined) {
            let jsonData = undefined;
            jsonData = await response.json();
            // console.log(jsonData)
            if (jsonData != undefined) {
                let data = jsonData['data'];

                console.log(data)

                if (data == "No Student Skills And Achievements Record found") {
                    setSkillDetails(undefined)
                }
                else {

                    setSkillDetails(data[0]);
                }
                // console.log(skillDetails)

                let response1 = undefined
                response1 = await fetch("/StudentAchievementsInternships/getStudentAchievementsInternshipsByStudentIDInAdmin/" + student_id)

                if (response1 != undefined) {
                    let internshipsData = undefined
                    internshipsData = await response1.json()
                    console.log(internshipsData)

                    if (internshipsData != undefined) {
                        let data = internshipsData["data"]
                        console.log(data)
                        if (data == "Student Internship Record Not Found!") {
                            setStudentInternships(undefined)
                        }
                        else {
                            setStudentInternships(data)
                        }

                        let response3 = undefined
                        response3 = await fetch("/studentproject/getOneStudentProjectInAdmin/" + student_id)

                        if (response3 != undefined) {
                            let projectsData = undefined
                            projectsData = await response3.json()
                            // console.log(projectsData)

                            if (projectsData != undefined) {
                                let data = projectsData["data"]
                                console.log(data)
                                if (data == "Student project record not found") {
                                    setStudentProjects(undefined)
                                }
                                else {
                                    setStudentProjects(data)
                                }
                            }
                        }
                    }
                }
            }
        }
    }, []);

    return (
        <>
            <MainCard title={ViewConfig.admin.student.student_profile.header}>
                {loading ? (
                    ''
                ) : (
                    <>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                <Typography variant="h5">{row.key}</Typography>
                                            </TableCell>
                                            <TableCell align="right">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow key="CV_Upload" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h5">CV Upload</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {student_details === undefined ? (
                                                'Wait Loading....'
                                            ) : (
                                                <>
                                                    <a target='blank'
                                                        style={{ "text-decoration": "none", "cursor": "pointer" }}
                                                        href={

                                                            process.env.NODE_ENV == "production" ?
                                                                // "http://csiddu.tech" +
                                                                domainConfig.domain +
                                                                student_details["CV_Upload"] : "http://localhost:8000" + student_details["CV_Upload"]

                                                        }>

                                                        {student_details === undefined ? "Wait Loading...." : <>
                                                            <Chip
                                                                label={ViewConfig.admin.student.student_profile.view_cv}
                                                                // variant="outlined"
                                                                color='primary'
                                                                clickable
                                                            />

                                                        </>
                                                        }

                                                    </a>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="Student_Photo" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h5">Student Photo</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {student_details === undefined ? (
                                                'Wait Loading....'
                                            ) : (
                                                <>
                                                    <a target='blank'
                                                        style={{ "text-decoration": "none", "cursor": "pointer" }}
                                                        href={
                                                            process.env.NODE_ENV == "production" ?
                                                                // "http://csiddu.tech" + 
                                                                
                                                                domainConfig.domain +
                                                                student_details["Student_Photo"] : "http://localhost:8000" + student_details["Student_Photo"]


                                                        }>

                                                        {student_details === undefined ? "Wait Loading...." : <>
                                                            <Chip
                                                                label={ViewConfig.admin.student.student_profile.view_photo}
                                                                // variant="outlined"
                                                                color='primary'
                                                                clickable
                                                            />
                                                        </>
                                                        }

                                                    </a>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br />
                        <MainCard title="Student Skills">
                            <Grid direction="row" spacing={1}>
                                {skillDetails == undefined
                                    ?
                                    <>
                                        <ChipCard loading={false} data={<EmptySkills />} />
                                    </>
                                    : skillDetails['Skills'] == ''
                                        ? ''
                                        : skillDetails['Skills'].split(',').map((elem) => {
                                            return (
                                                <Chip
                                                    style={{ margin: '1%' }}
                                                    icon={IconInfoCircle}
                                                    variant="outlined"
                                                    color="primary"
                                                    //   onDelete={() => handleDelete(elem)}
                                                    label={elem}
                                                />
                                            );
                                        })}
                            </Grid>
                        </MainCard>
                        <br />
                        <MainCard title="Internships">
                            {studentInternships == undefined
                                ?
                                <>
                                    <ChipCard loading={false} data={<EmptyInternships />} />
                                </>
                                :
                                studentInternships.map((e) => {
                                    return (
                                        <>
                                            <ChipCard data={<StudentInternshipCard e={e} />} />

                                            <br />
                                        </>
                                    )
                                })

                            }

                        </MainCard>
                        <br />
                        <MainCard title="Projects">
                            {studentProjects == undefined
                                ?
                                <>
                                    <ChipCard loading={false} data={<EmptyProjects />} />
                                </>
                                :
                                studentProjects.map((e) => {
                                    return (
                                        <>
                                            <ChipCard data={<StudentProjectCard e={e} />} />
                                            {/* <SubCard>
                                            
                                            <Grid container spacing={1}>
                                                <Grid item md={12} xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs = {12} md={2}>
                                                        <Typography variant='h4'>Project Title:  </Typography>
                                                        </Grid>
                                                        <Grid item xs = {12} md={10}>
                                                        <Typography> {e.Project_Title}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                    
                                            </Grid>
                                            <br/>
                                            <Grid container spacing={1}>
                                                <Grid item ms={12} xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item md={2}>
                                                        <Typography variant='h4'>Brief Description:  </Typography>
                                                        </Grid>
                                                        <Grid item md={10}>
                                                        <Typography> {e.	Brief_Description}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <br/>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item md={2}>
                                                        <Typography variant='h4'>Project Link:  </Typography>
                                                        </Grid>
                                                        <Grid item md={10}>
                                                        <Typography> {e.Project_Link}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <br/>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item md={2}>
                                                        <Typography variant='h4'>Technologies:  </Typography>
                                                        </Grid>
                                                        <Grid item md={10}>
                                                        <Typography> {e.Technologies}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </SubCard> */}
                                        </>
                                    )
                                })

                            }

                        </MainCard>
                    </>
                )}
            </MainCard>
        </>
    );
}

export default ViewStudentProfile;
