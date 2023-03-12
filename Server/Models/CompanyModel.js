// ---------------- || COMPANY MODEL || ----------------
module.exports = (sequelize, DataTypes) => {
    const Companies = sequelize.define("Company", {
        Company_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Company_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Company_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_1_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_1_email_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_1_designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_1_Mobile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_2_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_2_email_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_2_designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_2_Mobile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_3_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_3_email_ID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_3_designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact_person_3_Mobile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Company_web_site: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Remarks: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Company_offer_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false
        },
        State: {
            type: DataTypes.STRING,
            allowNull: false
        },
            //bond
            //security
            //multiple
    }, {
        timestamps: false
    })
    return Companies
}