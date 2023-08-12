import express from "express";
import bodyParser from "body-parser";
import Routers from "./routes/index.js";
import cors from "cors";
import DB from "./repository/DB.js";

const routers = new Routers().router;
const app = express();
DB.connect();
app.use(cors());
const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use("/api", routers);
app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running, and App is listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
