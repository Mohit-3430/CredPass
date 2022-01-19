import { issueJWT } from "../configs/utils.js";
import { User } from "../Models/user.js";
import bcrypt from "bcrypt";
import qrcode from "qrcode"
import { verifyTOTP, genSecret } from "../configs/2FAUtils.js";

// POST /api/user/signup
export const SignupAuthController = async (req, res, next) => {
    // console.log(req.body) *Perfectly the data is reaching*
	const {emailId, password, uname} = req.body;

	if (req.body.password===req.body.againPassword){
        try{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                emailId  :   emailId,
                password :   hashedPassword,
                uname    :   uname
        })
        user.save()
            .then((user) =>{
                res.status(201).json({success:true, user:user})
            })
        }catch (err){
            res.status(404).json({success:false, msg:"Could not add User!!"});
        }
	}
}

// GET /api/user/signup
export const SignupController = (req, res) => {
    res.status(201).json({suecess:true, msg:"Hi from signup Route!"})
}

export const LoginController = (req, res) => {
    res.status(200).json({ status : true, msg: "Hi There I am from Login controller!!"})
}

//POST /api/user/login
export const LoginVerifyController = async (req, res, next) => {

    try {
    const user = await User.findOne({ emailId: req.body.emailId })
    
        if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }

        const isValid =  await bcrypt.compare(req.body.password, user.password)
        
        if (isValid && user) {
            const tokenObject = issueJWT(user); //from utils
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires});
        } else {
            res.status(401).json({ success: false, msg: "you entered the wrong password" });
        }

    }
    catch (err) {
        next(err);
        // res.status(404).json({sucess:false, msg : err.message})
    }
}

// POST /api/user/only-password
export const aldreadySigninPasswordVerifier=async(req, res)=>{

    try {
        const user = await User.findOne({ uname: req.user.sub })
        
            if (!user) {
                    return res.status(401).json({ success: false, msg: "could not find user" });
                }
            const isValid =  await bcrypt.compare(req.body.password, user.password)
            
            if (isValid && user) {
                res.status(200).json({ success: true, msg:"successfully verified!!"});
            } else {
                res.status(401).json({ success: false, msg: "you entered the wrong password" });
            }
        }
        catch (err) {
            res.status(404).json({sucess:false, msg : err.message})
        }
}

// GET /api/user/totp-show
export const toptShow=async(req, res)=>{
    if(req._2fa===false){
        try{
            const user = await User.findOne({uname : req.user.sub})
            if(user.two_fa_status===false){
                const {secret_32, secret_link} = genSecret(req.user.sub);
                qrcode.toDataURL(secret_link, (err, scan)=>{
                res.json({scan : scan, code : secret_32})
            })
            }else {
                res.json({status:"enabled"})
            }
        }catch(err){
            console.log(err)
        }
    }else {
        res.status(200).json({success:true, msg:"Aldready Generated"})
    } 
}

// GET /api/user/totp-status
export const toptStatus = async(req, res)=>{
    // console.log(req._2fa)
    try{
        const user = await User.findOne({uname : req.user.sub})
        if(user.two_fa_status===false){
            res.status(200).json({msg : "Disabled"})
        }else {
            res.status(200).json({msg :"Enabled", base32 : user.base32, qr : user.qrCode})
        }
    }catch(err){
        console.log(err)
    }
}

// POST /api/user/totp-verification
export const toptVerification = async(req, res)=>{
    // TODO: res.type === enable and res.type===disable
    const {verified} = verifyTOTP(req.body.secret_32, req.body.code)
    if(verified===true){
        await User.findOneAndUpdate({uname : req.user.sub}, {two_fa_status: true});
    }
    res.send(verified)
}

// PATCH /api/user/edit-user-info
export const editUser = async (req, res)=>{
    const updates = req.body;
    const options = {new:true}

    try{
        const user = await User.findOneAndUpdate({uname:req.user.sub}, updates, options)
        if(!user) throw err;
        res.status(200).send(user);
    }catch(err){
        res.status(404).json({"success":false, "msg":"No Record Found"})
    }
}