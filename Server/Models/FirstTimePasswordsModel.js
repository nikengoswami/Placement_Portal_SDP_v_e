module.exports = (sequelize, DataTypes) => {

    const FirstTimePassword = sequelize.define("FirstTimePasswords", {
        PasswordId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },

        StudentId: {
            type: DataTypes.STRING,
            allowNull: false
        },

        FirstTimePassword: {
            type: DataTypes.STRING,
            allowNull: false

        },
        Passed_out_year: {
            type: DataTypes.DATE,
            allowNull: false
        },

    },
        {
            timestamps: false
        }
    )

    return FirstTimePassword
}