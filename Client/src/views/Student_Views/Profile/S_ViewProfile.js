import React from 'react';
import { Button } from '@material-ui/core';
// assets
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
import { makeStyles } from '@material-ui/styles';
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import MainCard from '../../../ui-component/cards/MainCard';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import UseFetch from '../../../Utilities/UseFetch';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { IconInfoCircle, IconX, IconPlus } from '@tabler/icons';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ParseDate, getYear } from '../../../Utilities/ParseDate';
// import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchSection from '../../../layout/MainLayout/Header/SearchSection';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import UsePost from '../../../Utilities/UsePost';
import HandleToast from '../../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import AddComment from '../Comment/S_AddComment';
// import Fetch
import ProfilePhoto from './S_ProfilePhoto';
import SubCard from '../../../ui-component/cards/SubCard';
import ChipCard from '../../../ui-component/cards/GenericCards/ChipCard';
// import ChipInput from 'material-ui-chip-input'
import Modal from '@mui/material/Modal';
import S_AddProject from '../Project/S_AddProject';
import S_PlacementCard from './S_PlacementCard';
import EmptyPlacement from './JSX/EmptyPlacement';
import ViewConfig from '../../../Config/ViewConfig';
import S_InternshipCard from './S_InternshipCard';
import EmptyInternship from './JSX/EmptyInternship';
import domainConfig from '../../../Config/domainConfig';

