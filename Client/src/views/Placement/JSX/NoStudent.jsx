import React from 'react'
import { Grid } from '@mui/material'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);
export default function NoStudent(props) {
    return (
        <Grid container justifyContent={"center"} spacing={2}>
            <Grid item>

                <WhiteTextTypography variant="h2">
                    No student found with ID: {props.ID.toUpperCase()}
                </WhiteTextTypography>
            </Grid>

        </Grid>
    )
}
