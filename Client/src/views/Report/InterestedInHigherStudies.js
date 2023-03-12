import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField } from '@material-ui/core';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import UsePost from '../../Utilities/UsePost';
import ChipCard from "../../ui-component/cards/GenericCards/ChipCard"
import { withStyles } from '@material-ui/styles';
const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function InterestedInHigherStudies() {

    const [studentDetails, setStudentDetails] = useState([]);

    const [studentDetailsCopy, setStudentDetailsCopy] = useState([]);

    const [batchYear, setBatchYear] = useState({
        Passed_out_year: ''
    });

    const [tableExist, setTableExist] = useState(false);

    const [count, setCount] = useState("undefined");

    async function handleChange(e) {
        setBatchYear({ ...batchYear, Passed_out_year: e.target.value });

        if (e.target.value.length == 4) {
            let response = undefined;
            response = await UsePost('/reports/studentsInterestedInHigherStudies', { Passed_out_year: e.target.value }, 'POST');

            if (response != undefined) {
                // console.log(response["data"]);
                for (let i = 0; i < response["data"].length; i++) {
                    response["data"][i]["id"] = i;
                }

                setCount(response["data"].length);
                setStudentDetails(response["data"]);
                setStudentDetailsCopy(response["data"]);
                setTableExist(true);
            }
        }
    }

    const [search, setSearch] = useState('');

    function handleSearch(e) {
        console.log(e.target.value);
        setSearch(e.target.value);

        if (e.target.value != "") {
            let temp = [];
            for (let i = 0; i < studentDetails.length; i++) {
                let keys = Object.keys(studentDetails[i]);
                // console.log(keys);
                for (let j = 0; j < keys.length; j++) {
                    let key = keys[j];
                    let value = studentDetails[i][key].toString().toLowerCase();
                    if (value.includes(e.target.value.toString().toLowerCase())) {
                        temp.push(studentDetails[i]);
                        break;
                    }
                }

            }
            setStudentDetailsCopy(temp);
        }
        else {
            setStudentDetailsCopy(studentDetails)
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Student_ID', headerName: 'Student ID', width: 150, editable: false },
        { field: 'FirstName', headerName: 'First Name', width: 200, editable: false },
        { field: 'MiddleName', headerName: 'Middle Name', width: 200, editable: false },
        { field: 'LastName', headerName: 'Last Name', width: 200, editable: false },
        { field: 'Contact_No_1', headerName: 'Contact No 1', width: 200, editable: false },
        { field: 'Contact_No_2', headerName: 'Contact No 2', width: 200, editable: false }
    ];

    return (
        <MainCard title="View / Download Student Interested In Higher Studies Report">
            <TextField
                fullWidth
                label="Enter Passed Out Year"
                onInput={(e) => {
                    handleChange(e)
                }}
                id="fullWidth"
            />
            <br />
            <br />
            {!tableExist ? "" :
                <>
                    <ChipCard
                        data={

                            <WhiteTextTypography
                                variant="h1"
                                color="secondary"
                            >
                                Total students who are interested in higher studies : {count == "undefined" ? "" : count}
                            </WhiteTextTypography>
                        }
                    >

                    </ChipCard>
                    <br />
                    <br />
                    <TextField
                        label="Search"
                        value={search}
                        onInput={(e) => handleSearch(e)}
                        fullWidth
                    >
                    </TextField>
                    <br />
                    <br />
                    <br />
                    <div style={{ height: 400, width: '100%' }}>

                        <DataGrid
                            checkboxSelection
                            editMode="row"
                            rows={studentDetailsCopy}
                            columns={columns}
                            components={{
                                Toolbar: CustomToolbar
                            }}
                        />
                    </div>
                </>
            }


        </MainCard>
    )
}

export default InterestedInHigherStudies