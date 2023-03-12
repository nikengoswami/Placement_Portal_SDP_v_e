import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Theme } from '@material-ui/core';
import { Grid } from '@mui/material';
import domainConfig from '../../../Config/domainConfig';

export default function S_ProfilePhoto(props) {
    const useStyles = makeStyles({
        logo: {
            maxWidth: 160
        }
    });
    const classes = useStyles();
    return (
        // <AppBar color="inherit">
        // <Toolbar>
        <>
            <Grid container justifyContent="center">
                <Grid item>
                    <img
                        style={{ "object-fit": "cover", aspectRatio: "1/1", "max-width": '200px', "max-height": '200px', borderRadius: '50%', border: "1px solid grey" }}
                        src={

                            process.env.NODE_ENV == "production" ?
                                // "http://csiddu.tech" + 
                                domainConfig.domain + 
                                props.student_photo : "http://localhost:8000" + props.student_photo

                        }
                        alt="logo"
                        className={classes.logo}
                    />
                </Grid>
            </Grid>
        </>
        // </Toolbar>
        // </AppBar>
    );
}
