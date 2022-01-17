import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import dotenv from "dotenv";
import {authentication} from "./middlewares/Authentication.js"

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors())

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
  .then(() => {console.log("DB connected!!")})
  .catch(() => {console.log("Check DB connection!!")})

import UserAuthRoutes from "./routes/UserAuthRoutes.js"
import VaultRoutes from "./routes/VaultRoutes.js"

app.get('/', (req, res) => {
  res.send("Hello From Server!!")
})

// ====User Routes====
app.use('/api/user',UserAuthRoutes)

// ====Vault Routes ====
app.use('/api',authentication, VaultRoutes)

app.listen(port, () =>{
  console.log(`Runnning on port ${port}`);
})