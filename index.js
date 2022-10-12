const express = require("express");
const app = express();
require('dotenv').config()
const cors= require('cors')
const userRouter = require("./routes/user");
const packageRouter = require("./routes/packages");
app.use(cors())
app.use(express.json());
app.use(userRouter);
app.use(packageRouter);
const sequelize = require("./models/index");
const port = process.env.PORT ;
console.log(process.env) // remove this after you've confirmed it is working

app.listen(port, () => {
  console.log(`The Server is listening on ${port}`);
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/", (req, res) => {
  res.send("welcome");
});
