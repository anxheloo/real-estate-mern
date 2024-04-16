import express from "express";

//We install nodemon and set the script to use nodemon index.js => "dev": "nodemon index.js",  "start": "node index.js" => for deployment
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
