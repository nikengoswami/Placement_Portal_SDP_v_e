module.exports = (sequelize, DataTypes) => {

    const AdminLogin = sequelize.define("AdminLogin", {

        Admin_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },

        Admin_Name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Admin_Password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
        {
            timestamps: false
        }
    )

    return AdminLogin
}