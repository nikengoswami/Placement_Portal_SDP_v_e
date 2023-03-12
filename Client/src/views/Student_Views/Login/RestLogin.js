import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import configData from '../../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import useScriptRef from '../../../hooks/useScriptRef';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import { ACCOUNT_INITIALIZE } from './../../../store/actions';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import UsePost from '../../../Utilities/UsePost';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import { useHistory } from "react-router-dom";
// const HandleCookies = require("../../../Utilities/HandleCookies")
import SetClientStudentCookies
    from "../../../Utilities/HandleCookie/SetClientStudentCookies"
import VerifyStudentCookies from "../../../Utilities/HandleCookie/VerifyStudentCookie"
// style constant
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

//============================|| API JWT - LOGIN ||============================//

const RestLogin = (props, { ...others }) => {
    const classes = useStyles();
    const dispatcher = useDispatch();

    const scriptedRef = useScriptRef();
    const [checked, setChecked] = React.useState(true);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [data, setData] = useState({
        Student_ID: "",
        password: ""
    });

    const history = useHistory()

    useEffect(() => {
        const verificationStatus = VerifyStudentCookies()
        if (verificationStatus) {
            history.push("/_student/dashboard")
        }

    }, [])


    async function handleSubmit(event) {

        event.preventDefault();
        console.log(data);
        const res = await UsePost("/studentLogin/login/", data, "POST")
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        if (res) {
            if (res.status) {
                let a = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);
                if (res.data == "Please Set your password to continue") {
                    history.push("/_student/firstTimeLogin")
                }
                else {

                    await SetClientStudentCookies(data.Student_ID, a)
                    history.push("/_student/Dashboard")
                }
            }
            console.log(res);
            responsePipelineHandler(params1, 1)
        }


    };

    return (
        <React.Fragment>
            <FormControl fullWidth
                // error={Boolean(touched.email && errors.email)} 
                className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-email-login">Student ID</InputLabel>
                <OutlinedInput
                    // id="outlined-adornment-email-logi
                    id="Student_ID"
                    label="Student ID"
                    name="Student_ID"
                    type="text"
                    value={data['Student_ID']}
                    // onBlur={handleBlur}
                    onChange={(e) => {
                        setData({ ...data, Student_ID: e.target.value });
                    }}
                    inputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
            </FormControl>

            <FormControl fullWidth
                // error={Boolean(touched.password && errors.password)} 
                className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                <OutlinedInput
                    // id="outlined-adornment-password-login"
                    id="password"
                    name="password"
                    label="password"
                    type={showPassword ? 'text' : 'password'}
                    value={data['password']}
                    // onBlur={handleBlur}
                    onChange={(e) => {
                        setData({ ...data, password: e.target.value });
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    inputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />

            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            name="checked"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Typography
                    variant="subtitle1"
                    component={Link}
                    to={"/_student/forgotPassword"}
                    color="secondary"
                    sx={{ textDecoration: 'none' }}
                >
                    Forgot Password?
                </Typography>
            </Stack>
            {/* {errors.submit && (
                            <Box
                                sx={{
                                    mt: 3
                                }}
                            >
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )} */}

            <Box
                sx={{
                    mt: 2
                }}
            >
                <AnimateButton>
                    <Button
                        disableElevation
                        // disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        SIGN IN
                    </Button>
                </AnimateButton>
            </Box>
        </React.Fragment>
    );
};

export default RestLogin;
