import React from 'react'
import { Paper, Typography, Box, Grid, Button, ListItem, List } from "@material-ui/core"
import { useTheme } from '@material-ui/styles';
import MainCard from './../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';
import { color } from '@material-ui/system';
import { ClassNames } from '@emotion/react';

const useStyles = makeStyles((theme) => ({
    applyBtn: {
        background: theme.palette.success.light,
        color: theme.palette.success.dark,
        '&:hover': {
            background: theme.palette.success.main,
            color: theme.palette.background.paper
        }
    },
    crd: {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    },
    description: {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    },
    lightBlue: {
        marginTop: 12,
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    }
}));
const WhiteTextTypography = withStyles({
    root: {
        color: "#FFFFFF"
    }
})(Typography);
const LightBlueTextTypography = withStyles({
    root: {
        color: "##e3f2fd"
    }
})
export default function Cards() {

    const classes = useStyles();
    return (
        <>
            <MainCard title="Placement Oppurtunities">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={12} md={6}>
                        <SubCard title="Amazon Recruitment 2022-23">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>CTC : 18Lpa</ListItem>
                                <ListItem>Min CPI : 8.86</ListItem>
                                <ListItem>Branches : CE , IT</ListItem>
                            </List>

                            <Button size='large' fullWidth className={classes.applyBtn}>Apply</Button>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SubCard title="Infosys Recruitment 2022-23">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>CTC : 18Lpa</ListItem>
                                <ListItem>Min CPI : 8.86</ListItem>
                                <ListItem>Branches : CE , IT</ListItem>
                            </List>

                            <Button size='large' fullWidth className={classes.applyBtn}>Apply</Button>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SubCard title="TCS Recruitment 2022-23">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>CTC : 4Lpa</ListItem>
                                <ListItem>Min CPI : 6.86</ListItem>
                                <ListItem>Branches : CE , IT</ListItem>
                            </List>

                            <Button size='large' fullWidth className={classes.applyBtn}>Apply</Button>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SubCard title="InfoCusp Pvt Ltd. Recruitment 2022-23">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>CTC : 10Lpa</ListItem>
                                <ListItem>Min CPI : 8.6</ListItem>
                                <ListItem>Branches : CE , IT</ListItem>
                            </List>

                            <Button size='large' fullWidth className={classes.applyBtn}>Apply</Button>
                        </SubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </>
        // <MainCard title="Card Elements">
        //     <Box padding={0}>
        //         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        //             <Grid item xs={6}>
        //                 <Paper elevation={12} className={classes.crd}>
        //                     <Box padding={2}>
        //                         <Typography className={classes.lightBlue} variant="h3">Amazon Recruitment 2021-22</Typography>
        //                         <br />
        //                         <Typography className={classes.lightBlue} variant="h4">Description:</Typography>
        //                         <Typography className={classes.lightBlue} variant="h5">- CTC: 18 Lpa</Typography>
        //                         <Typography className={classes.lightBlue} variant="h5">- Minimum CPI: 8.75</Typography>
        //                         <Button raised justify="space-between">Apply</Button>
        //                     </Box>
        //                 </Paper>
        //             </Grid>
        //             <Grid item xs={6}>
        //                 <Paper elevation={12} className={classes.crd}>
        //                     <Box padding={2}>
        //                         <Typography className={classes.lightBlue} variant="h3">Infosys Recruitment 2021-22</Typography>
        //                         <Paper className={classes.lightBlue}>
        //                             <b>Recruiter: Rikin Chauhan</b>
        //                         </Paper>
        //                         <br />
        //                         <Paper className={`${classes.lightBlue}, ${classes.description}`}>
        //                             <b> Eligibility: </b><br /><br />
        //                             - B.E./B.Tech/M.E./M.Tech graduates from all branches are eligible to apply.<br />
        //                             - MCA/M.Sc. graduates from following branches only are eligible to apply: Computer Science/Electronics/Mathematics/Statistics.<br />
        //                             - Academic criteria - shared in the attached document All percentages/CGPA should be simple average for all subjects/semesters/years, including electives, optional subjects, additional subjects, practical subjects and languages.<br />
        //                             - Graduates from 2019, 2020 and 2021 batch only are eligible to apply. Candidates should not have participated in the Infosys Limited and/or Infosys Group Company (such as - Infosys BPM) selection process in the last 6 months.<br />
        //                             - No active backlogs are allowed.<br />
        //                             <br />
        //                             <b> Selection Process:  </b><br /><br />
        //                             - 2 Rounds <br />
        //                             - Online Test <br />
        //                             - Interview <br />
        //                         </Paper>

        //                     </Box>
        //                 </Paper>
        //             </Grid>
        //         </Grid>
        //     </Box>
        // </MainCard >

    )
}
