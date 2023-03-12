import React, { useState } from 'react'
import MainCard from '../../ui-component/cards/MainCard'
import {
    DataGrid, RowsProp, ColDef, GridToolbarContainer,
    GridToolbarExport
} from "@material-ui/data-grid";
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone } from '@tabler/icons';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
export default function Announcement() {
    const icons = {
        IconDashboard: IconDashboard,
        IconDeviceAnalytics,
        IconSpeakerphone
    };
    const rows = [
        { id: 1, ID: "19CEUON133", FullName: "Jenil J Gandhi", CPI: "8.89", Semester: 6, CV: icons['IconSpeakerphone'] },
        { id: 2, ID: "19CEUEG017", FullName: "Keval D Gandevia", CPI: "9.34", Semester: 6, CV: icons['IconSpeakerphone'] },
        { id: 3, ID: "19CEUOS102", FullName: "Rikin D Chauhan", CPI: "9.13", Semester: 6, CV: icons['IconSpeakerphone'] },
        { id: 4, ID: "19CEUON112", FullName: "Harsh Patel", CPI: "7.21", Semester: 5, CV: icons['IconSpeakerphone'] },
        { id: 5, ID: "19CEUES017", FullName: "Ansh Shah", CPI: "9.11", Semester: 5, CV: icons['IconSpeakerphone'] },


    ];

    const columns = [
        { field: "id", hide: true },
        { field: "ID", headerName: "ID", width: 150 },
        { field: "FullName", headerName: "Full Name", width: 150, editable: true },
        { field: "CPI", headerName: "CPI", type: 'number', width: 150, editable: true },
        { field: "Semester", headerName: "Semester", type: 'number', width: 150 },
    ];
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);
    return (
        <MainCard title="Announcements">
            <h1>Jenil</h1>
            {/* <code>Editing: {JSON.stringify(editRowsModel)}</code> */}
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid checkboxSelection rows={rows} columns={columns} components={{
                    Toolbar: CustomToolbar,
                }}
                />

            </div>
        </MainCard>
    )
}