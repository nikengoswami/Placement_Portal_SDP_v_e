import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Grid, Button, ListItem, List } from '@material-ui/core';
// import { useTheme } from '@material-ui/styles';
import MainCard from './../../ui-component/cards/MainCard';
// import SubCard from './../../ui-component/cards/SubCard';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';
// import { color } from '@material-ui/system';
// import { ClassNames } from '@emotion/react';
import { TextField, IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
// import $, { param } from 'jquery';
// import usePost from '../../Utilities/UsePost';
import ParseDate from '../../Utilities/ParseDate';
// import HandleToast from '../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
// import UseFetch from '../../Utilities/UseFetch';
import { useHistory } from 'react-router-dom';
import SearchSection from '../../layout/MainLayout/Header/SearchSection';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import { IconEye, IconCirclePlus } from '@tabler/icons';
import ChipCard from '../../ui-component/cards/GenericCards/ChipCard';
import EmptyAnnouncement from './JSX/EmptyAnnouncement';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@mui/material/Modal';

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
        color: '#FFFFFF'
    }
})(Typography);
const LightBlueTextTypography = withStyles({
    root: {
        color: '##e3f2fd'
    }
});

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const axios = require("axios")

function ViewAnnoucements() {
    const classes = useStyles();

    // const { required_data, loading } = UseFetch('/annoucement/getAllAnnoucements/', 'GET');

    // var annoucements = [];
    // if (!loading) {
    //     // console.log(required_data);
    //     if (required_data['data'] != 'No Student data!') {
    //         for (let i = 0; i < required_data['data'].length; i++) {
    //             var obj = {};
    //             obj = required_data['data'][i];
    //             obj['id'] = i;
    //             // console.log(required_data['data'][i])
    //             let title =
    //                 required_data['data'][i]['Company_details']['Company_name'] +
    //                 '-' +
    //                 required_data['data'][i]['Job_Role'] +
    //                 ' for ' +
    //                 ParseDate.getYear(required_data['data'][i]['Passed_out_year']) +
    //                 ' Batch';
    //             obj['title'] = title;
    //             console.log(title);
    //             annoucements.push(obj);
    //         }
    //         console.log(annoucements);
    //     }
    // }
    // if (!loading) {
    //     // console.log(required_data["data"])
    //     if(required_data["data"] != "No Announcement data!")
    //     {
    //         annoucements = required_data['data'];
    //     }
    //     console.log(annoucements);
    // }

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

    const [search, setSearch] = useState('');
    const [announcement_list_original, setAnnouncement_list_original] = useState([]);
    const [announcement_list_copy, setAnnouncement_list_copy] = useState([]);

    useEffect(async () => {
        let response = undefined;
        response = await fetch("/annoucement/getAllAnnoucements/", { method: "GET" })

        if (response != undefined) {
            let jsonData = undefined
            jsonData = await response.json()
            if (jsonData != undefined) {
                console.log(jsonData);

                for (let i = 0; i < jsonData["data"].length; i++) {
                    jsonData["data"][i]["id"] = i;

                    jsonData["data"][i]["Date_of_Visit"] = ParseDate.ParseDate(jsonData["data"][i]["Date_of_Visit"]);

                    jsonData["data"][i]["Date_of_announcement"] = ParseDate.ParseDate(jsonData["data"][i]["Date_of_announcement"]);

                    jsonData["data"][i]["Passed_out_year"] = ParseDate.getYear(jsonData["data"][i]["Passed_out_year"]);

                    jsonData["data"][i]["Registration_Deadline"] = ParseDate.ParseDate(jsonData["data"][i]["Registration_Deadline"], true);


                    jsonData["data"][i]["title"] = jsonData['data'][i]['Company_details']['Company_name'] +
                        '-' +
                        jsonData['data'][i]['Job_Role'] +
                        (
                            jsonData['data'][i]['Passed_out_year'] == null || jsonData['data'][i]['Passed_out_year'] == undefined ? " for all batch year" :
                                ' for ' +
                                ParseDate.getYear(jsonData['data'][i]['Passed_out_year']) +
                                ' Batch');


                }

                setAnnouncement_list_original([].concat(jsonData["data"]))
                setAnnouncement_list_copy([].concat(jsonData["data"]))
                console.log(jsonData["data"]);

                // console.log()
            }
        }

    }, []);


    function handleSearch(e) {
        console.log(e.target.value)
        setSearch(e.target.value);

        let temp = [];
        for (let i = 0; i < announcement_list_original.length; i++) {
            let keys = Object.keys(announcement_list_original[i])
            // console.log(keys)
            for (let j = 0; j < keys.length; j++) {
                let key = keys[j];
                // console.log(announcement_list_original[i])
                // console.log(key)
                let value;
                if (announcement_list_original[i][key] != undefined) {

                    value = announcement_list_original[i][key].toString().toLowerCase();
                    if (value.includes(e.target.value.toString().toLowerCase())) {
                        temp.push(announcement_list_original[i])
                        break;
                    }
                }
            }

        }
        console.log(temp);

        setAnnouncement_list_copy(temp);

    }


    let history = useHistory();

    function handleRedirect(id) {
        history.push('/announcement/view_annoucement/' + id);
    }

    function handleEdit(id) {
        console.log(id);
        history.push('/announcement/edit_announcement/' + id)
    }

    // function handleSearch(e) {
    //     console.log(e.target.value);
    //     setSearch(e.target.value);
    //     let searchText = e.target.value == '' ? ' ' : e.ta1qrget.value;
    //     var root = document.getElementsByClassName('MuiGrid-root MuiGrid-container')[0].children;
    //     console.log(root);
    //     for (let i = 0; i < root.length; i++) {
    //         var elem = document.getElementById(root[i].id);
    //         var elemText = elem.innerText.toLowerCase();
    //         if (!elemText.includes(searchText.toLowerCase())) {
    //             $(elem).hide();
    //         } else {
    //             $(elem).show();
    //         }
    //     }
    // }

    async function handleDelete(id) {
        console.log("hello here in delete")
        console.log(id)
        let Resp = await axios({
            method: 'post',
            url: "/annoucement/deleteAnnoucement/" + id,
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

        let updatedDetails = announcement_list_original.filter((e) => {
            return id != e.Announcement_ID
        })
        setAnnouncement_list_original([].concat(updatedDetails))
        setAnnouncement_list_copy([].concat(updatedDetails))
        handleClose()
    }

    let Announcement_ID = '';
    const rows = [];
    // const [columns, setcolumns] = useState([
    const columns = [
        {
            field: 'view',
            headerName: 'Delete | Edit | View',
            sortable: false,
            width: 172,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                Announcement_ID = params.row.Announcement_ID;
            },
            renderCell: (id) => {
                return (
                    // <Button variant="contained" onClick={() => handleRedirect(Announcement_ID)} color="primary" startIcon={<IconEye />}>
                    //     View Full Announcement
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
                                    Are, you really sure want to delete this announcement?
                                </Typography><br />
                                <Grid container spacing={2} justifyContent={""}>
                                    <Grid md={6} item>
                                        <Button fullWidth style={{ color: "white", backgroundColor: "#00C853" }} variant="contained"
                                            onClick={() => handleDelete(Announcement_ID)}
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
                            onClick={() => handleEdit(Announcement_ID)}
                            aria-label="upload picture" component="span">
                            <EditIcon />
                        </IconButton>
                        <IconButton color="primary"
                            onClick={() => handleRedirect(Announcement_ID)}
                            aria-label="upload picture" component="span">
                            <VisibilityIcon />
                        </IconButton>
                    </>
                );
            }
        },
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'title', headerName: 'Title', width: 300, editable: false },
        { field: 'Date_of_Visit', headerName: 'Date of Visit', width: 180, editable: false },
        { field: 'Registration_Deadline', headerName: 'Registration Deadline', width: 220, editable: false },
        { field: 'Salary', headerName: 'Salary', width: 155, editable: false, hide: false },

        // hidden columns
        // { field: 'Announcement_ID', headerName: 'Announcement ID', width: 200, editable: false },
        // { field: 'Company_ID', headerName: 'Company ID', width: 200, editable: false },
        { field: 'Date_of_announcement', headerName: 'Date of announcement', width: 230, editable: false, hide: true },
        {
            field: 'Eligible_Branches', headerName: 'Eligible Branches', width: 200, editable: false, hide: true,
            renderCell: (id) => {
                console.log(id)
            }


        },
        { field: 'Passed_out_year', headerName: 'Passed out year', width: 200, editable: false, hide: true },
        { field: 'Job_Role', headerName: 'Job Role', width: 200, editable: false, hide: true },
        { field: 'Job_Location', headerName: 'Job Location', width: 200, editable: false, hide: true },
        { field: 'Bond_Details', headerName: 'Bond Details', width: 200, editable: false, hide: true },
        { field: 'Other_Details', headerName: 'Other Details', width: 200, editable: false, hide: true },
        { field: 'Eligibility', headerName: 'Eligibility', width: 185, editable: false, hide: true },
        { field: 'IsOpen', headerName: 'IsOpen', width: 165, editable: false, hide: true }
        // ]);
    ];

    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowsModelChange = React.useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);

    function handleCellClick(params) {
        console.log(params);
    }

    return (
        <>
            <MainCard title="View Announcements">
                <TextField label="Search" value={search} onInput={(e) => handleSearch(e)} fullWidth></TextField>
                <br />
                <br />
                <br />
                <div style={{ height: 400, width: '100%' }}>
                    {announcement_list_original === undefined ? (
                        ''
                    ) : announcement_list_original.length == 0 ? (
                        <>
                            <ChipCard loading={false} data={<EmptyAnnouncement />} />
                        </>
                    ) : (
                        // <SubCard>
                        //     <Grid container spacing={2}>
                        //         <Grid item xs={12} md={10}>
                        //             <Typography variant="h1">No Announcement is added yet!!!</Typography>
                        //         </Grid>
                        //         <Grid item xs={12} md={2}>
                        //             <Button
                        //                 variant="contained"
                        //                 size="large"
                        //                 startIcon={<IconCirclePlus />}
                        //                 color="primary"
                        //                 onClick={() => {
                        //                     history.push('/announcement/add_annoucement');
                        //                 }}
                        //             >
                        //                 {' '}
                        //                 Add{' '}
                        //             </Button>
                        //         </Grid>
                        //     </Grid>
                        // </SubCard>
                        <DataGrid
                            editMode="row"
                            onEditCellChange={handleEditRowsModelChange}
                            onCellClick={handleCellClick}
                            checkboxSelection
                            rows={announcement_list_copy}
                            columns={columns}
                            components={{
                                Toolbar: CustomToolbar
                            }}
                            editRowsModel={editRowsModel}
                            onEditRowsModelChange={handleEditRowsModelChange}
                        />
                    )}
                </div>
            </MainCard>
        </>
    );
}

export default ViewAnnoucements;
