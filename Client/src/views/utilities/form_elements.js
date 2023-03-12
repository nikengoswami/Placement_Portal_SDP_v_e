import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Card, Box, TextField, MenuItem, FormControl, Radio, RadioGroup, FormLabel, FormControlLabel, Switch, FormGroup, Stack, Button, Checkbox } from '@material-ui/core';

// import { Fab, AddIcon, EditIcon, FavoriteIcon, NavigationIcon } from '@material-ui/material';

// project imports
import MainCard from './../../ui-component/cards/MainCard';
import SecondaryAction from './../../ui-component/cards/CardSecondaryAction';


// style constant
const useStyles = makeStyles((theme) => ({
    frame: {
        height: 'calc(100vh - 210px)',
        border: '1px solid',
        borderColor: theme.palette.primary.light
    }
}));

//=============================|| Sample Form ||=============================//
const currencies = [
    {
        value: 'CE',
        label: 'Computer Engineering',
    },
    {
        value: 'IT',
        label: 'Information Technology',
    },
    {
        value: 'EC',
        label: 'Electronics & Communication',
    }
];

const TablerIcons = () => {
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('CE');
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const [value, setValue] = React.useState('female');
    const [switchBtn, setSwitchBtnValue] = React.useState(true);
    const [radio, setRadioValue] = React.useState('');

    const handleChange2 = (event) => {
        setSwitchBtnValue(!switchBtn)
        console.log(switchBtn)
    }
    const handleChange3 = (event) => {
        console.log(event.target.checked)
        console.log(event.target.value)
        if (event.target.checked) {
            setRadioValue(event.target.value)
        }
        console.log(radio)
    }
    const handleChange1 = (event) => {
        setValue(event.target.value);
        console.log(value)
    };
    return (
        <MainCard title="Form Elements">
            <TextField fullWidth label="Full Name" id="fullWidth" helperText="Enter your full name with surname and father's name" />
            <br /><br /><br />
            <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Select Branch"
                value={currency}
                onChange={handleChange}

            >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <br /><br /><br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange1}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl>

            <FormGroup>
                <FormControlLabel onChange={handleChange2} control={<Switch defaultChecked />} label="Checked" />
            </FormGroup>

            <br /><br /><br />
            <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>
            <br /><br /><br />
            <FormGroup onClick={handleChange3}>
                <FormControlLabel value="Rikin" control={<Checkbox defaultChecked />} label="Rikin" />
                <FormControlLabel value="Chauhan" control={<Checkbox defaultChecked />} label="Chauhan" />
                <FormControlLabel value="Jenil" control={<Checkbox />} label="Jenil" />
                <FormControlLabel value="Gandhi" control={<Checkbox />} label="Gandhi" />
                <FormControlLabel value="Keval" control={<Checkbox />} label="Keval" />
                <FormControlLabel value="Gandevia" control={<Checkbox />} label="Gandevia" />
            </FormGroup>


            <br /><br /><br />
            <TextField
                fullWidth
                id="standard-multiline-static"
                label="Sample TextBox"
                multiline
                rows={4}
                variant="outlined"
                helperText="Textbox description here!"
            />
            <br /><br /><br />
            <Button variant="contained"  fullWidth size="large">Contained</Button>
        </MainCard >
    );
};

export default TablerIcons;
