import React from 'react';
import { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import UsePost from '../../Utilities/UsePost';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {
    // Card,
    // Box,
    TextField,
    // MenuItem,
    // FormControl,
    // Radio,
    // RadioGroup,
    // FormLabel,
    // FormControlLabel,
    // Switch,
    // FormGroup,
    // Stack,
    Button,
    Checkbox
} from '@material-ui/core';
// import SecondaryAction from './../../ui-component/cards/CardSecondaryAction';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UsePostFile from '../../Utilities/UsePostFile'
// import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
// import UseFetch from '../../Utilities/UseFetch';
import { useLocation } from "react-router-dom";
import domainConfig from '../../Config/domainConfig';

// style constant
const useStyles = makeStyles((theme) => ({
    frame: {
        height: 'calc(100vh - 210px)',
        border: '1px solid',
        borderColor: theme.palette.primary.light
    }
}));


// getting required data




// Eligible Branches


// const Branches = [
//     {
//         value: 'CE',
//         label: 'Computer Engineering',
//         checked: false
//     },
//     {
//         value: 'IT',
//         label: 'Information Technology',
//         checked: false
//     },
//     {
//         value: 'EC',
//         label: 'Electronics & Communication',
//         checked: false
//     }
// ];

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const Input = styled('input')({
    display: 'none'
});

function AddAnnoucement() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [Branches, setBranches] = useState([
        {
            value: 'CE',
            label: 'Computer Engineering',
            checked: false
        },
        {
            value: 'IT',
            label: 'Information Technology',
            checked: false
        },
        {
            value: 'EC',
            label: 'Electronics & Communication',
            checked: false
        }
    ])

    const [data, setData] = useState(undefined)
    const id = useLocation().pathname.split("/")[3]
    useEffect(async () => {
        const response = await fetch("/annoucement/getAnnoucement/" + id, { method: "GET" });
        let data1 = await response.json();
        data1 = data1["data"][0]
        let b = Branches
        for (let i = 0; i < Branches.length; i++) {
            console.log(data1["Eligible_Branches"], b[i].value)
            for (let j = 0; j < data1["Eligible_Branches"].length; j++) {
                console.log(b[i].value, data1["Eligible_Branches"][j].BranchName)
                if (data1["Eligible_Branches"][j].BranchName == b[i].value) {
                    b[i].checked = true;
                }
            }
        }
        console.log(data1)
        setData(data1)
        setBranches(b)
        // console.log(Branches, b)
    }, [])

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);





    const changeHandler = (event) => {
        // // console.log(event.target.files[0])
        // const file_data = event.target.files[0]
        // let temp = data
        // temp["Job_Description_File"] = file_data
        // setData(temp)
        console.log(event.target.files[0]['name']);
        document.getElementById('fileUploadName').innerText = ' ' + event.target.files[0]['name'];
        const file_data = event.target.files[0];
        let temp = data;
        temp['Job_Description_File'] = file_data;
        setData(temp);
    };

    async function handleSubmit() {
        handleOpen()
        const temp = data
        delete temp["Company_Details"]
        console.log(data)
        const response = await UsePostFile("/annoucement/updateAnnoucement/" + id, data, "POST")
        // console.log(response)
        const params1 = {
            data: response,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        // console.log(res);
        handleClose()
        responsePipelineHandler(params1, 1)
        // if(response.)
    }

    function updateBranches(s) {
        setBranches([].concat(s))
    }

    async function handleCheck(branchName) {
        let branchesCopy = Branches
        for (let i = 0; i < Branches.length; i++) {
            let branchInfo = branchesCopy[i]
            if (branchInfo.value == branchName) {
                // console.log()
                if (branchesCopy[i].checked == false) {
                    branchesCopy[i].checked = true
                }
                else {
                    branchesCopy[i].checked = false
                }
            }
        }
        let dataCopy = data
        dataCopy["Eligible_Branches"] = []
        for (let i = 0; i < branchesCopy.length; i++) {
            if (branchesCopy[i].checked == true) {
                dataCopy["Eligible_Branches"].push(branchesCopy[i].value)
            }
        }
        setBranches(branchesCopy)
        updateBranches(branchesCopy)
        setData(dataCopy)
        // console.log(Branches)
        // console.log(data)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (

        <MainCard title="Edit Announcement" >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CircularProgress style={style} color="primary" />
            </Modal>
            {data === undefined ? "" : console.log(data)}
            <form enctype="multipart/form-data">


                <TextField
                    fullWidth
                    // required
                    disabled
                    label="Company Name"
                    id="companies"
                    // helperText="Enter Job Role"
                    value={data === undefined ? "" : data["Company_Details"] === undefined ? "" : data["Company_Details"]['Company_name']}
                    onChange={(e) => {
                        setData({ ...data, Job_Role: e.target.value });
                    }}
                />

                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Visit"
                                // required
                                value={data === undefined ? "" : data['Date_of_Visit']}
                                onChange={(e) => {
                                    setData({ ...data, Date_of_Visit: e });
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Annoucement"
                                // required
                                value={data === undefined ? "" : data['Date_of_announcement']}
                                onChange={(e) => {
                                    setData({ ...data, Date_of_announcement: e });
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                label="Passed Out Year"
                                // required
                                value={data === undefined ? "" : data['Passed_out_year']}
                                onChange={(e) => {
                                    setData({ ...data, Passed_out_year: e });
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} helperText={null} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container
                    direction="row">
                    {/* <Checkbox value={"Jenil"} label={"Jenil"} /> */}
                    {
                        Branches.map((e) => {
                            return (
                                <>
                                    <div>
                                        <Checkbox
                                            checked={e.checked}
                                            value={e.value}
                                            onClick={() => handleCheck(e.value)}
                                        /><label>{e.label}</label>
                                    </div>
                                </>
                            )
                        })
                    }
                </Grid>
                {/* <TextField
                    fullWidth
                    id="eligible-currencies"
                    select
                    // required
                    label="Select Branch"
                    value={data === undefined ? "" : data['Eligible_Branches']}
                    onChange={(e) => {
                        setData({ ...data, Eligible_Branches: e.target.value });
                    }}
                >
                    {Branches.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField> */}
                <br />
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Job Role"
                    id="fullWidth"
                    helperText="Enter Job Role"
                    value={data === undefined ? "" : data['Job_Role']}
                    onChange={(e) => {
                        setData({ ...data, Job_Role: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Salary"
                    id="fullWidth"
                    helperText="Enter Salary"
                    value={data === undefined ? "" : data['Salary']}
                    onChange={(e) => {
                        setData({ ...data, Salary: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Job Location"
                    id="fullWidth"
                    helperText="Enter Job Location"
                    value={data === undefined ? "" : data['Job_Location']}
                    onChange={(e) => {
                        setData({ ...data, Job_Location: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Bond Details"
                    id="fullWidth"
                    helperText="Enter Bond Details"
                    value={data === undefined ? "" : data['Bond_Details']}
                    onChange={(e) => {
                        setData({ ...data, Bond_Details: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Other Details"
                    id="fullWidth"
                    multiline
                    rows={5}
                    maxRows={4}
                    helperText="Enter Other Details"
                    value={data === undefined ? "" : data['Other_Details']}
                    onChange={(e) => {
                        setData({ ...data, Other_Details: e.target.value });
                    }}
                />
                <br />
                <br />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item>
                        <label htmlFor="contained-button-file">
                            {/* <label>Job Description File</label>    */}
                            <Input onChange={changeHandler}
                                // required
                                // accept="image/*"
                                id="contained-button-file" multiple type="file" />
                            <Button variant="outlined" component="span">
                                Upload Job Description File
                            </Button>
                            <label id="fileUploadName"> </label>
                        </label>
                    </Grid>
                    <Grid item>
                        <a target='_blank' style={{ "text-decoration": "none" }} href={



                            data === undefined ? "" :
                                process.env.NODE_ENV == "production" ?
                                    // "http://csiddu.tech" + 
                                    domainConfig.domain + 
                                    data["Job_Description_File"]
                                    : "http://localhost:8000" + data["Job_Description_File"]
                        }>
                            <Button variant="contained">View Job Description File</Button>
                        </a>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            {/* <DatePicker
                                label="Registration Deadline"
                                // required
                                value={data === undefined ? "" : data['Registration_Deadline']}
                                onChange={(e) => {
                                    setData({ ...data, Registration_Deadline: e });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            /> */}
                            <DateTimePicker
                                label="Registration Deadline"
                                value={data === undefined ? "" : data['Registration_Deadline']}
                                onChange={(e) => {
                                    setData({ ...data, Registration_Deadline: e });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </LocalizationProvider>
                    </Grid>
                    {/* <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                required
                                label="Passed Out Year"
                                value={data['Registration_Deadline']}
                                onChange={(e) => {
                                    setData({ ...data, Registration_Deadline: e });
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </LocalizationProvider>
                    </Grid> */}
                </Grid>
                <br />
                <br />

                <TextField
                    fullWidth
                    // required
                    label="Eligibility"
                    id="fullWidth"
                    helperText="Eligibility"
                    value={data === undefined ? "" : data['Eligibility']}
                    onChange={(e) => {
                        setData({ ...data, Eligibility: e.target.value });
                    }}
                />

                <br />
                <br />
                <Button onClick={handleSubmit} variant="contained" size="large" color="primary">
                    Update
                </Button>

            </form>

        </MainCard>
    );
}

export default AddAnnoucement;
