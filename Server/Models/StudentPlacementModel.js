module.exports = (sequelize, DataTypes) => {
    const StudentPlacement = sequelize.define("StudentPlacement", {
        Student_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Company_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Salary: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        Offer_Letter: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Passed_out_year: {
            type: DataTypes.DATE,
            allowNull: false
        },
        IsFinal: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

    }, {
        timestamps: false
    })
    return StudentPlacement
}