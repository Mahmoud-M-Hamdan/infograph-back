const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("./index");
const Package = sequelize.define("package", {
  serviceProvider: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter The Service Provider",
      },
    },
  },
  serviceID:{
    
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter The Service ID",
      },
    },
  },
  IDs: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },

  width: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter The width",
      },
    },
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter The height",
      },
    },
  },
  length: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter The length",
      },
    },
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter The weight",
      },
    },
  },
  ownerId:{
    type: DataTypes.STRING,
    allowNull: false,
  }
});
Package.sync({ alter: true });

module.exports = Package;
