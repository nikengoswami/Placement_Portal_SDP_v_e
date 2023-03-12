module.exports = (sequelize, DataTypes) => {

    const Otp = sequelize.define("otps", {
        otp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        validTill: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isUsed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        studentId: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
        {
            timestamps: false
        }
    )

    return Otp
}