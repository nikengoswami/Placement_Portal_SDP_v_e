import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField } from '@material-ui/core';
import CompanyPlacementCard from './CompanyInternshipCard';
import { ToastContainer, toast } from 'react-toastify';
import UseFetch from '../../Utilities/UseFetch';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconCirclePlus } from '@tabler/icons';
import Grid from '@mui/material/Grid';
import SubCard from '../../ui-component/cards/SubCard';
import { Typography } from '@material-ui/core';
import { ParseDate } from '../../Utilities/ParseDate';
import Modal from '@mui/material/Modal';
import ChipCard from "../../ui-component/cards/GenericCards/ChipCard"
import Student_details from '../Placement/JSX/Student_details';
import NoStudent from "../Placement/JSX/NoStudent"
import CircularProgress from '@mui/material/CircularProgress';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import UsePost from '../../Utilities/UsePost';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Card, CardContent, Divider, Button } from '@material-ui/core';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import { useLocation, useHistory } from 'react-router';

// import ParseDate from "../../Utilities/ParseDate"



function AddPlacement() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        bgcolor: 'background.paper',
        // boxShadow: 24,
        p: 4,
        border: "0px solid white"
    };
    const [studentData, setStudentData] = useState('');
    const [StudentDetails, setStudentDetails] = useState(undefined);
    const [studentPlacement, setStudentPlacement] = useState(undefined)
    const [allCompanies, setallCompanies] = useState([])
    // const [checkedStatus, setcheckedStatus] = useState([])
    const [placementData, setplacementData] = useState([])

    const [placementCard, setPlacementCard] = useState([]);
    const [studentDetailsState, setstudentDetailsState] = useState("")

    async function handleAddPlacementChange() {
        // Just rerender the view.
        // StudentDetails has got the student ID
        console.log("Here in add placement changes")
        console.log(studentDetailsState)
        console.log(StudentDetails)
        let idx

        const studId = location.pathname.split("/")
        const lastElem = studId.slice("-1")[0]
        idx = lastElem
        const payLoad = {
            target: {
                value: idx
            }
        }
        setPlacementCard([])
        await handleChange(payLoad)
    }


    useEffect(async () => {
        let response = await fetch("/company/getCompany")
        if (response) {
            let data = await response.json()
            if (data) {
                console.log(data["data"])
                setallCompanies([].concat(data["data"]))

            }
        }
    }, [])
    function changeStateFromChild(seed, operation) {
        let placement_card_copy = placementCard
        if (operation == "delete") {
            let filteredList = placement_card_copy.filter((elem) => {
                return elem.props.seed != seed
            })
            console.log(filteredList)

            setPlacementCard(filteredList)
        }
    }

    // const [jsonData, setjsonData] = useState(undefined)

    async function handleChange(e) {
        setStudentData(e.target.value)

        if (e.target.value.length === 10) {
            setPlacementCard([].concat([]))

            handleOpen()
            let response = undefined
            response = await fetch("/student/getOneStudentInAdmin/" + e.target.value.toUpperCase(), { method: "GET" })

            if (response != undefined) {
                let jsonData = undefined
                jsonData = await response.json()
                if (jsonData != undefined) {
                    console.log(jsonData);
                    if (jsonData["data"] == "Error Fetching Student data !!!") {
                        console.log("Here in ese")
                        setStudentDetails("No student found!")
                    }
                    else {

                        setStudentDetails(jsonData["data"])
                        const student_Id = jsonData["data"]["Student_ID"]
                        setstudentDetailsState(jsonData["data"]["Student_ID"])
                        console.log(student_Id)
                        let response1 = undefined
                        response1 = await fetch("/studentinternship/getStudentInternship/" + student_Id, { method: "GET" })

                        if (response1 != undefined) {
                            console.log(placementCard)
                            let jsonData1 = undefined
                            jsonData1 = await response1.json()
                            console.log(jsonData1)
                            setStudentPlacement(jsonData1)
                            let studentPlacementCardCopy = []
                            console.log(jsonData1.data)

                            if (jsonData1.data != "Student Internship Record Not Found!" && jsonData1 != undefined) {
                                for (let i = 0; i < jsonData1.data.length; i++) {
                                    console.log(jsonData1.data[i])
                                    let x = Math.random();
                                    studentPlacementCardCopy.unshift(
                                        <CompanyPlacementCard
                                            onAddFunc={handleAddPlacementChange}
                                            callerFunc={changeStateFromChild}
                                            seed={x}
                                            from={"line 86"}
                                            allCompanies={allCompanies}
                                            details={jsonData1.data[i]}
                                            idx={i}
                                        />
                                    )

                                }
                                setPlacementCard([].concat(studentPlacementCardCopy))
                            }
                            // console.log(placementCard)
                        }
                    }
                }

            }




        }
        else if (e.target.value === 0) {
            setStudentDetails(undefined)
            console.log("Here")
        }
        handleClose()

    }



    function handleClick() {
        // console.log("keval")
        let placement_card_copy = placementCard;
        placement_card_copy.push(<CompanyPlacementCard
            onAddFunc={handleAddPlacementChange}
            callerFunc={changeStateFromChild}
            seed={Math.random()}
            from={"line 123"}
            details={{
                Designation: "",
                Salary: "",
                Offer_Letter: "",
                Passed_out_year: "",
                IsFinal: false,
                Company_ID: "",
                companyName: "",
                Student_ID: studentData.toUpperCase()
            }}
            allCompanies={allCompanies} />);
        setPlacementCard([].concat(placement_card_copy));
    }

    const [first, setfirst] = useState("")
    useEffect(() => {
        console.log(first)
    }, [first])

    let oppo = 9000
    function checkMe(str1) {
        setfirst(str1 + oppo + "From GHere")
    }

    const [searchName, setsearchName] = useState("")
    const [namesResult, setNamesResult] = useState("jenil")

    function changeResult(data) {
        const recievedData = data
        setNamesResult(recievedData)
    }

    const handleNamesChange = async (e) => {
        try {
            setsearchName(e.target.value)
            if (e.target.value.length > 2) {
                const url = "/student/searchStudent/" + e.target.value
                const status = await UsePost(url, {}, "POST")
                console.log(status)
                changeResult(status.data)
                // setNamesResult(status.data)
                console.log(namesResult)
            }
            else {
                console.log("Enter more")
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const useStyles = makeStyles((theme) => ({
        card: {
            backgroundColor: theme.palette.primary.light
        },
        content: {
            padding: '0px !important'
        },
        contentContainer: {
            padding: '16px',
            paddingBottom: 0,
            color: '#fff'
        },
        fontStyle: {
            fontWeight: 400
        },
        divider: {
            marginTop: '2%',
            // marginBottom: '12px'
        },
    }));
    const classes = useStyles();
    const theme = useTheme();

    const orangeDark = theme.palette.primary[800];

    // React.useEffect(() => {
    //     const newSupportChart = {
    //         ...chartData.options,
    //         colors: [orangeDark],
    //         tooltip: {
    //             theme: 'light'
    //         }
    //     };
    //     ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    // }, [orangeDark]);
    const location = useLocation()
    useEffect(async () => {
        const studId = location.pathname.split("/")
        const lastElem = studId.slice("-1")
        console.log(lastElem)
        if (!isNaN(parseInt(lastElem[0] + lastElem[1]))) {
            const payLoad = {
                target: {
                    value: lastElem[0]
                }
            }
            setstudentDetailsState(lastElem[0])
            await handleChange(payLoad)
        }

    }, [])

    const history = useHistory()
    async function selectName(id) {
        try {
            const payLoad = {
                target: {
                    value: id
                }
            }
            history.push("/internship/add_internship/" + id)
            await handleChange(payLoad)
            setNamesResult("jenil")
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {/* {namesResult.toString()} */}
            <MainCard title="View / Add Student Internship">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <CircularProgress style={style} color="primary" />
                </Modal>
                <TextField
                    type='text'
                    fullWidth
                    label="Student Name or ID"
                    value={searchName}
                    onInput={(e) => {
                        handleNamesChange(e)
                    }}
                    id="fullWidth"
                />
                <br /><br />


                {namesResult == "jenil" || namesResult.length == 0 ? "" :
                    <>
                        <Grid style={{ "padding": "1%", "box-shadow": "rgb(213 213 213 / 72%) 0px 0px 2px 2px", "borderRadius": "8px" }}>


                            {namesResult.map((e) => {
                                return (<>

                                    <Grid item xs={12} style={{ "padding": "1%" }} container>
                                        <Grid xs={9} md={9}>

                                            {e.Student_ID + " " + e.FirstName + " " + e.LastName}

                                        </Grid>
                                        <Grid xs={3} md={3} justifyContent={"flex-end"}>
                                            <div style={{ "display": "flex", "justifyContent": "center" }}>
                                                {/* <Grid > */}
                                                <Button
                                                    onClick={() => { selectName(e.Student_ID) }}
                                                    variant="contained"
                                                    size="small"
                                                >Select</Button>
                                                {/* </Grid> */}
                                            </div>
                                        </Grid>
                                        <Divider className={classes.divider} />
                                        {/* <Grid container direction="column">
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item xs={9} md={9}>
                                                        <p>
                                                            {e.Student_ID + " " + e.FirstName + " " + e.LastName}
                                                        </p>

                                                    </Grid>
                                                    <Grid item xs={2} md={2}>
                                                        <Grid container alignItems="center" justifyContent="center">
                                                            <Grid item>
                                                                <Button
                                                                    onClick={() => { selectName(e.Student_ID) }}
                                                                    variant="contained"
                                                                    size="small"
                                                                >Select</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid> */}
                                    </Grid>
                                    {/* <Divider
                                        className={classes.divider}
                                    /> */}
                                </>)
                            })}
                        </Grid>
                    </>
                }

                <br />
                {/* <TextField
                    fullWidth
                    // required
                    label="Student ID"
                    onInput={(e) => {
                        handleChange(e)
                    }}
                    value={studentData}
                    id="fullWidth"
                    helperText="Enter Student ID"
                /> */}
                {/* <br /> */}
                {/* <br /> */}
                {StudentDetails === undefined ? "" :
                    StudentDetails == "No student found!" ?
                        <ChipCard data={
                            <NoStudent ID={studentData} />} loading={false} type={"error"} /> :
                        <>
                            <ChipCard loading={false} data={<Student_details details={StudentDetails} />}>
                            </ChipCard>
                            <br />
                        </>

                }

                {/* {placementCard.map((e) => {
                    return e;
                })} */}
                {placementCard.map((elem) => {
                    return (<>
                        {elem}
                    </>)
                })}

                <br />
                <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                    <LoadingButton
                        color="primary"
                        onClick={handleClick}
                        loading={false}
                        loadingPosition="start"
                        startIcon={<IconCirclePlus />}
                        variant="contained"
                    >
                        Add
                    </LoadingButton>
                </Grid>
            </MainCard>
        </>
    );
}

export default AddPlacement;
