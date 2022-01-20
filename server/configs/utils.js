import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const issueJWT = (uname) => {
    
    const expiresIn = '1d';
    const payload = {
        sub: uname,
        iat: Date.now()
    };
    const signedToken = jsonwebtoken.sign(payload, process.env.ACCESS_TOKEN_SECRET);

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}
