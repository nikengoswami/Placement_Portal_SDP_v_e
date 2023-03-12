const AdmZip = require('adm-zip');
const fs = require("fs")
const path = require("path")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const { google, oauth2_v2, cloudfunctions_v1 } = require("googleapis")
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const Readable = require('stream').Readable;
const stringToStream = require("string-to-stream")

// function bufferToStream(buffer) {
//     var stream = new Readable();
//     stream.push(buffer);
//     stream.push(null);

//     return stream;
// }

// const changePermissions = async (drive, fileId) => {
//     try {
//         const resp = await drive.permissions.create({
//             fileId: fileId,
//             requestBody: {
//                 role: "reader",
//                 type: 'anyone'
//             }

//         })
//         return resp.status == 200 ? true : false
//     }
//     catch (err) {
//         console.log(err)
//         return false
//     }
// }

// const getLink = async (drive, fileId) => {
//     try {
//         const res1 = await drive.files.get({
//             fileId: fileId,
//             fields: 'webViewLink,webContentLink,iconLink,thumbnailLink'
//         })
//         return res1.data
//     }
//     catch (err) {
//         console.log(err)
//         return false
//     }
// }
// const addFilesToFolder = async (files, folderId, drive) => {

//     try {


//         for (let i = 0; i < files.length; i++) {

//             let fileId = files[i]
//             // Retrieve the existing parents to remove
//             const resp = await drive.files.get({
//                 fileId: fileId,
//                 fields: 'parents'
//             });
//             const parentFolderId = resp.data

//             if (parentFolderId) {
//                 const resp = await drive.files.update({
//                     fileId: fileId,
//                     addParents: folderId,
//                     removeParents: parentFolderId,
//                     fields: 'id, parents'
//                 })
//                 console.log(resp.data)
//             }
//             else {
//                 console.log(parentFolderId)

//                 return false
//             }
//         }
//         return true
//     }
//     catch (err) {
//         console.log(err)
//         return false
//     }
// }

const downloadZipFile = async (fromDir, zipFileName, selectFileNames = "all") => {
    const cvPathName = path.join(__dirname, "..", "public", "student_details", "CV")
    const zipPath = path.join(__dirname, "..", "public", "student_details", "Zips")


    console.log(fs.readdirSync(cvPathName));
    try {
        const filesToZip = []
        if (selectFileNames == "all") {
            filesToZip = fs.readdirSync(cvPathName)
        }
        else {
            fs.readdirSync(cvPathName).map((elem) => {
                const fileName = elem.split(".")[0]
                if (selectFileNames.includes(fileName)) {
                    filesToZip.push(elem)
                }
            })
        }

        console.log(filesToZip);
        const zip = new AdmZip();
        for (let i = 0; i < filesToZip.length; i++) {
            const fileZippth = cvPathName + "\\" + filesToZip[i]
            zip.addLocalFile(fileZippth)
        }
        const downloadName = zipFileName + ".zip"
        const data = zip.toBuffer()
        zip.writeZip(zipPath + "/" + downloadName)
        return data
    }
    catch (err) {
        console.log(err.toString());
        log.error(err)
        log.error("Error creating Zip File!", err.toString())
        return false
    }
}
// const createFolder = async (folderName, drive) => {
//     try {
//         var fileMetadata = {
//             'name': folderName,
//             'mimeType': 'application/vnd.google-apps.folder'
//         };
//         console.log("> Folder creation started")
//         const resp = await drive.files.create({
//             resource: fileMetadata,
//             fields: 'id'
//         })
//         console.log("> Folder created with Id:", resp.data.id)
//         return resp.data.id
//     }
//     catch (err) {
//         console.log(err)
//         return false
//     }
// }






// const createSharedFolderLink = async (studentData, fileIds, folderName) => {
//     try {
//         const OAuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
//         OAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN })
//         const drive = google.drive({
//             version: "v3",
//             auth: OAuthClient
//         })
//         console.log("> Creating folder on drive")
//         const folderId = await createFolder(folderName, drive)
//         console.log("> folder created on drive")
//         const filesToSend = []
//         for (let i = 0; i < fileIds.length; i++) {
//             if (fileIds[i].length == 33) {
//                 filesToSend.push(fileIds[i])
//             }
//         }
//         const status = await addFilesToFolder(filesToSend, folderId, drive)
//         if (status) {
//             // console.log(links)
//             const perms = await changePermissions(drive, folderId)
//             const links = await getLink(drive, folderId)
//             console.log(links)
//             return links["webViewLink"]

//         }
//         // else {
//         //     throw "Error adding files to folder!"
//         // }
//         return false
//     }
//     catch (err) {
//         console.log(err)
//         return false
//     }
// }



module.exports = {
    downloadZipFile,
    // createSharedFolderLink
}