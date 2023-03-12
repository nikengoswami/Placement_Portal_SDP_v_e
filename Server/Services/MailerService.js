require("dotenv").config();
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const nodemailer = require('nodemailer')
const { google } = require("googleapis")
const EmailId = process.env.EMAIL_ID
const EmailPassword = process.env.EMAIL_PASSWORD
const EmailService = process.env.EMAIL_SERVICE

async function sendMail(mailDetails) {

    try {
        let mailTransporter = nodemailer.createTransport({
            service: EmailService,
            auth: {
                user: EmailId,
                pass: EmailPassword
            }
        });
        let result = await mailTransporter.sendMail(mailDetails)
        if (result) {
            // console.log("Here in true")
            return true
        }
        else {
            // console.log("Here in false")
            return false
        }
    }
    catch (err) {
        console.log("Some error")
        console.log(err)
        return false
    }

    // let mailTransporter = nodemailer.createTransport({
    //     service: process.env.EMAIL_SERVICE,
    //     auth: {
    //         user: process.env.EMAIL_ID,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // });

    // await mailTransporter.sendMail(mailDetails, function (err, data) {
    //     if (err) {
    //         log.error(err.toString())
    //         return false
    //     } else {
    //         console.log(`Email sent to ${mailDetails.to} successfully`);
    //         return true
    //     }
    // })

    // return false
    // let mailDetails = {
    //     from: 'abcxyz1814@gmail.com',
    //     to: 'abc@gmail.com',
    //     subject: 'Test mail',
    //     text: 'Node.js testing mail for GeeksforGeeks'
    // };
}


const notificationMail = async (notificationData, to) => {
    try {
        let mailDetails = {
            from: 'placementportal@csiddu.tech',
            to: to,
            subject: notificationData.subject,
            html: `<!DOCTYPE html>
            <html>
            <head>
            

            </head>
            <body>
                <div style="width:800px; margin:0 auto; text-align: center; background: #F55734">
                    <i>
                        <h2 style="color: white; padding: 2%;">
                            DHARMSINH DESAI UNIVERSITY
                        </h2>
                    </i>
                </div>
                <hr style="max-width:800px; margin:0 auto;">
                <div style="max-width:800px; margin:0 auto; min-height: 500px; background: #e7e9eb">
                    <h1 style="padding-left: 20px; padding-top: 20px;">
                        ${notificationData.header}
                    </h1>
                    <p style="padding-left: 20px;">
                        ${notificationData.body}
                    </p>
                </div>
                <hr style="max-width:800px; margin:0 auto;">
                <div style="width:800px; margin:0 auto; text-align: center; background: #706e6f">
                    <i>
                        <h2 style="color: white; padding: 2%;">
                            &copy; DHARMSINH DESAI UNIVERSITY PLACEMENT PORTAL
                        </h2>
                    </i>
                </div>
            </body>
            </html>
            `

        };

        const status = await sendMail(mailDetails)
        console.log(`> Mail sent to ${to} successfully`)
        return status
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const batchNotificationMail = async (notificationData, students_list) => {
    // try {
    //     let mailDetails = {
    //         from: 'abcxyz1814@gmail.com',
    //         to: to,
    //         subject: 'Test mail',
    //         html: "<b>Hello world?</b>"
    //         // text: 'Node.js testing mail for GeeksforGeeks'
    //     };
    // }
    // catch (err) {
    //     log.error(err.toString())
    //     return false
    // }
}

const subscribeMail = async (announcementData) => {

    try {

    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

module.exports = {
    notificationMail,
    subscribeMail,
    batchNotificationMail
}