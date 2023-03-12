import React, { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography, Button, TextField } from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from './../../../store/constant';
import UseFetch from '../../../Utilities/UseFetch';
import HandleToast from '../../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import UsePost from '../../../Utilities/UsePost';
import { useHistory } from "react-router-dom";
import EmptyAnnouncement from '../JSX/EmptyAnnouncement';
import AddAnnouncement from '../JSX/AddAnnouncement';
import handleNull from '../../../Utilities/HandleNull';
import MainCard from '../../../ui-component/cards/MainCard';
import SubCard from '../../../ui-component/cards/SubCard';
import ParseDate from "../../../Utilities/ParseDate"
import ChipCard from '../../../ui-component/cards/GenericCards/ChipCard'
import AddOrUpdatePlacementDetails from '../JSX/AddOrUpdatePlacementDetails'
import AddOrUpdateInternshipDetails from '../JSX/AddOrUpdateInternshipDetails'
import PlacementDetailsCard from '../JSX/PlacementDetailsCard'
import ListCard from '../../../ui-component/cards/GenericCards/ListCard';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

// const Dashboard = () => {
function Dashboard() {
    // const [isLoading, setLoading] = useState(true);
    // useEffect(() => {
    //     setLoading(false);

    // }, []);

    // const { data, loading } = UseFetch("/annoucement/getAllAnnoucements", "GET", toast, true)
    // const params = {
    //     data: data,
    //     HandleToast: {
    //         toast: toast,
    //         customMessage: "Hey Hi from handler",
    //         flag: false,
    //     }
    // }

    // if (!loading) {
    //     console.log(data)
    //     responsePipelineHandler(params, 0)

    // }



    // // POSTING DATA TO SERVER CODE EXAMPLE HERE
    // const testingResp = {
    //     status: true,
    //     data: "Success posting data to server!!"
    // }
    // const { res, waiting } = usePost("/postTest", testingResp, "POST")
    // const params1 = {
    //     data: res,
    //     HandleToast: {
    //         toast: toast,
    //         flag: false,
    //     }
    // }

    // // To pipeline with params 1
    // if (!waiting) {
    //     console.log(res)
    //     responsePipelineHandler(params1, 0)
    // }

    // END OF POSTING DATA EXAMPLE

    const [placementDetails, setPlacementDetails] = useState(undefined);

    const [batchYear, setBatchYear] = useState({
        Passed_out_year: ''
    });

    const [detailsCard, setDetailsCard] = useState(false);

    async function handleChange(e) {
        setBatchYear({ ...batchYear, Passed_out_year: e.target.value });

        if (e.target.value.length == 4) {

            // let updated_details = studentPlacementStateDetails;
            let res = undefined;
            res = await UsePost('/reports/getPlacementReportByBatchYear', { Passed_out_year: e.target.value }, 'POST');

            if (res != undefined) {
                // for (let i = 0; i < res['data'][0].length; i++) {
                //     res['data'][0][i]['row_id'] = i;
                // }
                if (res["data"][0].length == 0) {
                    setPlacementDetails(res["data"][0])
                    setPlacementDetails(res['data'][1]);
                    setDetailsCard(true);
                }
                else {
                    // console.log(res['data'][0]);
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


    const { required_data, loading } = UseFetch("/annoucement/getAllAnnoucements/", "GET")

    var annoucements = [];
    var temp_announcements = [];

    if (!loading) {
        console.log("from line 134", required_data["data"])
        annoucements = required_data["data"];
        if (required_data["data"] != "No Announcement data!") {
            annoucements = required_data['data'];
        }
        console.log("from line 138", annoucements.length )
        if(annoucements.length > 2)
        {
            console.log("inside if on line 141")
            // temp_announcements = annoucements.splice(0, 2);
            // annoucements = [];
            // annoucements = temp_announcements
            annoucements = annoucements.slice(0, 2);
        }
        console.log("from line 144", annoucements);
        
    }

    let history = useHistory();

    function handleRedirect(id) {
        history.push('/announcement/view_annoucement/' + id)
    }


    return (
        <>
            <MainCard title="Dashboard">
                <SubCard title="Add / View Announcement">
                    {/* <h1>Hello Rikin here</h1> */}
                    <Grid item>
                        <ChipCard loading={false} data={<AddAnnouncement />} />
                    </Grid>
                    <br />
                    {loading ? "" :
                        typeof annoucements == "string" ?
                            (
                                <>
                                    <Grid item>
                                        <ChipCard loading={false} data={<EmptyAnnouncement />} />
                                    </Grid>
                                </>
                            )
                            // <h1>No Announcements Data</h1> 
                            :
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>

                                {annoucements.map((e) => (
                                    <Grid item xs={12} md={6} id={e.Announcement_ID}>
                                        <SubCard title={e.Company_details["Company_name"] + " " + (e.Passed_out_year == null || e.Passed_out_year == undefined ? e.Job_Role + " for all batch year" : "- " + e.Job_Role + " for " + ParseDate.getYear(e.Passed_out_year) + " Batch")}>
                                            <Typography variant="h5"></Typography>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={6} md={4}>
                                                            <Typography variant="h4" style={{ color: "rgb(97, 97, 97)" }}>Deadline: </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={8}>
                                                            <Typography variant="h5" style={{ color: "#828282" }}>
                                                                {ParseDate.ParseDate(e.Registration_Deadline, true)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={6} md={4}>
                                                            <Typography variant="h4" style={{ color: "rgb(97, 97, 97)" }}>Posted On: </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={8}>
                                                            <Typography variant="h5" style={{ color: "#828282" }}>
                                                                {ParseDate.ParseDate(e.Date_of_announcement, true)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={6} md={4}>
                                                            <Typography variant="h4" style={{ color: "rgb(97, 97, 97)" }}>Visiting On: </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={8}>
                                                            <Typography variant="h5" style={{ color: "#828282" }}>
                                                                {handleNull(ParseDate.ParseDate(e.Date_of_Visit))}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={6} md={4}>
                                                            <Typography variant="h4" style={{ color: "rgb(97, 97, 97)" }}>Job Location: </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={8}>
                                                            <Typography variant="h5" style={{ color: "#828282" }}>
                                                                {handleNull(e.Job_Location)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={6} md={4}>
                                                            <Typography variant="h4" style={{ color: "rgb(97, 97, 97)" }}>Job Role: </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={8}>
                                                            <Typography variant="h5" style={{ color: "#828282" }}>
                                                                {handleNull(e.Job_Role)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <br />
                                            <Button color="primary" variant="contained" onClick={() => handleRedirect(e.Announcement_ID)} size='large' fullWidth>
                                                View Full Announcement
                                            </Button>
                                        </SubCard>
                                    </Grid>
                                ))}
                            </Grid>
                    }
                </SubCard>
                <br />
                <SubCard title="Add / Update Placement Details">
                    <Grid item>
                        <ChipCard loading={false} data={<AddOrUpdatePlacementDetails />} />
                    </Grid>
                </SubCard>
                <br />
                <SubCard title="Add / Update Internship Details">
                    <Grid item>
                        <ChipCard loading={false} data={<AddOrUpdateInternshipDetails />} />
                    </Grid>
                </SubCard>
                <br />
                <SubCard title="Placement Details">
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
                            {/* <br />
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    checkboxSelection
                                    rows={placementTableDetails}
                                    columns={columns}
                                    components={{
                                        Toolbar: CustomToolbar
                                    }}
                                />
                            </div> */}
                        </>
                    )}
                </SubCard>
            </MainCard>
        </>
        // <Grid container spacing={gridSpacing}>


        //     {/* <Grid item xs={12}>
        //         <Grid container spacing={gridSpacing}>
        //             <Grid item lg={4} md={6} sm={6} xs={12}>
        //                 <EarningCard isLoading={isLoading} />
        //             </Grid>
        //             <Grid item lg={4} md={6} sm={6} xs={12}>
        //                 <TotalOrderLineChartCard isLoading={isLoading} />
        //             </Grid>
        //             <Grid item lg={4} md={12} sm={12} xs={12}>
        //                 <Grid container spacing={gridSpacing}>
        //                     <Grid item sm={6} xs={12} md={6} lg={12}>
        //                         <TotalIncomeDarkCard isLoading={isLoading} />
        //                     </Grid>
        //                     <Grid item sm={6} xs={12} md={6} lg={12}>
        //                         <TotalIncomeLightCard isLoading={isLoading} />
        //                     </Grid>
        //                 </Grid>
        //             </Grid>
        //         </Grid>
        //     </Grid>
        //     <Grid item xs={12}>
        //         <Grid container spacing={gridSpacing}>
        //             <Grid item xs={12} md={8}>
        //                 <TotalGrowthBarChart isLoading={isLoading} />
        //             </Grid>
        //             <Grid item xs={12} md={4}>
        //                 <PopularCard isLoading={isLoading} />
        //             </Grid>
        //         </Grid>
        //     </Grid> */}
        // </Grid>
    );
};

export default Dashboard;
