import { User } from "../../../Models/index.js";
import qrcode from "qrcode"
import { verifyTOTP, genSecret } from "../../../configs/2FAUtils.js";
import { getCookieWithJwtToken } from "../../../configs/JWT/JWTServices.js";

// GET /api/user/totp-show
export const toptShow = async (req, res) => {
    if (req._2fa === false) {
        try {
            const user = await User.findById(req.user.sub)
            if (user.mfa_details.mfa_status === false) {
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
        const user = await User.findById(req.user.sub)
        if (user.mfa_details.mfa_status === false) {
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
        if (user.mfa_details.mfa_status === false) {
            res.status(200).json({ msg: "Disabled" })
        } else {
            res.status(200).json({ msg: "Enabled", base32: user.mfa_details.mfa_secret, qr: user.mfa_details.mfa_qr })
        }
    } catch (err) {
        console.log(err)
    }
}

// POST /api/user/totp-verification
export const toptVerification = async (req, res) => {
    const { secret_32, code } = req.body;
    const { verified } = verifyTOTP(secret_32, code)
    if (verified === true) {
        await User.findByIdAndUpdate(req.user.sub, { $set: { "mfa_details.mfa_status": true } });
    }
    res.send(verified)
}
// PATCH /api/user/totp-data-on
export const totpDataOn = async (req, res) => {
    const { secret, qrCode } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user.sub, { $set: { "mfa_details.mfa_type": "TOTP", "mfa_details.mfa_secret": secret, "mfa_details.mfa_qr": qrCode } })
        if (!user) throw err
        res.status(202).json({ success: true, msg: "Updated info of MFA" })
    }
    catch (err) {
        res.status(404).json({ success: false, msg: "Error Occured!" })
    }
}

// PATCH /api/user/totp-data-off
export const totpDataOff = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.sub, {
            $set: { mfa_details: {} }
        })
        if (!user) throw err
        res.status(200).json({ success: true, msg: "TOTP turned OFF" })
    } catch (err) {
        console.log(err)
        res.status(404).json({ success: false, msg: "Error Occured!" })
    }
}

// POST /api/user/totp-verification-noauth
export const toptVerificationNoAuth = async (req, res) => {
    const { verified } = verifyTOTP(req.body.secret_32, req.body.code)
    const { user } = req.body
    const u = await User.findOne({ uname: user });
    if (verified === true) {
        const cookie = await getCookieWithJwtToken(user);
        res.cookie(cookie);
        res.status(200).json({ success: true, msg: "Totp verified and token generated", superUser: user, emailId: u.emailId });
    }
    else
        res.status(404).json({ success: false, msg: "Totp not verified!" })
}