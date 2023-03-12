module.exports = (sequelize, DataTypes) => {

    const Students = sequelize.define("student", {
        Student_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MiddleName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Admission_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Cast_category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: false
        },
        SSC_Percentage: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        SSC_Percentile: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        SSC_Board: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SSC_School: {
            type: DataTypes.STRING,
            allowNull: false
        },
        HSC_Percentage: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        HSC_Percentile: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        HSC_Board: {
            type: DataTypes.STRING,
            allowNull: false
        },
        HSC_School: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IsD2D: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Diploma_Result_CPI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Diploma_Result_Percentage: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Diploma_College_Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Diploma_University: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Sem_1_SPI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Sem_2_SPI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Sem_3_SPI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Sem_4_SPI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Sem_5_SPI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Sem_6_SPI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Sem_7_SPI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Sem_8_SPI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Current_CPI: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Enrollment_year: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Passed_out_year: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Email_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_No_1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_No_2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Pin_Code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Current_semester: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Career_Preference: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CV_Upload: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Student_Photo: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Branch_Id: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        timestamps: false
    })
    return Students
}