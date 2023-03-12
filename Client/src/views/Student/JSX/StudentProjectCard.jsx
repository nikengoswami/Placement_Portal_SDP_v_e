import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { Grid, Button } from '@material-ui/core';
import { IconCirclePlus } from '@tabler/icons';
import { grey, red } from '@mui/material/colors';
import { blue, lightBlue } from '@material-ui/core/colors';
import { getYear, ParseDate } from '../../../Utilities/ParseDate';

const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);

// button color
const color = blue[300];

function StudentProjectCard({ e }) {
    const history = useHistory();

    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={2}>
                            <WhiteTextTypography variant="h4">Project Title: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <WhiteTextTypography variant="h5">
                                {e.Project_Title}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item ms={12} xs={12}>
                    <Grid container spacing={1}>
                        <Grid item md={2}>
                            <WhiteTextTypography variant="h4">Description: </WhiteTextTypography>
                        </Grid>
                        <Grid item md={10}>
                            <WhiteTextTypography variant="h5">
                                {e.Brief_Description}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item md={2}>
                            <WhiteTextTypography variant="h4">Project Link: </WhiteTextTypography>
                        </Grid>
                        <Grid item md={10}>
                            <WhiteTextTypography variant="h5">
                                {e.Project_Link}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item md={2}>
                            <WhiteTextTypography variant="h4">Technologies: </WhiteTextTypography>
                        </Grid>
                        <Grid item md={10}>
                            <WhiteTextTypography variant="h5">
                                {e.Technologies}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default StudentProjectCard;
