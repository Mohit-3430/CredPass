import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
import { User } from "../../Models/user.js"

dotenv.config();

export const getCookieWithJwtToken = async (uname) => {
    const user = await User.findOne({ uname: uname });
    const mfa_status = user.two_fa_status;
    const payload = {
        sub: uname,
        mfa_status,
    };
    const secret = Buffer.from(process.env.JWT_ACCESS_PRV, 'base64').toString('ascii')
    const options = {
        expiresIn: process.env.JWT_ACCESS_EXP,
        algorithm: 'RS256'
    }
    const token = jsonwebtoken.sign(payload, secret, options);
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_EXP}`;
    return cookie;
}