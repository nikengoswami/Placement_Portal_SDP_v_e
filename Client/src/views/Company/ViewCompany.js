import React, { useState, useEffect } from 'react';
import { Paper, Typography, IconButton, Box, Grid, Button, ListItem, List } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import MainCard from './../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import { withStyles } from '@material-ui/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { color } from '@material-ui/system';
import { ClassNames } from '@emotion/react';
import usePost from '../../Utilities/UsePost';
import UseFetch from '../../Utilities/UseFetch';
import HandleToast from '../../Utilities/HandleToast';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import { TextField } from '@material-ui/core';
import $ from 'jquery';
import { IconDashboard, IconCirclePlus, IconDeviceAnalytics, IconSpeakerphone, IconEye } from '@tabler/icons';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import ChipCard from '../../ui-component/cards/GenericCards/ChipCard';
import EmptyCompany from './JSX/EmptyCompany';
import Modal from '@mui/material/Modal';

// import SubCard from '../../ui-component/cards/SubCard';

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
    },

}));

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);
const LightBlueTextTypography = withStyles({
    root: {
        color: '##e3f2fd'
    }
});

const axios = require("axios")
const Input = styled('input')({
    display: 'none'
});

function ViewCompany() {
    const icons = {
        IconDashboard: IconDashboard,
        IconDeviceAnalytics,
        IconSpeakerphone
    };

    const [search, setSearch] = useState('');
    const history = useHistory();
    const classes = useStyles();


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const { required_data, loading } = UseFetch('/company/getCompany', 'GET');

    // let company_list = [];

    // if (!loading) {
    //     // console.log(required_data['data']);
    //     if (required_data['data'] != 'No Student data!') {
    //         for (let i = 0; i < required_data['data'].length; i++) {
    //             var obj = {};
    //             obj = required_data['data'][i];
    //             obj['id'] = i;
    //             // console.log(obj)
    //             company_list.push(obj);
    //         }
    //         console.log(company_list);
    //     }
    // }

    const [company_list_original, setCompany_list_original] = useState([]);
    const [company_list_copy, setCompany_list_copy] = useState([]);

    useEffect(async () => {
        let response = undefined;
        response = await fetch("/company/getCompany", { method: "GET" })

        if (response != undefined) {
            let jsonData = undefined
            jsonData = await response.json()
            if (jsonData != undefined) {
                console.log(jsonData);

                for (let i = 0; i < jsonData["data"].length; i++) {
                    jsonData["data"][i]["id"] = i;
                }

                setCompany_list_original([].concat(jsonData["data"]))
                setCompany_list_copy([].concat(jsonData["data"]))
                // console.log(company_list_original)
            }
        }
    }, []);

    function handleRedirect(id) {
        
        history.push("/company/edit_company/" + id)
    }

    async function handleDelete(id)
    {
        console.log(id)
        let Resp = await axios({
            method: 'post',
            url: "/company/deleteCompany/" + id,
        });

        console.log(Resp)
        const params1 = {
            data: Resp.data,
            HandleToast: {
                toast: toast,
                flag: false
            }
        };
        responsePipelineHandler(params1, 1);

        let updatedDetails = company_list_original.filter((e) => {
            return id != e.Company_ID
        })
        setCompany_list_original([].concat(updatedDetails))
        setCompany_list_copy([].concat(updatedDetails))
        handleClose()
    }


    let temp_id = '';

    const rows = [];
    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Company_ID', headerName: 'Company ID', width: 200, editable: false, hide: true },
        {
            field: 'View',
            headerName: 'Delete | Edit | View',
            sortable: false,
            width: 172,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                temp_id = params.row.Company_ID;
            },
            renderCell: (id) => {
                return (
                    // <Button
                    //     variant="contained"
                    //     onClick={() => {
                    //         history.push('/company/view_company/' + temp_id);
                    //     }}
                    //     color="primary"
                    //     startIcon={<IconEye />}
                    // >
                    //     View Full Company
                    // </Button>
                    <>
                    <IconButton color="primary" 
                        component="span"
                        onClick={handleOpen}
                        aria-label="upload picture">
                        <DeleteIcon />
                    </IconButton>
                    <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography style={{ "color": "#616161" }} id="modal-modal-title" variant="h3" component="h1">
                                    Are, you really sure want to delete this company?
                                </Typography><br />
                                <Grid container spacing={2} justifyContent={""}>
                                    <Grid md={6} item>
                                        <Button fullWidth style={{ color: "white", backgroundColor: "#00C853" }} variant="contained"
                                            onClick={() => handleDelete(temp_id)}
                                        >
                                            Confirm
                                        </Button>
                                    </Grid>
                                    <Grid md={6} item>
                                        <Button fullWidth color='error' variant="contained" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Modal>
                    <IconButton color="primary" 
                        onClick={() => handleRedirect(temp_id)}
                        aria-label="upload picture" component="span">
                            <EditIcon />
                        </IconButton>
                    <IconButton color="primary"
                    onClick={() => {
                                history.push('/company/view_company/' + temp_id);
                            }}
                    aria-label="upload picture" component="span">
                        <VisibilityIcon />
                    </IconButton>
                    </>
                );
            }
        },
        { field: 'Company_name', headerName: 'Company Name', width: 200, editable: false },
        { field: 'City', headerName: 'City', width: 180, editable: false },
        { field: 'Contact_person_1_name', headerName: 'Contact Person Name', width: 230, editable: false },
        { field: 'Contact_person_1_email_ID', headerName: 'Contact Person Email', width: 230, editable: false },
        { field: 'Contact_person_1_Mobile', headerName: 'Contact Person Mobile', width: 230, editable: false },

        // hidden columns
        { field: 'Contact_person_1_designation', headerName: 'Contact Person Designation', width: 270, editable: false, hide: true },
        { field: 'Company_address', headerName: 'Company Address', width: 300, editable: false, hide: true },
        { field: 'Contact_person_2_name', headerName: 'Contact Person 2 Name', width: 240, editable: false, hide: true },
        { field: 'Contact_person_2_email_ID', headerName: 'Contact Person 2 Email', width: 250, editable: false, hide: true },
        { field: 'Contact_person_2_designation', headerName: 'Contact Person 2 Designation', width: 280, editable: false, hide: true },
        { field: 'Contact_person_2_Mobile', headerName: 'Contact Person 2 Mobile', width: 240, editable: false, hide: true },
        { field: 'Contact_person_3_name', headerName: 'Contact Person 3 Name', width: 240, editable: false, hide: true },
        { field: 'Contact_person_3_email_ID', headerName: 'Contact Person 3 Email', width: 240, editable: false, hide: true },
        { field: 'Contact_person_3_designation', headerName: 'Contact Person 3 Designation', width: 280, editable: false, hide: true },
        { field: 'Contact_person_3_Mobile', headerName: 'Contact Person 3 Mobile', width: 240, editable: false, hide: true },
        { field: 'Company_web_site', headerName: 'Company Website', width: 230, editable: false, hide: true },
        { field: 'Remarks', headerName: 'Remarks', width: 200, editable: false, hide: true },
        { field: 'Company_offer_type', headerName: 'Company Offer Type', width: 230, editable: false, hide: true},
        { field: 'State', headerName: 'State', width: 200, editable: false, hide: true}

    ];

    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    function handleSearch(e) {
        console.log(e.target.value)
        setSearch(e.target.value);

        let temp = [];
        for (let i = 0; i < company_list_original.length; i++) {
            let keys = Object.keys(company_list_original[i])
            // console.log(keys)
            for (let j = 0; j < keys.length; j++) {
                let key = keys[j];
                // console.log(company_list_original[i])
                // console.log(key)
                let value = company_list_original[i][key].toString().toLowerCase();
                if (value.includes(e.target.value.toString().toLowerCase())) {
                    temp.push(company_list_original[i])
                    break;
                }
            }

        }

        setCompany_list_copy(temp);

    }

    // function handleSearch(e) {
    //     console.log(e.target.value);
    //     setSearch(e.target.value);
    //     let searchText = e.target.value == '' ? ' ' : e.target.value;
    //     var root = document.getElementsByClassName('MuiGrid-root MuiGrid-container')[0].children;
    //     console.log(root);
    //     for (let i = 0; i < root.length; i++) {
    //         var elem = document.getElementById(root[i].id);
    //         console.log(elem);
    //         var elemText = elem.innerText.toLowerCase();
    //         if (!elemText.includes(searchText.toLowerCase())) {
    //             $(elem).hide();
    //         } else {
    //             $(elem).show();
    //         }
    //     }
    // }

    return (
        <>
            {/* /**{ (setData(data)).map((e) => {return e})} */}
            <MainCard title="View Company">
                <TextField label="Search" value={search} onInput={(e) => handleSearch(e)} fullWidth></TextField>
                <br />
                <br />
                <br />
                {company_list_original === undefined ? (
                    ''
                ) :
                    // required_data['data'] == 'No Student data!'
                    company_list_original.length == 0
                        ?
                        (
                            <>
                                <ChipCard loading={false} data={<EmptyCompany />} />
                            </>
                            // <SubCard>
                            //     <Grid container spacing={2}>
                            //         <Grid item xs={12} md={10}>
                            //             <Typography variant="h2">No Company is added yet!!!</Typography>
                            //         </Grid>
                            //         <Grid item xs={12} md={2}>
                            //         <Button variant="contained" 
                            //             size='large'
                            //             startIcon={<IconCirclePlus />} 
                            //             color="primary"
                            //             onClick={() => {
                            //                 history.push('/company/add_company');
                            //             }}
                            //             > Add </Button>
                            //         </Grid>
                            //     </Grid>
                            // </SubCard>
                        ) : (
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    checkboxSelection
                                    rows={company_list_copy === undefined ? [] : company_list_copy}
                                    columns={columns}
                                    components={{
                                        Toolbar: CustomToolbar
                                    }}
                                />
                            </div>
                            // <h1>keval Gandevia</h1>
                            // <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            //     {loading
                            //         ? ''
                            //         : required_data['data'].map((e) => {
                            //               return (
                            //                   <>
                            //                       <Grid item xs={12} md={12} id={e.Company_ID}>
                            //                           <SubCard title={e['Company_name']}>
                            //                               <List dense={false}>
                            //                                   <ListItem>
                            //                                       <Typography variant="h5">Roles :</Typography>
                            //                                       {e['Company_offer_type']}
                            //                                   </ListItem>
                            //                                   <ListItem>
                            //                                       <Typography variant="h5">Address :</Typography>
                            //                                       {e['Company_address']}
                            //                                   </ListItem>
                            //                                   <ListItem>
                            //                                       <Typography variant="h5">City :</Typography>
                            //                                       {e['City'] + ' ' + e['State']}
                            //                                   </ListItem>
                            //                               </List>

                            //                               <Button
                            //                                   size="large"
                            //                                   onClick={() => {
                            //                                       history.push('/company/view_company/' + e['Company_ID']);
                            //                                   }}
                            //                                   fullWidth
                            //                                   className={classes.applyBtn}
                            //                               >
                            //                                   View Details
                            //                               </Button>
                            //                           </SubCard>
                            //                       </Grid>
                            //                   </>
                            //               );
                            //           })}
                            //     {/* <Grid item xs={12} md={12}>
                            //     <SubCard title="Infosys">
                            //         <Typography variant="h5">Description</Typography>
                            //         <List dense={true}>
                            //             <ListItem>
                            //                 ABOUT : Infosys Limited is an Indian multinational information technology company
                            //                 that provides business consulting, information technology and outsourcing services
                            //             </ListItem>
                            //         </List>

                            //     </SubCard>
                            // </Grid>
                            // <Grid item xs={12} md={12}>
                            //     <SubCard title="TCS">
                            //         <Typography variant="h5">Description</Typography>
                            //         <List dense={true}>
                            //             <ListItem>
                            //                 ABOUT : Tata Consultancy Services is an Indian multinational information technology services and
                            //                 consulting company headquartered in Mumbai, Maharashtra, India with its largest campus located in Chennai, Tamil Nadu, India.
                            //             </ListItem>
                            //         </List>

                            //     </SubCard>
                            // </Grid>
                            // <Grid item xs={12} md={12}>
                            //     <SubCard title="Jio Platforms">
                            //         <Typography variant="h5">Description</Typography>
                            //         <List dense={true}>
                            //             <ListItem>
                            //                 ABOUT : Jio Platforms is an Indian technology company and a subsidiary of
                            //                 Reliance Industries, headquartered in Mumbai, India.
                            //             </ListItem>
                            //         </List>

                            //     </SubCard>
                            // </Grid> */}
                            // </Grid>
                        )}
            </MainCard>
        </>
    );
}

export default ViewCompany;
