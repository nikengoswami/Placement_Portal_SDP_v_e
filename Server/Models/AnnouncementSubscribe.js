module.exports = (sequelize, DataTypes) => {

    const Subscribe = sequelize.define("AnnouncmentSubsribe", {
        Announcement_ID: {
            type: DataTypes.INTEGER,
        },
        Student_ID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false
        }
    )

    return Subscribe
}