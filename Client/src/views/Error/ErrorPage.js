import React, { useState, useEffect } from 'react'

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

import { Button } from '@material-ui/core'

import { styled } from '@mui/material/styles';

import UsePostFile from '../../Utilities/UsePostFile'
import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import UseFetch from '../../Utilities/UseFetch';
import Box from '@mui/material/Box';

import './ErrorPage.css'

const Input = styled('input')({
    display: 'none',
});



export default function ErrorPage() {

    return (
        <>
            <div class="mainbox">
                <div class="err">4</div>
                <i class="far fa-question-circle fa-spin"></i>
                <div class="err2">4</div>
            </div>
            <Box textAlign='center'>
                <Button variant="outlined" size="large" color="error" href="/dashboard/default">
                    GO TO HOME PAGE
                </Button>
            </Box>
        </>
    )
}
