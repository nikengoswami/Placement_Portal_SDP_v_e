import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';

// project imports
// import MainCard from './../../../ui-component/cards/MainCard';
import MainCard from '../MainCard';
// import TotalIncomeCard from './../../../ui-component/cards/Skeleton/TotalIncomeCard';
import TotalIncomeCard from '../Skeleton/TotalIncomeCard';

// assets
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';



//-----------------------|| DASHBOARD - TOTAL INCOME DARK CARD ||-----------------------//

const ListCard = (props) => {
    const type = props.type
    // if (type === undefined) {
    //     // type = theme.palette.primary.dark
    // }
    // else {
    //     type = "error"
    // }
    // style constant
    const useStyles = makeStyles((theme) => ({
        card: {
            backgroundColor: props.type === undefined ? theme.palette.primary.main : theme.palette.error.main,
            color: theme.palette.primary.light,
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
                content: '""',
                position: 'absolute',
                width: '210px',
                height: '210px',
                background: 'linear-gradient(210.04deg, ' + theme.palette.primary[200] + ' -50.94%, rgba(144, 202, 249, 0) 83.49%)',
                borderRadius: '50%',
                top: '-30px',
                right: '-180px'
            },
            '&:before': {
                content: '""',
                position: 'absolute',
                width: '210px',
                height: '210px',
                background: 'linear-gradient(140.9deg, ' + theme.palette.primary[200] + ' -14.02%, rgba(144, 202, 249, 0) 77.58%)',
                borderRadius: '50%',
                top: '-160px',
                right: '-130px'
            }
        },
        content: {
            padding: '16px !important'
        },
        avatar: {
            ...theme.typography.commonAvatar,
            ...theme.typography.largeAvatar,
            backgroundColor: theme.palette.primary[800],
            color: '#fff'
        },
        primary: {
            color: '#fff'
        },
        secondary: {
            color: theme.palette.primary.light,
            marginTop: '5px'
        },
        padding: {
            paddingTop: 0,
            paddingBottom: 0
        }
    }));
    const classes = useStyles();

    return (
        <React.Fragment>
            {props.isLoading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <List className={classes.padding}>
                        <ListItem alignItems="center" disableGutters className={classes.padding}>
                            {props.data}
                        </ListItem>
                    </List>
                </MainCard>
            )}
        </React.Fragment>
    );
};

ListCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ListCard;
