module.exports = (sequelize, DataTypes) => {

    const UserLogin = sequelize.define("UserLogin", {
        // student id would be defined by the relations defined
        LoginId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IsFirstTime: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
        {
            timestamps: false
        }
    )
    return UserLogin
}