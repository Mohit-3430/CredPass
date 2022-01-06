import { Strategy as JwtStrategy} from 'passport-jwt';
import {ExtractJwt} from "passport-jwt"
import fs from "fs"
import {User} from '../Models/user.js'
import path from "path";
import url from "url"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const pathToKey = path.join(__dirname, '..', 'rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

// app.js will pass the global passport object here, and this function will configure it
export const passportUtil = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {

        // console.log(jwt_payload);
        
        User.findOne({uname: jwt_payload.sub}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
            
        });
        
    }));
}