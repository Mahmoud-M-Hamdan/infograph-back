const jwt = require("jsonwebtoken");
const User = require("../models/user");

const Auth = async (req, res, next) => {
  try {
    // console.log("hello from auth");
    const token = await req.headers.authorization.split(' ')[1];
    if(!token){throw ('please supply the token')}
   
    const decode = jwt.verify(token, process.env.SECRET);
    // console.log(decode);
    const user = await User.findOne({where:{id:decode}});
    // console.log(user);
    if (!user) {
      throw new Error("not Authorized");
    }
    // console.log('good')
    req.user = user;
    req.token=token
    next();
  } catch (error) {
    res.status(401).send(" please login first");
  }
};

module.exports = Auth;
