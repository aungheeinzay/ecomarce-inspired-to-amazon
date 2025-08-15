import { createProduct, updateProduct } from "../controllers/product";
import { Router } from "express";
import { protact } from "../middleware/protact";
import { isAdmin } from "../middleware/roleMiddleware";
import { validator } from "../middleware/validator";

const router = Router()

//admin can only request these route
router.post("/",validator,protact,isAdmin,createProduct)
//admin can only request these route
router.post("/:id",protact,isAdmin,updateProduct)
export default router;