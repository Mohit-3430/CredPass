import { issueJWT } from "../configs/utils.js";
import { User } from "../Models/user.js";
import bcrypt from "bcrypt";


export const LoginController = (req, res) => {
    res.status(200).json({ status : true, msg: "Hi There I am from Login controller!!"})
}

//Post Method to /api/user/login
export const LoginVerifyController = async (req, res, next) => {

    try {
    const user = await User.findOne({ emailId: req.body.emailId })
    
        if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            const isValid =  await bcrypt.compare(req.body.password, user.password)
            
            if (isValid && user) {

                const tokenObject = issueJWT(user); //from utils

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

    }
        catch (err) {
            next(err);
            // res.status(404).json({sucess:false, msg : err.message})
        }
}

// This is POST route
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

// This is GET route
export const SignupController = (req, res) => {
    res.status(201).json({suecess:true, msg:"Hi from signup Route!"})
}

