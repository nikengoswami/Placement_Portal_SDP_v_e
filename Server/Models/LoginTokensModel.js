module.exports = (sequelize, DataTypes) => {

    const LoginToken = sequelize.define("LoginToken", {
        LoginId: {
            type: DataTypes.STRING,
            allowNull: false
            // primaryKey: true,
            // autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        Token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false
        }
    )

    return LoginToken
}