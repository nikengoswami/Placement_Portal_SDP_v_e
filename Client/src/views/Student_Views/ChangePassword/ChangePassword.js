import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import MainCard from "../../../ui-component/cards/MainCard"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
    Box,

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
import { makeStyles } from '@material-ui/styles';
import UsePost from "../../../Utilities/UsePost"
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import { useHistory } from 'react-router';



export default function ChangePassword() {
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
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };
    const handleClickShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };
    const history = useHistory()
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
    })

    async function handleChangePassword() {
        console.log(passwords)
        const resp = await UsePost("/studentLogin/changePassword/", passwords, "POST")
        console.log(resp)
        const params1 = {
            data: resp,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        responsePipelineHandler(params1, 1)
        if (resp.data == "Password updated successfully. Please login again") {
            localStorage.clear()
            history.push("/_student/login")
        }
    }


    return (
        <MainCard title="Change Password">

            <FormControl fullWidth
                className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-email-login">Old Password</InputLabel>
                <OutlinedInput
                    fullWidth
                    id="password"
                    name="password"
                    label="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                        setPasswords({ ...passwords, oldPassword: e.target.value });
                    }}
                    value={passwords.oldPassword}
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
            <br />
            <br />
            <FormControl fullWidth
                className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-email-login">New Password</InputLabel>
                <OutlinedInput
                    fullWidth
                    id="password1"
                    name="password"
                    label="password"
                    type={showPassword1 ? 'text' : 'password'}
                    onChange={(e) => {
                        setPasswords({ ...passwords, newPassword: e.target.value });
                    }}
                    value={passwords.newPassword}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword1}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword1 ? <Visibility /> : <VisibilityOff />}
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
            <br />
            <br />
            <FormControl fullWidth
                className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-email-login">Confirm New Password</InputLabel>
                <OutlinedInput
                    fullWidth
                    id="password2"
                    name="password"
                    label="password"
                    type={showPassword2 ? 'text' : 'password'}
                    onChange={(e) => {
                        setPasswords({ ...passwords, newPasswordConfirm: e.target.value });
                    }}
                    value={passwords.newPasswordConfirm}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword2 ? <Visibility /> : <VisibilityOff />}
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
            <br />
            <br />


            {/* <OutlinedInput
                fullWidth
                id="password"
                name="password"
                label="password"
                type={showPassword ? 'text' : 'password'}
                value={passwords.oldPassword}
                onChange={(e) => {
                    setPasswords({ ...passwords, oldPassword: e.target.value });
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
            /> */}
            <Button onClick={() => handleChangePassword()} size="large" variant="contained">Change Password</Button>
        </MainCard>
    )
}
