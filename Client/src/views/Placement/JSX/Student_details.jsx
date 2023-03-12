import React from 'react'
import { Grid } from '@mui/material'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);
export default function Student_details(props) {
    return (
        <Grid container justifyContent={"flex-start"} spacing={2}>
            <Grid item md={4} xs={12}>
                <WhiteTextTypography variant="h3">
                    Student ID
                </WhiteTextTypography>
                {props.details.Student_ID}
            </Grid>
            <Grid item md={4} xs={12}>
                <WhiteTextTypography variant="h3">
                    Name
                </WhiteTextTypography>
                {props.details.FirstName + " " + props.details.MiddleName + " " + props.details.LastName}
            </Grid>
            <Grid item md={4} xs={12}>
                <WhiteTextTypography variant="h3">
                    CPI
                </WhiteTextTypography>
                {props.details.Current_CPI}
            </Grid>
            <Grid item md={4} xs={12}>

            </Grid>
        </Grid>
    )
}
