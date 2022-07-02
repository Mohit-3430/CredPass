import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

export const passwordResetLink = (emailId)=>{
    const seccret = process.env.JWT_SECRET + emailId
    const payload = {
        emailId : emailId,
        iat : Date.now()
    }
    const token = jsonwebtoken.sign(payload, seccret, {
        expiresIn : '10min'
    });
    const link = `http://localhost:3000/reset-password/${emailId}/${token}`;
    return link
}
