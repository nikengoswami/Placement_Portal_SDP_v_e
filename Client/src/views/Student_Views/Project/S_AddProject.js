import React, { useState, useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { TextField } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import UseFetch from '../../../Utilities/UseFetch';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconCirclePlus } from '@tabler/icons';
import Grid from '@mui/material/Grid';
import SubCard from '../../../ui-component/cards/SubCard';
import { Typography } from '@material-ui/core';
import { ParseDate } from '../../../Utilities/ParseDate';
import ChipCard from "../../../ui-component/cards/GenericCards/ChipCard"
import S_ProjectCard from './S_ProjectCard';

function S_AddProject() {

    const [studentData, setStudentData] = useState('');
    const [StudentDetails, setStudentDetails] = useState(undefined);
    const [studentProject, setStudentProject] = useState(undefined)
    const [projectCard, setProjectCard] = useState([]);

    useEffect(async () => {
        await handleChange()
    }, [])

    async function handleChange()
    {
        let response = undefined
        response = await fetch("/studentproject/getOneStudentProject/")
        if (response != undefined) {
            let data = undefined
            data = await response.json()
            console.log(data)
            setStudentProject(data)

            let project_card_copy = []

            if (data.data != "Student project record not found" && data != undefined) {
                for (let i = 0; i < data.data.length; i++) {
                    console.log(data.data[i])
                    let x = Math.random();
                    project_card_copy.unshift(
                        <S_ProjectCard
                            onChangeFunc={handleProjectChange}
                            callerFunc={changeStateFromChild}
                            source={"server"}
                            seed={x}
                            from={"line 86"}
                            details={data.data[i]}
                            idx={i}
                        />
                    )

                }
                setProjectCard([].concat(project_card_copy))
            }
        }
    }

    async function handleProjectChange()
    {
        setProjectCard([])
        await handleChange()
    }

    function changeStateFromChild(seed, operation) {
        let project_card_copy = projectCard
        if (operation == "delete") {
            // for (let i = 0; i < projectCard.length; i++) {
            //     let propDetails = projectCard[i].props.seed
            //     if(seed==propDetails)
            //     {

            //     }
            // }
            let filteredList = project_card_copy.filter((elem) => {
                return elem.props.seed != seed
            })
            console.log(filteredList)

            setProjectCard(filteredList)
        }
    }

    // const [jsonData, setjsonData] = useState(undefined)


    function handleClick() {
        // console.log("rikin here line number 80")
        let project_card_copy = projectCard;
        project_card_copy.push(
            <S_ProjectCard
            onChangeFunc={handleProjectChange}
            callerFunc={changeStateFromChild}
            seed={Math.random()}
            from={"line 123"}
            details={{
                Project_Title: null,
                Brief_Description: null,
                Project_Link: null,
                Technologies: null
            }}
        />);
        setProjectCard([].concat(project_card_copy));
    }

    const [first, setfirst] = useState("")
    useEffect(() => {
        console.log(first)
    }, [first])

    return (
        <>
            <MainCard title="Add Project">
                {projectCard.map((elem) => {
                    return (<>
                        {elem}
                    </>)
                })}
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

export default S_AddProject;
