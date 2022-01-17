import express, { application } from "express"
import { LoginController, LoginVerifyController, SignupController, SignupAuthController,  aldreadySigninPasswordVerifier} from "../controllers/UserControllers.js"
import { authentication } from "../middlewares/authentication.js";

const router = express.Router();

router.get('/login', LoginController)
router.get('/register', SignupController)

router.post('/register', SignupAuthController)
router.post('/login', LoginVerifyController)

router.post('/only-password',authentication, aldreadySigninPasswordVerifier)

export default router;