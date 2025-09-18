import { body } from "express-validator";

export const createProductValidator=[
    body("name").notEmpty().withMessage("names is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("price").isNumeric().withMessage("price is required"),
    body("instock_count").isInt().withMessage("instock_count is required"),
    body("category").notEmpty().withMessage("category is required"),
    body("sizes").isArray({min:1}).withMessage("sizes must be required"),
    body("colors").isArray({min:1}).withMessage("colors must be required"),
    body("images").isArray({min:1}).withMessage("images must be required"),
    body("images.*.file").notEmpty().withMessage("file is required"),

    body("is_new_arrival").isBoolean().withMessage("is new arrival must be boolean")
]