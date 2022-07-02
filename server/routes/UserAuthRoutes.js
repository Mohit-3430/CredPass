import express from "express"
import { LoginController, LoginVerifyController, SignupController, SignupAuthController,  aldreadySigninPasswordVerifier,toptStatus, toptShow, toptVerification, toptVerificationNoAuth, editUser, toptStatusNoauth, resetPassword, changePassword} from "../controllers/UserControllers.js"
import { authentication, toptCheck } from "../middlewares/authentication.js";

const router = express.Router();

router.get('/login', LoginController)
router.get('/register', SignupController)

router.post('/register', SignupAuthController)
router.post('/login', LoginVerifyController)
router.post('/reset-password-email', resetPassword)
router.patch('/change-password', changePassword)

router.patch('/edit-user-info',authentication,toptCheck, editUser)

router.post('/only-password',authentication,toptCheck, aldreadySigninPasswordVerifier)
router.get('/totp-status',authentication,toptCheck, toptStatus)
router.post('/totp-status-noauth', toptStatusNoauth)
router.post('/totp-verification',authentication,toptCheck, toptVerification)
router.post('/totp-verification-noauth', toptVerificationNoAuth)
router.get('/totp-show',authentication,toptCheck, toptShow)

export default router;