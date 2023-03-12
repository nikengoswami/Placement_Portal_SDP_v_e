import React, { useState, useEffect } from 'react';

import MainCard from '../../ui-component/cards/MainCard';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import { Paper, Typography, Box, Grid, Button, ListItem, List } from '@material-ui/core';
import { IconDashboard, IconCirclePlus, IconDeviceAnalytics, IconSpeakerphone } from '@tabler/icons';
import UseFetch from '../../Utilities/UseFetch';
import SubCard from './../../ui-component/cards/SubCard';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useHistory } from 'react-router-dom';
import ChipCard from '../../ui-component/cards/GenericCards/ChipCard';
import EmptyStudent from './JSX/EmptyStudent';
import { TextField } from '@material-ui/core';
import UsePost from '../../Utilities/UsePost';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import ViewConfig from '../../Config/ViewConfig';


function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
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
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    const history = useHistory();
    const [search, setSearch] = useState('');
    const curDate = new Date(Date.now()).getFullYear()
    const [date, setDate] = useState(curDate.toString())
    const [student_list_original, setStudent_list_original] = useState([]);
    const [student_list_copy, setStudent_list_copy] = useState([]);

    useEffect(async () => {
        let response = undefined;
        response = await fetch("/student/getAllStudentPasswords", { method: "POST" })

        if (response != undefined) {
            let jsonData = undefined
            jsonData = await response.json()
            if (jsonData != undefined) {
                console.log(jsonData);

                for (let i = 0; i < jsonData["data"].length; i++) {
                    jsonData["data"][i]["id"] = i;
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
                let value = student_list_original[i][key].toString().toLowerCase();
                if (value.includes(e.target.value.toString().toLowerCase())) {
                    temp.push(student_list_original[i])
                    break;
                }
            }

        }

        setStudent_list_copy(temp);

    }




    const [columns, setcolumns] = useState([


        { field: 'id', headerName: 'ID', hide: true },
        { field: 'StudentId', headerName: 'Student ID', width: 200, editable: true },
        { field: 'FirstTimePassword', headerName: 'First Time Passwords', width: 300, editable: true },


    ]);
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowsModelChange = React.useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);

    function handleCellClick(params) {
        console.log(params);
    }

    function HandleDateChanged(e) {
        const dateNow = new Date(e).getFullYear().toString();
        // let yearNew = dateNow[2] + dateNow[3]
        let yearNew = dateNow
        // console.log("from line 126",yearNew)
        setDate(dateNow)
        const filteredList = student_list_original.filter((elem) => {
            // console.log("from line 129", elem)
            let year = elem.Passed_out_year
            // console.log("from line 131", year)
            year = new Date(year).getFullYear().toString()
            // console.log("from line 133", year)
            // let year = elem.StudentId[0] + elem.StudentId[1]
            // year = year.toString()
            if (yearNew.toString() == year) {
                return elem
            }
        })
        setStudent_list_copy(filteredList)
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function HandleSendPasswords() {
        handleOpen()
        const dateNow = new Date(date).getFullYear().toString();
        // let yearNew = dateNow[2] + dateNow[3]
        // console.log(yearNew)
        const resp = await UsePost("/student/sendPasswords", { curYear: dateNow }, "POST")
        console.log(resp)
        const params1 = {
            data: resp,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        // console.log(res);
        handleClose()
        responsePipelineHandler(params1, 1)

    }

    return (
        <MainCard title={ViewConfig.admin.student.student_passwords.title}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CircularProgress style={style} color="primary" />
            </Modal>
            <Grid container spacing={2} >
                <Grid item xs={12} md={12}>
                    <TextField label="Search" value={search} onInput={(e) => handleSearch(e)} fullWidth></TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year']}
                            label="Passed Out Year"
                            onChange={(e) => HandleDateChanged(e)}
                            // required
                            value={date}
                            // onChange={(e) => {
                            //     setData({ ...data, Passed_out_year: e });
                            // }}
                            renderInput={(params) => <TextField fullWidth {...params} helperText={null} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <br />
            <Grid container>
                <Grid item>
                    <Button variant="contained" onClick={() => HandleSendPasswords()} color='success' style={{ "color": "white" }}>{ViewConfig.admin.student.student_passwords.btn_send_passwords}</Button>
                </Grid>
                <Grid item padding={1}>
                    <Typography variant="h6">
                        {ViewConfig.admin.student.student_passwords.note}
                    </Typography>
                </Grid>

            </Grid>
            <br />


            <div style={{ height: 400, width: '100%' }}>
                {student_list_original.length == 0 ? (
                    <>
                        <ChipCard loading={false} data={<EmptyStudent />} />
                    </>
                ) : (
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
