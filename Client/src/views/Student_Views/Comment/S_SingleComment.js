import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import MainCard from '../../../ui-component/cards/MainCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { Chip } from '@mui/material';
import { Avatar } from '@material-ui/core';
import ParseDate from "../../../Utilities/ParseDate"




function S_SingleComment(props) {


    function formatDate(date) {
        var new_date = new Date(date);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new_date.toLocaleDateString("en-US", options);

    }


    return (
        <>
            <SubCard>
                <Grid container spacing={2}>
                    <Grid item xs={3} md={1}>
                        <Avatar>{props.name[0]}</Avatar>
                    </Grid>
                    <Grid item xs={9} md={11}>

                        <Grid item xs={6} md={4}>
                            {/* <b>keval</b> */}
                            <Typography variant='h4'>{props.name}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            {ParseDate.dateWithDay(props.date)}
                        </Grid>
                    </Grid>

                </Grid>
                {/* <hr/> */}
                <br />
                <Typography variant='h5'>{props.comment_msg}</Typography>
                {/* <Grid>
                <Grid item xs={12} justifyContent="space-between" md={12}>
                    <Avatar>A</Avatar>
                </Grid>
                <hr/>
                <Grid item xs={12} md={12}>
                    gadnevia
                </Grid>
            </Grid> */}
            </SubCard>
            <br />
        </>
    );
}

export default S_SingleComment;
