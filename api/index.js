const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

dotenv.config();


app.use(express.json());
app.use(cors())

mongoose
.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));


app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);



app.listen('5000', () => {
  console.log('Started')

})