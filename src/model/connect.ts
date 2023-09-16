import mongoose from "npm:mongoose@^6.7";
// import dotenv from "dotenv";
import log from "../logger";
// dotenv.config();

// function connect(){
//     const dbUri = process.env.MONGO_URI as string

//     return mongoose.connect(dbUri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         log.info("Database connected")
//     })
//     .catch((error) => {
//         log.error("db error", error)
//         process.exit(1)
//     })

// }

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    log.info("Database Connected");
  } catch (err) {
    log.info(err);
    process.exit(1);
  }
};

export default connect;
