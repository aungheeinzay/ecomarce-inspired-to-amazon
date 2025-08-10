import { createProduct, updateProduct } from "../controllers/product";
import { Router } from "express";
import { protact } from "../middleware/protact";
import { isAdmin } from "../middleware/roleMiddleware";
const router = Router()

//admin can only request these route
router.post("/",protact,isAdmin,createProduct)
//admin can only request these route
router.post("/:id",protact,isAdmin,updateProduct)
export default router;