module.exports = (sequelize, DataTypes) => {

    const Notifications = sequelize.define("notifications", {
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateAdded: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        isSeen: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    },
        {
            timestamps: false
        }
    )

    return Notifications
}