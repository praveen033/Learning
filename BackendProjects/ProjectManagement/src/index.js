import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/dbConnection.js";


dotenv.config({ path: "./ProjectManagement/.env" });

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`APP listening in port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDb connectio error", err);
    process.exit(1);
  });
// process.env.API_URL;
let url = process.env.API_URL;

console.log(url);
// for require we use common.js and for import we use module in package.json in type:
