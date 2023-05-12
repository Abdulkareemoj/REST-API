import cors from "cors";
import express from "express";
import dotenv from 'dotenv'
import log from "./src/logger"
import connect from "./config/connect";
import routes from "./src/routes"
dotenv.config({ path: './config/.env' });


const app = express();
const port = process.env.PORT
const base = process.env.BASE

app.use(cors()); 
app.use(express.json());

app.listen(port, () => {
 log.info(`[INFO] Server Started on PORT: ${port}`);
  log.info(`Server listening at ${base}`)

  connect()
  routes(app)
})