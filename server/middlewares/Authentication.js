import jsonwebtoken from "jsonwebtoken"
import { User } from "../Models/user.js"
import dotenv from "dotenv"

dotenv.config()

export const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[2]
    if (token) {
        jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            else {
                req.user = user
                next();
            }
        })
    }
    else {
        res.send(false)
    }
}

export const toptCheck = async (req, res, next) => {
    try {
        const user = await User.findOne({ uname: req.user.sub })
        req._2fa = user.two_fa_status;
        next();
    } catch (err) {
        next();
    }
}
