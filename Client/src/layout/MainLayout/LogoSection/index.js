import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@material-ui/core';

// project imports
import config from './../../../config';
import Logo1 from "../../../assets/images/Dharamsinh_Desai_University_logo.png"
import Logo from './../../../ui-component/Logo';
import { useHistory } from 'react-router';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {

    const history = useHistory()
    const current_path = history.location.pathname


    return (
        <ButtonBase disableRipple component={Link} to={current_path.indexOf("/_student") == "-1" ? "/dashboard/default" : "/_student/Dashboard"}>
            {/* <Logo /> */}
            <img style={{ width: "60%", height: "5%", marginLeft: "40%", marginTop: "-11%", marginBottom: "-25%" }}
                src={Logo1}
                alt='Dharamsinh Desai University logo'
                loading="lazy"
            />
            {/* <Typography variant="h3">DDU</Typography> */}

        </ButtonBase>
    );
};

export default LogoSection;
