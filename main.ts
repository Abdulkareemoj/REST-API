import cors from "cors";
import express from "express";

import connect from "./src/utils/dbconnect.ts";
import routes from "./src/routes/index.ts";

import deserializeUser from "./src/middleware/deserializeUser.ts";

const app = express();
const port = Deno.env.get("PORT");
const base = Deno.env.get("BASE");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);

app.listen(port, () => {
  console.log(`[INFO] Server Started on PORT: ${port}`);
  console.log(`Server listening at ${base}`);

  connect();
  routes(app);
});
