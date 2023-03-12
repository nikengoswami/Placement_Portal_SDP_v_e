import React from 'react'
import { Button } from '@material-ui/core';
import { red } from '@mui/material/colors';
// assets
import {
    // Avatar,

    // Card,
    // CardContent,
    Chip,
    // Divider,
    Grid,
    // List,
    // ListItem,
    // ListItemAvatar,
    // ListItemSecondaryAction,
    // ListItemText,
    // Stack,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import MainCard from '../../ui-component/cards/MainCard'
// import { useState, useEffect } from 'react';
import { Typography } from '@mui/material'
import UseFetch from '../../Utilities/UseFetch';
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ParseDate from '../../Utilities/ParseDate';
// import SearchSection from '../../layout/MainLayout/Header/SearchSection';
// import TextField from '@mui/material/TextField';
import { useHistory } from "react-router-dom";
// import UsePost from '../../Utilities/UsePost'
// import HandleToast from '../../Utilities/HandleToast'
// import { ToastContainer, toast } from 'react-toastify';
// import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import AddComment from '../Comment/AddComment';
import HandleNull from '../../Utilities/HandleNull';
import domainConfig from '../../Config/domainConfig';

function ViewSingleAnnoucement() {

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

    function createData(key, value) {
        if (value == undefined) {
            value = "Not Defined!"
        }
        return { key, value };
    }

    let history = useHistory();

    function handleEdit(id) {
        console.log(id);
        history.push('/announcement/edit_announcement/' + id)
    }

    function handleSubscribedStudents(id) {
        console.log(id);
        history.push('/announcement/view_subscribed_announcement/' + id)
    }

    const location = useLocation().pathname;
    const id = location.split("/")[3]

    const { required_data, loading } = UseFetch("/annoucement/getAnnoucement/" + id, "GET")

    let announcement_details = undefined, rows;
    if (!loading) {

        announcement_details = required_data["data"][0];
        console.log(required_data["data"][0])
        let branches = ""
        announcement_details["Eligible_Branches"].map((e) => {
            branches += (" " + e["BranchName"])
        })
        rows = [
            // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData("Date of Announcement", ParseDate.ParseDate(announcement_details["Date_of_announcement"])),
            createData("Date of Visit", HandleNull(ParseDate.ParseDate(announcement_details["Date_of_Visit"]))),
            createData("Registration Deadline", HandleNull(ParseDate.ParseDate(announcement_details["Registration_Deadline"]), true)),
            createData("Eligible Branches", branches),
            createData("Passed out year", HandleNull(ParseDate.getYear(announcement_details["Passed_out_year"]))),
            createData("Job Role", HandleNull(announcement_details["Job_Role"])),
            createData("Salary", HandleNull(announcement_details["Salary"])),
            createData("Job Location", HandleNull(announcement_details["Job_Location"])),
            createData("Bond Details", HandleNull(announcement_details["Bond_Details"])),
            createData("Other Details", HandleNull(announcement_details["Other_Details"])),
            createData("Eligibility", HandleNull(announcement_details["Eligibility"])),
        ];
    }

    // const name = new URLSearchParams(search).get('id');

    // const [commentData, setcommentData] = useState({
    //     Comment_text: ''
    // })
    // useEffect(() => { }, [commentData]);

    // async function handleComment(id) {
    //     // console.log("clicked " + id);
    //     const res = await UsePost("/annoucement/addComment/" + id, commentData, "POST")
    //     const params1 = {
    //         data: res,
    //         HandleToast: {
    //             toast: toast,
    //             flag: false,
    //         }
    //     }
    //     console.log(res);
    //     responsePipelineHandler(params1, 1)
    // }


    return (
        <>
            <MainCard title={loading ? "Announcement" : announcement_details["Company_Details"]["Company_name"] + " - " + announcement_details["Job_Role"] + " For " + new Date(announcement_details["Passed_out_year"]).getFullYear() + " Batch"}>

                {loading ? (
                    ''
                ) : (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={3}>
                                <Button onClick={() => handleEdit(announcement_details["Announcement_ID"])} variant="contained" size="large" color="primary">
                                    Edit Announcement
                                </Button>

                            </Grid>
                            <Grid item xs={6} md={9}>

                                <Button onClick={() => handleSubscribedStudents(announcement_details["Announcement_ID"])} variant="contained" size="large" style={{ "backgroundColor": red["A400"] }}>
                                    See Applied Students
                                </Button>
                            </Grid>


                        </Grid>
                        <br />
                        <br />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                {/* <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                            </TableRow>
                            </TableHead> */}
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
                                        key="Job_Description_File"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h5">
                                                Job description file
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {announcement_details === undefined ? "Wait Loading...." : <>
                                                <a target='blank'
                                                    style={{ "text-decoration": "none", "cursor": "pointer" }}
                                                    href={
                                                        process.env.NODE_ENV == "production" ?
                                                            // "http://csiddu.tech" + 
                                                            domainConfig.domain + 
                                                            
                                                            announcement_details["Job_Description_File"]
                                                            : "http://localhost:8000" + announcement_details["Job_Description_File"]
                                                    }>

                                                    {announcement_details === undefined ? "Wait Loading...." : <>
                                                        <Chip
                                                            label={"View Job Description File"}
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
                    </>
                )}

            </MainCard>
            <br />
            {announcement_details === undefined ? "" : <AddComment id={id} />}
            {/* <MainCard title="See Comments">
                <h1>See comments</h1>
            </MainCard> */}
        </>
    );
}

export default ViewSingleAnnoucement
