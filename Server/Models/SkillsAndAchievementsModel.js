module.exports = (sequelize, DataTypes) => {
    const SkillsAndAchievements = sequelize.define("SkillsAndAchievements", {
        Student_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Skills: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Programming_Language_Skills: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // Web_Development_Skills: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // Database_Skills: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        Competitive_Coding_Achievements: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Other_Achievements: {
            type: DataTypes.STRING,
            allowNull: true
        },
        GRE_Score: {
            type: DataTypes.STRING,
            allowNull: true
        },
        TOEFL_Score: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        IELTS_Score: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        GATE_Score: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    }, {
        timestamps: false   
    })
    return SkillsAndAchievements
}