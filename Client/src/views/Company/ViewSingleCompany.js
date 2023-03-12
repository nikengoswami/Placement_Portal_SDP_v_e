import React from 'react'
import MainCard from '../../ui-component/cards/MainCard'
import { useHistory, useLocation } from 'react-router'
import UseFetch from '../../Utilities/UseFetch'
import { Button, Typography } from '@material-ui/core'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HandleNull from '../../Utilities/HandleNull';


export default function ViewSingleCompany() {
    function createData(key, value) {
        if (value === undefined) {
            value = "Not Defined!"
        }
        return { key, value };
    }

    const companyId = useLocation().pathname.split("/")[3]
    console.log(companyId)
    const { required_data, loading } = UseFetch("/company/getCompany/" + companyId, "GET")
    var rows = [];
    if (!loading) {
        rows = [
            createData("Company Name", required_data["data"]["Company_name"]),
            createData("Offer Type", HandleNull(required_data["data"]["Company_offer_type"])),
            createData("Person 1 Name", required_data["data"]["Contact_person_1_designation"] + " " + required_data["data"]["Contact_person_1_name"]),
            createData("Person 1 Contact (Phone/Email)", required_data["data"]["Contact_person_1_Mobile"] + " / " + required_data["data"]["Contact_person_1_email_ID"]),


            createData("Person 2 Name", required_data["data"]["Contact_person_2_designation"] + " " + required_data["data"]["Contact_person_2_name"]),
            createData("Person 2 Contact (Phone/Email)", required_data["data"]["Contact_person_2_Mobile"] + " / " + required_data["data"]["Contact_person_2_email_ID"]),


            createData("Person 3 Name", required_data["data"]["Contact_person_3_designation"] + " " + required_data["data"]["Contact_person_3_name"]),
            createData("Person 3 Contact (Phone/Email)", required_data["data"]["Contact_person_3_Mobile"] + " / " + required_data["data"]["Contact_person_3_email_ID"]),

            createData("Website", HandleNull(required_data["data"]["Company_web_site"])),
            createData("City", HandleNull(required_data["data"]["City"])),
            createData("State", HandleNull(required_data["data"]["State"])),
            createData("Address", HandleNull(required_data["data"]["Company_address"])),
            createData("Remarks", HandleNull(required_data["data"]["Remarks"])),
        ]
    }
    const History = useHistory()
    function handleRedirect(id) {
        History.push("/company/edit_company/" + id)
    }
    return (
        <MainCard title={loading ? "" : required_data["data"]["Company_name"]}>
            <Button variant="contained" onClick={() => handleRedirect(required_data["data"]["Company_ID"])} size="large" color="primary">
                Edit Company Details
            </Button><br /><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 150 }} aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography variant="h5">
                                        {row.key}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    )
}
