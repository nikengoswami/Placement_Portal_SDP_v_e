import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField, Button } from '@material-ui/core';
import UsePost from '../../Utilities/UsePost';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import { useHistory } from 'react-router';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import HandleToast from '../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
import { IconDashboard, IconCirclePlus, IconDeviceAnalytics, IconSpeakerphone, IconEye } from '@tabler/icons';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function GetReportCompany() {
    const [companyDetails, setCompanyDetails] = useState([]);
    const [batchYear, setBatchYear] = useState({
        Passed_out_year: ''
    });
    const [tableExist, setTableExist] = useState(false);
    const history = useHistory();

    async function handleChange(e) {
        setBatchYear({ ...batchYear, Passed_out_year: e.target.value });

        if (e.target.value.length == 4 || e.target.value.toLowerCase() == "all") {
            let res = undefined;
            res = await UsePost('/reports/placedStudentsByCompany', { Passed_out_year: e.target.value }, 'POST');

            if (res != undefined) {

                console.log(res["data"])

                for (let i = 0; i < res['data'].length; i++) {
                    res['data'][i]['id'] = i;
                }
                console.log(res["data"])
                setCompanyDetails(res['data']);
                setTableExist(true);
            }
        }
    }

    let temp_id = '';

    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Company_ID', headerName: 'Company ID', hide: true },
        { field: 'Company_name', headerName: 'Company Name', width: 220, editable: false },
        { field: 'Student_Count', headerName: 'Placed Students', width: 220, editable: false },
        {
            field: 'View',
            headerName: 'View',
            sortable: false,
            width: 200,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                temp_id = params.row.Company_ID;
            },
            renderCell: (id) => {
                return (
                    <Button
                        variant="contained"
                        onClick={() => {
                            history.push('/reports/single_company_details/' + temp_id + "/" + batchYear["Passed_out_year"]);
                        }}
                        color="primary"
                        startIcon={<IconEye />}
                    >
                        View Details
                    </Button>

                );
            }
        },
    ];

    return (
        <MainCard title="View / Download Placed Students By Company Report">
            <TextField
                fullWidth
                // required
                label="Passed Out Year"
                id="fullWidth"
                helperText="Enter passed out year"
                onInput={(e) => {
                    handleChange(e);
                }}
            // value={batchYear['Passed_out_year']}
            // onChange={(e) => {
            //     setBatchYear({ ...batchYear, Passed_out_year: e.target.value });
            // }}
            />

            <br />
            <br />
            {!tableExist ? ""
                :
                <>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            checkboxSelection
                            rows={companyDetails}
                            columns={columns}
                            components={{
                                Toolbar: CustomToolbar
                            }}
                        />
                    </div>
                </>

            }
        </MainCard>
    );
}

export default GetReportCompany;
