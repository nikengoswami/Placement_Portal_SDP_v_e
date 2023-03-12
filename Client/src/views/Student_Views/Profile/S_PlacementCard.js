import React, { useState, useEffect } from 'react';
import SubCard from '../../../ui-component/cards/SubCard';
import { withStyles } from '@material-ui/styles';
import { TextField, Typography, MenuItem, Button, Checkbox } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { red, blue } from '@mui/material/colors';
import domainConfig from '../../../Config/domainConfig';

const btn_color = blue[300];

const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);

function S_PlacementCard(props) {
    let [studentPlacementStateDetails, setstudentPlacementStateDetails] = useState(props.details);

    useEffect(() => {
        // console.log(props)
        setstudentPlacementStateDetails(props.details);
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={2}>
                            <WhiteTextTypography variant="h4">Company: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={10}>
                            <WhiteTextTypography variant="h5">
                            {studentPlacementStateDetails.Company_details.Company_name}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={2}>
                            <WhiteTextTypography variant="h4">Designation: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={10}>
                            <WhiteTextTypography variant="h5">
                            {studentPlacementStateDetails.Designation}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={2}>
                            <WhiteTextTypography variant="h4">Salary: </WhiteTextTypography>
                        </Grid>
                        <Grid item xs={6} md={10}>
                            <WhiteTextTypography variant="h5">
                            {studentPlacementStateDetails.Salary}
                            </WhiteTextTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <br/>
                {/* <br/> */}
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                        <Grid style={{"padding-top" : "1.5%"}} item xs={6} md={2}>
                            <a
                                target="_blank"
                                href={
                                    process.env.NODE_ENV == 'production'
                                        ? 
                                        // 'http://csiddu.tech' + 
                                        domainConfig.domain + 
                                        studentPlacementStateDetails.Offer_Letter
                                        : 'http://localhost:8000' + studentPlacementStateDetails.Offer_Letter
                                }
                                style={{ 'text-decoration': 'none' }}
                            >
                                <Button size='small'
                                    style={{backgroundColor: btn_color}}
                                variant="contained">View File</Button>
                            </a>
                        </Grid>
                        <Grid  item xs={6} md={10}>
                            <label>Final</label>{' '}
                            <Checkbox
                            color='default'
                                checked={studentPlacementStateDetails.IsFinal == 1 ? true : false}
                                value={studentPlacementStateDetails.IsFinal}
                                // onChange={(e) => handleCheckBox(e)}
                            />
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* <SubCard>
                
                <Grid style={{ 'padding-top': '1%' }} container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={2} xs={6} style={{ 'padding-top': '1%' }}>
                        <a
                            target="_blank"
                            href={
                                process.env.NODE_ENV == 'production'
                                    ? 'http://csiddu.tech' + studentPlacementStateDetails.Offer_Letter
                                    : 'http://localhost:8000' + studentPlacementStateDetails.Offer_Letter
                            }
                            style={{ 'text-decoration': 'none' }}
                        >
                            <Button variant="contained">View File</Button>
                        </a>
                    </Grid>
                    
                    <Grid item md={2} xs={6}>
                        <Checkbox
                            checked={studentPlacementStateDetails.IsFinal == 1 ? true : false}
                            value={studentPlacementStateDetails.IsFinal}
                            // onChange={(e) => handleCheckBox(e)}
                        />{' '}
                        <label>Final</label>
                    </Grid>
                </Grid>
            </SubCard>
            <br /> */}
        </>
    );
}

export default S_PlacementCard;
