import { protact } from "../middleware/protact";
import { Router } from "express";
import { getUserInfo, uploadAvator, updateEmail, updateUsername, updatePassword, sendForgetPasswordEmail, forgetPasswordChange } from "../controllers/user";
import { emailValidator, imageValidator, newPasswordValidator, passwordValidator, usernameValidator } from "../validators/validator";
import { validator } from "../middleware/validator";
const router = Router()

//image upload
router.post("/upload",imageValidator,validator,protact,uploadAvator)
//fetch userInfo
router.get("/me",protact,getUserInfo)
//upload image
router.post("/update_email",emailValidator,validator,protact,updateEmail)
//update username
router.post("/update_username",usernameValidator,validator,protact,updateUsername)
//update password
router.post("/update_password",passwordValidator,validator,protact,updatePassword)
//forget password email send
router.post('/forget_password',protact,sendForgetPasswordEmail)
//forget password change
router.post('/changePassword/:token',newPasswordValidator,validator,forgetPasswordChange)
//forget password email send form logout situation
router.post('/login/forgetPassword',emailValidator,validator,sendForgetPasswordEmail)
export default router