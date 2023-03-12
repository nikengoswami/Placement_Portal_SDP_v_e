module.exports = (sequelize, DataTypes) => {

    const Branch = sequelize.define("Branch", {
        Branch_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        Branche_Name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
    )

    return Branch
}