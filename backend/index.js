import express from "express";
import bodyParser from "body-parser";
import Routers from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running, and App is listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
