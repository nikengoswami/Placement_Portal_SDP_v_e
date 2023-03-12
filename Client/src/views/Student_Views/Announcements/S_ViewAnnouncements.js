import React, { useState } from 'react'
import { Paper, Typography, Box, Grid, Button, ListItem, List } from "@material-ui/core"
import { useTheme } from '@material-ui/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';
import { color } from '@material-ui/system';
import { ClassNames } from '@emotion/react';
import { TextField } from '@material-ui/core';
import $ from "jquery"
import usePost from '../../../Utilities/UsePost';
import ParseDate from "../../../Utilities/ParseDate"
import HandleToast from '../../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import UseFetch from '../../../Utilities/UseFetch';
import { useHistory } from "react-router-dom";
import SearchSection from '../../../layout/MainLayout/Header/SearchSection';
import ChipCard from '../../../ui-component/cards/GenericCards/ChipCard';
import EmptyAnnouncement from './JSX/EmptyAnnouncement';
import handleNull from '../../../Utilities/HandleNull';

const useStyles = makeStyles((theme) => ({
    applyBtn: {
        background: theme.palette.success.light,
        color: theme.palette.success.dark,
        '&:hover': {
            background: theme.palette.success.main,
            color: theme.palette.background.paper
        }
    },
    applyDeadlineBtn: {
        background: theme.palette.error.light,
        color: theme.palette.error.dark,
        '&:hover': {
            background: theme.palette.error.main,
            color: theme.palette.background.paper
        }
    },
    crd: {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    },
    description: {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    },
    lightBlue: {
        marginTop: 12,
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    }
}));

const WhiteTextTypography = withStyles({
    root: {
        color: "#FFFFFF"
    }
})(Typography);
const LightBlueTextTypography = withStyles({
    root: {
        color: "##e3f2fd"
    }
})

function S_ViewAnnoucements() {
    const classes = useStyles();

    const [search, setSearch] = useState("")
    const { required_data, loading } = UseFetch("/annoucement/getAllAnnoucements/", "GET")

    var annoucements = [];

    if (!loading) {
        annoucements = required_data["data"];
        if (required_data["data"] != "No Student data!") {
            annoucements = required_data['data'];
        }
        console.log(annoucements)
    }

    let history = useHistory();

    function handleRedirect(id) {
        history.push('/_student/announcement/view_announcement/' + id)
    }

    function handleSearch(e) {
        console.log(e.target.value)
        setSearch(e.target.value);
        let searchText = e.target.value == "" ? " " : e.target.value
        var root = document.getElementsByClassName("MuiGrid-root MuiGrid-container")[0].children;
        console.log(root)
        for (let i = 0; i < root.length; i++) {
            var elem = document.getElementById(root[i].id)
            var elemText = elem.innerText.toLowerCase()
            if (!elemText.includes(searchText.toLowerCase())) {
                $(elem).hide()
            }
            else {
                $(elem).show()
            }
        }
    }

    return (

        <>
            <MainCard title="View Announcements">
                <TextField
                    label='Search'
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    fullWidth
                >
                </TextField>
                <br /><br /><br />
                {/* {loading ? "" : required_data['data'] == "No Student data!" ? <h1>No Announcements Data</h1> : */}
                {loading ? "" :
                    typeof annoucements == "string" ?
                        (
                            <>
                                <Grid item>
                                    <ChipCard loading={false} data={<EmptyAnnouncement />} />
                                </Grid>
                            </>
                        )
                        // <h1>No Announcements Data</h1> 
                        :
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>

                            {annoucements.map((e) => (
                                <Grid item xs={12} md={6} id={e.Announcement_ID}>
                                    <SubCard title={e.Company_details["Company_name"] + " " + (e.Passed_out_year == null || e.Passed_out_year == undefined ? e.Job_Role + " for all batch year" : "- " + e.Job_Role + " for " + ParseDate.getYear(e.Passed_out_year) + " Batch")}>
                                        <Typography variant="h5"></Typography>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="h4" style={{ color: "rgb(97, 97, 97)" }}>Deadline: </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={8}>
                                                        <Typography variant="h5" style={{ color: "#828282" }}>
                                                            {ParseDate.ParseDate(e.Registration_Deadline, true)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="h4" style={{ color: "rgb(97, 97, 97)" }}>Posted On: </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={8}>
                                                        <Typography variant="h5" style={{ color: "#828282" }}>
                                                            {ParseDate.ParseDate(e.Date_of_announcement, true)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="h4" style={{ color: "rgb(97, 97, 97)" }}>Visiting On: </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={8}>
                                                        <Typography variant="h5" style={{ color: "#828282" }}>
                                                            {handleNull(ParseDate.ParseDate(e.Date_of_Visit))}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="h4" style={{ color: "rgb(97, 97, 97)" }}>Job Location: </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={8}>
                                                        <Typography variant="h5" style={{ color: "#828282" }}>
                                                            {handleNull(e.Job_Location)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="h4" style={{ color: "rgb(97, 97, 97)" }}>Job Role: </Typography>
                                                    </Grid>
                                                    <Grid item xs={6} md={8}>
                                                        <Typography variant="h5" style={{ color: "#828282" }}>
                                                            {handleNull(e.Job_Role)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <br />
                                        {
                                            new Date(Date.now()).getTime() > new Date(e.Registration_Deadline).getTime()
                                                ?
                                                <Button
                                                    onClick={() => handleRedirect(e.Announcement_ID)}
                                                    color='error' size='large' fullWidth className={classes.applyDeadlineBtn}>View Full Announcement</Button>
                                                :
                                                <Button onClick={() => handleRedirect(e.Announcement_ID)} size='large' fullWidth className={classes.applyBtn}>View Full Announcement</Button>
                                        }
                                    </SubCard>
                                </Grid>
                            ))}
                        </Grid>
                }
            </MainCard>
        </>
    )
}

export default S_ViewAnnoucements
