import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { Grid, Button } from '@material-ui/core';
import { IconCirclePlus } from '@tabler/icons';
import { grey, red } from '@mui/material/colors';
import { blue, lightBlue } from '@material-ui/core/colors';
import ConvertToLPA from "../../../Utilities/ConvertToLPA"

const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);

// button color
const color = blue[300];

function PlacementDetailsCard({ placementDetails }) {
    const history = useHistory();

    console.log(placementDetails)

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>
                            <WhiteTextTypography variant="h4">Total Placed Students: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <WhiteTextTypography variant="h5">
                                {placementDetails == undefined ? '' : placementDetails['Total_Placed']}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>
                            <WhiteTextTypography variant="h4">Placement: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <WhiteTextTypography variant="h5">
                                {placementDetails == undefined ? '' : placementDetails['Placement'] == undefined ? 0 : placementDetails['Placement'].toFixed(2)}
                                {" "}{"%"}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>
                            <WhiteTextTypography variant="h4">Male: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <WhiteTextTypography variant="h5">
                                {placementDetails == undefined ? '' : placementDetails['Male']}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>
                            <WhiteTextTypography variant="h4">Female: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <WhiteTextTypography variant="h5">
                                {placementDetails == undefined ? '' : placementDetails['Female']}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>
                            <WhiteTextTypography variant="h4">Average Salary: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <WhiteTextTypography variant="h5">
                                {placementDetails == undefined ? '' :  placementDetails['Average_Salary'] == null ? ConvertToLPA(0) : ConvertToLPA(placementDetails['Average_Salary'])}
                                {/* {" "}{ "LPA"} */}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>
                            <WhiteTextTypography variant="h4">Median Salary: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <WhiteTextTypography variant="h5">
                                {placementDetails == undefined ? '' : placementDetails['Median_Salary'] == null ? ConvertToLPA(0) : ConvertToLPA(placementDetails['Median_Salary'])}
                                {/* {" "}{ "LPA"} */}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>
                            <WhiteTextTypography variant="h4">Maximum Salary: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <WhiteTextTypography variant="h5">
                                {placementDetails == undefined ? '' : ConvertToLPA(placementDetails['Max_Salary'])}
                                {/* {" "}{ "LPA"} */}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>
                            <WhiteTextTypography variant="h4">Minimum Salary: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <WhiteTextTypography variant="h5">
                                {placementDetails == undefined
                                    ? ''
                                    : placementDetails['Min_Salary'] == 100000000
                                    ? ConvertToLPA(0)
                                    : ConvertToLPA(placementDetails['Min_Salary'])}
                                    {/* {" "}{ "LPA"} */}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default PlacementDetailsCard;
