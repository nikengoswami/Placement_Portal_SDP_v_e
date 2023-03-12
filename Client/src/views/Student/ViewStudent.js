import React, { useState, useEffect } from 'react';
import {
    useGridApiRef,
    DataGridPro,
    // GridToolbarContainer,
    GridActionsCellItem
} from '@mui/x-data-grid-pro';
import MainCard from '../../ui-component/cards/MainCard';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Paper, Typography, Box, Grid, IconButton, Button, ListItem, List } from '@material-ui/core';
import { IconDashboard, IconEye, IconCirclePlus, IconDeviceAnalytics, IconSpeakerphone } from '@tabler/icons';
import UseFetch from '../../Utilities/UseFetch';
import SubCard from './../../ui-component/cards/SubCard';
import { useHistory } from 'react-router-dom';
import ChipCard from '../../ui-component/cards/GenericCards/ChipCard';
import EmptyStudent from './JSX/EmptyStudent';
import { TextField } from '@material-ui/core';
import { getYear, ParseDate } from '../../Utilities/ParseDate';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import ViewConfig from '../../Config/ViewConfig';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const axios = require("axios")

export default function ViewStudent() {
    const icons = {
        IconDashboard: IconDashboard,
        IconDeviceAnalytics,
        IconSpeakerphone
    };

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

    const history = useHistory();
    const [search, setSearch] = useState('');
    const [student_list_original, setStudent_list_original] = useState([]);
    const [student_list_copy, setStudent_list_copy] = useState([]);

    useEffect(async () => {
        let response = undefined;
        response = await fetch("/student/getAllStudents", { method: "GET" })

        if (response != undefined) {
            let jsonData = undefined
            jsonData = await response.json()
            if (jsonData != undefined) {
                console.log(jsonData);

                for (let i = 0; i < jsonData["data"].length; i++) {
                    jsonData["data"][i]["id"] = i;
                    jsonData["data"][i]["DOB"] = ParseDate(jsonData["data"][i]["DOB"]);
                    jsonData["data"][i]["Enrollment_year"] = getYear(jsonData["data"][i]["Enrollment_year"]);
                    jsonData["data"][i]["Passed_out_year"] = getYear(jsonData["data"][i]["Passed_out_year"]);
                }

                setStudent_list_original([].concat(jsonData["data"]))
                setStudent_list_copy([].concat(jsonData["data"]))
                // console.log(company_list_original)
            }
        }

    }, []);

    function handleSearch(e) {
        console.log(e.target.value)
        setSearch(e.target.value);

        let temp = [];
        for (let i = 0; i < student_list_original.length; i++) {
            let keys = Object.keys(student_list_original[i])
            // console.log(keys)
            for (let j = 0; j < keys.length; j++) {
                let key = keys[j];
                // console.log(company_list_original[i])
                // console.log(key)
                if (student_list_original[i][key] === undefined) {
                    continue;
                }
                let value = student_list_original[i][key].toString().toLowerCase();
                if (value.includes(e.target.value.toString().toLowerCase())) {
                    temp.push(student_list_original[i])
                    break;
                }
            }

        }

        setStudent_list_copy(temp);

    }

    // if (!loading) {
    //     // console.log(required_data);
    //     if (required_data['data'] != 'No Student data!') {
    //         for (let i = 0; i < required_data['data'].length; i++) {
    //             var obj = {};
    //             obj = required_data['data'][i];
    //             // console.log(obj)
    //             students_list.push(obj);
    //         }
    //         console.log(students_list);
    //     }
    // }

    async function handleDelete(id) {
        console.log("hello here in delete")
        console.log(id)
        let Resp = await axios({
            method: 'post',
            url: "/student/deleteStudent/" + id,
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

        let updatedDetails = student_list_original.filter((e) => {
            return id != e.Student_ID
        })
        setStudent_list_original([].concat(updatedDetails))
        setStudent_list_copy([].concat(updatedDetails))
        handleClose()
    }

    let temp_id = "";

    const rows = [];
    // const [columns, setcolumns] = useState([
    const columns = [
        // {
        //     field: 'edit',
        //     headerName: 'Edit',
        //     sortable: false,
        //     width: 130,
        //     disableClickEventBubbling: true,
        //     renderCell: (id) => {
        //         return (
        //             <Button variant="contained" 
        //             // onClick={() => handleClick(id.id)} 
        //             onClick={() => {
        //                 history.push('/student/edit_student/' + id.Student_ID);
        //             }}
        //             color="primary" 
        //             startIcon={<EditIcon />}>
        //                 Edit
        //             </Button>
        //         );
        //     }
        // },
        {
            field: 'edit',
            headerName: 'Delete | Edit | View',
            sortable: false,
            width: 172,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                temp_id = params.row.Student_ID;
            },
            renderCell: (id) => {
                return (
                    <>
                        {/* <Button
                        variant="contained"
                        // style={{'padding' : "0px", "width" : "50%"}}
                        onClick={() => {
                            history.push('/student/edit_student/' + temp_id);
                        }}
                        color="primary"
                        startIcon={<EditIcon />}
                    >
                    </Button> */}
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
                                    {ViewConfig.admin.student.view_student.delete_message}
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
                            onClick={() => {
                                history.push('/student/edit_student/' + temp_id);
                            }}
                            aria-label="upload picture" component="span">
                            <EditIcon />
                        </IconButton>
                        <IconButton color="primary"
                            onClick={() => {
                                history.push('/student/view_student_profile/' + temp_id);
                            }}
                            aria-label="upload picture" component="span">
                            <VisibilityIcon />
                        </IconButton>
                    </>
                );
            }
        },

        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Student_ID', headerName: 'Student ID', width: 150, editable: true },
        { field: 'FirstName', headerName: 'First Name', width: 155, editable: false },
        { field: 'MiddleName', headerName: 'Middle Name', width: 168, editable: false },
        { field: 'LastName', headerName: 'Last Name', width: 155, editable: false },
        { field: 'SSC_Percentage', headerName: 'SSC Percentage', width: 185, editable: false },
        { field: 'HSC_Percentage', headerName: 'HSC Percentage', width: 187, editable: false },
        { field: 'Current_CPI', headerName: 'Current CPI', width: 160, editable: false },
        { field: 'Email_ID', headerName: 'Email ID', width: 180, editable: false },
        { field: 'Contact_No_1', headerName: 'Contact No 1', width: 167, editable: false },
        { field: 'Contact_No_2', headerName: 'Contact No 2', width: 167, editable: false },

        // hidden columns
        { field: 'Admission_type', headerName: 'Admission Type', width: 185, editable: false, hide: true },
        { field: 'Cast_category', headerName: 'Cast Category', width: 175, editable: false, hide: true },
        { field: 'Gender', headerName: 'Gender', width: 135, editable: false, hide: true },
        { field: 'DOB', headerName: 'Date of Birth', width: 170, editable: false, hide: true },
        { field: 'SSC_Percentile', headerName: 'SSC Percentile', width: 180, editable: false, hide: true },
        { field: 'SSC_Board', headerName: 'SSC Board', width: 155, editable: false, hide: true },
        { field: 'SSC_School', headerName: 'SSC School', width: 200, editable: false, hide: true },
        { field: 'HSC_Percentile', headerName: 'HSC Percentile', width: 180, editable: false, hide: true },
        { field: 'HSC_Board', headerName: 'HSC Board', width: 155, editable: false, hide: true },
        { field: 'HSC_School', headerName: 'HSC School', width: 200, editable: false, hide: true },
        { field: 'IsD2D', headerName: 'Is D2D', width: 145, editable: false, hide: true },
        { field: 'Diploma_Result_CPI', headerName: 'Diploma Result CPI', width: 220, editable: false, hide: true },
        { field: 'Diploma_Result_Percentage', headerName: 'Diploma Result Percentage', width: 220, editable: false, hide: true },
        { field: 'Diploma_College_Name', headerName: 'Diploma College Name', width: 200, editable: false, hide: true },
        { field: 'Diploma_University', headerName: 'Diploma University', width: 230, editable: false, hide: true },
        { field: 'Sem_1_SPI', headerName: 'Sem - 1 SPI', width: 165, editable: false, hide: true },
        { field: 'Sem_2_SPI', headerName: 'Sem - 2 SPI', width: 165, editable: false, hide: true },
        { field: 'Sem_3_SPI', headerName: 'Sem - 3 SPI', width: 165, editable: false, hide: true },
        { field: 'Sem_4_SPI', headerName: 'Sem - 4 SPI', width: 165, editable: false, hide: true },
        { field: 'Sem_5_SPI', headerName: 'Sem - 5 SPI', width: 165, editable: false, hide: true },
        { field: 'Sem_6_SPI', headerName: 'Sem - 6 SPI', width: 165, editable: false, hide: true },
        { field: 'Sem_7_SPI', headerName: 'Sem - 7 SPI', width: 165, editable: false, hide: true },
        { field: 'Sem_8_SPI', headerName: 'Sem - 8 SPI', width: 165, editable: false, hide: true },
        { field: 'Enrollment_year', headerName: 'Enrollment Year', width: 200, editable: false, hide: true },
        { field: 'Passed_out_year', headerName: 'Passed Out Year', width: 200, editable: false, hide: true },
        { field: 'Address', headerName: 'Address', width: 200, editable: false, hide: true },
        { field: 'City', headerName: 'City', width: 200, editable: false, hide: true },
        { field: 'Pin_Code', headerName: 'Pin Code', width: 155, editable: false, hide: true },
        { field: 'Current_semester', headerName: 'Current Semester', width: 200, editable: false, hide: true },
        { field: 'Career_Preference', headerName: 'Career Preference', width: 200, editable: false, hide: true },
        { field: 'Skills', headerName: 'Skills', width: 200, editable: false, hide: true },


    // ]);
    ]
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowsModelChange = React.useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);

    function handleCellClick(params) {
        console.log(params);
    }

    return (
        <MainCard title={ViewConfig.admin.student.view_student.title}>
            <TextField label="Search" value={search} onInput={(e) => handleSearch(e)} fullWidth></TextField>
            <br />
            <br />
            <br />
            {/* <code>Editing: {JSON.stringify(editRowsModel)}</code> */}
            <div style={{ height: 500, width: '100%' }}>
                {student_list_original.length == 0 ? (
                    <>
                        <ChipCard loading={false} data={<EmptyStudent />} />
                    </>
                ) : (
                    // <SubCard>
                    //     <Grid container spacing={2}>
                    //         <Grid item xs={12} md={10}>
                    //             <Typography variant="h1">No Stduent is added yet!!!</Typography>
                    //         </Grid>
                    //         <Grid item xs={12} md={2}>
                    //             <Button
                    //                 variant="contained"
                    //                 size="large"
                    //                 startIcon={<IconCirclePlus />}
                    //                 color="primary"
                    //                 onClick={() => {
                    //                     history.push('/student/add_student');
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
                        rows={student_list_copy}
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
    );
}
