import express from "express";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO).then();

//We install nodemon and set the script to use nodemon index.js => "dev": "nodemon index.js",  "start": "node index.js" => for deployment
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
