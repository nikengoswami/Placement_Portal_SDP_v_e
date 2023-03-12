import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { useHistory, useLocation } from 'react-router';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import { Paper, Typography, Box, Grid, IconButton, Button, ListItem, List } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function SingleCompanyDetails() {
    const company_id = useLocation().pathname.split('/')[3];
    const batch_year = useLocation().pathname.split('/')[4];
    console.log(company_id);

    const [studentDetails, setStudentDetails] = useState([]);
    const [studentDetailsCopy, setStudentDetailsCopy] = useState([]);
    const [companyDetails, setCompanyDetails] = useState(undefined);

    const history = useHistory();

    useEffect(async () => {
        let response = undefined;
        response = await fetch('/reports/singleCompanyDetails/' + company_id + '/' + batch_year);

        if (response != undefined) {
            let studentData = undefined;
            studentData = await response.json();
            if (studentData != undefined) {
                let data = studentData['data'];
                // console.log(data)
                setStudentDetails(data['Student_list']);
                setStudentDetailsCopy(data['Student_list']);
                setCompanyDetails(data['Company_details']);
            }
        }
    }, []);

    const rows = [];
    let temp_id = '';
    const columns = [
        {
            field: 'View',
            headerName: 'View',
            sortable: false,
            width: 90,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                temp_id = params.row.Student_ID;
            },
            renderCell: (id) => {
                return (
                    <>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                history.push('/student/view_student_profile/' + temp_id);
                            }}
                            aria-label="upload picture"
                            component="span"
                        >
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
        { field: 'Contact_No_2', headerName: 'Contact No 2', width: 167, editable: false }
    ];

    return (
        <>
            <MainCard title={companyDetails === undefined ? '' : companyDetails['Company_name'] + ' - ' + batch_year}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        checkboxSelection
                        rows={studentDetailsCopy}
                        columns={columns}
                        components={{
                            Toolbar: CustomToolbar
                        }}
                    />
                </div>
            </MainCard>
        </>
    );
}

export default SingleCompanyDetails;
