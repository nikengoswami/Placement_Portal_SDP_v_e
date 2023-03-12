const logger = require("serverloggerjs/logger")
const { comments } = require("../Models/index")
const log = new logger(true)
const db = require("../Models/index")
const Comment = db.comments

const createComment = async (commentData) => {
    try {
        // console.log("Comment data: ", commentData)

        await Comment.create(commentData)
        return true
    }

    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getAllComments = async (id) => {

    try {
        let comments = await Comment.findAll({
            where: {Announcement_ID: id}
        })
        return comments
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

module.exports = {
    createComment,
    getAllComments
}