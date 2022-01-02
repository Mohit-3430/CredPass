import express from "express"
import { LoginController, LoginVerifyController, SignupController, SignupAuthController} from "../controllers/UserControllers.js"

const router = express.Router();

router.get('/login', LoginController)
router.get('/register', SignupController)

router.post('/register', SignupAuthController)
router.post('/login', LoginVerifyController)


export default router;