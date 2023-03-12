import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import NameCard from './NameCard';
import PopularCard from './PopularCard';
import TotalSubscriptionsCard from './TotalSubscriptionsCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import StudentDataBarChart from './StudentDataBarChart';
import { gridSpacing } from '../../../store/constant';
import UseFetch from '../../../Utilities/UseFetch';
import HandleToast from '../../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import usePost from '../../../Utilities/UsePost';
import UploadCVCard from './UploadCVCard';
import UploadPhotoCard from './UploadPhotoCard'

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);

    }, []);

    let Student_ID, FirstName, MiddleName, LastName, Email_ID, CV_Upload, Student_Photo, Sem_1_SPI, Sem_2_SPI, Sem_3_SPI, Sem_4_SPI, Sem_5_SPI, Sem_6_SPI, Sem_7_SPI, Sem_8_SPI;

    const [student_spi, setStudent_spi] = useState(undefined);


    const [studentDetails, setStudentDetails] = useState(undefined);


    useEffect(async () => {

        const data = await fetch("/student/getOneStudent/", { method: 'GET' })

        let data1 = await data.json();

        let student_spi_list = []

        const required_data = data1
        console.log(required_data)

        if (required_data) {
            // console.log(required_data["data"]);
            Student_ID = required_data["data"]["Student_ID"];
            FirstName = required_data["data"]["FirstName"];
            Email_ID = required_data["data"]["Email_ID"];
            MiddleName = required_data["data"]["MiddleName"];
            LastName = required_data["data"]["LastName"];
            Sem_1_SPI = required_data["data"]["Sem_1_SPI"];
            Sem_2_SPI = required_data["data"]["Sem_2_SPI"];
            Sem_3_SPI = required_data["data"]["Sem_3_SPI"];
            Sem_4_SPI = required_data["data"]["Sem_4_SPI"];
            Sem_5_SPI = required_data["data"]["Sem_5_SPI"];
            Sem_6_SPI = required_data["data"]["Sem_6_SPI"];
            Sem_7_SPI = required_data["data"]["Sem_7_SPI"];
            Sem_8_SPI = required_data["data"]["Sem_8_SPI"];
            console.log()
            CV_Upload = required_data["data"]["CV_Upload"];
            // console.log(CV_Upload);
            Student_Photo = required_data["data"]["Student_Photo"]
            // console.log(Student_Photo)

            // push spi into list one by one
            student_spi_list.push(Sem_1_SPI)
            student_spi_list.push(Sem_2_SPI)
            student_spi_list.push(Sem_3_SPI)
            student_spi_list.push(Sem_4_SPI)
            student_spi_list.push(Sem_5_SPI)
            student_spi_list.push(Sem_6_SPI)
            student_spi_list.push(Sem_7_SPI)
            student_spi_list.push(Sem_8_SPI)

            console.log(student_spi_list)

            setStudent_spi(student_spi_list)
            setStudentDetails({ Student_ID, FirstName, MiddleName, LastName, Email_ID, CV_Upload, Student_Photo })
        }



    }, []);



    // const { required_data, loading } = UseFetch("/student/getOneStudent/", "GET")
    // let Student_ID, FirstName, MiddleName, LastName, Email_ID, CV_Upload, Sem_1_SPI, Sem_2_SPI, Sem_3_SPI, Sem_4_SPI, Sem_5_SPI, Sem_6_SPI, Sem_7_SPI, Sem_8_SPI;

    // let student_spi_list = []

    // const  {student_data} = fecth("/student/getOneStudent/")

    // if(!loading)
    // {
    //     // console.log(required_data["data"]);
    //     Student_ID = required_data["data"]["Student_ID"];
    //     FirstName = required_data["data"]["FirstName"];
    //     MiddleName = required_data["data"]["MiddleName"];
    //     LastName = required_data["data"]["LastName"];
    //     Sem_1_SPI = required_data["data"]["Sem_1_SPI"];
    //     Sem_2_SPI = required_data["data"]["Sem_2_SPI"];
    //     Sem_3_SPI = required_data["data"]["Sem_3_SPI"];
    //     Sem_4_SPI = required_data["data"]["Sem_4_SPI"];
    //     Sem_5_SPI = required_data["data"]["Sem_5_SPI"];
    //     Sem_6_SPI = required_data["data"]["Sem_6_SPI"];
    //     Sem_7_SPI = required_data["data"]["Sem_7_SPI"];
    //     Sem_8_SPI = required_data["data"]["Sem_8_SPI"];
    //     CV_Upload = "http://localhost:8000" + required_data["data"]["CV_Upload"].split(".")[1] + ".pdf";

    //     // console.log(CV_Upload);

    //     // push spi into list one by one
    //     student_spi_list.push(Sem_1_SPI)
    //     student_spi_list.push(Sem_2_SPI)
    //     student_spi_list.push(Sem_3_SPI)
    //     student_spi_list.push(Sem_4_SPI)
    //     student_spi_list.push(Sem_5_SPI)
    //     student_spi_list.push(Sem_6_SPI)
    //     student_spi_list.push(Sem_7_SPI)
    //     student_spi_list.push(Sem_8_SPI)

    //     console.log(student_spi_list)

    //     setStudent_spi(student_spi_list)
    // }




    return (
        <>
            {student_spi === undefined ? "" : <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            {studentDetails === undefined ? "" : <NameCard FirstName={studentDetails.FirstName} MiddleName={studentDetails.MiddleName[0]} LastName={studentDetails.LastName} Email_ID={studentDetails.Email_ID} isLoading={isLoading} />
                            }
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TotalSubscriptionsCard isLoading={isLoading} />
                        </Grid>
                        {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeDarkCard isLoading={isLoading} />
                                </Grid>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeLightCard isLoading={isLoading} />
                                </Grid>

                            </Grid>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={12}>
                            {studentDetails === undefined ? "" : <UploadCVCard CV_Upload={studentDetails.CV_Upload} />}

                        </Grid>
                        <Grid item xs={12} md={12}>
                            {studentDetails === undefined ? "" : <>
                                {/* {studentDetails.Student_Photo} */}
                                <UploadPhotoCard Student_Photo={studentDetails.Student_Photo} />
                            </>}

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <StudentDataBarChart isLoading={isLoading}
                                student_spi_list={student_spi}
                            // Sem_1_SPI = {Sem_1_SPI}
                            // Sem_2_SPI = {Sem_2_SPI}
                            // Sem_3_SPI = {Sem_3_SPI}
                            // Sem_4_SPI = {Sem_4_SPI}
                            // Sem_5_SPI = {Sem_5_SPI}
                            // Sem_6_SPI = {Sem_6_SPI}
                            // Sem_7_SPI = {Sem_7_SPI}
                            // Sem_8_SPI = {Sem_8_SPI}
                            />
                        </Grid>
                        {/* <Grid item xs={12} md={4}>
                            <PopularCard isLoading={isLoading} />
                        </Grid> */}
                    </Grid>
                </Grid>
            </Grid>
            }
        </>
    );
};

export default Dashboard;
