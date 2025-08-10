import { Router } from "express";
import { login, RegisterUser, logout } from "../controllers/auth";
import { body } from "express-validator";
const router = Router()


router.post("/register",
    body("email").isEmail().withMessage("invalid email"),
    body("username").isLength({max:20}).withMessage("üsername is too long"),
    body("password").isLength({min:6}).withMessage("password is too short"),RegisterUser)

router.post("/login",body("email").isEmail().withMessage("invalid email"),login)

router.delete("/logout",logout)
export default router;