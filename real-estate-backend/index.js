import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

//setting up dotenv
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => console.log(error));

//We install nodemon and set the script to use nodemon index.js => "dev": "nodemon index.js",  "start": "node index.js" => for deployment
const app = express();
app.use(cookieParser());

//middleware
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// global error-handling middleware
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    status,
    message,
  });
});
