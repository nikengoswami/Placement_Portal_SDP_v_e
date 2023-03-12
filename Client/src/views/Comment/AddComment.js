import React from 'react'
import { Button } from '@material-ui/core';
import $ from 'jquery'
// assets
import {
    // Avatar,

    // Card,
    // CardContent,
    // Chip,
    // Divider,
    Grid,
    // List,
    // ListItem,
    // ListItemAvatar,
    // ListItemSecondaryAction,
    // ListItemText,
    // Stack,

} from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
// import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import MainCard from '../../ui-component/cards/MainCard'
import { useState, useEffect } from 'react';
// import { Typography } from '@mui/material'
// import UseFetch from '../../Utilities/UseFetch';
import { useLocation } from "react-router-dom";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import ParseDate from '../../Utilities/ParseDate';
// import SearchSection from '../../layout/MainLayout/Header/SearchSection';
import TextField from '@mui/material/TextField';
// import { useHistory } from "react-router-dom";
import UsePost from '../../Utilities/UsePost'
// import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import ViewComment from './ViewComment';
import NoComment from './JSX/NoComment';
import ChipCard from "../../ui-component/cards/GenericCards/ChipCard"

function AddComment(props) {

    const [commentData, setcommentData] = useState({
        Comment_text: ''
    })
    useEffect(() => { }, [commentData]);


    const location = useLocation().pathname;
    const id = location.split("/")[3];

    const [allComments, setallComments] = useState(undefined);
    useEffect(async () => {
        const response = await fetch("/annoucement/getAllComments/" + id, { method: "GET" });
        let data1 = await response.json();
        data1 = data1["data"]
        data1.sort(function (a, b) {
            return new Date(b.Comment_Date) - new Date(a.Comment_Date);
        })

        setallComments(data1)

    }, [])
    // useEffect

    // const { required_data, loading } = UseFetch("/annoucement/getAllComments/" + id, "GET")

    // let comments;

    // if (!loading) {
    //     comments = required_data["data"];
    //     comments.sort(function (a, b) {
    //         return new Date(b.Comment_Date) - new Date(a.Comment_Date);
    //     })
    //     // setcommentData(comments)
    //     // console.log("comments: ", comments);
    // }



    async function handleComment(id) {
        // console.log("clicked " + id);
        const res = await UsePost("/annoucement/addComment/" + id, commentData, "POST")
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        // console.log(res);
        responsePipelineHandler(params1, 1)

        setcommentData({ Comment_text: "" })

        // ajax call
        $.ajax({
            url: '/annoucement/getAllComments/' + id,
            type: "GET",
            success: function (data) {
                console.log(data)

                let data1 = data["data"]

                data1.sort(function (a, b) {
                    return new Date(b.Comment_Date) - new Date(a.Comment_Date);
                })

                setallComments(data1)
                // const redirect_url = "http://localhost:3000/announcement/view_annoucement/" + id;
                // $.post(redirect_url, data)
            }
        })
    }


    return (
        <>
            <MainCard title="Comments">
                <form>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <Grid item xs={9} md={11}>
                            <TextField
                                id="comment_text"
                                label="Enter the comment"
                                multiline
                                fullWidth
                                maxRows={7}
                                value={commentData['Comment_text']}
                                onChange={(e) => {
                                    setcommentData({ ...commentData, Comment_text: e.target.value });
                                }}
                            />
                        </Grid>
                        {/* <br /><br /> */}
                        <Grid item xs={3} md={1}>
                            <Button onClick={() => handleComment(props.id)} variant="contained" size="large" color="primary">
                                Post
                            </Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}></TableContainer>

                    {/* <Button onClick={handleComment} fullWidth variant='contained' size='large' color="primary">Post Comment</Button> */}
                </form>
                <br /><br />
                {/* // comments */}
                {allComments === undefined ? <>
                    <ChipCard data={<NoComment />} isLoading={false} />
                </>
                    : <ViewComment data={allComments} />}
            </MainCard>


        </>
    );
}

export default AddComment;


