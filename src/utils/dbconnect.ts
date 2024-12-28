import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(Deno.env.get("MONGO_URI")!);
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
    Deno.exit(1);
  }
  if (!Deno.env.get("MONGO_URI")) {
    console.log("MONGO_URI environment variable is not set");
    Deno.exit(1);
  }
};

export default connect;
