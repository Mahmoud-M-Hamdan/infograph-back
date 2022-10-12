const { Sequelize, DataTypes } = require("sequelize");

const bcrypt = require("bcryptjs");
const sequelize = require("./index");
const jwt = require("jsonwebtoken");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please enter your Username",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter your Password",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Please enter a valid email",
      },
      notNull: {
        msg: "Please enter your email",
      },
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter your Phone Number",
      },
    },
  },
  token: {
    type: DataTypes.STRING,
  },
});
User.prototype.geneterateToken = async function () {

  const user = this;
  const token = jwt.sign(user.id, process.env.SECRET);
  user.token = token;
  await user.save();
  return token;
};


User.verify = async function (email, password) {
 
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw "there is no user with this email";
  }
 
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw "the email or password is invalid";
  }
  return user;
};
User.sync({ alter: true });

module.exports = User;
