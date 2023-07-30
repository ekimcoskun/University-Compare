import express from "express";
import bodyParser from "body-parser";
import Routers from "./routes/index.js";
import cors from "cors";

const routers = new Routers().router;
const app = express();

app.use(cors());
const PORT = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routers);
app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running, and App is listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
