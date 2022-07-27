import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
import { User } from "../../models/index.js"

dotenv.config();

export const getCookieWithJwtToken = async (_id) => {
    const user = await User.findById(_id);
    const mfa_status = user.mfa_details.mfa_status;
    const payload = {
        sub: _id,
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