import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Button, OutlinedInput, TextField } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler'
import { makeStyles } from '@material-ui/styles';
import {
    Box,

    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
} from '@material-ui/core';
// import Visibility from '@material-ui/icons/Visibility';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useTheme } from '@material-ui/core';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';
import axios from "axios"
// project imports
import AuthWrapper1 from './AuthWrapper1';
// import Logo from './../../../../ui-component/Logo';
import Logo from './../../../layout/MainLayout/LogoSection/index';
import AuthCardWrapper from './AuthCardWrapper';
import RestLogin from './RestLogin';
import AuthFooter from './../../../ui-component/cards/AuthFooter';
import UsePost from "../../../Utilities/UsePost"
import { useHistory } from "react-router-dom"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';




function ForgotPassword() {
    const useStyles = makeStyles((theme) => ({
        redButton: {
            fontSize: '1rem',
            fontWeight: 500,
            backgroundColor: theme.palette.grey[50],
            border: '1px solid',
            borderColor: theme.palette.grey[100],
            color: theme.palette.grey[700],
            textTransform: 'none',
            '&:hover': {
                backgroundColor: theme.palette.primary.light
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '0.875rem'
            }
        },
        signDivider: {
            flexGrow: 1
        },
        signText: {
            cursor: 'unset',
            margin: theme.spacing(2),
            padding: '5px 56px',
            borderColor: theme.palette.grey[100] + ' !important',
            color: theme.palette.grey[900] + '!important',
            fontWeight: 500
        },
        loginIcon: {
            marginRight: '16px',
            [theme.breakpoints.down('sm')]: {
                marginRight: '8px'
            }
        },
        loginInput: {
            ...theme.typography.customInput
        }
    }));
    const classes = useStyles();
    const history = useHistory()
    // const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async () => {

    }
    const [data, setData] = useState({
        studentId: "",
        otp: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    // Allowed states studId,EnteringOtp,VerifedOtp
    const [currentState, setCurrentState] = useState({ state: "stud_id" })

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = useState(false)


    const handleVerifyStudentId = async function () {
        try {
            if (data.studentId.length == 10) {
                let url = "/studentLogin/sendOtp/" + data.studentId
                let res = await axios.post(url)
                const params1 = {
                    data: res.data,
                    HandleToast: {
                        toast: toast,
                        flag: false,
                    }
                }
                // console.log(res.data)
                if(res.data["data"] == "Login using first time password!")
                {
                    history.push("/_student/login/")
                }
                if (res.data.status) {
                    setCurrentState({ state: "verifyOtp" })
                }
                responsePipelineHandler(params1, 1)
            }
            else {
                toast.error("Enter a valid student ID")
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    const handelVerifyOtp = async () => {
        try {
            const url = "/studentLogin/verifyOtp/" + data.studentId
            const res = await UsePost(url, data, "POST")
            const params1 = {
                data: res,
                HandleToast: {
                    toast: toast,
                    flag: false,
                }
            }
            if (res.status) {

                setCurrentState({ state: "changePassword" })
            }
            responsePipelineHandler(params1, 1)
        }
        catch (err) {

        }
    }

    async function handleChangePassowrd() {
        try {
            console.log("Here")
            setCurrentState({ state: "changingPassword" })
            const url = "/studentLogin/forgotChangePassword"
            console.log("Here", url)
            const res = await UsePost(url, data, "POST")
            console.log("Here", "Respinse sent")
            const params1 = {
                data: res,
                HandleToast: {
                    toast: toast,
                    flag: false,
                }
            }
            console.log(res)
            if (res.status) {
                setCurrentState({ state: "passwordChanged" })
            }
            else {
                toast.error("Please try again.")

            }
            history.push("/_student/login")
            responsePipelineHandler(params1, 1)
        }
        catch (err) {
            console.log(err.toString())
        }
    }

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '95vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid style={{ marginLeft: "-8%" }} item sx={{ mb: 3 }} >
                                        <RouterLink to="#">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.grey}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Dharmsinh Desai University
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Forgot your password. We'll change it for you                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth
                                            className={classes.loginInput}>
                                            <InputLabel htmlFor="outlined-adornment-email-login">Student ID</InputLabel>
                                            <OutlinedInput
                                                value={data.studentId}
                                                onChange={(e) => {
                                                    setData({ ...data, studentId: e.target.value });
                                                }}
                                                disabled={currentState.state == "stud_id" ? false : true}
                                                inputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }}
                                                endAdornment={
                                                    currentState.state == "stud_id" ? false :
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                edge="end"
                                                            >
                                                                <CheckCircleIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        {currentState.state == "stud_id" ?
                                            <>
                                                <br />
                                                <br />
                                                {/* <br /> */}
                                                <Button
                                                    onClick={() => handleVerifyStudentId()}
                                                    fullWidth variant="contained" size="large">Verify Student Id</Button>
                                            </> : ""
                                        }
                                        {
                                            currentState.state == "verifyOtp" || currentState.state == "changePassword" || currentState.state == "changingPassword" || currentState.state == "passwordChanged" ? <>
                                                <FormControl fullWidth
                                                    className={classes.loginInput}>
                                                    <InputLabel htmlFor="outlined-adornment-email-login">Enter OTP</InputLabel>
                                                    <OutlinedInput
                                                        value={data.otp}
                                                        onChange={(e) => {
                                                            setData({ ...data, otp: e.target.value });
                                                        }}
                                                        disabled={currentState.state == "verifyOtp" ? false : true}
                                                        inputProps={{
                                                            classes: {
                                                                notchedOutline: classes.notchedOutline
                                                            }
                                                        }}
                                                        endAdornment={
                                                            currentState.state == "verifyOtp" ? false :
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        edge="end"
                                                                    >
                                                                        <CheckCircleIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                                {
                                                    currentState.state == "verifyOtp" ?
                                                        <Button
                                                            onClick={() => handelVerifyOtp()}
                                                            fullWidth
                                                            variant="contained"
                                                            size="large">
                                                            Verify  OTP
                                                        </Button>
                                                        : ""
                                                }
                                            </> : ""
                                        }
                                        {
                                            currentState.state == "changePassword" || currentState.state == "changingPassword" || currentState.state == "passwordChanged" ? <>

                                                <FormControl fullWidth
                                                    className={classes.loginInput}>
                                                    <InputLabel htmlFor="outlined-adornment-email-login">Enter New Password</InputLabel>
                                                    <OutlinedInput
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={data.newPassword}
                                                        onChange={(e) => {
                                                            setData({ ...data, newPassword: e.target.value });
                                                        }}
                                                        disabled={currentState.state == "changePassword" ? false : true}
                                                        inputProps={{
                                                            classes: {
                                                                notchedOutline: classes.notchedOutline
                                                            }
                                                        }}
                                                        endAdornment={
                                                            currentState.state == "changePassword" ? false :
                                                                // <InputAdornment position="end">
                                                                //     <IconButton
                                                                //         edge="end"
                                                                //     >
                                                                //         <CheckCircleIcon />
                                                                //     </IconButton>
                                                                // </InputAdornment>
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {currentState.state == "changePassword" ? showPassword ? <Visibility /> : <VisibilityOff /> : <CheckCircleIcon />}
                                                                </IconButton>
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl fullWidth

                                                    className={classes.loginInput}>
                                                    <InputLabel htmlFor="outlined-adornment-email-login">Enter New Password</InputLabel>
                                                    <OutlinedInput
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={data.confirmNewPassword}
                                                        onChange={(e) => {
                                                            setData({ ...data, confirmNewPassword: e.target.value });
                                                        }}
                                                        disabled={currentState.state == "changePassword" ? false : true}
                                                        inputProps={{
                                                            classes: {
                                                                notchedOutline: classes.notchedOutline
                                                            }
                                                        }}
                                                        endAdornment={
                                                            currentState.state == "changePassword" ? false :
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        edge="end"
                                                                    >
                                                                        <CheckCircleIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </> : ""
                                        }
                                        {
                                            currentState.state == "changePassword" ?
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    size="large"
                                                    onClick={() => handleChangePassowrd()}
                                                >Change Password</Button> : ""
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>

                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid> */}
            </Grid>
        </AuthWrapper1>
    )
}

export default ForgotPassword