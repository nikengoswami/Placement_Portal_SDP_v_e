import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Box, ButtonBase } from '@material-ui/core';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';

import { Typography } from '@material-ui/core';

import Hidden from '@material-ui/core/Hidden';

// style constant
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.primary.light,
        color: theme.palette.primary.dark,
        '&:hover': {
            background: theme.palette.primary.dark,
            color: theme.palette.primary.light
        }
    },
    boxContainer: {
        width: '228px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        }
    }
}));

//-----------------------|| MAIN NAVBAR / HEADER ||-----------------------//

const Header = ({ handleLeftDrawerToggle }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            {/* logo & toggler button */}
            <div className={classes.boxContainer}>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} color="inherit">
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </div>

            {/* header search */}
            {/* <SearchSection theme="light" /> */}
            <div className={classes.grow} />
            <Box component="span" sx={{ display: { xs: 'none', md: 'block', marginBottom: '1.6%' }, flexGrow: -1 }}>
                <LogoSection />
            </Box>
            {/* smDown = this defines size for laptop and tablet*/}
            <Hidden
                smDown
                style={{
                    // "padding-right": "-10%"
                }}>
                <Typography
                    fontSize='2.5rem'
                    // fontSize='150%'
                    fontWeight='bold'
                // marginLeft={"-16%"}
                >
                    Placement Portal
                    <div
                        style={{
                            margin: '0%',
                            fontSize: '15px',
                            lineHeight: '0.2rem',
                            textAlign: 'center'
                        }}
                    >
                        &copy; Dharmsinh Desai University
                    </div>
                </Typography>
            </Hidden>
            {/* smUp = this defines size for mobile */}
            <Hidden smUp>
            <Typography
                    fontSize='1.1rem'
                    // fontSize='150%'
                    fontWeight='bold'
                // marginLeft={"-16%"}
                >
                    Placement Portal
                    <div
                        style={{
                            margin: '0%',
                            fontSize: '8px',
                            lineHeight: '0.2rem',
                            textAlign: 'center'
                        }}
                    >
                        &copy; Dharmsinh Desai University
                    </div>
                </Typography>
            </Hidden>
            <div className={classes.grow} />

            {/* notification & profile */}
            <NotificationSection />
            <ProfileSection />
        </React.Fragment >
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
