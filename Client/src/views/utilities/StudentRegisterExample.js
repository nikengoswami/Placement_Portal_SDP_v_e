import React, { useState, useEffect } from 'react'
import { Card, Box, TextField, MenuItem, FormControl, Radio, RadioGroup, FormLabel, FormControlLabel, Switch, FormGroup, Stack, Button, Checkbox, Skeleton, Grid } from '@material-ui/core';
import MainCard from "./../../ui-component/cards/MainCard"
export default function StudentRegisterExample() {

    const data = {
        FirstName: "",
        LastName: "",
        Age: 0,
        Description: ""
    }
    const [student, setStudent] = useState(data)

    function handleChange(e) {
        const { name, value } = e.target
        console.log({ name, value })
        setStudent({
            ...student,
            [name]: value,
        });

    }

    return (
        <MainCard title="Example Form">
            <form>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid xs={12} md={12}>
                        <TextField fullWidth name="FirstName" value={student.FirstName} label="First Name" id="fullWidth" helperText="Enter your First Name" onChange={handleChange} /><br /><br /><br />
                    </Grid>
                    <Grid xs={12} md={12}>
                        <TextField fullWidth name="LastName" value={student.LastName} label="Last Name" id="fullWidth" helperText="Enter your Last Name" onChange={handleChange} />
                    </Grid>

                </Grid>
            </form>
        </MainCard >
    )
}
