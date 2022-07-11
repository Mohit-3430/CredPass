import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

export const passwordResetLink = (emailId) => {
    const seccret = process.env.EMAIL_JWT_SECRET
    const payload = {
        emailId: emailId,
        iat: Date.now()
    }
    const token = jsonwebtoken.sign(payload, seccret, {
        expiresIn: '10m'
    });
    const link = `${process.env.SERVER_URL}/api/user/reset-password/${emailId}/${token}`;
    return link
}
