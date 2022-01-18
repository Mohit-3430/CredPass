import express from "express"
import { LoginController, LoginVerifyController, SignupController, SignupAuthController,  aldreadySigninPasswordVerifier,toptStatus, toptShow, toptVerification} from "../controllers/UserControllers.js"
import { authentication, toptCheck } from "../middlewares/authentication.js";

const router = express.Router();

router.get('/login', LoginController)
router.get('/register', SignupController)

router.post('/register', SignupAuthController)
router.post('/login', LoginVerifyController)

router.post('/only-password',authentication,toptCheck, aldreadySigninPasswordVerifier)
router.get('/totp-status',authentication,toptCheck, toptStatus)
router.post('/totp-verification',authentication,toptCheck, toptVerification)
router.get('/totp-show',authentication,toptCheck, toptShow)

export default router;