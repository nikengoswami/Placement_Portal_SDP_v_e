module.exports = (sequelize, DataTypes) => {

    const BranchAnnouncement = sequelize.define("BranchAnnouncement", {
        AnnouncementId: {
            type: DataTypes.STRING,
            allowNull: false,
            // primaryKey: true,
            // autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        BranchName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false
        }
    )

    return BranchAnnouncement
}