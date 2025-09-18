import { Router } from "express";
import { login, RegisterUser, logout } from "../controllers/auth";
import { body } from "express-validator";
import { emailValidator } from "../validators/validator";
import { validator } from "../middleware/validator";
const router = Router()


router.post("/register",
    body("email").isEmail().withMessage("invalid email"),
    body("username").isLength({max:20}).withMessage("üsername is too long"),
    body("password").isLength({min:6}).withMessage("password is too short"),RegisterUser)

router.post("/login",emailValidator,validator,login)

router.delete("/logout",logout)
export default router;