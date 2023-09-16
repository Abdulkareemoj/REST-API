// import cors from "cors"
// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";

// import dotenv from 'dotenv'
import log from "./src/logger";
import connect from "./src/model/connect";
import routes from "./src/routes";
// dotenv.config({ path: './config/.env' })
import deserializeUser from "./src/middleware/deserializeUser";

const app = express();
const port = process.env.PORT;
const base = process.env.BASE;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);

app.listen(port, () => {
  log.info(`[INFO] Server Started on PORT: ${port}`);
  log.info(`Server listening at ${base}`);

  connect();
  routes(app);
});
