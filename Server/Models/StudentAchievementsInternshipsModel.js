module.exports = (sequelize, DataTypes) => {
    const StudentAchievementsInternships = sequelize.define("StudentAchievementsInternships", {
        Student_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Start_Date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        End_Date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Company_Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Company_Address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
    )

    return StudentAchievementsInternships
}