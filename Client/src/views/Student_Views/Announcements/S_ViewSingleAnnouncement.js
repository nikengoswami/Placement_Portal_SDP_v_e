import React from 'react'
import { Button, Box } from '@material-ui/core';
// assets
import {
    Avatar,

    Card,
    CardContent,
    Chip,
    Divider,
    Grid,

    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import MainCard from '../../../ui-component/cards/MainCard'
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material'
import UseFetch from '../../../Utilities/UseFetch';
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { IconInfoCircle } from "@tabler/icons"
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ParseDate from '../../../Utilities/ParseDate';
// import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchSection from '../../../layout/MainLayout/Header/SearchSection';
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router-dom";
import UsePost from '../../../Utilities/UsePost'
import HandleToast from '../../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import AddComment from '../Comment/S_AddComment';
import ChipCard from "../../../ui-component/cards/GenericCards/ChipCard"
import DeadlineCard from './JSX/DeadlineCard'
import Modal from '@mui/material/Modal';
import handleNull from "../../../Utilities/HandleNull"
import domainConfig from '../../../Config/domainConfig';
// import Fetch

export default function S_ViewSingleAnnouncement() {
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


    const location = useLocation().pathname;
    const id = location.split("/")[4]

    const { required_data, loading } = UseFetch("/annoucement/getAnnoucement/" + id, "GET")

    let announcement_details = undefined, rows;
    if (!loading) {

        announcement_details = required_data["data"][0];
        console.log(announcement_details)


        let branches = ""
        for (let i = 0; i < announcement_details["Eligible_Branches"].length; i++) {
            branches += (announcement_details["Eligible_Branches"][i]["BranchName"] + " ")
        }

        rows = [
            // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData("Date of Announcement", ParseDate.ParseDate(announcement_details["Date_of_announcement"])),
            createData("Date of Visit", handleNull(ParseDate.ParseDate(announcement_details["Date_of_Visit"]))),
            createData("Registration Deadline", handleNull(ParseDate.ParseDate(announcement_details["Registration_Deadline"], true))),
            // createData("Eligible Branches", announcement_details["Eligible_Branches"]),
            createData("Eligible Branches", handleNull(branches)),
            createData("Passed out year", handleNull(ParseDate.getYear(announcement_details["Passed_out_year"]))),
            createData("Job Role", handleNull(announcement_details["Job_Role"])),
            createData("Salary", handleNull(announcement_details["Salary"])),
            createData("Job Location", handleNull(announcement_details["Job_Location"])),
            createData("Bond Details", handleNull(announcement_details["Bond_Details"])),
            createData("Other Details", handleNull(announcement_details["Other_Details"])),

            createData("Eligibility", handleNull(announcement_details["Eligibility"])),
        ];
    }

    // const name = new URLSearchParams(search).get('id');

    const [commentData, setcommentData] = useState({
        Comment_text: ''
    })
    useEffect(() => { }, [commentData]);


    const [subscribeStatus, setsubscribeStatus] = useState(undefined);
    const [deadline, setDeadline] = useState(undefined);

    // const subscribedata = fetch("/subscribeannouncement/getSubscribedStatus/" + id, "GET")


    useEffect(async () => {

        const subscribedata = await fetch("/subscribeannouncement/getSubscribedStatus/" + id, { method: "GET" });

        let data1 = await subscribedata.json();
        data1 = data1["status"]
        console.log(data1)

        if (data1) {
            setsubscribeStatus(true)
        }
        else {
            setsubscribeStatus(false)
        }

    }, []);


    // if (!subscribedata["loading"]) {
    //     setsubscribeStatus(subscribedata["required_data"]["status"])
    // }

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


    async function handleSubscribe() {
        const res = await UsePost("/subscribeannouncement/subscribe/" + id, {}, "POST")
        setsubscribeStatus(true)
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        console.log(res);
        responsePipelineHandler(params1, 1)
        handleClose()
    }

    async function handleUnsubscribe() {
        const res = await UsePost("/subscribeannouncement/unsubscribe/" + id, {}, "POST")
        setsubscribeStatus(false)
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: true,
                customMessage: "Withdrawn successfully!!!"
            }
        }
        console.log(res);
        responsePipelineHandler(params1, 1)
    }

    return (
        <>
            <MainCard title={loading ? "Announcement" : announcement_details["Company_Details"]["Company_name"] + " - " + announcement_details["Job_Role"] + " For " + new Date(announcement_details["Passed_out_year"]).getFullYear() + " Batch"}>
                <Grid
                    justify="space-between"
                >
                    <Grid item>
                        {subscribeStatus === undefined ? "Loading" : subscribeStatus == true ? <>
                            <Button
                                // onClick={handleUnsubscribe} 
                                onClick={handleOpen}
                                variant="contained" color="error"> Withdraw Application</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography style={{ "color": "#616161" }} id="modal-modal-title" variant="h3" component="h1">
                                        Are, you really sure want to withdraw from announcement?
                                    </Typography><br />
                                    <Grid container spacing={2} justifyContent={""}>
                                        <Grid md={6} item>
                                            <Button fullWidth style={{ color: "white", backgroundColor: "#00C853" }} variant="contained"
                                                // onClick={() => handleDelete()}
                                                onClick={handleUnsubscribe}
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
                        </> :
                            announcement_details == undefined
                                ? ""
                                :
                                new Date(Date.now()).getTime() > new Date(announcement_details["Registration_Deadline"]).getTime()
                                    ?
                                    <ChipCard data={
                                        <DeadlineCard />} loading={false} type={"error"} />
                                    :
                                    <>
                                        <Button onClick={handleSubscribe} style={{ "color": "white" }} variant="contained" color="success"> Apply</Button>
                                        {/* <Tooltip title="Keep recieving constant updates" style={{ "margin-left": "10px" }}>
                                            <IconButton>
                                                <IconInfoCircle />
                                            </IconButton>
                                        </Tooltip> */}
                                    </>
                        }
                        <br />
                        <br />
                    </Grid>

                </Grid>



                {loading ? (
                    ''
                ) : (
                    <>



                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">

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
                                                {announcement_details.Job_Description_File != undefined ?
                                                    <>
                                                        <a target='blank'
                                                            style={{ "text-decoration": "none", "cursor": "pointer" }}
                                                            href={
                                                                process.env.NODE_ENV == "production" ?
                                                                    domainConfig.domain +
                                                                    // "http://placement.csiddu.tech" + 
                                                                    announcement_details["Job_Description_File"] : "http://localhost:8000" + announcement_details["Job_Description_File"]

                                                            }>

                                                            {announcement_details === undefined ? "Wait Loading...." : <>

                                                                {announcement_details.Job_Description_File != undefined ?
                                                                    <Chip
                                                                        label={"View Job Description File"}
                                                                        // variant="outlined"
                                                                        color='primary'
                                                                        clickable
                                                                    /> :
                                                                    <>
                                                                        <Chip label="No Job Description File!" />
                                                                    </>
                                                                }

                                                            </>
                                                            }
                                                        </a>
                                                    </> : <Chip label="No Job Description File!" />
                                                }
                                                {/* <a target='blank'
                                                    style={{ "text-decoration": "none", "cursor": "pointer" }}
                                                    href={
                                                        process.env.NODE_ENV == "production" ?
                                                            domainConfig.domain +
                                                            // "http://placement.csiddu.tech" + 
                                                            announcement_details["Job_Description_File"] : "http://localhost:8000" + announcement_details["Job_Description_File"]

                                                    }>

                                                    {announcement_details === undefined ? "Wait Loading...." : <>
                                                    
                                                    {announcement_details.Job_Description_File != undefined ?
                                                        <Chip
                                                            label={"View Job Description File"}
                                                            // variant="outlined"
                                                            color='primary'
                                                            clickable
                                                        />:
                                                        <>
                                                            <Chip label="No Job Description File!" />
                                                        </>
                                                    }

                                                    </>
                                                    }
                                                </a> */}

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
        </>
    );
}
