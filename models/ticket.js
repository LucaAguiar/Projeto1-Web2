module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("ticket", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
        },
        observation: {
            type: Sequelize.STRING,
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        technician_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Ticket;
};
