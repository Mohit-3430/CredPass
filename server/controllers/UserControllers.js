import { issueJWT } from "../configs/utils.js";
import { User } from "../Models/user.js";
import bcrypt from "bcrypt";
import qrcode from "qrcode"
import { verifyTOTP, genSecret } from "../configs/2FAUtils.js";
import { sendMail } from "../configs/SendEmail.js";
import { passwordResetLink } from "../configs/PasswordResetLink.js";
import jsonwebtoken from "jsonwebtoken";

import dotenv from "dotenv"

dotenv.config()

// custom error handler
const handleErrors = (err) => {
    let errors = { emailId: '', password: '', uname: '' };

    // email not unique error
    if (err.code === 11000) {
        if (err.message.includes('uname'))
            errors.uname = 'The user name is aldeardy in use';
        if (err.message.includes('emailId'))
            errors.emailId = "The email id is aldready in use "
        return errors;
    }
    // validation stuff
    else if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

// POST /api/user/signup
export const SignupAuthController = async (req, res) => {
    // console.log(req.body) *Perfectly the data is reaching*
    const { emailId, password, uname } = req.body;

    try {
        if (req.body.password === req.body.againPassword) {
            const user = await User.create({ emailId, password, uname });
            res.status(201).json({ success: true, user: user })
        }
        else {
            res.status(400).send('Passwords Not matched!!')
        }
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ success: false, errors });
    }
}

// GET /api/user/signup
export const SignupController = (req, res) => {
    res.status(201).json({ suecess: true, msg: "Hi from signup Route!" })
}

export const LoginController = (req, res) => {
    res.status(200).json({ status: true, msg: "Hi There I am from Login controller!!" })
}

//POST /api/user/login
export const LoginVerifyController = async (req, res) => {

    try {
        const user = await User.findOne({ emailId: req.body.emailId })
        if (!user) {
            return res.status(201).json({ success: false, msg: "could not find user" });
        }

        const isValid = await bcrypt.compare(req.body.password, user.password)

        if (isValid && user) {
            if (user.two_fa_status === false) {
                const tokenObject = issueJWT(user.uname); //from utils
                res.status(202).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, totpStatus: user.two_fa_status, superUser: user.uname });
            }
            else {
                res.status(200).json({ success: "partial", msg: "Token will be generated once the totp step is completed", totpStatus: true, superUser: user.uname })
            }
        } else {
            res.status(200).json({ success: false, msg: "you entered the wrong password" });
        }
    }
    catch (err) {
        res.status(404).json({ sucess: false, msg: err.message })
    }
}

// POST /api/user/only-password
export const aldreadySigninPasswordVerifier = async (req, res) => {

    try {
        const user = await User.findOne({ uname: req.user.sub })

        if (!user) {
            return res.status(401).json({ success: false, msg: "could not find user" });
        }
        const isValid = await bcrypt.compare(req.body.password, user.password)

        if (isValid && user) {
            res.status(200).json({ success: true, msg: "successfully verified!!" });
        } else {
            res.status(401).json({ success: false, msg: "you entered the wrong password" });
        }
    }
    catch (err) {
        res.status(404).json({ sucess: false, msg: err.message })
    }
}

// GET /api/user/totp-show
export const toptShow = async (req, res) => {
    if (req._2fa === false) {
        try {
            const user = await User.findOne({ uname: req.user.sub })
            if (user.two_fa_status === false) {
                const { secret_32, secret_link } = genSecret(req.user.sub);
                qrcode.toDataURL(secret_link, (err, scan) => {
                    res.json({ scan: scan, code: secret_32 })
                })
            } else {
                res.json({ status: "enabled" })
            }
        } catch (err) {
            console.log(err)
        }
    } else {
        res.status(200).json({ success: true, msg: "Aldready Generated" })
    }
}

// GET /api/user/totp-status
export const toptStatus = async (req, res) => {
    // console.log(req._2fa)
    try {
        const user = await User.findOne({ uname: req.user.sub })
        if (user.two_fa_status === false) {
            res.status(200).json({ msg: "Disabled" })
        } else {
            res.status(200).json({ msg: "Enabled", base32: user.base32, qr: user.qrCode })
        }
    } catch (err) {
        console.log(err)
    }
}
// POST /api/user/totp-status-noauth
export const toptStatusNoauth = async (req, res) => {
    try {
        const user = await User.findOne({ uname: req.body.superUser })
        if (user.two_fa_status === false) {
            res.status(200).json({ msg: "Disabled" })
        } else {
            res.status(200).json({ msg: "Enabled", base32: user.base32, qr: user.qrCode })
        }
    } catch (err) {
        console.log(err)
    }
}

// POST /api/user/totp-verification
export const toptVerification = async (req, res) => {
    const { verified } = verifyTOTP(req.body.secret_32, req.body.code)
    if (verified === true) {
        await User.findOneAndUpdate({ uname: req.user.sub }, { two_fa_status: true });
    }
    res.send(verified)
}

// POST /api/user/totp-verification-noauth
export const toptVerificationNoAuth = (req, res) => {
    const { verified } = verifyTOTP(req.body.secret_32, req.body.code)
    if (verified === true) {
        const tokenObject = issueJWT(req.body.user); //from utils
        res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, totpStatus: true });
    }
    else
        res.status(404).json({ success: false })
}

// PATCH /api/user/edit-user-info
export const editUser = async (req, res) => {
    const updates = req.body;
    const options = { new: true }

    try {
        const user = await User.findOneAndUpdate({ uname: req.user.sub }, updates, options)
        if (!user) throw err;
        res.status(200).send(user);
    } catch (err) {
        res.status(404).json({ "success": false, "msg": "No Record Found" })
    }
}

// POST /api/user/reset-password-email
export const resetPasswordEmail = async (req, res) => {
    const { emailId } = req.body;
    // send link via email
    try {
        const link = `Hello From PVA!\nGo through this link and set your new Password\nThe link will be valid for 10 minutes\n\n${passwordResetLink(emailId)}`
        const subject = "Password reset from PVA"
        await sendMail(emailId, subject, link)
        res.status(200).json({ success: true, msg: "Message sent!!" })
    } catch (err) {
        res.status(404).json({ success: false, msg: "An error occured" })
    }
}

// PATCH /api/user/reset-password/:id/:token
export const resetPassword = async (req, res) => {
    const { token, emailId } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword)
        res.status(200).json({ success: false, msg: "Passwords Doesn't match" })

    const options = { new: true }

    const secret = process.env.EMAIL_JWT_SECRET

    jsonwebtoken.verify(token, secret, async (err, verifyResp) => {
        if (err) {
            res.status(403).json({ success: false, msg: "Token not verified!" });
        }
        else if (verifyResp) {
            try {
                const user = await User.findOneAndUpdate({ emailId: emailId }, { password: password }, options)
                res.status(200).json({ success: true, msg: "password changed" })
            }
            catch (err) {
                res.status(404).json({ success: false, msg: "Unsuccesful" });
            }
        }
    });

}