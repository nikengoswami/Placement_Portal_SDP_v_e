import React from 'react'
import GithubSVG from "./Assets/github.png"
import LinkedInSVG from "./Assets/linkedin.png"
import GmailSVG from "./Assets/gmail.png"
import "./About.css"

export default function AboutCard(props) {
    function handleRedirect(link, newTab = true) {
        if (newTab) {
            window.open(
                link, "_blank");
        }
        else {
            window.open(link)
        }
    }
    return (
        <div className='CardDiv'>
            <div className='CardImage'>
                <img className='CardImageSrc' src={props.HeadImage} />
            </div>
            <div className='CardHeader'>
                <span className='CardHeaderText'>{props.Name}</span><br />
            </div>
            <div className='CardBottom'>
                <span>{props.Role}</span>
            </div>
            <div className='CardContent'>
                <p className='CardContentPara'>

                    {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. */}
                    {props.MainContent}
                </p>
            </div>
            <div className='CardSocial'>

                <img onClick={() => handleRedirect(props.GithubLink)} className='socialSVG' src={GithubSVG} />


                <img onClick={() => handleRedirect(props.LinkedInLink)} className='socialSVG' src={LinkedInSVG} />


                <img onClick={() => handleRedirect(props.GmailLink, false)} className='socialSVG' src={GmailSVG} />


            </div>
        </div>
    )
}
