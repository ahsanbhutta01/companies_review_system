import dotenv from "dotenv";
dotenv.config({ path: './config.env' });
import mongoose from "mongoose";
import { app } from "./app.js";

process.on("uncaughtException", (err) => {
   console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
   console.error(err.name, err.message);
   process.exit(1);
});


const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD)
// const DB = process.env.db
mongoose.connect(DB)
   .then(() => console.log("DB Connection Successfull"))
   .catch((err) => console.log(err))

const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`App running on port ${PORT}`)
})


process.on("unhandledRejection", (err) => {
   console.error("UNHANDLED REJECTION! 💥 Shutting down...");
   console.error(err.name, err.message);

   server.close(() => {
      process.exit(1);
   });
});
