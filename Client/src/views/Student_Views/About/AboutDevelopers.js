import React from 'react'
import MainCard from '../../../ui-component/cards/MainCard'
import "./About.css"
import { Grid, Paper, Typography } from '@material-ui/core'
import GithubSVG from "./Assets/github.png"
import LinkedInSVG from "./Assets/linkedin.png"
import GmailSVG from "./Assets/gmail.png"
import JenilImage from "./Assets/Jenil_image_1.jpg"
import KevalImage from "./Assets/Keval_imgs.jpg"
import RikinImage from "./Assets/Rikin_image.jpg"
import JHBSirImage from "./Assets/JHB_Sir.jpg"
import SPSSirImage from "./Assets/SPS_Sir.png"
import AboutCard from './AboutCard'

export default function AboutDevelopers() {
    let CardConfig = {
        "Jenil": {
            "Image": JenilImage,
            "Name": "Jenil J Gandhi",
            "Role": "Developer",
            "MainContent": "",
            "GithubLink": "https://github.com/jenilgandhi2111",
            "LinkedInLink": "https://www.linkedin.com/in/jenil-gandhi-5961591b0/",
            "GmailLink": "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=jenilgandhi2111@gmail.com&su=REGARDING PLACEMENT PORTAL @DHARMSINH DESAI UNIVERSITY"
        },
        "Keval": {
            "Image": KevalImage,
            "Name": "Keval D Gandevia",
            "Role": "Developer",
            "MainContent": "",
            "GithubLink": "https://github.com/Keval-Gandevia",
            "LinkedInLink": "https://www.linkedin.com/in/keval-gandevia-8128041b5/",
            "GmailLink": "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=gandeviakeval05@gmail.com&su=REGARDING PLACEMENT PORTAL @DHARMSINH DESAI UNIVERSITY"
        },
        "Rikin": {
            "Image": RikinImage,
            "Name": "Rikin D Chauhan",
            "Role": "Developer",
            "MainContent": "",
            "GithubLink": "https://github.com/rikinchauhan01",
            "LinkedInLink": "https://www.linkedin.com/in/rikin-chauhan-b057641a7/",
            "GmailLink": "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=rikinchauhan01@email.com&su=REGARDING PLACEMENT PORTAL @DHARMSINH DESAI UNIVERSITY"
        },
        "JHBSir": {
            "Image": JHBSirImage,
            "Name": "Jatayu H Baxi",
            "Role": "Mentor",
            "MainContent": "",
            "GithubLink": "https://github.com/jhbaxi",
            "LinkedInLink": "https://www.linkedin.com/in/jatayu-baxi-09397011/",
            "GmailLink": "jatayubaxi.ce@ddu.ac.in"
        },
        "SPSSir": {
            "Image": SPSSirImage,
            "Name": "Siddharth P Shah",
            "Role": "Mentor",
            "MainContent": "",
            "GithubLink": "https://github.com/DeepLearner82",
            "LinkedInLink": "https://www.linkedin.com/in/siddharth-shah-63426190/",
            // "GmailLink": "mailto: siddharth.ce@ddu.ac.in"
            "GmailLink": "mailto:abc@example.com"
        }
    }
    let rikinContent = ""
    return (
        <MainCard>

            <h1 className='AboutTitle'>Designed and Developed by CE Department</h1>

            <h2 className='AboutTitle'>Developer Team</h2>
            <br />
            <br />
            <Grid container spacing={2} justifyContent={"flex-start"}>

                <Grid xs={12} md={4} item>
                    <AboutCard
                        HeadImage={CardConfig.Jenil.Image}
                        Name={CardConfig.Jenil.Name}
                        Role={CardConfig.Jenil.Role}
                        MainContent={CardConfig.Jenil.MainContent}
                        GithubLink={CardConfig.Jenil.GithubLink}
                        LinkedInLink={CardConfig.Jenil.LinkedInLink}
                        GmailLink={CardConfig.Jenil.GmailLink}
                    />
                </Grid>

                <Grid xs={12} md={4} item>
                    <AboutCard
                        HeadImage={CardConfig.Keval.Image}
                        Name={CardConfig.Keval.Name}
                        Role={CardConfig.Keval.Role}
                        MainContent={CardConfig.Keval.MainContent}
                        GithubLink={CardConfig.Keval.GithubLink}
                        LinkedInLink={CardConfig.Keval.LinkedInLink}
                        GmailLink={CardConfig.Keval.GmailLink}
                    />
                </Grid>
                <Grid xs={12} md={4} item>
                    <AboutCard
                        HeadImage={CardConfig.Rikin.Image}
                        Name={CardConfig.Rikin.Name}
                        Role={CardConfig.Rikin.Role}
                        MainContent={CardConfig.Rikin.MainContent}
                        GithubLink={CardConfig.Rikin.GithubLink}
                        LinkedInLink={CardConfig.Rikin.LinkedInLink}
                        GmailLink={CardConfig.Rikin.GmailLink}
                    />
                </Grid>
            </Grid>
        </MainCard>
    )
}
