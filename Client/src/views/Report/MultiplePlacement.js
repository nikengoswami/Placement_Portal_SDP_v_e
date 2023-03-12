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

export default function MultiplePlacement() {

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
            response = await UsePost('/reports/multiplePlacements', { Passed_out_year: e.target.value }, 'POST');

            if (response != undefined) {

                // let length = Object.keys(response["data"]).length; 
                // console.log(length);

                var ids = [];

                for (let keys in response["data"]) {
                    // console.log(keys);
                    ids.push(keys);
                }

                // console.log(ids);

                // for (var prop in response["data"]) {
                //     console.log(response["data"][prop]["Student_Information"]["Student_Name"]);
                // }

                var data = Object.keys(response["data"]).map((key) => [Number(key), response["data"][key]]);

                // console.log(data.length);

                // console.log(data);

                for (let i = 0; i < data.length; i++) {
                    console.log(data[i][1]["Student_Information"]["Student_Name"]);
                }

                var data1 = [];

                for (let i = 0; i < data.length; i++) {
                    // console.log(data[i][1]);
                    data[i][1]['id'] = i;
                    data[i][1]['Student_ID'] = ids[i];
                    data[i][1]['Student_Name'] = data[i][1]["Student_Information"]["Student_Name"];
                    data1.push(data[i][1]);
                }


                // console.log(data1);

                setCount(data.length);
                setStudentDetails(data1);
                setStudentDetailsCopy(data1);
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
            setStudentDetailsCopy(studentDetails);
        }

    }

    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Student_ID', headerName: 'Student ID', width: 150, editable: false },
        { field: 'Student_Name', headerName: 'Name', width: 250, editable: false },
        { field: 'Companies', headerName: 'Companies', width: 500, editable: false }
    ];

    return (
        <MainCard title="View / Download Multiple Student Placement Report">
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
                                Total students who got multiple placements : {count == "undefined" ? "" : count}
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
