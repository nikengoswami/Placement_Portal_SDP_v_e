import { TextField, Typography, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from '../../ui-component/cards/SubCard';
import UsePost from '../../Utilities/UsePost';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import HandleToast from '../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
import ChipCard from '../../ui-component/cards/GenericCards/ChipCard';
import ListCard from '../../ui-component/cards/GenericCards/ListCard';
import PlacementDetailsCard from './JSX/PlacementDetailsCard'
import ConvertToLPA from '../../Utilities/ConvertToLPA';


function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function GetPlacementReport() {
    const [placementDetails, setPlacementDetails] = useState(undefined);
    const [placementTableDetails, setPlacementTableDetails] = useState([]);

    const [batchYear, setBatchYear] = useState({
        Passed_out_year: ''
    });

    const [detailsCard, setDetailsCard] = useState(false);

    // useEffect(async () => {
    //     let response = undefined;
    //     response = await fetch('/reports/getPlacementReportByBatchYear/');

    //     if (response != undefined) {
    //         let placementsData = undefined;
    //         placementsData = await response.json();
    //         if (placementsData != undefined) {
    //             let data = placementsData['data'];
    //             console.log(data);
    //         }
    //     }
    // }, []);

    async function handleChange(e) {
        setBatchYear({ ...batchYear, Passed_out_year: e.target.value });

        if (e.target.value.length == 4) {
            console.log(e.target.value)
            // let updated_details = studentPlacementStateDetails;
            let res = undefined;
            res = await UsePost('/reports/getPlacementReportByBatchYear', { Passed_out_year: e.target.value }, 'POST');

            if (res != undefined) {
                // for (let i = 0; i < res['data'][0].length; i++) {
                //     res['data'][0][i]['row_id'] = i;
                // }
                console.log(res["data"])
                if (res["data"][0].length == 0) {
                    setPlacementTableDetails(res["data"][0])
                    setPlacementDetails(res['data'][1]);
                    setDetailsCard(true);
                }
                else {
                    console.log(res['data'][0]);
                    setPlacementTableDetails(res['data'][0]);
                    setPlacementDetails(res['data'][1]);
                    setDetailsCard(true);
                }

            }
            // const params1 = {
            //     data: res,
            //     HandleToast: {
            //         toast: toast,
            //         flag: false
            //     }
            // };
            // console.log(res);
            // responsePipelineHandler(params1, 1);
        }
    }

    const columns = [
        { field: 'row_id', headerName: 'ID', hide: true },
        { field: 'Student_ID', headerName: 'Student ID', width: 150, editable: false },
        { field: 'Student_Name', headerName: 'Student Name', width: 200, editable: false },
        { field: 'Company_name', headerName: 'Company Name', width: 220, editable: false },
        { field: 'Designation', headerName: 'Designation', width: 220, editable: false },
        {
            field: 'Salary', headerName: 'Salary', width: 180, editable: false,
            renderCell: (id) => {
                // console.log(id)

                return ConvertToLPA(id.row.Salary)

            }
        },
    ];

    return (
        <MainCard title="View / Download Placement Report">
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
            {!detailsCard ? (
                ''
            ) : (
                <>
                    <ListCard data={<PlacementDetailsCard placementDetails={placementDetails} />} />
                    <br />
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            checkboxSelection
                            rows={placementTableDetails}
                            columns={columns}
                            components={{
                                Toolbar: CustomToolbar
                            }}
                        />
                    </div>
                </>
            )}
        </MainCard>
    );
}

export default GetPlacementReport;
