import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authentication, toptCheck } from "./src/middlewares/Authentication.js"

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => { console.log("DB connected!!") })
  .catch(() => { console.log("Check DB connection!!") })

import UserAuthRoutes from "./src/routes/User/UserAuthRoutes.js"
import VaultRoutes from "./src/routes/Vault/VaultRoutes.js"

app.get('/', (req, res) => {
  res.send("Hello From Server!!")
})

// ====User Routes====
app.use('/api/user', UserAuthRoutes)

// ====Vault Routes ====
app.use('/api', authentication, toptCheck, VaultRoutes)

import path from "path"
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Runnning on port ${port}`);
})