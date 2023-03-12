import React from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import SubCard from '../../../ui-component/cards/SubCard';
import UseFetch from '../../../Utilities/UseFetch';
import { makeStyles } from '@material-ui/styles';
import ParseDate from "../../../Utilities/ParseDate"
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@material-ui/core';

export default function AllNotifications() {
    const useStyles = makeStyles((theme) => ({
        navContainer: {
            width: '100%',
            maxWidth: '330px',
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: '10px',
            [theme.breakpoints.down('sm')]: {
                maxWidth: '300px'
            }
        },
        listAction: {
            top: '22px'
        },
        actionColor: {
            color: theme.palette.grey[500]
        },

        listItem: {
            padding: 0
        },
        sendIcon: {
            marginLeft: '8px',
            marginTop: '-3px'
        },
        listDivider: {
            marginTop: 0,
            marginBottom: 0
        },
        listChipError: {
            color: theme.palette.orange.dark,
            backgroundColor: theme.palette.orange.light,
            height: '24px',
            padding: '0 6px',
            marginRight: '5px'
        },
        listChipWarning: {
            color: theme.palette.warning.dark,
            backgroundColor: theme.palette.warning.light,
            height: '24px',
            padding: '0 6px'
        },
        listChipSuccess: {
            color: theme.palette.success.dark,
            backgroundColor: theme.palette.success.light,
            height: '24px',
            padding: '0 6px'
        },
        listAvatarSuccess: {
            color: theme.palette.success.dark,
            backgroundColor: theme.palette.success.light,
            border: 'none',
            borderColor: theme.palette.success.main
        },
        listAvatarPrimary: {
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.light,
            border: 'none',
            borderColor: theme.palette.primary.main
        },
        listContainer: {
            paddingLeft: '56px'
        },
        uploadCard: {
            backgroundColor: theme.palette.secondary.light
        },
        paddingBottom: {
            paddingBottom: '16px'
        },
        itemAction: {
            cursor: 'pointer',
            padding: '16px',
            '&:hover': {
                // background: theme.palette.primary.light
            }
        }
    }));
    const classes = useStyles();
    const { required_data, loading } = UseFetch("/notifications/getUserNotifications", "POST")
    if (!loading) {
        console.log(required_data);
    }
    return (
        <>
            <MainCard title="All Notifications">
                <List>

                    {loading ? "Wait Loading..." :
                        required_data["data"].map((elem) => {
                            return (
                                <>
                                    {/* <SubCard> */}

                                    <div className={classes.itemAction}>
                                        <ListItem alignItems="center" className={classes.listItem}>
                                            <ListItemAvatar>
                                                <Avatar>A</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={<Typography variant="h5">Admin</Typography>} />
                                            <ListItemSecondaryAction className={classes.listAction}>
                                                <Grid container justifyContent="flex-end">
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle1" display="block" gutterBottom className={classes.actionColor}>
                                                            {ParseDate.ParseDate(elem.dateAdded, true)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Grid container direction="column" className={classes.listContainer}>
                                            <Grid item xs={12} className={classes.paddingBottom}>
                                                <p style={{ "color": "#5c5c5c" }}>{elem.message}</p>
                                            </Grid>
                                            {/* <Grid item xs={12}> */}
                                            {/* <Grid container>
                                                        {elem.isSeen ? <>
                                                            <Grid item>
                                                                <Chip label="Read" className={classes.listChipSuccess} />
                                                            </Grid>
                                                        </> : <><Grid item>
                                                            <Chip label="Unread" className={classes.listChipError} />
                                                        </Grid>
                                                            <Grid item>
                                                                <Chip label="New" className={classes.listChipWarning} />
                                                            </Grid></>}

                                                    </Grid> */}
                                            {/* </Grid> */}
                                        </Grid>
                                    </div>
                                    <Divider className={classes.listDivider} />
                                    {/* </SubCard> */}
                                    <br />

                                </>
                            )
                        })
                    }
                </List>
            </MainCard>
        </>
    );
}
