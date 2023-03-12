module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        Comment_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },

        Announcement_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        Comment_text: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Comment_Date:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        Comment_Publisher: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
    )

    return Comment
}