export default function S_ViewProfile() {
    const useStyles = makeStyles((theme) => ({
        navContainer: {
            width: '100%',
            maxWidth: '330px',
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: '10px',
            [theme.breakpoints.down('sm')]: {
                maxWidth: '300px'
            }
        },
        listAction: {
            top: '22px'
        },
        actionColor: {
            color: theme.palette.grey[500]
        },

        listItem: {
            padding: 0
        },
        sendIcon: {
            marginLeft: '8px',
            marginTop: '-3px'
        },
        listDivider: {
            marginTop: 0,
            marginBottom: 0
        },
        listChipError: {
            color: theme.palette.orange.dark,
            backgroundColor: theme.palette.orange.light,
            height: '24px',
            padding: '0 6px',
            marginRight: '5px'
        },
        listChipWarning: {
            color: theme.palette.warning.dark,
            backgroundColor: theme.palette.warning.light,
            height: '24px',
            padding: '0 6px'
        },
        listChipSuccess: {
            color: theme.palette.success.dark,
            backgroundColor: theme.palette.success.light,
            height: '24px',
            padding: '0 6px'
        },
        listAvatarSuccess: {
            color: theme.palette.success.dark,
            backgroundColor: theme.palette.success.light,
            border: 'none',
            borderColor: theme.palette.success.main
        },
        listAvatarPrimary: {
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.light,
            border: 'none',
            borderColor: theme.palette.primary.main
        },
        listContainer: {
            paddingLeft: '56px'
        },
        uploadCard: {
            backgroundColor: theme.palette.secondary.light
        },
        paddingBottom: {
            paddingBottom: '16px'
        },
        itemAction: {
            cursor: 'pointer',
            padding: '16px',
            '&:hover': {
                background: theme.palette.primary.light
            }
        }
    }));
    const classes = useStyles();
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

    let history = useHistory();

    const { required_data, loading } = UseFetch('/student/getOneStudent/', 'GET');

    const [skill, setSkill] = useState(['C++', 'Python', 'MatLab']);

    let student_details, rows;

    let student_id = '';

    if (!loading) {
        student_details = required_data['data'];
        student_id = student_details['Student_ID'];
        student_details["DOB"] = ParseDate(student_details["DOB"])
        student_details["Enrollment_year"] = getYear(student_details["Enrollment_year"])
        student_details['Passed_out_year'] = getYear(student_details['Passed_out_year'])
        // console.log("Student Id: ", student_id)
        // console.log(student_details)
        rows = [
            createData('Student ID', student_details['Student_ID']),
            createData('FirstName', student_details['FirstName']),
            createData('MiddleName', student_details['MiddleName']),
            createData('LastName', student_details['LastName']),
            createData('Admission type', student_details['Admission_type']),
            createData('Cast category', student_details['Cast_category']),
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
            createData('Enrollment year', student_details['Enrollment_year']),
            createData('Passed out year', student_details['Passed_out_year']),
            createData('Email ID', student_details['Email_ID']),
            createData('Contact No 1', student_details['Contact_No_1']),
            createData('Contact No 2', student_details['Contact_No_2']),
            createData('Address', student_details['Address']),
            createData('City', student_details['City']),
            createData('Pin Code', student_details['Pin_Code']),
            createData('Current semester', student_details['Current_semester']),
            createData('Career Preference', student_details['Career_Preference']),
            // createData("CV Upload", student_details["CV_Upload"]),
            // createData("Student Photo", student_details["Student_Photo"]),
            createData('Branch Id', student_details['Branch_Id'])
        ];
    }

    const [skillDetails, setSkillDetails] = useState(undefined);
    const [skillExist, setSkillExist] = useState(false);

    // const [placementCard, setPlacementCard] = useState([]);
    // const [internshipCard, setInternshipCard] = useState([]);

    const [placementDetails, setPlacementDetails] = useState(undefined);
    const [internshipDetails, setInternshipDetails] = useState(undefined);

    useEffect(async () => {
        let response = undefined;
        response = await fetch('/skillsandachievements/getSkillsAndAchievements/', { method: 'GET' });

        let data = undefined;
        if (response != undefined) {
            data = await response.json();
            if (data != undefined) {
                data = data['data'];
                if (data == 'No Student Skills And Achievements Record found') {
                    // not exist
                    setSkillExist(false);
                    setSkillDetails({
                        Skills: '',
                        Competitive_Coding_Achievements: '',
                        Other_Achievements: '',
                        GRE_Score: '',
                        TOEFL_Score: '',
                        IELTS_Score: '',
                        GATE_Score: ''
                    });
                } else {
                    // exist
                    setSkillDetails(data[0]);
                    setSkillExist(true);

                    
                }
                console.log(data[0]);

                let response1 = undefined
                response1 = await fetch("/studentplacement/getStudentPlacementInStudent/")
                if(response1 != undefined)
                {
                    let placementData = undefined
                    placementData = await response1.json()
                    // let studentPlacementCardCopy = placementCard
                    if(placementData != undefined)
                    {
                        if(placementData["data"] == "Student Placement Record Not Found!")
                        {
                            setPlacementDetails(undefined)
                        }
                        else
                        {
                            setPlacementDetails(placementData["data"])
                        }
                    }
                    // if(placementData != undefined && placementData["data"] != "Student Placement Record Not Found!")
                    // {
                    //     // console.log(placementData["data"])
                    //     for(let i = 0; i < placementData["data"].length; i++)
                    //     {
                    //         console.log(placementData["data"][i])
                    //         studentPlacementCardCopy.unshift(
                    //             <S_PlacementCard details={placementData["data"][i]}/>
                    //         )
                    //     }
                    //     setPlacementCard([].concat(studentPlacementCardCopy))
                    // }
                        // console.log(placementData)

                    let response2 = undefined
                    response2 = await fetch("/studentinternship/getStudentInternshipInStudent/")

                    if(response2 != undefined)
                    {
                        let internshipsData = undefined
                        internshipsData = await response2.json()
                        // let internshipCardCopy = internshipCard
                        console.log(internshipsData["data"])
                        if(internshipsData != undefined)
                        {
                            if(internshipsData["data"] == "Student Internship Record Not Found!")
                            {
                                setInternshipDetails(undefined)
                            }
                            else
                            {
                                setInternshipDetails(internshipsData["data"])
                            }
                        }
                        // if(internshipsData != undefined && internshipsData["data"] != "Student Internship Record Not Found!")
                        // {
                        //     for(let i = 0; i < internshipsData["data"].length; i++)
                        //     {
                        //         console.log(internshipsData["data"][i])
                        //         internshipCardCopy.unshift(
                        //             <S_InternshipCard details={internshipsData["data"][i]}/>
                        //         )
                        //     }
                        //     setInternshipCard([].concat(internshipCardCopy))
                        // }
                    }
                }
            }
        }

        console.log(response);
    }, []);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchData, setSearchData] = useState('');

    async function handleSkillAdd() {
        // if (searchData != "") {
        //     const skillCopy = [].concat(skill)
        //     skillCopy.push(searchData)
        //     setSkill(skillCopy)
        //     console.log(skillCopy)
        //     handleClose()
        // }

        // check whether skills are exist or not

        if (searchData != "") {
            const skill_details_copy = JSON.parse(JSON.stringify(skillDetails));

            if (skill_details_copy["Skills"] == "") {
                skill_details_copy["Skills"] = searchData
                setSkillDetails(skill_details_copy)
                setSkillExist(true)
            }
            else {
                skill_details_copy["Skills"] += ("," + searchData)
                setSkillDetails(skill_details_copy)
            }

            if (skillExist) {

                // update
                const res = await UsePost('/skillsandachievements/updateSkillsAndAchievements/', skill_details_copy, 'POST');
                const params1 = {
                    data: res,
                    HandleToast: {
                        toast: toast,
                        flag: false
                    }
                };
                console.log(res);
                responsePipelineHandler(params1, 1);
            }
            else {
                // create
                const res = await UsePost('/skillsandachievements/addSkillsAndAchievements/', skill_details_copy, 'POST');
                const params1 = {
                    data: res,
                    HandleToast: {
                        toast: toast,
                        flag: false
                    }
                };
                console.log(res);
                responsePipelineHandler(params1, 1);
            }
        }

        handleClose()
    }
    async function handleDelete(idx) {
        // let skillCopy = skill
        // let i;
        // let res = skillCopy.filter((elem) => {
        //     return (idx != elem)
        // })
        // setSkill(res)

        let skillCopy = skillDetails['Skills'].split(',');
        let res1 = skillCopy.filter((elem) => {
            return idx != elem;
        });
        let skills = '';
        for (let i = 0; i < res1.length; i++) {
            skills += res1[i];
            if (i != res1.length - 1) {
                skills += ', ';
            }
        }
        console.log(skills);

        const skill_details_copy = JSON.parse(JSON.stringify(skillDetails));
        skill_details_copy['Skills'] = '' + skills;
        setSkillDetails(skill_details_copy);

        const res = await UsePost('/skillsandachievements/updateSkillsAndAchievements/', skill_details_copy, 'POST');
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false
            }
        };
        console.log(res);
        responsePipelineHandler(params1, 1);
        // console.log(skillDetails)
    }
    return (
        <>
            <MainCard title="Details">
                {loading ? (
                    ''
                ) : (
                    <>
                        <SubCard>
                            <Grid container justifyContent={'flex-start'} spacing={3}>
                                <Grid item md={3} xs={12}>
                                    <ProfilePhoto student_photo={loading ? '' : student_details['Student_Photo']} />
                                </Grid>
                                <Grid md={9} xs={12} item style={{ 'padding-left': '6%' }}>
                                    {/* <h1>SKILLS</h1> */}
                                    <Button onClick={handleOpen} variant="contained" borderRadius="50%">
                                        Add Skill
                                    </Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Grid spacing={2} container justifyContent={'space-between'}>
                                                <Grid item>
                                                    <TextField
                                                        onChange={(e) => {
                                                            setSearchData(e.target.value);
                                                        }}
                                                        value={searchData}
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        size="medium"
                                                        onClick={() => {
                                                            handleSkillAdd();
                                                        }}
                                                        variant="contained"
                                                        startIcon={<IconPlus />}
                                                    >
                                                        Add Skill
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Modal>
                                    <br />
                                    <br />
                                    <Grid direction="row" spacing={1}>
                                        {skillDetails == undefined
                                            ? ''
                                            : skillDetails['Skills'] == "" ? "" : skillDetails['Skills'].split(',').map((elem) => {
                                                return (
                                                    <Chip
                                                        style={{ margin: '1%' }}
                                                        icon={IconInfoCircle}
                                                        variant="outlined"
                                                        color="primary"
                                                        onDelete={() => handleDelete(elem)}
                                                        label={elem}
                                                    />
                                                );
                                            })}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>

                        {/* <SubCard> */}
                        {/* <S_AddProject /> */}
                        {/* </SubCard> */}

                        {/* <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <ProfilePhoto student_photo={loading ? "" : student_details["Student_Photo"]} />
                                        </TableCell>

                                        <TableCell>
                                            <h1>SKILLS</h1>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer> */}

                        <br /><br />
                        {/* <SubCard> */}
                        <TableContainer component={Paper}
                            style={{ width: "100%" }}
                            // md={{minWidth: "50%"}}
                            // sx={{ minWidth: 500 }}
                        >
                            <Table
                                // sx={{ minWidth: 500 }} 
                                aria-label="simple table"
                                width="100%"
                            // style={{ width: "100%" }}
                            >

                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Typography variant="h5">
                                                    {row.key}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow
                                        key="CV_Upload"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h5">
                                                CV Upload
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {student_details === undefined ? "Wait Loading...." : <>
                                                <a target='blank'
                                                    style={{ "text-decoration": "none", "cursor": "pointer" }}
                                                    href={

                                                        process.env.NODE_ENV == "production" ?
                                                            // "http://placement.csiddu.tech" + 
                                                            domainConfig.domain + 
                                                            student_details["CV_Upload"] : "http://localhost:8000" + student_details["CV_Upload"]
                                                    }>

                                                    {student_details === undefined ? "Wait Loading...." : <>
                                                        <Chip
                                                            label={"View CV"}
                                                            // variant="outlined"
                                                            color='primary'
                                                            clickable
                                                        />

                                                    </>
                                                    }

                                                </a>
                                            </>}

                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        key="Student_Photo"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h5">
                                                Student Photo
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {student_details === undefined ? "Wait Loading...." : <>
                                                <a target='blank'
                                                    style={{ "text-decoration": "none", "cursor": "pointer" }}
                                                    href={
                                                        process.env.NODE_ENV == "production" ?
                                                            // "http://placement.csiddu.tech" + 
                                                            domainConfig.domain + 
                                                            student_details["Student_Photo"] : "http://localhost:8000" + student_details["Student_Photo"]


                                                    }>

                                                    {student_details === undefined ? "Wait Loading...." : <>
                                                        <Chip
                                                            label={"View Photo"}
                                                            // variant="outlined"
                                                            color='primary'
                                                            clickable
                                                        />
                                                    </>
                                                    }

                                                </a>
                                            </>}

                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>
                        <br/>
                        <MainCard title={ViewConfig.student.Profile.placements.Header}>
                            {
                                placementDetails == undefined ? 
                                    <>
                                        <ChipCard loading={false} data={<EmptyPlacement />} />
                                    </>
                                : 
                                placementDetails.map((e) => {
                                    return(<>
                                        {/* {e} */}
                                        <ChipCard data={<S_PlacementCard details={e} />} />
                                        <br />
                                    </>)
                                })
                            }                        
                        </MainCard>
                        <br/>
                        <MainCard title={ViewConfig.student.Profile.internships.Header}>
                            {
                                internshipDetails == undefined ? 
                                    <>
                                        <ChipCard loading={false} data={<EmptyInternship />} />
                                </>
                                :
                                internshipDetails.map((e) => {
                                    return(<>
                                        <ChipCard data={<S_InternshipCard details={e} />} />
                                        <br />
                                    </>)
                                })
                            }
                        </MainCard>
                        
                        {/* </SubCard> */}


                        {/* <br />
                        <br /> */}
                        {/* <TableContainer component={Paper}>
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
                                                    <a
                                                        target="blank"
                                                        style={{ 'text-decoration': 'none', cursor: 'pointer' }}
                                                        href={
                                                            'http://localhost:8000' +
                                                            student_details['CV_Upload'].split('.')[1] +
                                                            '.' +
                                                            student_details['CV_Upload'].split('.')[2]
                                                        }
                                                    >
                                                        {student_details === undefined ? (
                                                            'Wait Loading....'
                                                        ) : (
                                                            <>
                                                                <Chip
                                                                    label={'View CV'}
                                                                    // variant="outlined"
                                                                    color="primary"
                                                                    clickable
                                                                />
                                                            </>
                                                        )}
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
                                                    <a
                                                        target="blank"
                                                        style={{ 'text-decoration': 'none', cursor: 'pointer' }}
                                                        href={
                                                            'http://localhost:8000' +
                                                            student_details['Student_Photo'].split('.')[1] +
                                                            '.' +
                                                            student_details['Student_Photo'].split('.')[2]
                                                        }
                                                    >
                                                        {student_details === undefined ? (
                                                            'Wait Loading....'
                                                        ) : (
                                                            <>
                                                                <Chip
                                                                    label={'View Photo'}
                                                                    // variant="outlined"
                                                                    color="primary"
                                                                    clickable
                                                                />
                                                            </>
                                                        )}
                                                    </a>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer> */}

                    </>
                )}
            </MainCard>
        </>
    );
}
