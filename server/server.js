import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import passport from "passport";
import dotenv from "dotenv";

import {passportUtil} from "./configs/passport.js"

dotenv.config();

const app = express();

const port = process.env.PORT;

// Pass the global passport object into the configuration function
passportUtil(passport)

// This will initialize the passport object on every request
app.use(passport.initialize());

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
app.use('/api', VaultRoutes)

app.listen(port, () =>{
  console.log(`Runnning on port ${port}`);
})