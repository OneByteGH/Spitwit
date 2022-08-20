const Sequelize = require('sequelize');
const logger = require('./logger');

const connect = async () => {
  try {
    return new Sequelize(
      'spitwit',
      'root',
      'root', {
        dialect: 'mysql',
        host: 'localhost'
      }
    );
  } catch(err) {
    throw err;
  }
}

const addUser = async (data) => {
  try {
    const sequelize = await connect();
    const Users = sequelize.define(
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        twitterHandle: Sequelize.STRING,
        oAuthToken: Sequelize.STRING,
        expiresAt: Sequelize.DATE,
        refreshToken: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        isActive: Sequelize.BOOLEAN,
        inActiveDate: Sequelize.DATE
      },
      { timestamps: true }
    );

    await Users.sync();
    return await Users.create(data);
  } catch(err) {
    throw err;
  }
}

module.exports = { addUser };