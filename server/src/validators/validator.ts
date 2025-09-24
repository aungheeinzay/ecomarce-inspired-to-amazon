import { body, param } from "express-validator";

const imageValidator=[
    body("image").notEmpty().withMessage("image is required")
]
const emailValidator=[
    body("email").isEmail().withMessage("invalid email")
]
const usernameValidator=[
    body("username").isLength({min:3}).withMessage("username is too short"),
    body("username").isLength({max:20}).withMessage("username is too long"),
]
const passwordValidator=[
    body("currentPassword").notEmpty().withMessage("current password is required"),
    body("newPassword").notEmpty().withMessage("new password is required")
]

const newPasswordValidator=[
    body("newPassword").notEmpty().withMessage("password is required")
    .isLength({min:6}).withMessage("password is too short")
]
const sessionIdvalidator = [
    param("sessionId").notEmpty().isString().withMessage("sessionid is required")
]
export {imageValidator,
    emailValidator,
    usernameValidator,
    passwordValidator,
    newPasswordValidator,
    sessionIdvalidator
}