// import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
// import MainCard from '../../ui-component/cards/MainCard';
// import SubCard from '../../ui-component/cards/SubCard';
// import { Chip } from '@mui/material';
// import { Avatar } from '@material-ui/core';
// import UseFetch from '../../Utilities/UseFetch';
import SingleComment from './SingleComment';
// import { useLocation } from "react-router-dom";



function ViewComment(props) {

  // const location = useLocation().pathname;
  //   const id = location.split("/")[3]

  // const { required_data, loading } = UseFetch("/annoucement/getAllComments/" + id, "GET")

  // let comments;

  // if (!loading) {
  //   comments = required_data["data"];
  //   comments.sort(function (a, b) {
  //     return new Date(b.Comment_Date) - new Date(a.Comment_Date);
  //   })
  //   // console.log("comments: ", comments);
  // }

  let comments = props.data;

  return (
    <>
      {comments.map((e) => (
        <SingleComment name={e.Comment_Publisher} date={e.Comment_Date} comment_msg={e.Comment_text} />
      ))}
    </>
  );
}

export default ViewComment