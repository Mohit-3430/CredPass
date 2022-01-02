import jsonwebtoken from "jsonwebtoken"
import fs from "fs"
import path from "path";
import url from "url"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const pathToKey = path.join(__dirname, '.', 'rsa_priv.pem');

export const issueJWT = (user) => {
    const uname = user.uname;

    const expiresIn = '1d';

    const payload = {
        sub: uname,
        iat: Date.now()
    };

    const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

