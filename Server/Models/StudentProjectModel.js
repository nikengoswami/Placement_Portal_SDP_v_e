module.exports = (sequelize, DataTypes) => {
    const StudentProject = sequelize.define("StudentProject", {
        Project_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Student_ID: {
            type: DataTypes.STRING,
            foreignKey: true,
            allowNull: false
        },
        Project_Title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Brief_Description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Project_Link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Technologies: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        timestamps: false
    })
    return StudentProject
}